import { Calendar, Eye, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScanRecord } from "@/hooks/use-scan-history";

interface HistoryListProps {
  records: ScanRecord[];
  onSelect: (record: ScanRecord) => void;
}

export function HistoryList({ records, onSelect }: HistoryListProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
        <p className="text-lg font-medium">Belum ada riwayat</p>
        <p className="text-sm text-muted-foreground">Mulai scan pertama Anda untuk melihat data di sini.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {records.map((record) => (
        <Card key={record.id} className="overflow-hidden hover:shadow-md transition border-2 hover:border-primary/20 cursor-pointer group" onClick={() => onSelect(record)}>
          <div className="aspect-video w-full bg-muted relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={record.imagePreview} alt="Scan result" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(record.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Badge variant="secondary" className="px-3 py-1">
                <Eye className="w-3 h-3 mr-2" />
                Lihat Detail
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-bold line-clamp-2 flex items-start gap-2 min-h-[3rem]">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
              {record.diagnosis || "Tanpa Judul Diagnosa"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex flex-wrap gap-1">
              {(record.components || []).slice(0, 3).map((comp, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] h-5">
                  {comp}
                </Badge>
              ))}
              {(record.components || []).length > 3 && (
                <Badge variant="outline" className="text-[10px] h-5">
                  +{(record.components || []).length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
