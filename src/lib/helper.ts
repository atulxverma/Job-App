//@ts-nocheck
import { cookies } from "next/headers";
import { Jwt } from "jsonwebtoken";
import prismaClient from "@/services/prisma";
import { verifyToken } from "@/services/jwt";
import { NextResponse } from "next/server";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) return null;
  const data = verifyToken(token);
  if (!data) return null;

  const user = await prismaClient.user.findUnique({
    where: {
      id: data.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) return null;

  return user;
}
function sendCustomResp(success: boolean, message: string) {
  return NextResponse.json({
    success,
    message,
  });
}

