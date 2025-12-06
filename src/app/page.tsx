"use client";

import Link from "next/link";
import { ArrowRight, Activity, Smartphone, Wrench, History, Zap, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScanHistory } from "@/hooks/use-scan-history";

export default function DashboardPage() {
  const { history } = useScanHistory();
  const lastDiagnosis = history.length > 0 ? history[0] : null;

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Dashboard Teknisi</h2>
          <p className="text-muted-foreground mt-1 text-lg">Pantau performa dan diagnosa harian Anda.</p>
        </div>
        <Button asChild size="lg" className="shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-none">
          <Link href="/dashboard/scan">
            <Zap className="mr-2 h-5 w-5" />
            Mulai Diagnosa Baru
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass glass-hover overflow-hidden relative border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Diagnosa</CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{history.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Kali penggunaan AI bulan ini</p>
          </CardContent>
        </Card>

        <Card className="glass glass-hover overflow-hidden relative border-l-4 border-l-violet-500">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Model AI Aktif</CardTitle>
            <Smartphone className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Llama 4 Vision</div>
            <p className="text-xs text-muted-foreground mt-1">Mode: High Precision Reasoning</p>
          </CardContent>
        </Card>

        <Card className="glass glass-hover overflow-hidden relative border-l-4 border-l-green-500">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status Sistem</CardTitle>
            <ShieldCheck className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Optimal</div>
            <p className="text-xs text-muted-foreground mt-1">API Latency: 45ms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4 glass border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Aktivitas Terakhir
            </CardTitle>
            <CardDescription>Diagnosa terbaru yang berhasil diselesaikan.</CardDescription>
          </CardHeader>
          <CardContent>
            {lastDiagnosis ? (
              <div className="flex items-center gap-4 p-4 border rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/80 transition cursor-pointer">
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0 border shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lastDiagnosis.imagePreview} alt="Last scan" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-bold text-lg leading-none line-clamp-1">{lastDiagnosis.diagnosis}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {new Date(lastDiagnosis.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/history">Detail</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                <div className="p-4 bg-muted/50 rounded-full mb-3">
                  <Wrench className="h-8 w-8 opacity-50" />
                </div>
                <p className="font-medium">Belum ada riwayat perbaikan</p>
                <Button variant="link" asChild className="mt-2 text-primary">
                  <Link href="/dashboard/scan">Mulai Scan Pertama</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl -ml-16 -mb-16" />

          <CardHeader className="relative z-10">
            <CardTitle className="text-xl">Tips Suhu 🛠️</CardTitle>
            <CardDescription className="text-slate-300">Maksimalkan fitur AI Assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            <p className="text-sm leading-relaxed text-slate-300">
              &ldquo;Jangan ragu bertanya hal teknis mendalam. AI Techyst dilatih membaca skematik dan mengenali jalur tegangan. Coba tanya: <span className="italic text-white">&apos;Jalur V-Bat ke mana saja?&apos;</span>&rdquo;
            </p>
            <Button variant="default" className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold" asChild>
              <Link href="/dashboard/scan">Konsultasi Sekarang</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
