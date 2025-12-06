import { AlertTriangle, Banknote, Cpu, CheckCircle2, Wrench, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScanRecord } from "@/hooks/use-scan-history";

interface HistoryDetailSheetProps {
  record: ScanRecord | null;
  onClose: () => void;
}

export function HistoryDetailSheet({ record, onClose }: HistoryDetailSheetProps) {
  const getPriceEstimate = (text: string) => {
    const lower = (text || "").toLowerCase();
    if (lower.includes("ic") || lower.includes("cpu") || lower.includes("emmc") || lower.includes("short")) {
      return "Rp 250.000 - Rp 500.000";
    }
    if (lower.includes("konektor") || lower.includes("lcd") || lower.includes("fleksibel") || lower.includes("usb")) {
      return "Rp 75.000 - Rp 150.000";
    }
    return "Rp 50.000 - Rp 100.000";
  };

  const handleShare = () => {
    if (!record) return;
    const estimate = getPriceEstimate(record.diagnosis);
    const text = `*Hasil Diagnosa Techyst*\n\n📅 Tanggal: ${new Date(record.date).toLocaleDateString("id-ID")}\n⚠️ Diagnosa: ${record.diagnosis}\n💰 Estimasi Biaya: ${estimate}\n\n_Dianalisa oleh AI Techyst_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <Sheet open={!!record} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto sm:max-w-xl w-full flex flex-col h-full">
        {record && (
          <>
            <div className="flex-1 space-y-6 mt-6">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <AlertTriangle className="text-amber-500 h-6 w-6" />
                  Detail Diagnosa
                </SheetTitle>
                <SheetDescription>Dianalisa pada {new Date(record.date).toLocaleString("id-ID")}</SheetDescription>
              </SheetHeader>

              <div className="rounded-xl overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={record.imagePreview} alt="Full Scan" className="w-full h-auto max-h-[300px] object-contain bg-black/5" />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-1">
                    <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Banknote className="h-3 w-3" /> ESTIMASI BIAYA
                    </h4>
                    <p className="text-sm font-bold">{getPriceEstimate(record.diagnosis)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted border space-y-1">
                    <h4 className="text-xs font-bold flex items-center gap-1">
                      <Cpu className="h-3 w-3" /> KOMPONEN
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{(record.components || []).join(", ")}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">Diagnosa AI</h4>
                  <p className="text-sm">{record.diagnosis}</p>
                </div>

                {record.analysis && (
                  <div className="p-4 rounded-lg bg-muted border space-y-1">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      Analisa Visual
                    </h4>
                    <p className="text-sm text-muted-foreground mr-4">{record.analysis}</p>
                  </div>
                )}

                {record.recommendation && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 space-y-1">
                    <h4 className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Rekomendasi Perbaikan
                    </h4>
                    <p className="text-sm">{record.recommendation}</p>
                  </div>
                )}
              </div>
            </div>

            <SheetFooter className="mt-6 pt-4 border-t">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Kirim Laporan ke WhatsApp
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
