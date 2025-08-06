// import prismaClient from "@/services/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req : NextRequest) {
//     const sp = req.nextUrl.searchParams;
//     const q = sp.get('q');

//     if(!q) {
//         return NextResponse.json({
//             success : true,
//             suggestion : []
//         })
//     }

//     const sugg = await prismaClient.openings.findMany({
//         where :{
//             title : {
//                 contains : q,
//                 mode : "insensitive"
//             }
//         }
//     })
// }




import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const q = sp.get("q");

    if (!q) {
      return NextResponse.json({
        success: true,
        suggestions: [], 
      });
    }

    const sugg = await prismaClient.openings.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },

      select: {
        id: true,     
        title: true,
      },
      take: 5,
      
    });

    return NextResponse.json({
      success: true,
      suggestions: sugg,
    });
  } catch (err : any) {
    console.error("Suggestion API error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

