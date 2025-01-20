"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Menu, Search, User } from 'lucide-react'
import { MainNav } from "./Main-nav"
import Header2 from "./Header2"
import { AuthDialogs } from "./LoginDialog"

import {  useSelector } from "react-redux"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const user = useSelector((data)=>data.CarUser.userDetails)

    useEffect(()=>{
        console.log("User ",user)
    },[user])
    
    return (
        <>
       
            <div className="w-full h-16 md:h-20 flex justify-center items-center z-20 sticky top-0 border-b text-black bg-white px-2 md:px-20">
                <div className="flex justify-between border-b items-center w-full bg-white z-20">
                    <div className="flex justify-center items-center">
                        <MainNav isOpen={isOpen} onOpenChange={setIsOpen}>
                            <Menu className="size-7 md:size-10 cursor-pointer" />
                        </MainNav>
                    </div>
                    <a href='/' className="flex flex-col justify-center items-center">
                        <img src="/logo/1.png" className="h-16 md:h-20 w-[70vw] md:w-[40vw] object-cover"></img>
                        {/* <h1 className="font-xspace text-base md:text-3xl -tracking-[4px] md:tracking-tight">CAR BUY DIRECT</h1> */}
                        {/* <p className="uppercase font-[300] text-xs md:text-base">Supercar Blondie</p> */}
                    </a>
                    <div className="flex gap-4 text-lg font-[400] tracking-wider justify-center items-center">
                        <Search className="size-6" />
                       <AuthDialogs/>
                    </div>
                </div>
                <Header2 />
            </div>
          
        </>
    )
}

