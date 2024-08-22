import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const RightSide = ({ offers, company }) => {
  const offersArray = Array.isArray(offers) ? offers : [];

  if (offersArray.length === 0) {
    return <div>No offers set by this company.</div>;
  }

  return (
    <div className="w-full md:w-3/3 p-4">
      <h2 className="text-2xl font-bold mb-6">Verified Coupons</h2>
      <div className="space-y-4">
        {offersArray.map((offer, index) => (
          <OfferCard key={index} offer={offer} company={company} />
        ))}
      </div>
    </div>
  );
};

const OfferCard = ({ offer, company }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Extract discount percentage from the offer title
  const discountMatch = offer.offer_title.match(/(\d+)%/);
  const discountPercentage = discountMatch ? discountMatch[1] : 'N/A';

  const handleShowCode = () => {
    setShowPopup(true);
    setShowCode(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between border-b border-gray-200 relative">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-purple-600 text-2xl font-bold">{discountPercentage}%</span>
          <span className="text-gray-600 text-sm">OFF</span>
          <span className="bg-orange-400 text-white text-xs font-bold rounded px-2 py-1 mt-2">Code</span>
        </div>
        <div className="ml-6">
          <h3 className="text-xl font-semibold mb-1">{offer.offer_title}</h3>
          <p className="text-gray-600 mb-2">{offer.offer_description}</p>
          <p className="text-sm text-gray-500 flex items-center">
            <FaCheckCircle className="text-purple-600 mr-1" /> Verified coupon
          </p>
        </div>
      </div>
      <div className="relative">
        {!showCode && (
          <button
            onClick={handleShowCode}
            className="bg-purple-600 text-white w-40 h-10 text-sm font-semibold px-4 py-2 rounded hover:bg-purple-700 transition-transform duration-300"
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              zIndex: 10,
            }}
          >
            Show Offer Code
          </button>
        )}
        <button
          className="text-sm font-semibold px-4 py-2 rounded border-2 border-dotted border-purple-600 bg-white text-gray-800"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            zIndex: 5,
            opacity: showCode ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          {offer.offer_code}
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>
            <img
              src={`https://couponri.com/uploads/${company.comp_logo}`}
              alt={company.com_title}
              className="h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">{offer.offer_title}</h3>
            <p className="text-lg text-center font-bold mb-4">{offer.offer_code ? offer.offer_code : 'No coupon code needed'}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-4"
              onClick={() => window.open(offer.redeem_link, '_blank')}
            >
              {offer.offer_code ? 'Continue to this offer' : 'Redeem at ' + company.com_title}
            </button>
            <div className='bg-gray-100 p-4'>
              <p className='text-lg text-gray-700'>Offer Description:</p>
              <p className="text-sm text-gray-600 mb-2">{offer.offer_description}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Expiration Date: {offer.offer_expiry}</p>
            </div>
            <div className='relative mb-0 w-[450px] ml-[-33px] bg-[#2F3841] h-40 my-4'>
              <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white'>
                <p className="text-sm font-semibold mb-2">Get coupon alerts for Expedia and never miss another deal!</p>
                <label htmlFor="userInput" className="text-sm font-medium mb-1">Your Input:</label>
                <input
                  id="userInput"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 mb-2"
                  placeholder="Type something..."
                />
                <p className="text-xs">No spam, just savings. Read our Privacy Policy for more info.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSide;
