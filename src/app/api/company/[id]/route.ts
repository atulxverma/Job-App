//@ts-nocheck
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(req : {params}) {
    const id = params.id;

    // const company = await prismaClient.company.findUnique({
    //     where :{
    //         id :id
    //     },
    //     include : {
    //         owner : true
    //     }
    // })

    const owner = await prismaClient.user.findUnique({
        where : {
        id : company?.ownerId
    }
    })

    return NextResponse.json({
        success : true ,
        data :{ company,
            // company, 
            owner
        }
    })
    
}

export async function POST(req : {params}) {
 const id = params.id;
 const user = await getUserFromCookies();
 
 const company = await prismaClient.company.findUnique({
    where :{
        id
    }
 })
 if(company?.ownerId == user?.id){
    const res = await prismaClient.company.delete({
        where:{
            id
        }
    })

    return NextResponse.json({
        success : true,
        message : "Deleted"
    })
 }
}