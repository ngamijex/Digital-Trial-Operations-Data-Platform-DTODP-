import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createTaskSchema } from "@/lib/validations";
import { hasPermission, Permission } from "@/lib/permissions";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role as any;
    const userId = (session.user as { id: string }).id;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const status = searchParams.get("status");
    const trialId = searchParams.get("trialId");
    const sort = searchParams.get("sort") ?? "createdAt";

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (trialId) where.trialId = trialId;

    // Role-based filtering
    if (hasPermission(userRole, Permission.TASK_VIEW_ALL)) {
      // Admin can see all tasks
    } else if (hasPermission(userRole, Permission.TASK_VIEW_OWN)) {
      // Trial Owners, Station, Field, Lab, Inventory, HTE see only their assigned or created tasks
      where.OR = [
        { assigneeId: userId },
        { creatorId: userId },
      ];
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        trial: { select: { id: true, code: true, name: true, ownerId: true } },
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true } },
      },
      orderBy: { [sort]: sort === "dueDate" ? "asc" : "desc" },
      take: limit,
    });

    // Filter trials based on role
    const filteredTasks = tasks.filter(task => {
      if (hasPermission(userRole, Permission.TRIAL_VIEW_ALL)) return true;
      if (hasPermission(userRole, Permission.TRIAL_VIEW_OWN)) {
        return task.trial?.ownerId === userId;
      }
      return false;
    });

    const total = await prisma.task.count({ where });

    return NextResponse.json({ tasks: filteredTasks, total });
  } catch (error) {
    console.error("Tasks GET error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role as any;
    const userId = (session.user as { id: string }).id;

    // Only Admin, Trial Owners, and Data Team can create tasks
    if (!hasPermission(userRole, Permission.TASK_CREATE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // If trialId is specified, check if user has access to that trial
    if (parsed.data.trialId) {
      const trial = await prisma.trial.findUnique({ where: { id: parsed.data.trialId } });
      if (!trial) {
        return NextResponse.json({ error: "Trial not found" }, { status: 404 });
      }

      if (!hasPermission(userRole, Permission.TRIAL_VIEW_ALL) && trial.ownerId !== userId) {
        return NextResponse.json({ error: "Forbidden - cannot create task for trial you don't own" }, { status: 403 });
      }
    }

    const task = await prisma.task.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        priority: parsed.data.priority,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
        trialId: parsed.data.trialId,
        assigneeId: parsed.data.assigneeId,
        slaTemplateId: parsed.data.slaTemplateId,
        season: parsed.data.season,
        year: parsed.data.year,
        creatorId: userId,
        slaDeadline: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
      },
      include: {
        trial: { select: { id: true, code: true, name: true } },
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Tasks POST error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
