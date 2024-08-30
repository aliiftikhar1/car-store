import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const categoryCoupon = await prisma.category_Coupon.findUnique({
      where: { id },
    });

    if (!categoryCoupon) {
      return NextResponse.json({ error: 'Category Coupon not found' }, { status: 404 });
    }
    console.log(categoryCoupon);
    return NextResponse.json(categoryCoupon);
  } catch (error) {
    console.error('Error fetching category coupon:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { name, offers } = data;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
    }

    // Join the offers array into a comma-separated string
    const offersString = offers.join(',');

    const updatedCategoryCoupon = await prisma.category_Coupon.update({
      where: { id },
      data: {
        name,
        offer: offersString,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updatedCategoryCoupon);
  } catch (error) {
    console.error('Error updating category coupon:', error);
    if (error.code === 'P2025') { // Prisma specific error when record not found
      return NextResponse.json({ error: 'Category Coupon not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const deletedCategoryCoupon = await prisma.category_Coupon.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting category coupon:', error);
    if (error.code === 'P2025') { // Prisma specific error when record not found
      return NextResponse.json({ error: 'Category Coupon not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
