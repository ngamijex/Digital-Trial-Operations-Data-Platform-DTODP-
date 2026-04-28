import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createFormSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const trialId = searchParams.get("trialId");

    const where: Record<string, unknown> = { isActive: true };
    if (trialId) where.trialId = trialId;

    const forms = await prisma.dataForm.findMany({
      where,
      include: {
        trial: { select: { id: true, code: true, name: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ forms });
  } catch (error) {
    console.error("Forms GET error:", error);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const form = await prisma.dataForm.create({
      data: {
        trialId: parsed.data.trialId,
        name: parsed.data.name,
        description: parsed.data.description,
        schema: parsed.data.schema,
      },
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error("Forms POST error:", error);
    return NextResponse.json({ error: "Failed to create form" }, { status: 500 });
  }
}
