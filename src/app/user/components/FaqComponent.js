'use client';

import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const FaqComponent = ({ faqs, companyName }) => {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return <div>No FAQs available at the moment.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6">FAQs for {companyName} Discount Codes</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="flex items-start space-x-4">
            <QuestionMarkCircleIcon className="h-6 w-6 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold mb-1">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FaqComponent;