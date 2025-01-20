"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ArrowUpDown, Loader } from 'lucide-react'
import { toast } from "sonner"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AuctionCard from "./AuctionCard"




export default function Auction() {
  const [loading, setloading]=useState(false)
  const [auctionItems, setAuctionItems] = useState([])
  const [brands, setBrands] = useState([])
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    brandIds: [] ,
    sortBy: "relevant",
  })

  const fetchBrands = async () => {
    try {
      setloading(true)
      const response = await fetch("/api/admin/brandmanagement")
      const data = await response.json()
      console.log("Fetched brands are, ", data)
      setBrands(data.data)
      setloading(false)
    } catch (error) {
      toast.error("Failed to fetch brands")
    }
  }

  async function GetAuctions() {
    try {
      setloading(true)
      const response = await fetch("/api/user/FetchAuctions")
      const data = await response.json()
      setAuctionItems(data.data)
      setloading(false)
    } catch (error) {
      toast.error("Failed to fetch auctions")
    }
  }

  useEffect(() => {
    GetAuctions()
    fetchBrands()
  }, [])

  const handleBrandFilter = (brandId) => {
    setFilters((prev) => ({
      ...prev,
      brandIds: prev.brandIds.includes(brandId)
        ? prev.brandIds.filter((id) => id !== brandId)
        : [...prev.brandIds, brandId],
    }))
  }

  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const filteredItems = auctionItems.filter((item) => {
    console.log("Filters are",filters)
    const price = Number.parseFloat(item.CarSubmission.price)
    if (filters.minPrice && price < Number.parseFloat(filters.minPrice)) return false
    if (filters.maxPrice && price > Number.parseFloat(filters.maxPrice)) return false
    if (
      filters.brandIds.length > 0 &&
      item.CarSubmission.Brand &&
      !filters.brandIds.includes(item.CarSubmission.Brand.id)
    )
      return false
    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (filters.sortBy) {
      case "ending-soon":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case "price-low":
        return Number.parseFloat(a.CarSubmission.price) - Number.parseFloat(b.CarSubmission.price)
      case "price-high":
        return Number.parseFloat(b.CarSubmission.price) - Number.parseFloat(a.CarSubmission.price)
      default:
        return 0
    }
  })

  return (
    <div className=" px-4 md:px-6 py-6 md:py-20">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <Accordion type="single" collapsible className="w-full" defaultValue="">
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="min-price">Min Price</Label>
                    <Input
                      id="min-price"
                      placeholder="$0"
                      value={filters.minPrice}
                      onChange={(e) => handlePriceChange("minPrice", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="max-price">Max Price</Label>
                    <Input
                      id="max-price"
                      placeholder="$1000"
                      value={filters.maxPrice}
                      onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="brands">
              <AccordionTrigger>Brands</AccordionTrigger>
              <AccordionContent>
              <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        checked={filters.brandIds.includes(brand.id)}
                        onChange={() => handleBrandFilter(brand.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label
                        htmlFor={`brand-${brand.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({
                minPrice: "",
                maxPrice: "",
                brandIds: [],
                sortBy: "relevant",
              })
            }
          >
            Clear Filters
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filteredItems.length} results found</p>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="price-low">Lowest Price</SelectItem>
                <SelectItem value="price-high">Highest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading&&<Loader className="animate-spin"/>}
            {sortedItems.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
