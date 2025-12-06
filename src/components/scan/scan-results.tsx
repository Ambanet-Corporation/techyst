import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Cpu, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/hooks/use-scan";

interface ScanResultsProps {
  result: AnalysisResult;
  children?: React.ReactNode;
}

export function ScanResults({ result, children }: ScanResultsProps) {
  return (
    <div className="w-full md:w-7/12 flex flex-col gap-4 h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden shadow-2xl border-none glass rounded-xl bg-card">
        <div className="flex-1 overflow-y-auto p-0 scrollbar-thin">
          <div className="p-6 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Cpu className="h-5 w-5" />
                <h3>Komponen Terdeteksi</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(result.detected_components || []).map((comp, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm">
                    {comp}
                  </Badge>
                ))}
                {(!result.detected_components || result.detected_components.length === 0) && <span className="text-sm text-muted-foreground italic">Tidak ada komponen spesifik terdeteksi</span>}
              </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 shadow-sm"
              >
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <h4>Diagnosa Kerusakan</h4>
                </div>
                <p className="text-sm leading-relaxed opacity-90">{result.diagnosis || "Tidak ada data diagnosa"}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 shadow-sm"
              >
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold mb-2">
                  <Wrench className="h-5 w-5" />
                  <h4>Rekomendasi Perbaikan</h4>
                </div>
                <p className="text-sm leading-relaxed opacity-90">{result.recommendation || "Tidak ada rekomendasi"}</p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-background/40 border space-y-2">
              <div className="flex items-center gap-2 font-semibold text-blue-500">
                <CheckCircle2 className="h-5 w-5" />
                <h4>Analisa Visual</h4>
              </div>
              <p className="text-sm text-muted-foreground">{result.analysis || "Analisa visual tidak tersedia"}</p>
            </motion.div>
          </div>

          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-t px-6 py-3 font-semibold flex items-center gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Konsultasi Live dengan Suhu AI
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
