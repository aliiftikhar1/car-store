'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

const CouponHeader = ({ company }) => {
  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#07069F] mb-20 p-6 text-white justify-center flex items-center h-36 w-full">
      <div className="absolute left-64 h-36 w-36 flex justify-center items-center top-44 bg-white rounded-full ">
        <img
          src={`https://couponri.com/uploads/${company.comp_logo}`} // Use the company's logo
          alt={company.com_title}
          className="h-36 w-36 object-cover absolute rounded-full border-4 border-white"
        />
      </div>

      <div className="ml-6">
        <h1 className="text-3xl font-bold">{company.com_title} Coupon Codes</h1>
        <p className="text-lg flex items-center">
          {company.com_title} Coupon Codes for {new Date().getFullYear()} Verified & Tested
          <CheckCircleIcon className='h-6 pt-1'/>
        </p>
      </div>
    </div>
  );
};

export default CouponHeader;
