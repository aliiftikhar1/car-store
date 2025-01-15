// components/TabSectionWithButtons.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui button component
import { cn } from "@/lib/utils"; // helper for conditional classNames if using shadcn/utils

const TabSectionWithButtons = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  const tabs = [
    "ALL",
    "EXTERIOR",
    "INTERIOR",
    "MECHANICAL",
    "DOCUMENTATION",
    "OTHER",
    "VIDEOS",
  ];

  return (
    <div className="flex w-full px-20 gap-4  justify-between border-t border-gray-200 py-4">
      {/* Tab Section */}
      <div className="w-3/4 flex flex-col space-y-2">
      <div className="flex space-x-4 h-20 items-center bg-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
             `px-6 h-full text-lg font-medium flex space-x-4 items-center
              ${activeTab === tab? "bg-gray-300"
                : "text-gray-500 hover:text-black"}
                `
            }
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex space-x-8 text-xl h-20 items-center ">
        <div>
            Auction View: <strong>23.8k</strong>
        </div>
        <div>
            Watching: <strong>23.8k</strong>
        </div>

      </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col space-y-2 w-1/4">
        <Button variant="outline" className="w-full h-20 rounded-none text-xl  bg-yellow-500 text-white hover:bg-gold-600">
          SCHEDULE VIEWING
        </Button>
        <Button variant="outline" className="w-full h-20 rounded-none text-xl  bg-yellow-500 text-white hover:bg-gold-600">
          ASK THE SELLER A QUESTION
        </Button>
      </div>
    </div>
  );
};

export default TabSectionWithButtons;
