
// import { getUserFromCookies } from "@/lib/helper";
// import prismaClient from "@/services/prisma";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // const userCookies = await cookies();
//   // const email = userCookies.get("token")?.value;
//   // if(!email){
//   //     return NextResponse.json({
//   //         success : false,
//   //         message : "Unauthorized"
//   //     })
//   // }
//   // const user = await prismaClient.user.findUnique({
//   //     where : {
//   //         email : email
//   //     }
//   // })

//   // const cookies = req.cookies.get('token')?.value;
//   // console.log(cookies);
//   // return NextResponse.json({
//   //     success : true
//   // })

//   // const id = params.id;

//   // const user = await getUserFromCookies();
//   // if (user?.company?.id == id) {
//   //   const res = await prismaClient.company.delete({
//   //     where: {
//   //       id,
//   //     },
//   //   });
//   //   return NextResponse.json({
//   //     success: true,
//   //     message: "Deleted successfully",
//   //   });
//   // }

//   // return NextResponse.json({
//   //   success: false,
//   //   message: "Unauthorized",
//   // });

//   const user = await getUserFromCookies();
//   console.log("User from cookie:", user);
//   if (!user) {
//     return NextResponse.json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }
//   const body = await req.json();
//   console.log("Body received:", body);
//   const company = {
//     name: body.name,
//     description: body.description,
//     ownerId : user.id,
//   };

//   try {
//     const newComp = await prismaClient.company.create({
//       data: company,
//     });
//     return NextResponse.json({
//       success: true,
//       data: newComp,
//     });
//   } catch (err: any) {
//     console.log(err.message);
//     return NextResponse.json({
//       success: false,
//     });
//   }
// }







// @ts-nocheck
import prismaClient from "@/services/prisma";
import { getUserFromCookies } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description } = body.data;

    const company = await prismaClient.company.create({
      data: {
        name,
        description,
        owner: { connect: { id: user.id } },
      },
    });

    return NextResponse.json({ success: true, data: company });
  } catch (error) {
    console.error("Company create error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


