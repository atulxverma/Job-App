// //@ts-nocheck
// import { getUserFromCookies } from "@/lib/helper";
// import prismaClient from "@/services/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }) {
//   // const user = await getUserFromCookies()
//   // const body = await req.json();
//   const id = params.id;

//   try {
//     const job = await prismaClient.openings.findUnique({
//       where: {
//         id: id,
//       },
//       include: {
//         company: true,
//       },
//     });

//     if (job) {
//       return NextResponse.json({
//         success: true,
//         data: job,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "No job found",
//       });
//     }
//   } catch (err) {
//     console.log(err.message);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// }

// export async function DELETE(req: NextRequest, { params }) {
//   try {
//     const jobId = params.id;
//     const res = await prismaClient.openings.delete({
//       where: {
//         id: jobId,
//       },
//     });

//     return NextResponse.json({
//       success : true,
//       data : res
//     })
//   }

//   catch (err : any) {
//     console.log(err.message);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// }

// export async function POST(req : NextRequest , {params}) {
//   const jobId = params.id;

//   const body = await req.json();

//   try{
//     const res= await prismaClient.openings.update({
//       where: {
//         id : jobId
//       },
//       data : body
//     })
//   } catch (err : any) {
//     return NextResponse.json({

//     })
//   }
// }

// @ts-nocheck
import { getUserFromCookies } from "@/lib/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const id = params.id;
  const user = await getUserFromCookies();

  try {
    const job = await prismaClient.openings.findUnique({
      where: { id },
      include: { company: true },
    });

    if (job) {
      return NextResponse.json({
        success: true,
        data: job,
      });
    }

    if (!job) {
      return NextResponse.json(
        { success: false, message: "No job found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: job });
  } catch (err: any) {
    console.error("GET error:", err.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.openings.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete job" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest, { params }) {
//   const jobId = params.id;

//   try {
//     const body = await req.json();

//     const res = await prismaClient.openings.update({
//       where: { id: jobId },
//       data: body,
//     });

//     return NextResponse.json({ success: true, data: res });
//   } catch (err: any) {
//     console.error("POST (update) error:", err.message);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong", error: err.message },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedJob = await prisma.openings.update({
      where: { id },
      data: body,
    });
    return NextResponse.json({ success: true, data: updatedJob });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}
