import { Calendar, ClipboardList, LayoutDashboardIcon, Search, Settings, UserPlus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import LogOutBtn from "./LogOutBtn"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-auth-options"

export async function AppSidebar() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role

  // Default items for all admins
  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Attendance",
      url: "/admin/attendance",
      icon: ClipboardList,
    },
  ]

  // Add extra route if role is super admin
  if (role === "SUPER_ADMIN") {
    items.push({
      title: "Add User",
      url: "/super-admin/add-user",
      icon: UserPlus,
    })
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5 text-2xl font-bold">AMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2.5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="text-lg" />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogOutBtn className="w-full" />
      </SidebarFooter>
    </Sidebar>
  )
}
