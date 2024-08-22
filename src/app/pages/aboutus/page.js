// app/pages/inspire_me/page.js

import AboutSection from '@/app/components/AboutSection';
import ImpressivePortfolio from '@/app/components/ImpressivePortfolio';
import Image from 'next/image';
import CustomerRootLayout from '@/app/user/layout';
// import Portfolio from '../../components/Portfolio';
// import Layout

export default function InspireMePage() {
  return (
    // <Layout>
    <CustomerRootLayout>
      {/* Full-Width Image */}
      <div className="relative w-full h-screen">
  <Image
    src="/herosection/2.jpg"
    alt="Inspiration Image"
    layout="fill"
    objectFit="cover"
    className="w-full h-[300px]"
  />
  <div className='absolute w-full h-full bg-black opacity-50'></div>
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-50">
    <span className="text-6xl font-bold">
      WE’re a Creative Agency
    </span>
    <p className="text-sm mt-4 text-center w-[700px]">
      Hi there, we’re the Div Enclave team. We’re glad you stopped by, and we hope you’re interested in getting to know us better.
    </p>
  </div>
</div>


      {/* Portfolio Section */}
      <div className="py-12">
        <AboutSection/>
        <ImpressivePortfolio/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
