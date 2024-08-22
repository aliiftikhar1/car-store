'use client';

import React, { useEffect, useState } from 'react';
import CouponCard from './Couponcards';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to toggle showing all offers

  useEffect(() => {
    const fetchCompaniesAndOffers = async () => {
      try {
        const [companyResponse, offersResponse] = await Promise.all([
          fetch('/api/company'),
          fetch('/api/offers')
        ]);

        if (!companyResponse.ok || !offersResponse.ok) {
          throw new Error('Failed to fetch companies or offers');
        }

        const companyData = await companyResponse.json();
        const offersData = await offersResponse.json();

        setCompanies(companyData);

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
        companyData.forEach(company => {
          discountWithFallback[company.id] = discounts[company.id] || 'Not Available';
        });

        setTopDiscounts(discountWithFallback);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesAndOffers();
  }, []);

  const handleShowAll = () => {
    setShowAll(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Determine the companies to display
  const displayedCompanies = showAll ? companies : companies.slice(0, 5);

  return (
    <div className="bg-white">
      <div className="py-4 text-center text-3xl font-bold">
        <h1>All Offers</h1>
      </div>
      <div className="px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCompanies.map((company) => (
            <CouponCard
              key={company.id}
              company={company}
              topDiscount={topDiscounts[company.id]}
            />
          ))}
        </div>
        {!showAll && companies.length > 5 && (
          <div className="text-center mt-6">
            <button
              onClick={handleShowAll}
              className="text-2xl font-bold px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
