// //@ts-nocheck
// import { getUserFromCookies } from "@/lib/helper";
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
import prismaClient from "@/services/prisma";
import { getUserFromCookies } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const dbUser = await prismaClient.user.findUnique({
      where: { id: user.id },
      include: {
        company: true,
      },
    });

    return NextResponse.json({ success: true, data: { user: dbUser } });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

