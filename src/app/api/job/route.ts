// /app/api/job/route.ts

import { getUserFromCookies } from "@/lib/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("API HIT: /api/job");

  const user = await getUserFromCookies();

  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const company = await prismaClient.company.findFirst({
    where: {
      ownerId: user.id,
    },
  });

  if (!company) {
    return NextResponse.json(
      { success: false, message: "Company not found" },
      { status: 404 }
    );
  }

  const body = await req.json();

  const jobToAdd = {
    title: body.title,
    description: body.description,
    salary: body.salary,
    location: body.location,
    employment_type: body.employment_type,
    job_type: body.job_type,
    company_id: company.id,
  };

  try {
    const newJob = await prismaClient.openings.create({
      data: jobToAdd,
    });

    return NextResponse.json({
      success: true,
      data: newJob,
    });
  } catch (err: any) {
    console.error("Failed to add job:", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to add job" },
      { status: 500 }
    );
  }
}
