'use client';

import React, { useEffect, useState } from 'react';
import CustomerRootLayout from '@/app/user/layout';
import CompanyCard from './components/companycard';

const AllStores = () => {
  const [companies, setCompanies] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchCompaniesAndOffers = async () => {
      try {
        const [companiesResponse, offersResponse] = await Promise.all([
          fetch('/api/company'),
          fetch('/api/offers')
        ]);

        if (!companiesResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const companiesData = await companiesResponse.json();
        const offersData = await offersResponse.json();

        // Calculate top discounts
        const discounts = {};
        offersData.forEach(offer => {
          const discountMatch = offer.offer_title.match(/^(\d+)%/);
          if (discountMatch) {
            const discount = parseInt(discountMatch[1], 10);
            const companyId = offer.comp_id;
            if (!discounts[companyId] || discounts[companyId] < discount) {
              discounts[companyId] = discount;
            }
          }
        });

        const discountWithFallback = {};
        companiesData.forEach(company => {
          discountWithFallback[company.id] = discounts[company.id] || 'Not Available';
        });

        setTopDiscounts(discountWithFallback);
        setCompanies(companiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompaniesAndOffers();
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.com_title.localeCompare(b.com_title);
    } else if (sortOption === 'best-seller') {
      return (topDiscounts[b.id] || 0) - (topDiscounts[a.id] || 0);
    }
    return 0;
  });

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">{`Error: ${error}`}</div>;
  }

  if (!companies.length) {
    return <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700">No companies available.</div>;
  }

  return (
    <CustomerRootLayout>
      <div className="min-h-screen bg-white p-6">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Top Stores</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-700">Showing {companies.length} stores</div>
          <div className="relative inline-block text-left">
            <select
              onChange={handleSortChange}
              value={sortOption}
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Sort by Default</option>
              <option value="alphabetical">Sort Alphabetically (A-Z)</option>
              <option value="best-seller">Sort by Best Discount</option>
            </select>
          </div>
        </div>
        <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-20">
          {sortedCompanies.map((company) => (
            <div key={company.id} className="p-4">
              <CompanyCard company={company} topDiscount={topDiscounts[company.id]} />
            </div>
          ))}
        </div>
      </div>
    </CustomerRootLayout>
  );
};

export default AllStores;
