import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(request){
    const data = await request.json()
    console.log("Payload is ",data)
    try {
        let password
        if(data.password){
         const hashedPassword = await bcrypt.hash(data.password, 10);
         password=hashedPassword
        }
        
        const user = await prisma.user.update({
            where:{
                id: data.id
            }
            ,data:{
                name:data.name || undefined,
                image:data.image || undefined,
                bio:data.bio || undefined,
                address:data.address || undefined,
                phoneNo:data.phoneNo || undefined,
                city:data.city || undefined,
                country:data.country || undefined,
                province:data.province || undefined,
                zipcode:data.zipcode || undefined,
                password: password || undefined,
                updatedAt: new Date()
            }
        })
        if(user){
            return NextResponse.json({status:true,user},{status:200})
        }else{
            return NextResponse.json({status:true,message:"user not exist"},{status:201})
        }
    } catch (error) {
        return NextResponse.json({status:false,message:"Failed to update user"},{status:500})
    }
}