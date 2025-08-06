import prismaClient from "@/services/prisma"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req:NextRequest){
    const body=await req.json()

       const jobToadd={
        title:body.title,
        description:body.description,
        salary:body.salary,
        location:body.location,
        employement_type:body.employement_type,
        job_type:body.job_type,
    }

    try{
        const newJob=await prismaClient.openings.create({
            data:jobToadd
        })
    
    return NextResponse.json({
        success:true,
        data:newJob,
    })
}
 catch(err : any){
    console.log(err.message)
 }
}