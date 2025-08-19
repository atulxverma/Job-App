import { getUserFromCookies } from "@/lib/helper";
import prismaClient from "@/services/prisma";
import { AwardIcon } from "lucide-react";
import { CommandSucceededEvent } from "mongodb";
import { NextResponse } from "next/server";

export async function  POST(req : NextResponse) {

    const user =  await getUserFromCookies();
    const body = await req.json();

    const dataToSave = {
        ...body,
        user_id : user.id
    }
    try {
        const review = await prismaClient.review.create({
            data : dataToSave
        })
        return NextResponse.json({
            success : true ,
            data : review
        })
    } catch(err : any) {
        return NextResponse.json({
            success : false,
            message :"Something went wrong"
        })
    }
}