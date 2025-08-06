// //@ts-nocheck
// import { getUserFromCookies } from "@/helper";
// import prismaClient from "@/services/prisma";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req : NextRequest) {
//   // const userCookies = cookies();
//   // const email = userCookies.get('token')?.value

//   // if(!email){
//   //     return NextResponse.json({
//   //         success : false,
//   //         message : "The user is not authenticated"
//   //     })
//   // }

//   // const user = await prismaClient.user.findUnique({
//   //     where :{
//   //         email : email,
//   //     },
//   //     omit : {
//   //         password : true,
//   //     }
//   // })

//   const user = await getUserFromCookies();

//   if (!user) {
//     return NextResponse.json({
//       success: false,
//       message: "The user is not authenticated",
//     });
//   }
//   // const userId: user.id;

//   // const company = await prismaClient.company.findUnique({
//   //   where: {
//   //     ownerId: userId,
//   //   },
//   // });
//   const data = { user
//     // ...user,
//     // company
//   }
//   return NextResponse.json({
//     success: true,
//     data: data,
//   });
// }







// @ts-nocheck
import { getUserFromCookies } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookies();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

