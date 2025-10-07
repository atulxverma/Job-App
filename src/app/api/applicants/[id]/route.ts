import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const job_id = params.id;

  try {
    const res = await prismaClient.applications.findMany({
      where: {
        job_id: job_id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      data: {
        message: "Something went wrong",
      },
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const res = await prismaClient.applications.delete({
      where: {
        id: Number(id), 
      },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
