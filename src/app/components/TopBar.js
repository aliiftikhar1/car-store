'use client'
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
    const [visible, setvisible] = useState(true)
    return (
        <>{visible&&(
        <div className="flex flex-col w-full relative">
            <div className="absolute top-2 right-4">
                <X className="text-gray-300 hover:text-gray-100" onClick={()=>setvisible(!visible)}/>
            </div>
            <div className="p-1  md:p-2 bg-[#5a79c8]">
                <p className="uppercase text-sm md:text-base text-white text-center flex justify-center items-center">Sell your supercar <ChevronRight /></p>
            </div>
            <div className="p-1 bg-[#e2e2de] px-12 text-base space-x-4 hidden md:flex ">
                <p>US +1-718-787-584</p>
                <p>|</p>
                <p>UAE +971 4 876 1764</p>
                <p>|</p>
                <p>UK +44 20 4525 8014</p>
                <p>|</p>
                <p>sales@carbuydirect.com</p>
            </div>
            <div className="p-1 bg-[#e2e2de] px-4 text-xs space-x-2 flex justify-between md:hidden">
            <p>+1-718-787-584</p>
                <p>|</p>
                <p>+971 4 876 1764</p>
                <p>|</p>
                <p>sales@carbuydirect.com</p>
                </div>
        </div>
        )}</>
    )
}