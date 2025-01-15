import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';


export async function POST(request) {
    try {
        const data = await request.json(); 
        console.log("Payload is", data);

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.User.create({
            data:{
                name: data.name,
                email: data.email,
                type: data.type,
                password: hashedPassword,
                location: data.location,
                status: data.status,
                verified: data.verified==='on'?true:false,
                phoneNo: data.phoneNo,
            },
        });

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            data: newUser,
        });
    } catch (e) {
        console.error("Error is", e);
        return NextResponse.json({
            success: false,
            message: "Failed to create user",
            error: e.message,
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = await prisma.User.findMany();
        return NextResponse.json({
            success: true,
            data,
        });
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch users",
            error: e.message,
        }, { status: 500 });
    }
}
