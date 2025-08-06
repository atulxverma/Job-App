//@ts-nocheck
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const q = searchParams.get("q") || "";
    const ms = parseInt(searchParams.get("ms") || 0);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;

    console.log("Incoming Query:", { q, ms, page });

    const filters: any = {
      salary: {
        gte: ms,
      },
    };

    if (q.trim() !== "") {
      filters.title = {
        contains: q,
        mode: "insensitive",
      };
    }

    console.log("Filters to be applied:", filters);

    const data = await prismaClient.openings.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            }
          },
          {
            company: {
              name: {
                contains: q,
                mode: "insensitive"
              }
            }

          }

        ]
      }
  });

    
    
      //   where: filters,
    //     take: limit,
    //     skip: (page - 1) * limit,
    //   });

    // console.log("Found jobs:", data.length);

    return NextResponse.json({ success: true, data });
  } catch (err : any) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
