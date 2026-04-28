import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission, Permission } from "@/lib/permissions";

export async function GET(
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

    const { id } = await params;

    const trial = await prisma.trial.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        trialPhases: { orderBy: { phase: "asc" } },
        tasks: {
          include: {
            assignee: { select: { id: true, name: true } },
          },
          orderBy: { dueDate: "asc" },
        },
        documents: { orderBy: { createdAt: "desc" } },
        dataForms: { orderBy: { createdAt: "desc" } },
        submissions: {
          include: { submitter: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        farmers: {
          include: { farmer: true },
          take: 50,
        },
        trialLocations: {
          include: { location: true },
        },
        _count: {
          select: { tasks: true, submissions: true, farmers: true, observations: true },
        },
      },
    });

    if (!trial) {
      return NextResponse.json({ error: "Trial not found" }, { status: 404 });
    }

    // Role-based access check
    if (hasPermission(userRole, Permission.TRIAL_VIEW_ALL)) {
      // Admin and Data Team can view any trial
    } else if (hasPermission(userRole, Permission.TRIAL_VIEW_OWN)) {
      // Trial Owners, Station, Field, Lab, Inventory, HTE can only view their own trials
      if (trial.ownerId !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(trial);
  } catch (error) {
    console.error("Trial GET error:", error);
    return NextResponse.json({ error: "Failed to fetch trial" }, { status: 500 });
  }
}

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

    // Only Admin and Trial Owners can edit trials
    if (!hasPermission(userRole, Permission.TRIAL_EDIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    // Check if user is the trial owner (unless Admin)
    if (!hasPermission(userRole, Permission.SETTINGS_MANAGE)) {
      const existingTrial = await prisma.trial.findUnique({ where: { id } });
      if (!existingTrial || existingTrial.ownerId !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const trial = await prisma.trial.update({
      where: { id },
      data: body,
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(trial);
  } catch (error) {
    console.error("Trial PATCH error:", error);
    return NextResponse.json({ error: "Failed to update trial" }, { status: 500 });
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

    // Only Admin and Trial Owners can delete trials
    if (!hasPermission(userRole, Permission.TRIAL_DELETE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    // Check if user is the trial owner (unless Admin)
    if (!hasPermission(userRole, Permission.SETTINGS_MANAGE)) {
      const existingTrial = await prisma.trial.findUnique({ where: { id } });
      if (!existingTrial || existingTrial.ownerId !== userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    await prisma.trial.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trial DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete trial" }, { status: 500 });
  }
}
