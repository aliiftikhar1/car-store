// pages/blog.js
'use client'
import { useState } from 'react';
import CustomerRootLayout from '@/app/user/layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {
  const [featuredPost, setFeaturedPost] = useState(blogPosts[0]); // Initial featured post

  const handleRelatedPostClick = (post) => {
    setFeaturedPost(post);
  };

  return (
    <CustomerRootLayout>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <h1 className='text-4xl font-bold text-center mb-8'>Blog Page</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FeaturedPost post={featuredPost} />
              <h2 className="text-2xl font-bold mt-12 mb-6">Shopping Guides & Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <BlogPostCard key={index} {...post} />
                ))}
              </div>
              <h2 className="text-2xl font-bold mt-12 mb-6">Clothing Fashion Style</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {clothingFashionStyle.map((post, index) => (
                  <ClothingFashionStyleCard key={index} {...post} />
                ))}
              </div>
              <h2 className="text-2xl font-bold mt-12 mb-6">Fashion Trends & News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fashionTrendsNews.map((post, index) => (
                  <FashionTrendsNewsCard key={index} {...post} />
                ))}
              </div>
              <NewTrendingDiscount />
            </div>
            <div>
              <Sidebar onRelatedPostClick={handleRelatedPostClick} />
            </div>
          </div>
          <BlogPosts />
        </main>

      </div>
    </CustomerRootLayout>
  );
}

function FeaturedPost({ post }) {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 gap-8 mb-20">
        <div className="relative">
          <Image 
            src={post.image} 
            alt={post.title} 
            width={800} 
            height={600} 
            className="rounded-lg"
          />
          <div className="absolute -bottom-16 left-10 group max-w-lg p-6 bg-white border-2 border-white hover:border-red-500">
            <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              {post.date}
            </div>
            <div className="mt-6">
              <p className="text-blue-600 font-bold text-sm mb-2">
                {post.category}
              </p>
              <h1 className="text-2xl font-bold text-black">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function BlogPostCard({ image, category, title }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={title} width={400} height={200} className="w-full object-cover" />
      <div className="p-4">
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{category}</span>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
      </div>
    </div>
  );
}

function ClothingFashionStyleCard({ image, category, title }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={title} width={400} height={200} className="w-full object-cover" />
      <div className="p-4">
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">{category}</span>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
      </div>
    </div>
  );
}

function FashionTrendsNewsCard({ image, category, title }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={title} width={400} height={200} className="w-full object-cover" />
      <div className="p-4">
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">{category}</span>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
      </div>
    </div>
  );
}

function NewTrendingDiscount() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">New Trending Discount</h2>
      <div className="flex flex-wrap gap-2">
        {['Browns Fashion', 'Bellroy', 'Bentley Trike', 'Blue Bungalow', 'BN3TH', 'Bohemian Traders', 'Bossman Brands', 'Boundary Supply', 'Boutiquefeel', 'BOXRAW', 'Brooklyn Bedding', 'Cole Haan', 'Belle & Bloom', 'Cosyfeet', 'IFCHIC', 'Kivari', 'NN07', 'Cariuma', 'Storets', 'Chic Me', 'The British Belt Company'].map((brand, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">{brand}</span>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ onRelatedPostClick }) {  // Make sure to destructure `onRelatedPostClick` from props
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {relatedPosts.map((post, index) => (
          <div key={index} className="flex items-start space-x-4 cursor-pointer" onClick={() => onRelatedPostClick(post)}>
            <Image 
              src={post.image} 
              alt={post.title} 
              width={120} 
              height={90} 
              className="rounded"
            />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{post.date}</span>
                <span className="text-blue-600 text-xs">{post.category}</span>
              </div>
              <h3 className="font-semibold">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Featured Coupons</h3>
        <ul className="space-y-4">
          {featuredCoupons.map((coupon, index) => (
            <li key={index} className="border rounded p-4">
              <Image src={coupon.image} alt={coupon.brand} width={100} height={50} className="mb-2" />
              <h4 className="font-semibold">{coupon.brand}</h4>
              <p className="text-sm text-gray-600">{coupon.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Archives</h3>
        <ul className="space-y-2">
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
            <li key={year} className="flex justify-between">
              <span>{year}</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{Math.floor(Math.random() * 100)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BlogPosts() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image 
              src={post.image} 
              alt={post.title} 
              width={400} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm text-blue-600">{post.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const clothingFashionStyle = [
  // ... (existing clothingFashionStyle array)
  {
    image: '/blog/12.jpg',
    category: 'WINTER FASHION • AFFORDABLE • STYLE TIPS',
    title: 'Winter Fashion on a Budget: Affordable Finds for the Season'
    },
    {
    image: '/blog/7.png',
    category: 'ONLINE SHOPPING • FASHION • LIFESTYLE',
    title: 'Why Online Shopping Makes You So Happy?'
    },
    {
    image: '/blog/8.png',
    category: 'PLUS SIZE • WINTER CLOTHING • BUDGET FRIENDLY',
    title: 'Budget-Friendly Guide: Finding the Best Plus-Size Winter Clothing'
    }
];

const fashionTrendsNews = [
  // ... (existing fashionTrendsNews array)
  {
    image: '/blog/9.jpg',
    category: 'CYBER MONDAY • FASHION DEALS • ONLINE SHOPPING',
    title: 'Best Cyber Monday Early Deals 2023'
    },
    {
    image: '/blog/10.jpg',
    category: 'THANKSGIVING • BUDGET FRIENDLY • FAMILY',
    title: 'How To Host Thanksgiving On A Budget?'
    },
    {
    image: '/blog/11.jpg',
    category: 'HOLIDAY SHOPPING • FASHION DEALS • DISCOUNTS',
    title: '15 Best Holiday Shopping Deals At ClothingRIC'
    },
];

const featuredCoupons = [
  // ... (existing featuredCoupons array)
  {
    image: '/blog/1.jpg',
    brand: 'FRN.com',
    description: '40% OFF FRN.com Discount Codes August'
    },
    {
    image: '/blog/2.jpg',
    brand: 'WANDRD',
    description: '10% OFF WANDRD Discount Codes'
    },
    {
    image: '/blog/3.jpg',
    brand: 'Lovard',
    description: '40% OFF Lovard Discount Codes August 2024'
    },
    {
    image: '/blog/4.jpg',
    brand: 'F5J Shoes',
    description: '10% OFF F5J Shoes Discount Codes'
    },
    {
    image: '/blog/5.jpg',
    brand: 'EQUSS',
    description: '50% OFF EQUSS Coupon Codes August 2024'
    },
];

const relatedPosts = [
  {
    image: "/blog/1.jpg",
    date: "Jun",
    category: "MARKETING COST - SAVE ON MARKETING - MARKETIN",
    title: "Cost-Saving Marketing Tactics for Maximum Impact"
  },
  {
    image: "/blog/2.jpg",
    date: "May",
    category: "BRAND LOYALTY - CUSTOMER LOYALTY - BRANDING",
    title: "Curating Strong Brand Loyalty: a Recipe for Success"
  },
  {
    image: "/blog/3.jpg",
    date: "Apr",
    category: "MOTHER'S DAY - GIFT IDEAS - AFFORDABLE GIFTS",
    title: "11 thoughtful budget-friendly Mother's Day Gift Ideas"
  },
  {
    image: "/blog/4.jpg",
    date: "Mar",
    category: "SAVE MONEY - CLOTHING - ACCESSERIES",
    title: "14 Practical Strategies to Save Money on Stylish Clothing"
  }
];

const blogPosts = [
  {
    image: "/blog/1.jpg",
    date: "August",
    category: "Fashion Trends",
    title: "10 Must-Have Pieces for Your Fall Wardrobe",
    excerpt: "As the leaves start to change, it's time to update your wardrobe. Discover the essential pieces that will keep you stylish and comfortable this fall season.",
    slug: "fall-wardrobe-essentials"
  },
  {
    image: "/blog/2.jpg",
    date: "August 10, 2024",
    category: "Sustainable Fashion",
    title: "The Rise of Eco-Friendly Fabrics in the Fashion Industry",
    excerpt: "Explore how sustainable materials are revolutionizing the fashion world and learn about the most promising eco-friendly fabrics to look out for.",
    slug: "eco-friendly-fabrics"
  },
  {
    image: "/blog/3.jpg",
    date: "August 5, 2024",
    category: "Style Tips",
    title: "How to Dress for Your Body Type: A Comprehensive Guide",
    excerpt: "Unlock the secrets to dressing for your unique body shape. Learn which styles, cuts, and silhouettes will flatter you best.",
    slug: "dress-for-your-body-type"
  },
  {
    image: "/blog/4.jpg",
    date: "July 30, 2024",
    category: "Fashion History",
    title: "The Evolution of Streetwear: From Subculture to High Fashion",
    excerpt: "Trace the journey of streetwear from its humble beginnings to its current status as a dominant force in the fashion industry.",
    slug: "streetwear-evolution"
  },
  {
    image: "/blog/5.jpg",
    date: "July 25, 2024",
    category: "Shopping Guide",
    title: "5 Online Thrift Stores You Need to Know About",
    excerpt: "Discover the best online destinations for second-hand fashion finds. Get ready to score unique pieces at unbeatable prices.",
    slug: "online-thrift-stores"
  },
  {
    image: "/blog/12.jpg",
    date: "July 20, 2024",
    category: "Celebrity Style",
    title: "Red Carpet Looks: Recreating Iconic Celebrity Outfits on a Budget",
    excerpt: "Learn how to capture the essence of your favorite celebrity looks without breaking the bank. We break down iconic outfits and offer affordable alternatives.",
    slug: "celebrity-style-budget"
  }
];