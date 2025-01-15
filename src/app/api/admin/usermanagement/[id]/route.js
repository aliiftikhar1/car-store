import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request,{params}) {
    try {
        const { id } = await params;

        const deletedUser = await prisma.User.findUnique({
            where: { id: id },
        });

        return NextResponse.json({
            success: true,
            message: "User Fetched successfully",
            data: deletedUser,
        });
    } catch (e) {
        console.error("Error is", e);
        return NextResponse.json({
            success: false,
            message: "Failed to Fetch user",
            error: e.message,
        }, { status: 500 });
    }
}


export async function PUT(request,{params}) {
    try {
        const id = await params.id;
        const data = await request.json();
        console.log("Payload is : ",id,data);
        
        let hashedPassword = undefined;
        if (password) {
          hashedPassword = await bcrypt.hash(password, 10); 
        }

        const updatedUser = await prisma.Users.update({
            where: { id: id },
            data: {
                name: data.name,
                email: data.email,
                type: data.type,
                location: data.location,
                status: data.status,
                verified: data.verified==='on'?true:false,
                phoneNo: data.phoneNo,
                password: hashedPassword || undefined, },
        });

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (e) {
        console.error("Error is", e);
        return NextResponse.json({
            success: false,
            message: "Failed to update user",
            error: e.message,
        }, { status: 500 });
    }
}

export async function DELETE(request,{params}) {
    try {
        const { id } = await params;

        const deletedUser = await prisma.User.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (e) {
        console.error("Error is", e);
        return NextResponse.json({
            success: false,
            message: "Failed to delete user",
            error: e.message,
        }, { status: 500 });
    }
}
