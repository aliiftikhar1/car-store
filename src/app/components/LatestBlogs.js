'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LatestBlogPage = () => {
  // State to hold blogs
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBlogs, setVisibleBlogs] = useState(8); // Number of blogs currently visible

  const router = useRouter();

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle loading state
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Show more blogs when the button is clicked
  const showMoreBlogs = () => {
    router.push(`/pages/blog`);
    // setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 8);
  };

  // Navigate to the blog detail page
  const handleReadMore = (id) => {
    router.push(`/pages/blog/${id}`); // Assuming the blog details page is under /blog/[id]
  };

  return (
    <div className="container mx-auto bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">All Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleReadMore(blog.id)}
          >
            <img
              src={`https://couponri.com/uploads/${blog.image}`}
              alt={blog.title}
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{blog.description}</p>
              <button
                onClick={() => handleReadMore(blog.id)}
                className="text-blue-500 hover:underline mt-4 block"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      {visibleBlogs < blogs.length && (
        <div className="text-center mt-8">
          <button
            onClick={showMoreBlogs}
            className="bg-[#06089B] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestBlogPage;
