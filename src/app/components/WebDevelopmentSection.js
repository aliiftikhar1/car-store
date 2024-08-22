// components/WebDevelopmentSection.js

import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default function WebDevelopmentSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <h2 className="text-center text-xl font-bold text-gray-800 mb-4">
          Acquire state-of-the-art designs with a proven web development company
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Your website provides a window into your brand, and ideally, you want to put your best foot forward. You need a memorable and highly responsive site with intuitive navigation. Ultimately, you want your consumers to have a seamless browsing experience that engages them long enough to discover your unique offering.
        </p>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-700 rounded-lg p-8 shadow-lg">
          <div className="md:w-2/3 text-white">
            <div className="flex items-center mb-4">
              <CodeBracketIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-xl font-bold">Why Your Business Needs Web Development</h3>
            </div>
            <p className="mb-4">
              Wondering why you should care about having a responsive or custom website design for your business? Well, it's simple. Whether you're just starting or you're already established, having a website that looks good and works well on all devices is crucial.
            </p>
            <p className="mb-4">
              Think about it: there are billions of people using smartphones and PCs worldwide, and many of them spend hours each day on their devices. If your website isn’t optimized for users, you could be missing out on a lot of potential customers.
            </p>
            <p className="mb-4">
              Web Development ensures that you adapt and look great no matter what device your visitors are using. This means better user experience, more visitors staying on your site, and ultimately, more opportunities for conversion and sales.
            </p>
            <p>
              So, don’t hesitate. Invest in Web development to future-proof your website, increase your website traffic, and stay ahead of the competition in today’s digital world.
            </p>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0">
            <img
              src="/webservice1.png"
              alt="Web Development"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
