'use client';

import React, { useState } from 'react';
import { QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FaqComponent = ({ faqs, companyName }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!Array.isArray(faqs) || faqs.length === 0) {
    return <div>No FAQs available at the moment.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6">FAQs for {companyName} Discount Codes</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div
              className="flex items-start justify-between space-x-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center space-x-4">
                <QuestionMarkCircleIcon className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold">{faq.question}</h3>
              </div>
              <div>
                {expandedIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                )}
              </div>
            </div>
            {expandedIndex === index && (
              <div className="mt-2 pl-10 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqComponent;
