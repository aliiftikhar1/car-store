'use client';

import React, { useEffect, useState } from 'react';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category'); // Adjust this URL to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch categories data');
        }
        const categoriesData = await response.json();
        
        // Filter categories to include only those with status "Top"
        const topCategories = categoriesData.filter(category => category.category_status === 'Top');
        
        setCategories(topCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">{`Error: ${error}`}</div>;
  }

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <a href={`/pages/onecategory/${category.id}`}>
          <div key={category.id} className="bg-white border border-gray-200 shadow-sm p-4 overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img
              src={`https://couponri.com/uploads/${category.category_image}`} // Replace with the correct path to the images
              alt={category.cat_title}
              className="w-full h-40 sm:h-48 object-cover rounded-lg"
            />
            <h3 className="text-center text-lg sm:text-xl font-semibold mt-4">{category.category_name}</h3>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
