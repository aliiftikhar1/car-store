import { Button } from "@/components/ui/button";
import TimerComponent from "./CountDownTimer";
import { Share, Star } from "lucide-react";

export default function Title({ data }) {
  return (
    <div className="w-full px-20">
      <div className="border-b pb-4">
        <div className="flex justify-start gap-8 items-center">
          {/* Car Name */}
          <h1 className="text-4xl tracking-tight font-[200] ">
            {data?.CarSubmission?.vehicleYear} <span className="font-bold">{data?.CarSubmission?.vehicleMake} </span>  {data?.CarSubmission?.vehicleModel}
          </h1>
          {/* Reserve Lowered Tag */}
          <div className="border-l-4 bg-gray-100/50 px-2 py-1 border-gray-400 flex justify-center items-center h-10"><h2 className="text-xl">Reserve Lowered</h2></div>
        </div>
      </div>

      <div className="flex w-full justify-between items-center p-4">
        <div className="grid grid-cols-4   w-2/3">
          <div className="text-3xl font-bold text-center">
            US${data?.CarSubmission?.price}
          </div>
          <div className="text-center">
            <TimerComponent
              className="text-2xl font-extrabold"
              endDate={'2025-06-06'}
            />
          </div>
          <div className="text-center flex gap-2 justify-center items-center">
            <span className="font-bold">5</span> Comments
          </div>
          <div className="text-center gap-2  flex justify-center items-center">
            <span className="font-bold">9</span> Bids
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 ">
          <Button
            variant="ghost"
            className="w-[10rem] h-[3rem] rounded-none flex items-center justify-center text-lg bg-transparent border border-gray-300 hover:bg-gray-100"
          >
            <Star className="mr-2" /> Watch
          </Button>
          <Button
            variant="ghost"
            className="w-[10rem] h-[3rem] rounded-none flex items-center justify-center text-lg bg-transparent border border-gray-300 hover:bg-gray-100"
          >
            <Share className="mr-2" /> Share
          </Button>
          <Button
            variant="solid"
            className="w-[10rem] h-[3rem] rounded-none flex items-center justify-center text-lg text-white bg-yellow-600 hover:bg-yellow-700"
          >
            Place A Bid
          </Button>
        </div>
      </div>
    </div>
  );
}
