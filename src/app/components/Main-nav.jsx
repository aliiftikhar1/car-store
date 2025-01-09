"use client"

import * as React from "react"
import Link from "next/link"
import { X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export function MainNav({ children, isOpen, onOpenChange }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            {/* <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button> */}
          </div>
          <nav className="flex-1 px-2">
            <div className="space-y-2 py-4">
              <NavLink href="/Auction">Auctions</NavLink>
              <NavLink href="/Preview">Preview</NavLink>
              <NavLink href="/Results">Results</NavLink>
              <NavLink href="/sell">Sell Your Vehicle</NavLink>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/team">Team</NavLink>
              <NavLink href="/press">Press</NavLink>
              <NavLink href="/careers">Careers</NavLink>
              <NavLink href="/contact">Contact Us</NavLink>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-lg hover:bg-gray-100 rounded-md transition-colors"
    >
      {children}
    </Link>
  )
}

