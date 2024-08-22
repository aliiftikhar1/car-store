'use client';

import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative bg-purple-600 text-white max-h-screen flex items-center">
      <div className="container mx-auto py-12 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pl-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            We are working tirelessly to provide you the Best Deals
          </h1>
          <p className="mb-6">
            We have updated 52,945 offers from 16,007 stores and saved $18 per customer on average in the last 24 hours.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/herosection/12.png" // Replace with the path to your image
            alt="Shopping Deals"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
