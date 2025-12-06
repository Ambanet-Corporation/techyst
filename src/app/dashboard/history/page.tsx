"use client";

import { useState } from "react";
import { Search, Trash2, Database, Filter } from "lucide-react";
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
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sans text-foreground flex items-center gap-3">
            <Database className="h-8 w-8 text-primary" />
            DIAGNOSIS_LOGS
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">// ARCHIVED_DATA: {history.length} RECORDS FOUND</p>
        </div>
        {history.length > 0 && (
          <Button variant="destructive" size="sm" onClick={clearHistory} className="border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-mono text-xs">
            <Trash2 className="mr-2 h-4 w-4" />
            PURGE_ALL_DATA
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 bg-card/40 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by diagnosis or component ID..." className="pl-10 bg-slate-950/50 border-white/10 font-mono text-sm focus-visible:ring-primary/50" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-white/5 font-mono text-xs hidden md:flex">
          <Filter className="mr-2 h-3 w-3" />
          FILTER
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        <HistoryList records={filteredHistory} onSelect={(record) => setSelectedRecord(record)} />
      </div>

      <HistoryDetailSheet record={selectedRecord} onClose={() => setSelectedRecord(null)} />
    </div>
  );
}
