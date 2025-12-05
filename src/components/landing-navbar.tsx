"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

export const LandingNavbar = () => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between container mx-auto">
      <Link href="/" className="flex items-center gap-2">
        <Wrench className="h-8 w-8 text-white" />
        <h1 className="text-2xl font-bold text-white tracking-tight">Techyst</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href="/dashboard">
          <Button variant="secondary" className="rounded-full font-semibold">
            Mulai Diagnosa
          </Button>
        </Link>
      </div>
    </nav>
  );
};
