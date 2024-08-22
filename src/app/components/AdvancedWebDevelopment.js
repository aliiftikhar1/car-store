// components/AdvancedWebDevelopment.js

import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default function AdvancedWebDevelopment() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-700 rounded-lg p-8 shadow-lg">
          <div className="md:w-1/2">
            <img
              src="/webservice2.png"
              alt="Web Development"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 text-white mt-8 md:mt-0 md:ml-8">
            <div className="flex items-center mb-4">
              <CodeBracketIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-xl font-bold">
                Take A Step High With Our Advanced Web Development Services
              </h3>
            </div>
            <p className="mb-4">
              Nowadays it is impossible to deny the fact that everyone lives in a fast-paced digital world and that a strong online presence is crucial. Our skilled team of web developers takes your website from an idea to reality by building sites on a custom scale that are not only aesthetically pleasing but also exceed performance requirements. Through user experience design, and creating compelling and easy-to-understand web pages, we help your business reach customers across the world.
            </p>
            <p className="mb-4">
              Whether you are talking about a landing page that is exciting to the core, an online store with the best of features, or a web app that is complex in terms of your requirements, we deliver the solutions that are tailored to your particular needs. Our mission is to provide you with the quality and innovation necessary to have your website stand out in the digital realm.
            </p>
            <ul className="list-disc list-inside">
              <li>User-centric design</li>
              <li>Seamless navigation</li>
              <li>Cross-platform functionality</li>
              <li>Enhanced user engagement</li>
              <li>Strategic SEO integration</li>
              <li>These successful online marketing tactics.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
