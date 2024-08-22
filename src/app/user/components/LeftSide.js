import React from 'react';
import {
  StarIcon,
  FireIcon,
  CheckCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const LeftSide = ({ company }) => {
  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-3/3 p-6 bg-white rounded-lg shadow-lg space-y-8">
      {/* Company Title and Rating Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{company?.com_title || 'SuperMade'}</h2>
        <div className="flex justify-center items-center my-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-6 w-6 ${i < (company?.comp_rating || 4) ? 'text-yellow-500' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-gray-600">{company?.comp_rating || 4.3} Rating ({company?.comp_reviews || 10})</span>
          </div>
        </div>
        <p className="text-gray-500">{company?.comp_description || 'SuperMade discount codes for 40% OFF are issued by this store for Limited Time. You can use these Coupon codes to get up to 70% discount in August 2024.'}</p>
      </div>

      {/* Discount Code Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{company?.com_title || 'SuperMade'} Discount Code Summary</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <FireIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span>Total Offers: {company?.total_offers || 30}</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span>Verified: {company?.verified_offers || 7}</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span>Best Discount: {company?.best_discount || 15}% code</span>
          </li>
          <li className="flex items-center">
            <TruckIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span>Free Shipping: {company?.free_shipping || 1}</span>
          </li>
        </ul>
        <p className="text-purple-600 mt-4 underline cursor-pointer">Coupon Codes &gt; {company?.com_title || 'SuperMade'} Discount Code</p>
      </div>

      {/* Categories */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{company?.com_title || 'SuperMade'} Categories</h3>
        <ul className="space-y-2 text-gray-600">
          {company?.categories?.length > 0 ? (
            company.categories.map((category, index) => <li key={index}>{category}</li>)
          ) : (
            <>
              <li>Apparel Discount</li>
              <li>Clothes Coupons</li>
              <li>Women's Clothing Coupons</li>
              <li>Men's Clothing Coupons</li>
              <li>Women's Accessories Coupons</li>
            </>
          )}
        </ul>
      </div>

      {/* Similar Promo Codes */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Stores with {company?.com_title || 'SuperMade'}-Like Promo Codes</h3>
        <ul className="space-y-2 text-gray-600">
          {company?.similarStores?.length > 0 ? (
            company.similarStores.map((store, index) => <li key={index}>{store}</li>)
          ) : (
            <>
              <li>Doggy Dan The Online Dog Train Promo Code</li>
              <li>Lightning Labels Coupon Code</li>
              <li>BuyeLiquid.com Coupon Code</li>
              <li>Types By Tara Discount Code</li>
              <li>Roselypink Discount Code</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
