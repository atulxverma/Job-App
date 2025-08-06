import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest {params}) {
    const user = await getUserFromCookies();
    const job_id = params.id;

    if(!user){
        return NextResponse.json({
            success : false,
            message: "User not authenticated"
        })
    }
    
    const appToSave = {
        user_id : user?.id,
        job_id : job_id
    }

    try{
        const application = await prismaClient.applications.create({
            data : appToSave
        })
        return NextResponse.json({
            success : true,
            data : application
        })
    } catch (err : any){
        console.log(err.message)
        return NextResponse.json({
            success : true,
        data : {
            message : "Failed to create application"
        }
        })
        
    }

}