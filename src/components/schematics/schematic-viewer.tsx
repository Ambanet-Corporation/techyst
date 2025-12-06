"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn, ZoomOut, RefreshCcw, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SchematicViewerProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function SchematicViewer({ src, title, onClose }: SchematicViewerProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
  const handleReset = () => setScale(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full max-w-6xl bg-slate-950 border border-white/10 rounded-xl overflow-hidden flex flex-col relative shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-card/50 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center justify-center">
              <Maximize className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono tracking-wider text-foreground">{title}</h3>
              <p className="text-[10px] text-muted-foreground font-mono">INTERACTIVE_VIEWER :: {Math.round(scale * 100)}% ZOOM</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/30 rounded-lg border border-white/10 p-1 mr-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={handleReset}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="destructive" size="icon" className="h-9 w-9" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] bg-slate-950">
          <motion.div className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing" drag dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}>
            <motion.img src={src} alt="Schematic" className="max-w-none shadow-2xl border border-white/5" animate={{ scale }} transition={{ type: "spring", stiffness: 200, damping: 20 }} style={{ maxHeight: "80vh" }} draggable={false} />
          </motion.div>

          <div className="absolute bottom-4 left-4 pointer-events-none">
            <div className="bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded text-[10px] font-mono text-muted-foreground">
              X: {0} Y: {0} | LAYER: TOP_COPPER
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
