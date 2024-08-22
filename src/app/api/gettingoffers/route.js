// import { NextResponse } from 'next/server';
// import prisma from '@/app/lib/prisma'; // Adjust the path according to your project structure

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const companyId = parseInt(searchParams.get('companyId'));

//     if (isNaN(companyId)) {
//       return NextResponse.json({ error: 'Invalid companyId provided' }, { status: 400 });
//     }

//     const offers = await prisma.Offers.findMany({
//       where: {
//         comp_id: companyId,
//       },
//     });

//     if (offers.length === 0) {
//       return NextResponse.json({ message: 'No offers found for this company' });
//     }

//     return NextResponse.json(offers);
//   } catch (error) {
//     console.log('Error fetching offers:', error);
//     return NextResponse.error(new Error('Internal Server Error'), { status: 500 });
//   }
// }
