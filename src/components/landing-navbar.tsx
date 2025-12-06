"use client";

import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Wrench className="h-5 w-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground font-sans">
            Techyst<span className="text-primary">.ai</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors hidden md:block">
            /akses_sistem
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold border border-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Mulai Diagnosa <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
