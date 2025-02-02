'use client'
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Auction from "./components/Auction"
import Carousel from "./components/Slider"
import { Loader } from "lucide-react"
import { Zap, Image, LayoutGrid, Gem, BarChart3 } from "lucide-react"
import FlippingCard from "./components/FlipCard"
import Reviews from "./components/Reviews"
import CTASection from "./components/CTASection"
import AboutUsSection from "./components/AboutUs"

const features = [
  {
    icon: <Zap className="w-12 h-12 text-red-500" />,
    title: "Direct Saving",
    description: "Partnering with Wholesalers and Distributers to get the best price",
  },
  {
    icon: <Image className="w-12 h-12 text-red-500" />,
    title: "No Hidden Fee",
    description: "Transparent Pricing every step of the way",
  },
  {
    icon: <LayoutGrid className="w-12 h-12 text-red-500" />,
    title: "All-in-One-Platform",
    description: "Buy, Insure, Service, Finance & Transport – all in one place",
  },
  {
    icon: <Gem className="w-12 h-12 text-red-500" />,
    title: "User Friendly App",
    description: "Seamlessly browse, compare, buy and book from your phone",
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-red-500" />,
    title: "Buyer-Focused Approach",
    description: "Designed to Prioritize your needs, not dealership Profits",
  },
]

export default function Home() {
  const [loading, setloading] = useState(false)
  const [loading2, setisloading] = useState(false)
  const [auctionItems, setAuctionItems] = useState([])
  const [watch, setwatch] = useState([])
  const [slides,setSlides]=useState([])
  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    setisloading(true)
    try {
      const response = await fetch(`/api/admin/slidermanagement`)
      if (!response.ok) throw new Error("Failed to fetch slides")
      const data = await response.json()
      setSlides(data)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setisloading(false)
    }
  }
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
  useEffect(() => {
    GetAuctions()
  }, [])
  return (
    <main className="min-h-screen ">
      <Carousel items={slides} />
      <h1 className="text-xl mt-8 md:mt-0 md:text-3xl font-bold text-center mb-4">WHY CHOOSE CARBUYDIRECT?</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 md:max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <FlippingCard
            key={index}
            // className={index > 2 ? "md:col-span-3" : "md:col-span-2"}
            frontContent={
              <div className="space-y-4 justify-center flex flex-col items-center">
                {feature.icon}
                <h3 className="">{feature.title}</h3>
              </div>
            }
            id={index}
            backContent={feature.description}
          />
        ))}
      </div>
      {loading ? <div className="flex w-full h-40 justify-center items-center"><Loader className="animate-spin" /></div> :
        <Auction items={auctionItems} watchdata={watch} />
      }
      <Reviews/>
      <AboutUsSection/>
      <CTASection/>
    </main>
  )
}

