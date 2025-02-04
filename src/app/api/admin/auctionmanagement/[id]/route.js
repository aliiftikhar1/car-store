import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = params.id
    try {
        const auction = await prisma.auction.findMany({
            where:{
                sellerId: parseInt(id)
            },
                include: {
                  CarSubmission: {
                    include: {
                      User: {
                        select: {
                          name: true,
                        },
                      },
                      Brand:true,
                    },
                  },
                },
                orderBy: {
                  createdAt: "desc",
                },
              })

              if(auction){
                return NextResponse.json({status:true, message:"Data fetched sucessfully", data:auction},{status:200})
              }
        
    } catch (error) {
        return NextResponse.json({success:false,message:"Failed to fetch auction"},{status:500})
    }
}