'use client'
import { useState,useEffect } from "react"
import { toast } from "sonner"
import Auction from "./AuctionCard"
import { Loader } from "lucide-react"

export default function Home() {
  const [loading, setloading] = useState(false)
    const [auctionItems, setAuctionItems] = useState([])
    const [watch, setwatch] = useState([])
  async function GetAuctions() {
    try {
      setloading(true)
      const response = await fetch(`/api/user/FetchAuctions/all/1`)
      const data = await response.json()
      setAuctionItems(data.data)
      fetchWatch()
      setloading(false)
    } catch (error) {
      toast.error("Failed to fetch auctions")
    }
  }

  async function fetchWatch() {
    try {
      setloading(true)
      const response = await fetch(`/api/user/watch/all/1`)
      const data = await response.json()
      setwatch(data.data)
      setloading(false)
    } catch (error) {
      toast.error("Failed to fetch auctions")
    }
  }
  useEffect(()=>{
    GetAuctions()
  },[])
  return (
    <main className="min-h-screen mt-20">
      {loading?<div className="flex w-full h-full justify-center items-center"><Loader className="animate-spin"/></div>:
      <Auction items={auctionItems} watchdata={watch}/>
        }
    </main>
  )
}

