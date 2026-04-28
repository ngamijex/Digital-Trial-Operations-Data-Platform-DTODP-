import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [
      totalTrials,
      activeTrials,
      totalTasks,
      completedTasks,
      overdueTasks,
      pendingSubmissions,
    ] = await Promise.all([
      prisma.trial.count(),
      prisma.trial.count({ where: { status: "ACTIVE" } }),
      prisma.task.count(),
      prisma.task.count({ where: { status: "COMPLETED" } }),
      prisma.task.count({ where: { status: "OVERDUE" } }),
      prisma.dataSubmission.count({ where: { status: "SUBMITTED" } }),
    ]);

    const slaCompliance =
      totalTasks > 0
        ? Math.round(((totalTasks - overdueTasks) / totalTasks) * 100)
        : 100;

    const trialsByPhaseRaw = await prisma.trial.groupBy({
      by: ["phase"],
      _count: { id: true },
    });

    const phaseLabels: Record<string, string> = {
      PHASE_0: "Phase 0",
      PHASE_1: "Phase 1",
      PHASE_2: "Phase 2",
      ANALYSIS: "Analysis",
      REPORTING: "Reporting",
      COMPLETED: "Completed",
    };

    const trialsByPhase = trialsByPhaseRaw.map((item: { phase: string; _count: { id: number } }) => ({
      name: phaseLabels[item.phase] ?? item.phase,
      count: item._count.id,
    }));

    const tasksByStatusRaw = await prisma.task.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const statusLabels: Record<string, string> = {
      NOT_STARTED: "Not Started",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      OVERDUE: "Overdue",
      BLOCKED: "Blocked",
    };

    const tasksByStatus = tasksByStatusRaw.map((item: { status: string; _count: { id: number } }) => ({
      name: statusLabels[item.status] ?? item.status,
      count: item._count.id,
    }));

    const monthlySubmissions = [
      { month: "Jan", submissions: 12, validated: 10 },
      { month: "Feb", submissions: 18, validated: 15 },
      { month: "Mar", submissions: 25, validated: 22 },
      { month: "Apr", submissions: 30, validated: 28 },
      { month: "May", submissions: 22, validated: 20 },
      { month: "Jun", submissions: 35, validated: 30 },
    ];

    return NextResponse.json({
      totalTrials,
      activeTrials,
      totalTasks,
      completedTasks,
      overdueTasks,
      pendingSubmissions,
      slaCompliance,
      trialsByPhase,
      tasksByStatus,
      monthlySubmissions,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
