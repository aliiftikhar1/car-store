'use client';

import React from 'react';

const SubscribeSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 h-80 items-center  flex py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Subscribe For More Info And Updates About Coupons
        </h2>
        <div className="w-full md:w-2/3 lg:w-1/2 flex items-center">
          <div className="flex-1">
            <input
              type="email"
              placeholder="Your email here"
              className="w-full p-3 rounded-l-full text-gray-700"
            />
          </div>
          <button className="bg-blue-800 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 transition duration-300">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
