"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function TimerComponent({ className = "", endDate }) {
  const getOrCreateEndDate = () => {
    const storedEndDate = endDate;
    if (storedEndDate) {
      return new Date(storedEndDate);
    } else {
      const newEndDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
      return newEndDate;
    }
  };

  const [flashSaleEndDate, setFlashSaleEndDate] = useState(getOrCreateEndDate);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = new Date(flashSaleEndDate).getTime() - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Timer ends
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [endDate]);

  return (
    <div className={cn("flex justify-center items-center text-center ", className)}>
      <Clock className="size-4"/>
       {timeLeft.days>10000?<span className={cn("countdown font-[700]", className)}>{new Date(endDate).toLocaleDateString()}</span>:<>
       {timeLeft.days==0?'':
      <div className="flex items-center gap-1  ">
        <span className={cn("countdown font-[500]", className)}>{timeLeft.days}</span>
        <span className="text-xs items-center font-normal">d</span>
      </div>}
        {timeLeft.hours==0?'':
        <div className="flex items-center gap-1  ">
        <span className={cn("countdown font-[500]", className)}>{timeLeft.hours}</span>
        <span className="text-xs items-center font-normal">h</span>
      </div>}
      {timeLeft.days<=0?<>
      {timeLeft.minutes==0?'':
      <div className="flex items-center gap-1  ">
        <span className={cn("countdown font-[500]", className)}>{timeLeft.minutes}</span>
        <span className="text-xs items-center font-normal">m</span>
      </div>}
      {timeLeft.seconds==0?'':
      <div className="flex items-center gap-1">
        <span className={cn("countdown font-[500]", className)}>{timeLeft.seconds}</span>
        <span className="text-xs items-center font-normal">s</span>
      </div>}</>:''}
      </>
}
    </div>
  );
}
