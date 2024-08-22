// components/CustomVisuals.js
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function CustomVisuals() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="p-20 md:w-2/3">
            <div className="flex items-center mb-4">
              <PencilSquareIcon className="h-8 w-8 text-white mr-4" />
              <h3 className="text-2xl font-semibold">Enhance Your Business with Custom Visuals</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Boost your marketing capabilities with compelling and informative visual materials such as brochures and infographics that are specifically tailored to empower your business.
            </p>
            <p className="text-gray-300 mb-4">
              Here’s how the process of forming our partnership unfolds, from our initial discussions to the post-launch testing phase:
            </p>
            <p className="text-gray-300 font-semibold mb-2">Next, "we’ll get our hands dirty":</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>We’re attentive listeners! We won’t proceed until we’ve heard how you envision your brand.</li>
              <li>We’ll understand your target audience, their needs, and expectations, as well as your competition and industry details.</li>
              <li>With the gathered data, we’ll create initial mock-ups for your approval or feedback.</li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <img src="/graphic1.png" alt="Custom Visuals" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
