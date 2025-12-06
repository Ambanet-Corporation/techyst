"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanLine, History, LogOut, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "OVERVIEW",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-blue-500",
  },
  {
    label: "VISION SCAN",
    icon: ScanLine,
    href: "/dashboard/scan",
    color: "text-cyan-500",
  },
  {
    label: "DATABASE",
    icon: History,
    href: "/dashboard/history",
    color: "text-amber-500",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card/30 border-r border-white/5 backdrop-blur-xl">
      <div className="px-6 py-6 flex-1">
        <Link href="/dashboard" className="flex items-center pl-2 mb-10 group">
          <div className="relative w-8 h-8 mr-4 flex items-center justify-center rounded bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider font-sans text-foreground">TECHYST</h1>
            <p className="text-[10px] text-muted-foreground font-mono tracking-widest">V2.0</p>
          </div>
        </Link>

        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-mono tracking-wide cursor-pointer hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 border border-transparent",
                pathname === route.href ? "text-white bg-white/5 border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 border-t border-white/5">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-mono tracking-wide">
            <LogOut className="h-4 w-4 mr-2" />
            DISCONNECT
          </Button>
        </Link>
      </div>
    </div>
  );
}
