// app/pages/inspire_me/page.js

import IntroCallForm from '@/app/components/IntroCallForm';
import Image from 'next/image';
import CustomerRootLayout from '@/app/user/layout';

export default function InspireMePage() {
  return (
    <CustomerRootLayout>
      {/* Full-Width Image */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/herosection/contact-us-banner.jpg"
          alt="Inspiration Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-[300px]"
        />
      </div>

      {/* Form Section */}
      <div className="py-12 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Submit a coupon and help millions save!
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storeWebsite">
              Store Website
            </label>
            <input
              id="storeWebsite"
              type="text"
              placeholder="e.g., storewebsite.com"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="offerType">
              Select an Offer Type
            </label>
            <div className="flex justify-between">
              <button className="p-3 border rounded-md flex-1 mr-2">Online Code</button>
              <button className="p-3 border rounded-md flex-1 mr-2">In-Store Coupon</button>
              <button className="p-3 border rounded-md flex-1">Online Sale</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              Code
            </label>
            <input
              id="code"
              type="text"
              placeholder="Code"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Discount Description
            </label>
            <textarea
              id="description"
              placeholder="Tell us more about the offer"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date (optional)
            </label>
            <input
              id="startDate"
              type="text"
              placeholder="MM/DD/YYYY"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationDate">
              Expiration Date (optional)
            </label>
            <input
              id="expirationDate"
              type="text"
              placeholder="MM/DD/YYYY"
              className="w-full p-3 border rounded-md"
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
            Submit Offer
          </button>
        </form>
      </div>
    </CustomerRootLayout>
  );
}
