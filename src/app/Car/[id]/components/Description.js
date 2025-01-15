import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Description() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col w-full py-10">
      {/* Header Section */}
      <div className="h-20 bg-gray-200 flex justify-between items-center px-5 cursor-pointer" onClick={toggleExpand}>
        <h2 className="text-3xl font-bold">Description</h2>
        {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </div>

      {/* Description Section */}
      <div
        className={`overflow-hidden transition-all duration-300 relative ${
          isExpanded ? "max-h-[1000px]" : "max-h-32"
        }`}
      >
        <div className={`absolute ${!isExpanded?'flex':'hidden'} w-full h-32 bg-gradient-to-t from-white to-transparent bottom-0`}>

        </div>
        <div className="mt-5 space-y-4 text-gray-700 text-base leading-6">
          <p>
            <strong>Overview:</strong> SBX Cars is proud to offer for sale this 2020 Aston Martin DBS Superleggera showing just 10,834 mi (17,436 km) on the odometer at the time of cataloging. Finished in Cosmos Orange over an Obsidian Black and Cosmos Orange cabin, this V12-powered super GT is simply fantastic.
          </p>
          <p>
            A successor to the Vanquish S, Aston Martin’s DBS Superleggera channeled a name from the brand’s fabled past into a modern masterpiece dubbed “Super GT” by the British automaker.
          </p>
          <p>
            With an extruded bonded aluminum body, carbon fiber panels, and that massive hexagonal front grille sweeping back into powerful rear haunches, the DBS Superleggera is said to possess a “predatory stance,” which sounds exactly right.
          </p>
          <p>
            Lightened with ample use of carbon fiber to earn the Superleggera moniker, this DBS is also an aerodynamic star, boasting the highest downforce ever seen on a production Aston. Then there is the Cosmos Orange finish and optional carbon fiber roof on today’s 2020 Superleggera. WOW.
          </p>
          <p>
            <strong>Notable Commentary:</strong>
            <blockquote className="italic">
              "This is already an outstanding super-GT and represents a rejuvenated British car maker at its absolute best." - Autocar
            </blockquote>
            <blockquote className="italic">
              "It has the ability to take your breath away…" - Top Gear
            </blockquote>
          </p>
          <p>
            <strong>Specifications & Options:</strong> This 2020 Aston Martin DBS Superleggera is powered by a 5.2L twin-turbo V12 rated for 715 horsepower and 663 lb-ft of torque. An 8-speed automatic transaxle routes power to the rear wheels with a mechanical limited-slip differential and torque vectoring. Additional features below:
          </p>
          <p>
            <strong>Exterior:</strong>
            <ul className="list-disc pl-5">
              <li>Cosmos Orange finish</li>
              <li>Exposed carbon fiber roof</li>
              <li>Full PPF</li>
              <li>21” ANRKY multi-spoke black-finished wheels with silver rims</li>
              <li>Michelin Pilot Sport Cup 2 tires</li>
              <li>Exposed carbon fiber front splitter, hood vents, and rear spoiler</li>
            </ul>
          </p>
          <p>
            <strong>Interior:</strong>
            <ul className="list-disc pl-5">
              <li>Obsidian Black leather with Cosmos Orange stitching</li>
              <li>Power-adjustable and heated seats with DBS headrest embroidery</li>
              <li>Carbon fiber and leather flat-bottom steering wheel</li>
              <li>Bang & Olufsen BeoSound audio system</li>
              <li>Navigation</li>
            </ul>
          </p>
          <p>
            <strong>Mechanical:</strong>
            <ul className="list-disc pl-5">
              <li>5.2L twin-turbo V12</li>
              <li>Carbon ceramic brakes</li>
              <li>Adaptive dampers with Skyhook technology</li>
            </ul>
          </p>
        </div>
      </div>

      {/* Read More / Less Button */}
      <button
        className="w-[10rem] h-[3rem] mx-auto bg-yellow-700/30 text-black font-medium mt-4 self-start"
        onClick={toggleExpand}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}
