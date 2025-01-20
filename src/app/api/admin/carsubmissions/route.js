import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const carsubmisions = await prisma.CarSubmission.findMany({
            include:{
                User: true,
                SubmissionImages: true,
                Brand:true,
            }
        })
        return NextResponse.json({success:true,data:carsubmisions})
        
    } catch (error) {
        return NextResponse.json({success:false,message:"Failed to fetched car submissions"})
    }
}