import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          {/* Logo and Description */}
          <div className="md:w-1/4">
            <img src="/logo/logo.jpg" alt="ClothingRic" className="mb-4 h-20" />
            <p className="text-gray-600">
              ClothingRic.com brings joys of continuous discounts from one of the most desirable brands on the web. Our discount listings are truly an opportunity for fashionable clients who believe in controlling their budgets and looking fabulous.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons using React Icons */}
              <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-black">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-black">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-black">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-3/4">
            {/* About ClothingRic */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">About ClothingRic</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Free Shipping
                  </a>
                </li>
              </ul>
            </div>

            {/* Special Discounts */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Special Discounts</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Verified Coupon Codes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Top Selected Stores
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Coupons in Statistics
                  </a>
                </li>
              </ul>
            </div>

            {/* Browse Coupons */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Browse Coupons</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Clothing & Accessories Coupon Codes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Health & Beauty Discount Codes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Home & Living Promo Codes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Computer & Software Coupons
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
