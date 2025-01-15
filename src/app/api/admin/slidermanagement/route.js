import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request){
    const data = await request.json();
    console.log("Payload",data)
    try {
        const slider = await prisma.Slider.create({
            data:{
                title:data.title,
                description:data.description,
                image:data.image,
                link:data.link,
            }
        })
        if(slider){
            return NextResponse.json({
                success:true,
                message:"Slide added succesfully",
                status:200
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"failed to add slide",
                status:500
            })
        }
        
    } catch (error) {
        return NextResponse.json({success:false,message:"Error while adding slide",status:500})
    }
}

export async function GET(){
    try {
        const slider = await prisma.Slider.findMany()

        if(slider){
            return NextResponse.json(slider);
        }else{
            return NextResponse.json({
                succes:false,
                message:"Slider fetch failed",
                status:500
            })
        }
        
    } catch (error) {
        return NextResponse.json({success:false,message:"Error while fetching slide",status:500})
    }
}