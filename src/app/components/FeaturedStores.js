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
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8">
        {companies.map((company) => (
          <a href={`/pages/onecompany/${company.id}`}>
          <div key={company.id} className="bg-white border border-gray-200 shadow-sm p-4 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img
              src={`https://couponri.com/uploads/${company.comp_logo}`} // Replace with the correct path to the images
              alt={company.com_title}
              className="w-full h-40 sm:h-48 object-cover"
            />
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedStores;
