import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Cpu, Wrench, Activity, ChevronRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/hooks/use-scan";

interface ScanResultsProps {
  result: AnalysisResult;
  children?: React.ReactNode;
}

export function ScanResults({ result, children }: ScanResultsProps) {
  return (
    <div className="w-full md:w-7/12 flex flex-col gap-4 h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex-1 overflow-y-auto p-0 scrollbar-thin">
          <div className="p-6 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest">
                  <Cpu className="h-4 w-4" />
                  DETECTED_HARDWARE
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">SCN_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(result.detected_components || []).map((comp, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1 text-xs font-mono rounded-none border-primary/30 bg-primary/5 text-primary">
                    [{comp}]
                  </Badge>
                ))}
                {(!result.detected_components || result.detected_components.length === 0) && <span className="text-xs font-mono text-muted-foreground">NO_SIGNATURE_FOUND</span>}
              </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-5 rounded-lg border border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <AlertTriangle className="h-10 w-10 text-amber-500" />
                </div>
                <div className="flex items-center gap-2 text-amber-500 font-bold font-mono text-xs mb-2 tracking-wider">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  ERROR_DIAGNOSIS
                </div>
                <p className="text-sm leading-relaxed text-amber-100/80 font-sans border-l-2 border-amber-500/30 pl-3">{result.diagnosis || "No specific error data available."}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="p-5 rounded-lg border border-green-500/20 bg-green-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <Wrench className="h-10 w-10 text-green-500" />
                </div>
                <div className="flex items-center gap-2 text-green-500 font-bold font-mono text-xs mb-2 tracking-wider">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  REPAIR_PROTOCOL
                </div>
                <p className="text-sm leading-relaxed text-green-100/80 font-sans border-l-2 border-green-500/30 pl-3">{result.recommendation || "No protocol available."}</p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-bold">
                <Activity className="h-4 w-4" />
                VISUAL_ANALYSIS_LOG
              </div>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed pl-6">
                {">"} {result.analysis || "Data stream empty."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-start gap-2 p-3 rounded bg-white/5 border border-white/5">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-[10px] text-muted-foreground font-mono leading-tight">
                <span className="font-bold text-foreground">DISCLAIMER:</span> Hasil analisa AI ini bertujuan sebagai referensi awal (Second Opinion). Selalu verifikasi kerusakan menggunakan alat ukur fisik (Multitester) dan skema resmi
                sebelum melakukan eksekusi hardware.
              </p>
            </motion.div>
          </div>

          <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-y border-white/5 px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-primary animate-pulse">
              <span className="w-2 h-2 bg-primary rounded-full" />
              LIVE_COMMS
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">ENCRYPTED_CHANNEL</div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
