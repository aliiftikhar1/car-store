// components/SeoCards.js

import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function SeoCards() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="space-y-8">
          {/* First Card */}
          <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="p-20 md:w-2/3">
              <div className="flex items-center mb-4">
                <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
                <h3 className="text-2xl font-semibold">Why Choose Our SEO Agency?</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Partner with an SEO agency that goes beyond traditional search engine optimization practices. SEO isn’t just about keywords anymore; it’s about understanding how search engines work and crafting content that meets users' needs. With the right SEO agency, it doesn’t have to be complicated.
              </p>
              <p className="text-gray-300">
                At Div Enclave, we’re like SEO hackers, always finding new ways to showcase our client’s content to the right audience. We take the time to understand your business, your goals, and most importantly, your customers' needs. With this knowledge, we craft an SEO strategy tailored to your business.
              </p>
            </div>
            <div className="md:w-1/3">
              <img src="/seo1.png" alt="SEO Strategy" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img src="/seo2.png" alt="SEO Services" className="object-cover w-full h-full" />
            </div>
            <div className="p-20 md:w-2/3">
              <div className="flex items-center mb-4">
                <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
                <h3 className="text-2xl font-semibold">Our SEO Services</h3>
              </div>
              <p className="text-gray-300 mb-4">
                If you’re looking for white-label link-building services, on-page SEO services, off-page SEO services, or customized strategies, we go the extra mile to make sure you’re getting the results you deserve—now and in the future. If you’ve been searching for an SEO agency near you, you’ve come to the right place. That’s where you’ll find Div Enclave.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>SEO Analytics: Viewing your current SEO status.</li>
                <li>Keywords Research: Finding the most effective keywords for your audience.</li>
                <li>Link Building: Creating superior backlinks to grow search ranking.</li>
                <li>SEO Monitoring: Monitoring the results and making changes as needed.</li>
                <li>Local SEO: Growth of local search visibility.</li>
                <li>SEO Audit: Choosing the design issues that affect a website’s search ranking.</li>
                <li>Industry-Specific SEO: Industry-specific SEO, for instance, crypto, fintech, and so forth.</li>
                <li>On-page SEO: Optimizing website content.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
