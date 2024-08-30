'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogSlider2 = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter(); // Initialize the router
  const blogsToShow = 2; // Number of blogs to show at a time

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogs.length - blogsToShow : prevIndex - blogsToShow
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= blogs.length - blogsToShow ? 0 : prevIndex + blogsToShow
    );
  };

  const handleBlogClick = (blog) => {
    router.push(`/pages/blog/${blog.id}`); // Navigate to the blog details page
  };

  return (
    <div className="bg-white">
      <h1 className="text-4xl font-bold text-black text-center py-4">Blogs</h1>
      <div className="relative flex items-center justify-between w-full bg-white p-6 rounded-lg shadow-md">
        {/* <div className="flex absolute z-50 w-full h-full justify-between mb-4 px-4"> */}
          <button
            onClick={handlePrevious}
            className="text-white p-2 absolute z-50 bg-yellow-400 left-10 rounded-full hover:scale-110 transition duration-300"
            >
              <span className='text-white font-bold hover:scale-110'>&#10094;</span>
          </button>
          <button
            onClick={handleNext}
            className="text-white p-2 absolute z-50 bg-yellow-400 right-10 rounded-full hover:scale-110 transition duration-300"
        >
          <span className='text-white font-bold hover:scale-110'>&#10095;</span>
          </button>
        {/* </div> */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="w-1/2 flex-shrink-0 px-2 cursor-pointer"
                style={{ flexBasis: '50%' }}
                onClick={() => handleBlogClick(blog)} // Handle blog click
              >
                <div className="relative group">
                  <img
                    src={`https://couponri.com/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold text-white mb-2">{blog.title}</h3>
                    <p className="text-sm text-white">{blog.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSlider2;
