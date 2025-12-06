"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trash2, Calendar, AlertTriangle, Eye, Wrench, CheckCircle2, Cpu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useScanHistory, ScanRecord } from "@/hooks/use-scan-history";

export default function HistoryPage() {
  const { history, clearHistory } = useScanHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ScanRecord | null>(null);

  const filteredHistory = history.filter((record) => record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) || record.components.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Riwayat Servis</h2>
          <p className="text-muted-foreground">Daftar diagnosa yang pernah dilakukan.</p>
        </div>
        {history.length > 0 && (
          <Button variant="destructive" size="sm" onClick={clearHistory}>
            <Trash2 className="mr-2 h-4 w-4" />
            Hapus Semua
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari kerusakan atau komponen..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
              <p className="text-lg font-medium">Belum ada riwayat</p>
              <p className="text-sm text-muted-foreground">Mulai scan pertama Anda untuk melihat data di sini.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHistory.map((record) => (
                <Card key={record.id} className="overflow-hidden hover:shadow-md transition border-2 hover:border-primary/20 cursor-pointer group" onClick={() => setSelectedRecord(record)}>
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
                      {record.diagnosis}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex flex-wrap gap-1">
                      {record.components.slice(0, 3).map((comp, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px] h-5">
                          {comp}
                        </Badge>
                      ))}
                      {record.components.length > 3 && (
                        <Badge variant="outline" className="text-[10px] h-5">
                          +{record.components.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* DETAIL SHEET */}
      <Sheet open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <SheetContent className="overflow-y-auto sm:max-w-xl w-full">
          {selectedRecord && (
            <div className="space-y-6 mt-6">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <AlertTriangle className="text-amber-500 h-6 w-6" />
                  Detail Diagnosa
                </SheetTitle>
                <SheetDescription>Dianalisa pada {new Date(selectedRecord.date).toLocaleString("id-ID")}</SheetDescription>
              </SheetHeader>

              <div className="rounded-xl overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedRecord.imagePreview} alt="Full Scan" className="w-full h-auto max-h-[300px] object-contain bg-black/5" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                    <Cpu className="h-4 w-4" /> Komponen Terdeteksi
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.components.map((c, i) => (
                      <Badge key={i} variant="outline">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">Diagnosa AI</h4>
                  <p className="text-sm">{selectedRecord.diagnosis}</p>
                </div>

                {/* Tampilkan Analysis & Recommendation jika ada (dari data baru) */}
                {selectedRecord.analysis && (
                  <div className="p-4 rounded-lg bg-muted border space-y-1">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      Analisa Visual
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedRecord.analysis}</p>
                  </div>
                )}

                {selectedRecord.recommendation && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 space-y-1">
                    <h4 className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Rekomendasi Perbaikan
                    </h4>
                    <p className="text-sm">{selectedRecord.recommendation}</p>
                  </div>
                )}

                {!selectedRecord.analysis && (
                  <div className="p-4 rounded-lg bg-muted/50 border border-dashed text-center">
                    <p className="text-xs text-muted-foreground">Detail analisa lengkap tidak tersedia untuk riwayat lama.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
