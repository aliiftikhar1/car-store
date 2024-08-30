'use client';

import React, { useEffect, useState } from 'react';
import {
  StarIcon,
  FireIcon,
  CheckCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const LeftSide = ({ company }) => {
  const [similarStores, setSimilarStores] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarStoresAndOffers = async () => {
      try {
        const [companiesResponse, offersResponse] = await Promise.all([
          fetch('/api/company'),
          fetch('/api/offers')
        ]);

        if (!companiesResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const companiesData = await companiesResponse.json();
        const offersData = await offersResponse.json();

        // Calculate top discounts
        const discounts = {};
        offersData.forEach(offer => {
          const discountMatch = offer.offer_title.match(/^(\d+)%/);
          if (discountMatch) {
            const discount = parseInt(discountMatch[1], 10);
            const companyId = offer.comp_id;
            if (!discounts[companyId] || discounts[companyId] < discount) {
              discounts[companyId] = discount;
            }
          }
        });

        // Filter similar stores based on the same category
        const matchedStores = companiesData.filter((comp) =>
          comp.id !== company.id && comp.comp_category === company.comp_category
        );

        const discountWithFallback = {};
        matchedStores.forEach(store => {
          discountWithFallback[store.id] = discounts[store.id] || 'Not Available';
        });

        setTopDiscounts(discountWithFallback);
        setSimilarStores(matchedStores);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (company) {
      fetchSimilarStoresAndOffers();
    }
  }, [company]);

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
              <StarIcon
                key={i}
                className={`h-6 w-6 ${i < (company?.comp_rating || 4) ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {company?.comp_rating || 4.3} Rating ({company?.comp_reviews || 10})
            </span>
          </div>
        </div>
        <p className="text-gray-500">
          {company?.comp_description ||
            'SuperMade discount codes for 40% OFF are issued by this store for Limited Time. You can use these Coupon codes to get up to 70% discount in August 2024.'}
        </p>
      </div>

      {/* Discount Code Summary */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{company?.com_title || 'SuperMade'} Discount Code Summary</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <FireIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span>Total Offers: {company?.total_offers || 30}</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span>Verified: {company?.verified_offers || 7}</span>
          </li>
          <li className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span>Best Discount: {company?.best_discount || 15}% code</span>
          </li>
          <li className="flex items-center">
            <TruckIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span>Free Shipping: {company?.free_shipping || 1}</span>
          </li>
        </ul>
        <p className="text-blue-600 mt-4 underline cursor-pointer">
          Coupon Codes &gt; {company?.com_title || 'SuperMade'} Discount Code
        </p>
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
        {loading ? (
          <div>Loading similar stores...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : !similarStores.length ? (
          <div>No similar stores found.</div>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {similarStores.map((store) => (
              <li key={store.id}>
                {store.com_title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Other Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <div
          dangerouslySetInnerHTML={{
            __html: company?.comp_other_details || 'No additional details available for this company.',
          }}
        />
      </div>
    </div>
  );
};

export default LeftSide;
