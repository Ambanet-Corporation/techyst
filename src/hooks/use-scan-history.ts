"use client";

import { useState, useEffect } from "react";

export interface ScanRecord {
  id: string;
  date: string;
  imagePreview: string;
  components: string[];
  diagnosis: string;
}

const STORAGE_KEY = "techyst_history";

export function useScanHistory() {
  const [history, setHistory] = useState<ScanRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const addRecord = (record: Omit<ScanRecord, "id" | "date">) => {
    const newRecord: ScanRecord = {
      ...record,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addRecord, clearHistory };
}
