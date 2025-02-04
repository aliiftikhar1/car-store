import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const data = await request.json()
    console.log("Payload is", data)

    // Validate required fields
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and password are required",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await prisma.User.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.User.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        type: "seller",
        status: "Active",
        verified: false,
        username: null,
        bio: null,
        address: null,
        city: null,
        country: null,
        province: null,
        zipcode: null,
        image: null,
        cardName: null,
        cardNumber: null,
        cardExpiry: null,
        cardCvc: null,
        phoneNo: '',
      },
    })

    // Remove the password from the response for security
    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    })
  } catch (e) {
    console.error("Error is", e)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
        error: e.message,
      },
      { status: 500 },
    )
  }
}

