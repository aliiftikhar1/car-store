import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      com_title, 
      comp_logo, 
      comp_category, 
      comp_description, 
      comp_phone, 
      comp_email, 
      comp_website, 
      comp_rating, 
      com_details 
    } = data;

    // Assuming comp_logo is the URL of the uploaded image from your external API
    const newCompany = await prisma.company.create({
      data: {
        com_title,
        comp_logo,
        comp_category: parseInt(comp_category, 10), // Ensure category is an integer
        comp_description,
        comp_phone,
        comp_email,
        comp_website,
        comp_rating,
        com_details,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(newCompany);
  } catch (error) {
    console.error("Error Creating Company Record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const companies = await prisma.company.findMany({
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error Fetching Companies:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
