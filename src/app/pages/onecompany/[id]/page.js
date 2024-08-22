'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RightSide from '@/app/user/components/RightSide';
import LeftSide from '@/app/user/components/LeftSide';
import CouponHeader from '@/app/user/components/CouponHeader';
import FaqComponent from '@/app/user/components/FaqComponent';

const CompanyDetail = () => {
  const params = useParams();
  const [company, setCompany] = useState(null);
  const [offers, setOffers] = useState([]);
  const [faqs, setFaqs] = useState([]);
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
          console.log("company: ",company);

          // Fetch offers related to this company
          const offersResponse = await fetch(`/api/gettingoffers/${params.id}`);
          if (!offersResponse.ok) {
            throw new Error('Failed to fetch offers data');
          }
          const offersData = await offersResponse.json();
          setOffers(offersData);

          // Fetch FAQs related to this company
          const faqsResponse = await fetch(`/api/gettingfaqs/${params.id}`);
          if (!faqsResponse.ok) {
            throw new Error('Failed to fetch FAQs data');
          }
          const faqsData = await faqsResponse.json();
          setFaqs(faqsData);

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
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">{`Error: ${error}`}</div>;
  }

  if (!company) {
    return <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700">Company data not found or failed to load.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <CouponHeader company={company} />
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <LeftSide company={company} />
        </div>
        <div className="w-full md:w-2/3 p-4 bg-white shadow-md rounded-lg">
          <RightSide offers={offers} company={company} />
        </div>
      </div>
      <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
        <FaqComponent faqs={faqs} />
      </div>
    </div>
  );
};

export default CompanyDetail;
