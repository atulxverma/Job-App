import { getUserFromCookies } from "@/lib/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const user = await getUserFromCookies();
    const job_id = params.id;

    if (!user) {
        return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
    }

    try {
        const application = await prismaClient.applications.create({
            data: { user_id: user.id, job_id }
        });

        return NextResponse.json({ success: true, data: application }, { status: 201 });
    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({ success: false, message: "Failed to create application" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const user = await getUserFromCookies();
    const job_id = params.id;

    if (!user) {
        return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
    }

    try {
        await prismaClient.applications.deleteMany({
            where: { user_id: user.id, job_id }
        });

        return NextResponse.json({ success: true, message: "Application deleted successfully" });
    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({ success: false, message: "Failed to delete application" }, { status: 500 });
    }
}
