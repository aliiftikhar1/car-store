'use client'
// components/SocialMediaMarketing.js
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function SocialMediaMarketing() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 space-y-12">

        {/* Section 1: What is Social Media Marketing */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What is Social Media Marketing?</h2>
            <p className="text-gray-600 mb-4">
              Using the power of social media as a springboard to boost your brand up a level makes it even more interesting. Reach the audience with your individuality, be seen, get engaged, and convert followers with our social media marketing adventures.
            </p>
            <p className="text-gray-600">
              Social Media Marketing - What is it? Well, social media today is not just a tool for business; it's a powerful marketing tool for every competitive company. It is their way of "connecting, shattering, and building" barriers.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src="/social1.png" alt="Social Media Marketing" className="object-cover w-full h-full rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Section 2: Why Social Media Marketing is Important for Business */}
        <div className="flex flex-col lg:flex-row bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 lg:w-2/3">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">Why Social Media Marketing is Important for Business</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Yes, social media marketing is very important for businesses to succeed online. Even though these strategies can be different, the aim is to make people more aware of your brand and bring in more money.
            </p>
            <p className="text-gray-300">
              When you use social media for digital marketing, you can show off your brand to possible customers right when they’re ready to buy. Plus, when you combine digital and social media marketing, you can make the most of every chance to connect with customers and get them to buy from you.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img src="/social2.png" alt="Social Media Marketing Laptop" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Section 3: Our Approach to Social Media Platforms */}
        <div className="flex flex-col lg:flex-row bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:w-1/3">
            <img src="/social3.png" alt="Social Media Icons" className="object-cover w-full h-full" />
          </div>
          <div className="p-8 lg:w-2/3">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">Our Approach to Social Media Platforms</h3>
            </div>
            <p className="text-gray-300 mb-4">
              In our place, we always keep our balance between creativity and proficiency when managing social media platforms. We are providing paid social media advertising services besides this B2B social media marketing services and build and train custom strategies for each platform to establish one we believe to be most effective.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Facebook Marketing services packages</li>
              <li>Twitter Promotion</li>
              <li>Instagram Marketing service</li>
              <li>LinkedIn Networking</li>
              <li>YouTube Advertising</li>
              <li>Pinterest Strategy</li>
              <li>And more.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
