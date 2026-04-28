import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { dataSubmissionSchema } from "@/lib/validations";
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
    const trialId = searchParams.get("trialId");
    const formId = searchParams.get("formId");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (trialId) where.trialId = trialId;
    if (formId) where.formId = formId;
    if (status) where.status = status;

    // Role-based filtering
    if (hasPermission(userRole, Permission.DATA_VIEW_ALL)) {
      // Admin and Data Team can see all submissions
    } else if (hasPermission(userRole, Permission.DATA_VIEW_OWN)) {
      // Station, Field, Lab, Trial Owners see only their own submissions
      where.submitterId = userId;
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const submissions = await prisma.dataSubmission.findMany({
      where,
      include: {
        form: { select: { id: true, name: true } },
        trial: { select: { id: true, code: true, name: true, ownerId: true } },
        submitter: { select: { id: true, name: true } },
        _count: { select: { validationLogs: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter trials based on role
    const filteredSubmissions = submissions.filter(submission => {
      if (hasPermission(userRole, Permission.TRIAL_VIEW_ALL)) return true;
      if (hasPermission(userRole, Permission.TRIAL_VIEW_OWN)) {
        return submission.trial?.ownerId === userId;
      }
      return false;
    });

    return NextResponse.json({ submissions: filteredSubmissions });
  } catch (error) {
    console.error("Submissions GET error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
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

    // Only users with DATA_SUBMIT permission can create submissions
    if (!hasPermission(userRole, Permission.DATA_SUBMIT)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = dataSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Check if user has access to the trial
    const trial = await prisma.trial.findUnique({ where: { id: parsed.data.trialId } });
    if (!trial) {
      return NextResponse.json({ error: "Trial not found" }, { status: 404 });
    }

    if (!hasPermission(userRole, Permission.TRIAL_VIEW_ALL) && trial.ownerId !== userId) {
      return NextResponse.json({ error: "Forbidden - cannot submit data for trial you don't have access to" }, { status: 403 });
    }

    const submission = await prisma.dataSubmission.create({
      data: {
        formId: parsed.data.formId,
        trialId: parsed.data.trialId,
        submitterId: userId,
        data: parsed.data.data as import("@prisma/client").Prisma.InputJsonValue,
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Submissions POST error:", error);
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
  }
}
