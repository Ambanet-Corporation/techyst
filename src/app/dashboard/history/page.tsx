"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trash2, Calendar, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScanHistory } from "@/hooks/use-scan-history";

export default function HistoryPage() {
  const { history, clearHistory } = useScanHistory();
  const [searchTerm, setSearchTerm] = useState("");

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
                <Card key={record.id} className="overflow-hidden hover:shadow-md transition border-2 hover:border-primary/20">
                  <div className="aspect-video w-full bg-muted relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={record.imagePreview} alt="Scan result" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(record.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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

              {filteredHistory.length === 0 && searchTerm && <div className="col-span-full text-center py-12 text-muted-foreground">Tidak ditemukan riwayat dengan kata kunci &quot;{searchTerm}&quot;</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
