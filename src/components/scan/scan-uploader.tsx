import { useRef } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Scan, RefreshCw, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScanUploaderProps {
  previewUrl: string | null;
  isAnalyzing: boolean;
  result: any;
  onFileChange: (file: File | undefined) => void;
  onReset: () => void;
  onAnalyze: () => void;
}

export function ScanUploader({ previewUrl, isAnalyzing, result, onFileChange, onReset, onAnalyze }: ScanUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full md:w-5/12 flex flex-col gap-4 h-full">
      <div
        className={cn(
          "flex-1 relative group overflow-hidden rounded-xl border-2 transition-all duration-500",
          previewUrl ? "border-primary/50 bg-slate-950" : "border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
        )}
      >
        {!previewUrl ? (
          <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative h-16 w-16 rounded-lg border border-primary/30 flex items-center justify-center bg-slate-950">
                <UploadCloud className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-bold font-sans tracking-wide text-foreground">INITIATE SCAN</h3>
            <p className="text-xs text-muted-foreground font-mono mt-2 max-w-[200px]">
              [DROP_TARGET_HERE]
              <br />
              SUPPORTED: JPG, PNG
            </p>

            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50" />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

            <Image src={previewUrl} alt="Preview" fill className="object-contain relative z-10" unoptimized />

            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-4 left-4 text-[10px] font-mono text-primary/70 bg-black/50 px-2 py-1 border border-primary/20">CAM_01 :: ACTIVE</div>

              {isAnalyzing && (
                <motion.div initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
              )}
            </div>

            <div className="absolute bottom-6 right-6 z-30 flex gap-2">
              <Button size="sm" variant="outline" onClick={onReset} className="bg-black/50 border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-md h-9 w-9 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={(e) => onFileChange(e.target.files?.[0])} accept="image/*" className="hidden" />
      </div>

      {previewUrl && !result && (
        <Button
          size="lg"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full h-14 text-base font-bold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(6,182,212,0.2)] border-t border-white/10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              PROCESSING DATA...
            </>
          ) : (
            <>
              <Scan className="mr-2 h-5 w-5" />
              EXECUTE DIAGNOSIS
            </>
          )}
        </Button>
      )}
    </div>
  );
}
