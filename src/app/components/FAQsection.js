'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'; // Ensure Heroicons v2 is installed

const FAQSection = ({ imageSrc }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: 'How can Offers.com save me money when shopping online?', answer: 'Offers.com provides the best deals and promo codes available online.' },
    { question: 'Where can I find promo codes, coupon codes, and deals on Offers.com?', answer: 'Promo codes and deals are available directly on Offers.com, updated daily.' },
    { question: 'What other ways can Offers.com help me save at my favorite retailers and restaurants?', answer: 'You can find in-store deals, cashback offers, and more on Offers.com.' },
    { question: 'Can Offers.com save me money when I shop in-store?', answer: 'Yes, Offers.com offers exclusive in-store deals to help you save.' },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6 bg-white border-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-4">
            {faqs.map((faq, index) => (
              <li key={index} className="border-b pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  <h3 className="text-lg font-semibold">
                    {faq.question}
                  </h3>
                  <span>
                    {openIndex === index ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="mt-2 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Image */}
        <div className="flex items-center justify-center">
          <div className="bg-yellow-400">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <img
                  src="/illustration/2.jpg" // Replace with the correct path to your image
                  alt="Shopping Illustration"
                  className="w-full h-auto"
                />
              </div>

              {/* Right Column: Text Content */}
              <div className="w-full md:w-1/2 text-white text-center md:text-left p-4">
                <h1 className="text-4xl md:text-3xl font-bold mb-4">
                  Get Unlimited Coupons <span className="text-black">#CouponRI</span>
                </h1>
                <p className="text-lg md:text-lg mb-6">
                  Make Your Shopping Experience Marvelous with These Store's Coupons & Deals
                </p>
                <a href='/pages/alloffers'>
                <button className="bg-white text-lg text-purple-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
                  Get Coupons Code
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
