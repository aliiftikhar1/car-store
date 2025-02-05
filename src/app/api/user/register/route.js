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
                type: 'customer',
                password: hashedPassword,
                address: data.address,
                status: 'active',
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
