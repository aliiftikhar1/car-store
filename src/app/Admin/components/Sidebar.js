import { Calendar, Home, User, CarFront, Inbox, Landmark, Search, Settings, ShoppingCart, Tag, Layers, Star, XCircle, RotateCw, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"
import Link from "next/link"
// Menu items.
const items = [
    {
        title: "Home",
        url: "/Admin",
        icon: Home,
    },
    {
        title: "User Management",
        url: "/Admin/Pages/UserManagement",
        icon: User,
    },
    {
        title: "Brand Management",
        url: "/Admin/Pages/BrandManagement",
        icon: Building,
    },
    // {
    //         title: "Sub Category Management",
    //         url: "/Admin/Pages/SubCategoryManagement",
    //         icon: User,
    // },
    // {
    //         title: "Car Management",
    //         url: "/Admin/Pages/CarManagement",
    //         icon: CarFront,
    // },
    {
        title: "Car Submissions",
        url: "/Admin/Pages/CarSubmission",
        icon: CarFront,
    }, {
        title: "Auction Management",
        url: "/Admin/Pages/AuctionManagement",
        icon: CarFront,
    },
    {
        title: "Bidding",
        url: "/Admin/Pages/BiddingManagement",
        icon: CarFront,
    },
    {
        title: "SoldOut",
        url: "/Admin/Pages/SoldOutManagement",
        icon: CarFront,
    },
    // {
    //         title: "Orders Management",
    //         url: "#",
    //         icon: Calendar,
    // },
    // {
    //         title: "Coupons Management",
    //         url: "/Admin/Pages/CouponManagement",
    //         icon: Tag,
    // },
    // {
    //         title: "Charges Management",
    //         url: "/Admin/Pages/ChargesManagement",
    //         icon: Inbox,
    // },
    // {
    //         title: "Slider Management",
    //         url: "/Admin/Pages/Slider",
    //         icon: Layers,
    // },
    // {
    //         title: "Reviews Management",
    //         url: "#",
    //         icon: Star,
    // },
    // {
    //         title: "Cancellation Management",
    //         url: "#",
    //         icon: XCircle,
    // },
    // {
    //         title: "Returns Management",
    //         url: "#",
    //         icon: RotateCw,
    // },
    // {
    //         title: "Bank Accounts",
    //         url: "/Admin/Pages/BankAccountManagement",
    //         icon: Landmark,
    // },
    // {
    //         title: "Settings",
    //         url: "#",
    //         icon: Settings,
    // },
]

export function AppSidebar() {
    return (
        <Sidebar className="bg-white">
            <SidebarHeader>
                {/* <h1 className="text-xl font-xspace uppercase -tracking-[5px]">CarBuyDirect</h1> */}
                <Image className="h-20 object-cover mx-auto border-gray-600 p-2 border-2 rounded-xl" src="/logo/1.png" alt="Next.js logo" width={500} height={500} priority />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel >Menu</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button asChild >
                    <a href="/admin/logout">
                        <LogOut />
                        Logout
                    </a>
                </Button>
                {/* <p className="text-center text-gray-500 text-sm">© 2021 Ecommerce Store</p> */}
            </SidebarFooter>
        </Sidebar>
    )
}
