import React from 'react';
import { useRouter } from 'next/navigation';

const CompanyCard = ({ company }) => {
  const router = useRouter();

  const handleViewOffers = () => {
    router.push(`/user/pages/2nd_page/${company.id}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <img src={`https://couponri.com/uploads/${company.comp_logo}`} alt={company.com_title} className="w-full h-32 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-semibold text-black mb-2">{company.com_title}</h2>
      <p className="text-gray-600 mb-4">{company.comp_description}</p>
      <p className="text-gray-600 mb-4">{company.com_details}</p>
      <div className="text-gray-600 mb-4">
        <span className="block">Phone: {company.comp_phone}</span>
        <span className="block">Email: {company.comp_email}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-orange-400 font-medium">Rating: {company.comp_rating}</span>
        <a href={`${company.comp_website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Visit Website
        </a>
      </div>
      <button
        onClick={handleViewOffers}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        View Offers
      </button>
    </div>
  );
};

export default CompanyCard;
