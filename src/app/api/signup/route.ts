import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import createToken from "@/services/jwt";
export async function POST(req : NextRequest) {

    const body = await req.json();

    const userToCreate={
        email : body.email,
        password : body.password
    }

    try {
        const user = await prismaClient.user.create({
            data : userToCreate
        })
        const userTokenData = {
            id : user.id
        }
        const token = createToken(userTokenData)
        const res= NextResponse.redirect("http://localhost:3000")
        res.cookies.set('token', token)
        return res;

        // return NextResponse.json({
        //     successs : true ,
        //     data : user
        // },{status :201})

    }catch (err : any) {
        return NextResponse.json({
            success : true
        }, { status : 500})
    }
}