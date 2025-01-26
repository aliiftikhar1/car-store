import Auction from "./components/Auction"
import Carousel from "./components/Slider"
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
  },{
    year: "2023",
    make: "G-WAGON",
    model: "911 GT3 RS",
    image: "/banners/G-wagon-1.jpg",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen ">
      <Carousel items={carouselItems} />
      <Auction/>
    </main>
  )
}

