
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Menu,
  Package,
  Users,
  Settings,
  ChevronDown,
  User,
  ShoppingBag,
} from "lucide-react";
import * as React from 'react';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons";
import { AdminHeader } from "@/components/admin/admin-header";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "All Products", icon: Package },
    { href: "/admin/sellers", label: "Sellers", icon: User },
    { href: "/admin/buyers", label: "Buyers", icon: ShoppingBag },
    { 
      label: "Settings", 
      icon: Settings,
      children: [
        { href: "/admin/settings", label: "General" },
        { href: "/admin/settings/roles", label: "Roles" },
        { href: "/admin/settings/permissions", label: "Permissions" },
      ]
    },
  ];

  const isActive = (path: string) => {
    if (!path) return false;
    // Special case for dashboard to avoid matching all admin routes
    if (path === "/admin") return pathname === "/admin";
    if (path === "/admin/settings") return pathname === "/admin/settings";
    return pathname.startsWith(path);
  };
  
  const NavLink = ({ item }: { item: any }) => {
    if (item.children) {
      const isParentActive = item.children.some((child: any) => isActive(child.href));
      return (
        <Collapsible defaultOpen={isParentActive}>
          <CollapsibleTrigger className="w-full">
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isParentActive && "text-primary font-bold"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-8 pt-1">
            <nav className="grid items-start text-sm font-medium">
              {item.children.map((child: any) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive(child.href) && "bg-muted text-primary font-bold"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </nav>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          isActive(item.href) && "bg-muted text-primary font-bold"
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.label}
      </Link>
    )
  };

  const MobileNavLink = ({ item }: { item: any}) => {
    if (item.children) {
      return (
         <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground">
              <item.icon className="h-5 w-5" />
              {item.label}
            </div>
            <div className="flex flex-col space-y-2 pl-10">
              {item.children.map((child: any) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-muted-foreground hover:text-foreground",
                     isActive(child.href) && "bg-muted text-foreground"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
      )
    }
    return (
       <Link
          key={item.href}
          href={item.href}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            isActive(item.href) && "bg-muted text-foreground"
          )}
        >
            <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
    )
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="">MeghMarket Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4 space-y-1">
              {navItems.map((item, index) => (
                <NavLink key={index} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="">MeghMarket Admin</span>
                </Link>
                {navItems.map((item, index) => (
                  <MobileNavLink key={index} item={item} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <AdminHeader />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
