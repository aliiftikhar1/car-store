import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function ContentWritingService() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          {/* Text Section */}
          <div className="p-20 md:w-2/3">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">Our SEO content-writing services are finally here! Why choose us?</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Improve reach and interaction levels for your brand with our B2B content writing services. As planned content writing can increase the attention of the audience and make them interested, content must be well-composed in the marketing materials.
            </p>
            <p className="text-gray-300 mb-4">
              Our content writing services SEO are useful for you to get through the information with more depth but try to connect with the intended group.
            </p>
            <h4 className="text-xl font-semibold mb-2">Benefits of Content Writing</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Improve brand strength presence online.</li>
              <li>The ability to serve vivid stories and decrease message obscurity should be improved. Joint efforts of all the people should be directed at this task.</li>
              <li>Capture the audience's interest and keep it throughout the performance.</li>
              <li>Acquire branding of your product by displaying your competency and authoritativeness.</li>
              <li>Set yourself apart in a growingly cutthroat world of digital advertising.</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="md:w-1/3">
            <img
              src="/content1.png" // Replace with the actual image path
              alt="Content Writing"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
