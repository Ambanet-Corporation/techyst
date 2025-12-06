"use client";

import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScanHistory, ScanRecord } from "@/hooks/use-scan-history";
import { HistoryList } from "@/components/history/history-list";
import { HistoryDetailSheet } from "@/components/history/history-detail-sheet";

export default function HistoryPage() {
  const { history, clearHistory } = useScanHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<ScanRecord | null>(null);

  const filteredHistory = history.filter((record) => {
    const diagnosisMatch = (record.diagnosis || "").toLowerCase().includes(searchTerm.toLowerCase());
    const componentsMatch = (record.components || []).some((c) => (c || "").toLowerCase().includes(searchTerm.toLowerCase()));
    return diagnosisMatch || componentsMatch;
  });

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
          <HistoryList records={filteredHistory} onSelect={(record) => setSelectedRecord(record)} />
        </CardContent>
      </Card>

      <HistoryDetailSheet record={selectedRecord} onClose={() => setSelectedRecord(null)} />
    </div>
  );
}
