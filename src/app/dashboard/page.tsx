"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Activity, ArrowUpRight, Cpu, History, ScanLine, Server, ShieldCheck, Zap, Terminal, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScanHistory } from "@/hooks/use-scan-history";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { history } = useScanHistory();

  const recentActivity = history.slice(0, 3);

  const totalScans = history.length;
  const componentsDetected = history.reduce((acc, curr) => acc + (curr.components?.length || 0), 0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sans text-foreground">COMMAND CENTER</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">// STATUS: SYSTEM_ONLINE :: LATENCY: 24ms</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/history">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 font-mono text-xs h-10">
              <Database className="mr-2 h-4 w-4" />
              DATABASE
            </Button>
          </Link>
          <Link href="/dashboard/scan">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] h-10">
              <ScanLine className="mr-2 h-4 w-4" />
              NEW SCAN
            </Button>
          </Link>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px]">
        <motion.div variants={item} className="col-span-1 md:col-span-2 md:row-span-1 p-6 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col h-full justify-between relative z-10">
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-1">SYSTEM HEALTH</h3>
              <div className="flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-2xl font-bold text-foreground tracking-tight">OPERATIONAL</span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 mt-4 overflow-hidden">
              <div className="bg-green-500 h-full w-[98%] shadow-[0_0_10px_#22c55e]" />
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-2">UPTIME: 48H 12M • SERVER: ASIA-JKT-01</p>
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-1 md:row-span-1 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <Zap className="h-5 w-5" />
            <span className="text-xs font-mono font-bold">TOTAL SCANS</span>
          </div>
          <p className="text-4xl font-extrabold text-foreground">{totalScans}</p>
          <p className="text-xs text-muted-foreground mt-1">Lifetime diagnosa</p>
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-1 md:row-span-1 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 backdrop-blur-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 text-violet-400">
            <Cpu className="h-5 w-5" />
            <span className="text-xs font-mono font-bold">AI ENGINE</span>
          </div>
          <p className="text-2xl font-bold text-foreground">Llama 4</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">VISION</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">NLP</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-2 md:row-span-2 p-6 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm relative flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono text-muted-foreground flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              RECENT_LOGS
            </h3>
            <Link href="/dashboard/history" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
              VIEW ALL <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex-1 space-y-3 overflow-hidden">
            {recentActivity.length > 0 ? (
              recentActivity.map((record, i) => (
                <div key={record.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors group flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-slate-900 flex items-center justify-center shrink-0 border border-white/10">
                    <Image src={record.imagePreview} alt="Thumb" fill className="object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity" unoptimized />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground truncate">{record.diagnosis || "Unknown Error"}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      ID: {record.id.slice(0, 8).toUpperCase()} • {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-mono text-muted-foreground">Done</div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-2">
                <History className="h-8 w-8" />
                <p className="text-sm font-mono">NO DATA LOGGED</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="col-span-1 md:col-span-2 md:row-span-1 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 backdrop-blur-sm flex flex-col justify-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-sm font-mono text-amber-400 mb-1 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              COMPONENTS ANALYZED
            </h3>
            <p className="text-4xl font-extrabold text-foreground tracking-tight">{componentsDetected}</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[80%]">Total komponen elektronik yang berhasil diidentifikasi oleh sistem.</p>
          </div>
          <div className="absolute -bottom-4 -right-4 text-amber-500/10 rotate-12">
            <Cpu className="h-32 w-32" />
          </div>
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-2 md:row-span-1 p-6 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/demo/scan-preview.png')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
          <div className="relative z-10 h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2">Upgrade Skill Teknisi?</h3>
            <p className="text-primary-foreground/80 text-sm mb-4 max-w-md">Akses perpustakaan skematik dan panduan perbaikan tingkat lanjut.</p>
            <Button size="sm" variant="secondary" className="w-fit text-xs font-bold" disabled>
              COMING SOON
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
