// app/pages/inspire_me/page.js
'use client';
import { useState } from 'react';
import CustomerRootLayout from '@/app/user/layout';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function InspireMePage() {
  const [formData, setFormData] = useState({
    storeWebsite: '',
    offerType: '',
    code: '',
    description: '',
    startDate: '',
    expirationDate: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleOfferTypeChange = (offerType) => {
    setFormData({ ...formData, offerType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/submitoffer', formData);
      setShowPopup(true);
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('Failed to submit the offer.');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <CustomerRootLayout>
      {/* Full-Width Large Text */}
      {/* <div className="relative w-full h-[200px] flex items-center justify-center bg-blue-500 text-white">
        <h1 className="text-4xl font-bold">Submit Offer</h1>
      </div> */}

      {/* Form Section */}
      <div className="py-12 mt-4 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Submit a coupon and help millions save!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storeWebsite">
              Store Website
            </label>
            <input
              id="storeWebsite"
              type="text"
              placeholder="e.g., storewebsite.com"
              value={formData.storeWebsite}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="offerType">
              Select an Offer Type
            </label>
            <div className="flex justify-between">
              <button
                type="button"
                className={`p-3 border rounded-md flex-1 mr-2 ${
                  formData.offerType === 'Online Code' ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => handleOfferTypeChange('Online Code')}
              >
                Online Code
              </button>
              <button
                type="button"
                className={`p-3 border rounded-md flex-1 mr-2 ${
                  formData.offerType === 'In-Store Coupon' ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => handleOfferTypeChange('In-Store Coupon')}
              >
                In-Store Coupon
              </button>
              <button
                type="button"
                className={`p-3 border rounded-md flex-1 ${
                  formData.offerType === 'Online Sale' ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => handleOfferTypeChange('Online Sale')}
              >
                Online Sale
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              Code
            </label>
            <input
              id="code"
              type="text"
              placeholder="Code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Discount Description
            </label>
            <textarea
              id="description"
              placeholder="Tell us more about the offer"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date (optional)
            </label>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationDate">
              Expiration Date (optional)
            </label>
            <input
              id="expirationDate"
              type="date"
              value={formData.expirationDate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
            Submit Offer
          </button>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <XMarkIcon className="w-6 h-6 text-green-500 mr-4" />
            <div className="text-gray-700">
              <h3 className="text-lg font-semibold">Offer Submitted Successfully!</h3>
              <button
                onClick={handleClosePopup}
                className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerRootLayout>
  );
}
