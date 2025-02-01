'use client'
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Auction from "./components/Auction"
import Carousel from "./components/Slider"
import { Loader } from "lucide-react"
const carouselItems = [
  {
    year: "2019",
    make: "MCLAREN",
    model: "SENNA XP - #1 OF 10",
    image: "/banners/581A6472-Banner.jpg",
  },
  {
    year: "2023",
    make: "FERRARI",
    model: "SF90 STRADALE",
    image: "/banners/Banner (1).jpg",
  },
  {
    year: "2024",
    make: "LAMBORGHINI",
    model: "REVUELTO",
    image: "/banners/Banner 1.jpg",
  },
  {
    year: "2023",
    make: "PORSCHE",
    model: "911 GT3 RS",
    image: "/banners/banner.jpg",
  },
  {
    year: "2023",
    make: "FORD",
    model: "911 GT3 RS",
    image: "/banners/ford banner.jpg",
  },
  {
    year: "2023",
    make: "BUGATTI",
    model: "911 GT3 RS",
    image: "/banners/Porsche Speedster banner.jpg",
  },
  {
    year: "2023",
    make: "SENNA",
    model: "911 GT3 RS",
    image: "/banners/Senna banner.jpg",
  },
  {
    year: "2023",
    make: "SHELBY",
    model: "911 GT3 RS",
    image: "/banners/Shelby banner.jpg",
  }, {
    year: "2023",
    make: "G-WAGON",
    model: "911 GT3 RS",
    image: "/banners/G-wagon-1.jpg",
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
      {loading ? <div className="flex w-full h-40 justify-center items-center"><Loader className="animate-spin" /></div> :
        <Auction items={auctionItems} watchdata={watch} />
      }
    </main>
  )
}

