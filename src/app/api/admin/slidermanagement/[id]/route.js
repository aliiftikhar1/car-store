import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){
    const id = params.id
    const data = await request.json();
    try {
        const updateslider = await prisma.Slider.update({
            data:{
                title:data.title,
                description:data.description,
                image:data.image,
                link:data.link,
                updatedAt: new Date()
            }
            ,
            where:{
                id
            }
        })

        if(updateslider){
            return NextResponse.json({
                message:"Slider updated successfully",
                status:200
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Slide update failed",
            status:500
        })
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
  
    try {
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Slide ID is required",
          status: 400,
        });
      }
  
      const deletedSlider = await prisma.Slider.delete({
        where: {
          id, 
        },
      });
  
      return NextResponse.json({
        message: "Slide deleted successfully",
        success: true,
        status: 200,
        data: deletedSlider, 
      });
    } catch (error) {

      return NextResponse.json({
        success: false,
        message: "Slide delete failed",
        status: 500,
        error: error.message, 
      });
    }
  }
  