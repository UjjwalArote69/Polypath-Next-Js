import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {email, name, password} = body;
        if (!email || !name || !password) {
            return new NextResponse("Missing required fields", {status: 400});
        }

        const existingUser = await prisma.user.findUnique({
            where:{email},
        });

        if (existingUser) {
            return new NextResponse("Email is already taken", {status: 400});
        };

        const hashedPassword = bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user);

    } catch (error) {
        console.error("REGISTRATION_ERROR", error);
        return new NextResponse("Internal Server Error", {status: 500})
        
    }
}