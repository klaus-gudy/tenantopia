"use client"

import * as React from "react"
import {
  Construction,
  CreditCard,
  Home,
  LayoutDashboard,
  Settings,
  UserCog,
  Users
} from "lucide-react"
import { useSession } from "next-auth/react"
import { NavMain } from "@/components/shared/nav-main"
import { NavUser } from "@/components/shared/nav-user"
import { TeamSwitcher } from "@/components/shared/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const data = {
    user: {
      name: session?.user?.name || "User",
      email: session?.user?.email || "",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Properties",
        url: "/property",
        icon: Home,
      },
      {
        title: "Tenants",
        url: "/tenants",
        icon: Users,
      },
      {
        title: "Property Manager",
        url: "/manager",
        icon: UserCog,
      },
      {
        title: "Payments",
        url: "/payment",
        icon: CreditCard,
      },
      {
        title: "Maintenance",
        url: "/maintenance",
        icon: Construction,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
