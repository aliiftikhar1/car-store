import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET(request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        Category: true,
        Subcategory: true,
        ProductImages: true,
      },
    });
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Payload is", data);
    const {
      name,
      description,
      price,
      status,
      isfeatured,
      istoprated,
      istopselling,
      web_slug,
      meta_title,
      meta_description,
      meta_keywords,
      image,
      coverimage,
      isdiscounted,
      discount,
      category_id,
      subcategory_id,
      product_images,
    } = data;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        status,
        isfeatured: Boolean(isfeatured),
        istoprated: Boolean(istoprated),
        istopselling: Boolean(istopselling),
        web_slug,
        meta_title,
        meta_description,
        meta_keywords,
        isdiscounted,
        discount: parseInt(discount),
        category_id,
        subcategory_id,
      },
    });

    if (product_images && product_images.length > 0) {
      await prisma.productImages.createMany({
        data: product_images.map((img) => ({
          productid: product.id,
          image: img.url,
          type: img.type,
        })),
      });
    }

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}

