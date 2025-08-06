// //@ts-nocheck
// import createToken from "@/services/jwt";
// import prismaClient from "@/services/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req : NextRequest) {
//  const body = await req.json();
 
//   const user = await prismaClient.user.findUnique({
//     //@ts-ignore
//     where :{
//         email : body.email,
//     }
//   })
//   console.log(user)

//   const userTokenData = {
//     id : user.id
//   }
//   if(user?.password == body?.password) {

//   const token = createToken(userTokenData);

//     const res = NextResponse.json({
//         success : true,
//         user 
//     });
//     res.cookies.set('token' , token)
//     return res;
//   } 
//     return NextResponse.json({
//         success :  false
//     })
  
// }




// @ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
import createToken from "@/services/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = createToken({ id: user.id });

    const res = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


