'use client';

import { useParams } from "next/navigation";
import TimerComponent from "./components/CountDownTimer";
import data from "./components/cardata.json";
import Title from "./components/Title";
import Gallery from "./components/Gallery";
import TabSectionWithButtons from "./components/MainGallerySection";
import Highlights from "./components/Hightlights";
import TechnicalData from "./components/TechnicalData";
import CustomLayout from "./components/CustomLayout";
import Description from "./components/Description";
import AuctionDetails from "./components/AuctionDetails";

export default function Car() {
  const { id } = useParams();
  const carEndDate = '2025-06-06';

  console.log("Car data:", data); 
{/* <TimerComponent endDate={carEndDate} /> */}
  return (
    <div className="flex flex-col justify-center items-center h-auto mt-20">
      
      <Title data={data}/>
      <Gallery/>
      <TabSectionWithButtons/>
      <Highlights/>
      <CustomLayout>
      <TechnicalData/>
      <Description/>
      <AuctionDetails/>
      </CustomLayout>
      

    </div>
  );
}
