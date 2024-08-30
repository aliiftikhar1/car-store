'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Importing the new icon

// CouponCard Component
const CouponCard = ({ company, topDiscount }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/pages/onecompany/${company.id}`);
  };

  return (
    <div
      className="border rounded-lg shadow-lg p-6 flex flex-col text-left bg-white"
    >
      <div className="mb-4 flex justify-center items-center">
        <img src={`https://couponri.com/uploads/${company.comp_logo}`} alt={company.com_title}  className="w-full h-48 object-stretch rounded" />
      </div>
      <div className="text-3xl font-extrabold text-black mb-2">
        {topDiscount !== 'Not Available' ? `${topDiscount}% OFF` : 'Not Available'}
      </div>
      <div className="text-lg font-semibold text-gray-800 mb-4">{company.com_title}</div>
      <div className="text-sm text-gray-600 mb-4">{company.comp_description}</div>
      <div className="flex items-center text-sm text-gray-700 font-semibold mb-4">
        <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" /> {/* Updated icon */}
        <span>verified coupon</span>
      </div>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-bold"
      >
        Coupon Code
      </button>
    </div>
  );
};

export default CouponCard;
