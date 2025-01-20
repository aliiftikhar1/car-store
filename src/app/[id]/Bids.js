'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function MybidsSection() {
  const [activeTab, setActiveTab] = useState('active')
  const [bids] = useState([]) // Empty array to simulate no bids

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-2">
        My <span className="text-[#B08968]">Bids</span>
      </h2>
      <p className="text-muted-foreground mb-8">Here you will see all your bids</p>
      
      <div className="border-b">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('active')}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === 'active' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Active bids
            {activeTab === 'active' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === 'archived' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Archived bids
            {activeTab === 'archived' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="py-20">
        {bids.length === 0 ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">No bids found</h3>
            <p className="text-muted-foreground">
              You have no {activeTab} bids.
            </p>
            <Button 
              variant="secondary" 
              className="mt-4 bg-muted/60 hover:bg-muted"
            >
              Get started, sell now
            </Button>
          </div>
        ) : (
          // bids grid would go here when there are items
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bids.map((listing) => (
              // Listing card component would go here
              <div key={listing.id}>{/* Listing content */}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

