"use client";

import { useState, useEffect } from "react";
import { get, set, del } from "idb-keyval";

export interface ScanRecord {
  id: string;
  date: string;
  imagePreview: string;
  components: string[];
  diagnosis: string;
  analysis?: string;
  recommendation?: string;
}

const STORAGE_KEY = "techyst_history";

export function useScanHistory() {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get(STORAGE_KEY).then((val) => {
      if (val) setHistory(val);
      setIsLoading(false);
    });
  }, []);

  const addRecord = (record: Omit<ScanRecord, "id" | "date">) => {
    const newRecord: ScanRecord = {
      ...record,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);
    set(STORAGE_KEY, updatedHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    del(STORAGE_KEY);
  };

  return { history, addRecord, clearHistory, isLoading };
}
