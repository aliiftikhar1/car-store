// components/GraphicDesigning.js
'use client'
import {
    PencilSquareIcon,
    DeviceTabletIcon,
    PrinterIcon,
    AdjustmentsVerticalIcon,
    IdentificationIcon,
  } from '@heroicons/react/24/outline';
  
  export default function GraphicDesigning() {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Graphic Designing</h2>
            <p className="text-lg text-gray-600 mb-6">
              The visual elements, as it is, are factors that contribute greatly to the creation of the brand’s identity and the leaving of an imprint. We cover a wide range spectrum of creative solutions in our graphic design service including:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <PencilSquareIcon className="h-6 w-6 text-gray-500 mr-2" />
                Logo Design
              </li>
              <li className="flex items-center">
                <DeviceTabletIcon className="h-6 w-6 text-gray-500 mr-2" />
                Illustrations
              </li>
              <li className="flex items-center">
                <PrinterIcon className="h-6 w-6 text-gray-500 mr-2" />
                Print Design
              </li>
              <li className="flex items-center">
                <AdjustmentsVerticalIcon className="h-6 w-6 text-gray-500 mr-2" />
                Typography
              </li>
              <li className="flex items-center">
                <IdentificationIcon className="h-6 w-6 text-gray-500 mr-2" />
                Brand Identity
              </li>
            </ul>
          </div>
  
          {/* Image Content */}
          <div className="md:w-1/2 px-6 md:px-12">
            <img
              src="/laptop.png"
              alt="Graphic Designing"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>
    );
  }
  