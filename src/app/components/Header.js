'use client'
import { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'; // Updated import path for v2 icons

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b-2 text-white px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <img src="/logo/logo.jpg" alt="Logo" className="w-40" />
          </a>
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:flex text-lg space-x-8 text-black text-sm font-semibold">
        <a href="/pages/blog" className="hover:text-blue-700">
            Blog
          </a>
          
          <a href="/pages/categories" className="hover:text-blue-700">
            Categories
          </a>
          <a href="/pages/stores" className="hover:text-blue-700">
            Stores
          </a>
          
          <a href="/pages/alloffers" className="hover:text-blue-700">
            Coupons
          </a>
          <a href="/pages/contactus" className="hover:text-blue-700">
            Contact Us
          </a>
        </nav>

        {/* Search Icon */}
        <div className="flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-black cursor-pointer hover:text-blue-700" /> {/* Updated to use the v2 icon */}
          <span className="ml-2 cursor-pointer text-black hover:text-blue-700">Search</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none"
        >
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-teal-600 text-white p-4">
          <a href="/pages/blog" className="block py-2 hover:bg-teal-700">
            BLOG
          </a>
          <a href="/pages/categories" className="block py-2 hover:bg-teal-700">
            CATEGORIES
          </a>
          <a href="/pages/alloffers" className="block py-2 hover:bg-teal-700">
            COUPONS
          </a>
          <a href="/pages/contactus" className="block py-2 hover:bg-teal-700">
            CONTACT US
          </a>
        </nav>
      )}
    </header>
  );
}
