'use client'

import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function VideoEditingServices() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 space-y-8">
        
        {/* First Card */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="p-8 md:w-2/3">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">Why Choose Our Video Editing Services?</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Elevate your brand strategy with professional video editing services. Including edited videos in your marketing materials can significantly enhance engagement and viewer retention. Video editing allows you to convey your message effectively and leave a memorable impact on your audience. Here is a list of our video editing services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Wedding video editing services</li>
              <li>YouTube video editing services</li>
              <li>Social media video editing</li>
              <li>Film editing services</li>
              <li>Post-production video editing</li>
              <li>Promotional video editing</li>
              <li>Educational videos</li>
              <li>Podcast videos</li>
              <li>Travel videos</li>
              <li>Testimonial videos</li>
              <li>And much more.</li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <img src="/viedo1.png" alt="Video Editing" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img src="/viedo2.png" alt="Video Editing" className="object-cover w-full h-full" />
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">What We Offer</h3>
            </div>
            <p className="text-gray-300 mb-4">
              At Div Enclave, we specialize in crafting polished and impactful videos tailored to your brand's unique style and message. Our team and video montage services combine creativity, technical expertise, and attention to detail to deliver videos that captivate audiences and drive results.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Reformatting of video</li>
              <li>Trimming of any video</li>
              <li>Culling of videos</li>
              <li>Color grading</li>
              <li>Logo animation</li>
              <li>Adding music and sound effects</li>
              <li>Adding the best motion graphics</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
