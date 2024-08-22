'use client'
import CustomerRootLayout from '@/app/user/layout';
import React, { useEffect, useState } from 'react';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchOffersAndCompanies = async () => {
      try {
        // Fetch offers
        const offersResponse = await fetch('/api/offers');
        if (!offersResponse.ok) {
          throw new Error('Failed to fetch offers data');
        }
        const offersData = await offersResponse.json();

        // Fetch companies
        const companiesResponse = await fetch('/api/company');
        if (!companiesResponse.ok) {
          throw new Error('Failed to fetch companies data');
        }
        const companiesData = await companiesResponse.json();

        // Map company data to offers
        const offersWithCompanyDetails = offersData.map((offer) => {
          const company = companiesData.find((comp) => comp.id === offer.comp_id);
          return {
            ...offer,
            company,
          };
        });

        setOffers(offersWithCompanyDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOffersAndCompanies();
  }, []);

  const handleShowPopup = (offer) => {
    setSelectedOffer(offer);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedOffer(null);
    setShowPopup(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">{`Error: ${error}`}</div>;
  }

  if (!offers.length) {
    return <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700">No offers available.</div>;
  }

  return (
    <CustomerRootLayout>
      <div className="min-h-screen bg-gray-200 p-6">
        <h1 className="text-4xl font-bold text-center text-black mb-8">Available Offers</h1>
        <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-20">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl p-2 shadow-lg overflow-hidden border border-gray-300 flex transition-transform duration-300 hover:scale-105 h-52">
              {/* Company Details */}
              {offer.company && (
                <div className="w-1/3 relative">
                  <img
                    src={`https://couponri.com/uploads/${offer.company.comp_logo}`}
                    alt={offer.company.com_title}
                    className="w-full h-full object-stretch rounded-l-xl"
                  />
                </div>
              )}
              {/* Offer Details */}
              <div className="p-4 text-left w-2/3 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-black mb-2">{offer.offer_title}</h3>
                <p className="text-gray-700 mb-3 text-sm">{offer.offer_description}</p>
                <div className="mb-3">
                  <span className="block text-orange-500 font-medium mb-1 text-sm">Discount Code: {offer.offer_code}</span>
                  {offer.offer_link1 && (
                    <a
                      href={offer.offer_link1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline text-sm"
                    >
                      Offer Link 1
                    </a>
                  )}
                  {offer.offer_link2 && (
                    <a
                      href={offer.offer_link2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline text-sm"
                    >
                      Offer Link 2
                    </a>
                  )}
                </div>
                <div className='flex justify-between items-center'>
                <span className="block text-gray-500 text-sm">Expiry: {new Date(offer.offer_expiry).toLocaleDateString()}</span>
                <button
                  onClick={() => handleShowPopup(offer)}
                  className="mt-3 bg-purple-600 text-white w-40 h-10 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Show Details
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popup for offer details */}
        {showPopup && selectedOffer && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl relative">
      <button
        onClick={handleClosePopup}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
      >
        &times;
      </button>
      <img
        src={`https://couponri.com/uploads/${selectedOffer.company.comp_logo}`}
        alt={selectedOffer.company.com_title}
        className="h-20 mx-auto mb-6"
      />
      <h3 className="text-2xl font-semibold mb-4 text-center">{selectedOffer.offer_title}</h3>
      <p className="text-lg text-center font-bold mb-6">{selectedOffer.offer_code ? selectedOffer.offer_code : 'No coupon code needed'}</p>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full mb-6"
        onClick={() => window.open(selectedOffer.redeem_link, '_blank')}
      >
        {selectedOffer.offer_code ? 'Continue to this offer' : 'Redeem at ' + selectedOffer.company.com_title}
      </button>
      <div className='bg-gray-100 p-6'>
        <p className='text-lg text-gray-700'>Offer Description:</p>
        <p className="text-sm text-gray-600 mb-4">{selectedOffer.offer_description}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Expiration Date: {selectedOffer.offer_expiry}</p>
      </div>
      <div className='relative w-full bg-[#2F3841] h-48 my-6'>  {/* Extended to full width */}
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white'>
          <p className="text-sm font-semibold mb-2">Get coupon alerts for Expedia and never miss another deal!</p>
          <label htmlFor="userInput" className="text-sm font-medium mb-1">Your Input:</label>
          <input
            id="userInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 mb-2 w-3/4"  
            placeholder="Type something..."
          />
          <p className="text-xs">No spam, just savings. Read our Privacy Policy for more info.</p>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </CustomerRootLayout>
  );
};

export default OffersPage;
