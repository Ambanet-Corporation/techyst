import { Calendar, Eye, AlertTriangle, Hash, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScanRecord } from "@/hooks/use-scan-history";

interface HistoryListProps {
  records: ScanRecord[];
  onSelect: (record: ScanRecord) => void;
}

export function HistoryList({ records, onSelect }: HistoryListProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-white/10 rounded-xl bg-white/5">
        <div className="p-4 rounded-full bg-slate-900 border border-white/10">
          <Hash className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-bold font-sans">DATABASE_EMPTY</p>
          <p className="text-sm font-mono text-muted-foreground mt-1">NO_RECORDS_FOUND_IN_LOCAL_STORAGE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {records.map((record) => (
        <Card key={record.id} className="group relative overflow-hidden border border-white/10 bg-slate-950/50 hover:border-primary/50 transition-all duration-300 cursor-pointer" onClick={() => onSelect(record)}>
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          </div>

          <div className="flex p-4 gap-4">
            <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-slate-900 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={record.imagePreview} alt="Scan result" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="rounded-none border-white/10 bg-white/5 text-[10px] font-mono text-muted-foreground h-5 px-1.5">
                    {record.id.slice(0, 8).toUpperCase()}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(record.date).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                  </span>
                </div>

                <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">{record.diagnosis || "Unknown Error Detected"}</h4>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1 overflow-hidden">
                  {(record.components || []).slice(0, 2).map((comp, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                      {comp}
                    </span>
                  ))}
                  {(record.components || []).length > 2 && <span className="text-[10px] font-mono px-1.5 py-0.5 text-muted-foreground">+{(record.components || []).length - 2}</span>}
                </div>
                <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>

          <div className="h-1 w-full bg-white/5 mt-0 group-hover:bg-primary/20 transition-colors">
            <div className="h-full bg-primary/50 w-0 group-hover:w-full transition-all duration-700 ease-out" />
          </div>
        </Card>
      ))}
    </div>
  );
}
