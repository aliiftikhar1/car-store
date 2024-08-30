'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import RelatedBlogs from '@/app/components/RelatedBlogs';
import CustomerRootLayout from '@/app/user/layout';

const BlogDetailPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blog/${id}`); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch blog details');
          }
          const data = await response.json();
          setBlog(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center text-red-500">Blog not found</div>;
  }

  return (
    <CustomerRootLayout>
      <div className="container bg-white h-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className=' text-5xl mb-10'> <span className='text-5xl font-semibold'>Blog </span>| {blog.title}</h1>
        <div className="lg:flex lg:space-x-8">
          {/* Main blog content */}
          <div className="lg:w-3/4">
            <img
              src={`https://couponri.com/uploads/${blog.image}`}
              alt={blog.title}
              className="w-full h-[400px] object-cover "
            />
            {/* <h1 className="text-4xl font-bold text-gray-900 mt-6">{blog.title}</h1> */}
            <p className="text-sm text-gray-700 mt-4">{blog.description}</p>
            <div className="mt-8 text-gray-700">
              <p>{blog.content}</p> {/* Assuming the blog has a content field */}
            </div>
          </div>

          {/* Related blogs sidebar */}
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <RelatedBlogs category={blog.category} currentBlogId={blog.id} /> {/* Pass the blog's category and id */}
          </div>
        </div>
      </div>
    </CustomerRootLayout>
  );
};

export default BlogDetailPage;
