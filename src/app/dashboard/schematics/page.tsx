"use client";

import { useState } from "react";
import { BookOpen, Search, Lock, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchematicViewer } from "@/components/schematics/schematic-viewer";

const SCHEMATICS_DB = [
  { id: "SCH-001", model: "Xiaomi Redmi Note 10 Pro 5G (China)", type: "Schematic & Layout", date: "2024-01-10", image: "/schematics/chopin.jpg", status: "public" },
  { id: "SCH-002", model: "Samsung Galaxy A52", type: "Block Diagram", date: "2024-02-15", image: "/schematics/a525f.jpg", status: "public" },
  { id: "SCH-003", model: "iPhone 13 Pro Max", type: "Bitmap Layer", date: "2024-03-20", image: "/schematics/i13pm.jpg", status: "locked" },
];

export default function SchematicsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchematic, setSelectedSchematic] = useState<(typeof SCHEMATICS_DB)[0] | null>(null);

  const filteredSchematics = SCHEMATICS_DB.filter((s) => s.model.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sans text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-emerald-500" />
            SCHEMATICS_LIB
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">// ACCESS_LEVEL: TECHNICIAN :: {filteredSchematics.length} DOCUMENTS</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-card/40 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search model (e.g. 'Redmi', 'Samsung')..."
            className="pl-10 bg-slate-950/50 border-white/10 font-mono text-sm focus-visible:ring-emerald-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchematics.map((item) => (
            <Card
              key={item.id}
              className="group bg-slate-950/50 border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => item.status !== "locked" && setSelectedSchematic(item)}
            >
              <div className="h-40 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.model}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.status === "locked" ? "grayscale blur-sm" : "opacity-80 group-hover:opacity-100"}`}
                />

                {item.status === "locked" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <Lock className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}

                <div className="absolute top-2 right-2">
                  <Badge variant={item.status === "locked" ? "secondary" : "default"} className={`font-mono text-[10px] ${item.status !== "locked" ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : ""}`}>
                    {item.status === "locked" ? "LOCKED" : "AVAILABLE"}
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-foreground font-sans">{item.model}</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-1 flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {item.type}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground border border-white/10 px-1.5 py-0.5 rounded">{item.id}</span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  {item.status !== "locked" ? (
                    <Button size="sm" variant="ghost" className="h-7 text-xs font-mono hover:text-emerald-400 hover:bg-emerald-500/10">
                      OPEN_VIEWER
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="h-7 text-xs font-mono opacity-50 cursor-not-allowed">
                      PREMIUM_ONLY
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedSchematic && <SchematicViewer src={selectedSchematic.image} title={`${selectedSchematic.id} :: ${selectedSchematic.model}`} onClose={() => setSelectedSchematic(null)} />}
    </div>
  );
}
