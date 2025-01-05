"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Menu, Search, User } from 'lucide-react'
import { MainNav } from "./Main-nav"
import Header2 from "./Header2"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="w-full h-20 flex justify-center items-center z-20 sticky top-0 border-b bg-white px-2 md:px-20">
                <div className="flex justify-between items-center w-full bg-white z-20">
                    <div className="flex justify-center items-center">
                        <MainNav isOpen={isOpen} onOpenChange={setIsOpen}>
                            <Menu className="size-10 cursor-pointer" />
                        </MainNav>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-xspace text-2xl md:text-3xl tracking-tighter md:tracking-tight">SBX | CARS</h1>
                        <p className="uppercase font-[300] text-sm md:text-base">Supercar Blondie</p>
                    </div>
                    <div className="flex gap-4 text-lg font-[400] tracking-wider justify-center items-center">
                        <Search className="size-6" />
                        <p className="hidden md:flex">SignIn</p>
                        <User className="flex md:hidden" />
                    </div>
                </div>
                <Header2 />
            </div>
        </>
    )
}

