import FAQ from "./components/FAQs";
import Footer from "./components/Footer";
import GraphicDesigning from "./components/GraphicDesigning";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ServicesWeOffer from "./components/ServicesWeOffer";
import WhatWeDo from "./components/WhatWeDo";
import WhoWeAre from "./components/WhoWeAre";
import Image from "next/image";
import CustomerRootLayout from "./user/layout";
import FeaturedStores from "./components/FeaturedStores";
import CompanyList from "./user/components/CompanyList";


export default function Home() {
  return (
    <CustomerRootLayout>
    {/* <Header/> */}
    <HeroSection/>
    <FeaturedStores/>
    <CompanyList/>
    {/* <WhatWeDo/>
    <WhoWeAre/>
    <ServicesWeOffer/>
    <GraphicDesigning/>
    <HowItWorks/> */}
    <FAQ/>
    {/* <Footer/> */}
    
    </CustomerRootLayout>
  );
}
