'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category_coupon'); // Adjust the endpoint as needed
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container border-y-2 bg-white mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <a href={`/pages/categorycoupons/${category.id}`}>
          <div
            key={index}
            className="bg-white text-center py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-gray-900 font-semibold">{category.name}</p>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CouponCategories;
