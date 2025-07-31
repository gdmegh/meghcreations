
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, Settings } from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <AdminHeader />
        <div className="flex flex-1">
            <Sidebar collapsible="none">
            <SidebarContent className="p-4">
                <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                    asChild
                    isActive={isActive("/admin")}
                    >
                    <Link href="/admin">
                        <LayoutDashboard />
                        Dashboard
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                    asChild
                    isActive={isActive("/admin/mega-menu")}
                    >
                    <Link href="/admin/mega-menu">
                        <Menu />
                        Mega Menu
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                    asChild
                    isActive={isActive("/admin/settings")}
                    >
                    <Link href="/admin/settings">
                        <Settings />
                        Settings
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <Button asChild variant="outline">
                    <Link href="/">Back to Site</Link>
                </Button>
            </SidebarFooter>
            </Sidebar>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
