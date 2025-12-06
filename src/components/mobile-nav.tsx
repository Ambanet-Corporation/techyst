"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function MobileNav() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-background/80 backdrop-blur-xl border-r border-white/10 text-white w-72">
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <AppSidebar />
      </SheetContent>
    </Sheet>
  );
}
