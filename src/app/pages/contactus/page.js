// app/pages/inspire_me/page.js


import IntroCallForm from '@/app/components/IntroCallForm';
import Image from 'next/image';
import CustomerRootLayout from '@/app/user/layout';
// import Portfolio from '../../components/Portfolio';
// import Layout

export default function InspireMePage() {
  return (
    // <Layout>
    <CustomerRootLayout>
      {/* Full-Width Image */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/portfolio.png"
          alt="Inspiration Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-[300px]"
        />
      </div>

      {/* Portfolio Section */}
      <div className="py-12">
        <IntroCallForm/>
      </div>
      </CustomerRootLayout>
    // </Layout>
  );
}
