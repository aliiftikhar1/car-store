// components/Header.js
'use client'
import { useState } from 'react';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow border-b border-gray-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href='/'>
          <img src="/logo/logo.jpg" alt="Logo" className=" w-40 pl-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="block lg:hidden text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          &#9776; {/* Hamburger icon */}
        </button>

        {/* Navigation */}
        <nav className={`flex-col lg:flex-row lg:flex items-center space-x-8 ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
          <a href="/pages/blog" className="text-gray-800 hover:text-gray-600">
            BLOG
          </a>
          <a href="/pages/categories" className="text-gray-800 hover:text-gray-600">
            CATEGORIES
          </a>
          <a href="/pages/alloffers" className="text-gray-800 hover:text-gray-600">
            COUPONS
          </a>
         
        </nav>
        <div className='flex space-x-4'>
        <a
            href="/pages/contactus"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-bold py-2 px-4 rounded-full"
          >
            CONTACT US
          </a>

        {/* Search Icon */}
        <button className="hidden lg:block ml-4 text-gray-800 hover:text-gray-600">
          &#x1F50D;
        </button>
        </div>
      </div>
    </header>
  );
}
