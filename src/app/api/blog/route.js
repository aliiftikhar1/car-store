import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
// Create a new blog record
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, image, category } = data;

    // Validate required fields
    if (!title || !description || !image || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create a new blog record in the database
    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        image,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error('Error Creating Blog Record:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Fetch all blog records
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
