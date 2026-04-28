import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createTrialSchema } from "@/lib/validations";
import { generateTrialCode } from "@/lib/utils";
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
    const phase = searchParams.get("phase");
    const season = searchParams.get("season");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (phase) where.phase = phase;
    if (season) where.season = season;

    // Role-based filtering
    if (hasPermission(userRole, Permission.TRIAL_VIEW_ALL)) {
      // Admin and Data Team can see all trials
    } else if (hasPermission(userRole, Permission.TRIAL_VIEW_OWN)) {
      // Trial Owners, Station, Field, Lab, Inventory, HTE see only their assigned trials
      where.ownerId = userId;
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const trials = await prisma.trial.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        _count: { select: { tasks: true, submissions: true, farmers: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const total = await prisma.trial.count({ where });

    return NextResponse.json({ trials, total });
  } catch (error) {
    console.error("Trials GET error:", error);
    return NextResponse.json({ error: "Failed to fetch trials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as { role: string }).role as any;

    // Only Admin and Trial Owners can create trials
    if (!hasPermission(userRole, Permission.TRIAL_CREATE)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createTrialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const count = await prisma.trial.count({
      where: { season: parsed.data.season, year: parsed.data.year },
    });

    const code = generateTrialCode(parsed.data.season, parsed.data.year, count + 1);

    const trial = await prisma.trial.create({
      data: {
        code,
        name: parsed.data.name,
        description: parsed.data.description,
        objectives: parsed.data.objectives,
        hypotheses: parsed.data.hypotheses,
        kpis: parsed.data.kpis,
        variables: parsed.data.variables,
        cropType: parsed.data.cropType,
        season: parsed.data.season,
        year: parsed.data.year,
        phase: parsed.data.phase ?? "PHASE_0",
        plotSize: parsed.data.plotSize,
        sampleSize: parsed.data.sampleSize,
        experimentDesign: parsed.data.experimentDesign,
        locations: parsed.data.locations,
        treatments: parsed.data.treatments,
        startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
        endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
        ownerId: (session.user as { id: string }).id,
      },
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(trial, { status: 201 });
  } catch (error) {
    console.error("Trials POST error:", error);
    return NextResponse.json({ error: "Failed to create trial" }, { status: 500 });
  }
}
