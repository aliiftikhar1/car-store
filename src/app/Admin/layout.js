import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "./components/Sidebar"
import NavBar from "./components/Navbar"

export default async function Layout({ children }) {

  return (
    <SidebarProvider >
      <AppSidebar />
      <main className="flex w-full flex-col h-screen">
        <NavBar/>
        <div className="overflow-auto">
        {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
