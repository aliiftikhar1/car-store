import React from 'react';

const OffersTable = ({ offers, company }) => {
  if (offers.length === 0) {
    return (
      <div className="bg-white w-[1000px] mx-auto shadow-lg rounded-lg p-4 overflow-x-auto mt-10">
        <h2 className="text-4xl font-bold mb-6 text-center">Today's Top {company.com_title} Coupons</h2>
        <div className="text-center text-gray-600 text-lg">
          No offers available for this company.
        </div>
      </div>
    );
  }

  return (<>
    {(offers>0)&&(
    <div className="bg-white w-[1000px] mx-auto shadow-lg rounded-lg p-4 overflow-x-auto mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center">Today's Top {company.com_title} Coupons</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Discount</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Last Verified</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.offer_title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{offer.offer_description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(offer.updated_at).toLocaleDateString()}</td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
    
  )}
  </>
  );
};

export default OffersTable;
