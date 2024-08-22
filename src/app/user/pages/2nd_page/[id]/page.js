'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RightSide from '@/app/user/components/RightSide';
import LeftSide from '@/app/user/components/LeftSide';
import CouponHeader from '@/app/user/components/CouponHeader';

const CompanyDetail = () => {
  const params = useParams();
  const [company, setCompany] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (params && params.id) {
        try {
          // Fetch company details
          const companyResponse = await fetch(`/api/company/${params.id}`);
          if (!companyResponse.ok) {
            throw new Error('Failed to fetch company data');
          }
          const companyData = await companyResponse.json();
          setCompany(companyData);
          console.log("companies are:",company);

          // Fetch offers related to this company
          const offersResponse = await fetch(`/api/offers/${params.id}`);
          if (!offersResponse.ok) {
            throw new Error('Failed to fetch offers data');
          }
          const offersData = await offersResponse.json();
          setOffers(offersData);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
        }
      } else {
        console.log('No ID available in params to fetch data');
        setError('No ID available in params to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">Error: {error}</div>;
  }

  if (!company) {
    return <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700">Company data not found or failed to load.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CouponHeader companyId={params.id} />
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4">
          <LeftSide company={company} />
        </div>
        <div className="w-full md:w-2/3 p-4">
          <RightSide offers={offers} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
