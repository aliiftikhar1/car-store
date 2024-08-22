'use client';

import React, { useEffect, useState } from 'react';

const FeaturedStores = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/company'); // Adjust this URL to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch companies data');
        }
        const companiesData = await response.json();
        setCompanies(companiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">{`Error: ${error}`}</div>;
  }

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">All Companies</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-24">
        {companies.map((company) => (
          <div key={company.id} className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img
              src={`https://couponri.com/uploads/${company.comp_logo}`} // Replace with the correct path to the images
              alt={company.com_title}
              className="w-full h-48 object-stretch"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{company.com_title}</h3>
              <p className="text-gray-600 mb-4">{company.comp_description || 'No description available.'}</p>
              <a
                href={`/pages/onecompany/${company.id}`} // Adjust this URL to your offers page
                className="inline-block px-4 py-2 bg-orange-400 text-white font-bold rounded-md hover:bg-orange-500 transition-colors duration-200"
              >
                View Offers
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedStores;
