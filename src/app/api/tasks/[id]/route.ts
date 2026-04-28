import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { updateTaskSchema } from "@/lib/validations";
import { hasPermission, Permission } from "@/lib/permissions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role as any;
    const userId = (session.user as { id: string }).id;

    // Only Admin, Trial Owners, Data Team can edit tasks
    if (!hasPermission(userRole, Permission.TASK_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = updateTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Check if user has access to this task (assignee, creator, or trial owner)
    const existingTask = await prisma.task.findUnique({
      where: { id },
      include: { trial: true },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const isAssignee = existingTask.assigneeId === userId;
    const isCreator = existingTask.creatorId === userId;
    const isTrialOwner = existingTask.trial?.ownerId === userId;
    const isAdmin = hasPermission(userRole, Permission.SETTINGS_MANAGE);

    if (!isAssignee && !isCreator && !isTrialOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updateData: Record<string, unknown> = { ...parsed.data };

    if (parsed.data.status === "COMPLETED") {
      updateData.completedAt = new Date();
      updateData.isOverdue = false;
    }

    if (parsed.data.dueDate) {
      updateData.dueDate = new Date(parsed.data.dueDate);
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        trial: { select: { id: true, code: true, name: true } },
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Task PATCH error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role as any;
    const userId = (session.user as { id: string }).id;

    // Only Admin, Trial Owners can delete tasks
    if (!hasPermission(userRole, Permission.TASK_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    // Check if user has access to this task
    const existingTask = await prisma.task.findUnique({
      where: { id },
      include: { trial: true },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const isCreator = existingTask.creatorId === userId;
    const isTrialOwner = existingTask.trial?.ownerId === userId;
    const isAdmin = hasPermission(userRole, Permission.SETTINGS_MANAGE);

    if (!isCreator && !isTrialOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Task DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
