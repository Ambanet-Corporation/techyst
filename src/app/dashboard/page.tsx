"use client";

import Link from "next/link";
import { ArrowRight, Activity, Smartphone, Wrench, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScanHistory } from "@/hooks/use-scan-history";

export default function DashboardPage() {
  const { history } = useScanHistory();

  const lastDiagnosis = history.length > 0 ? history[0] : null;

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Ringkasan aktivitas perbaikan Anda.</p>
        </div>
        <Button asChild className="hidden sm:flex">
          <Link href="/dashboard/scan">
            Mulai Scan Baru <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diagnosa</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{history.length}</div>
            <p className="text-xs text-muted-foreground">Kali penggunaan AI</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model AI</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Llama 4</div>
            <p className="text-xs text-muted-foreground">Vision & Reasoning Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Sistem</CardTitle>
            <Wrench className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Online</div>
            <p className="text-xs text-muted-foreground">Siap digunakan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aktivitas Terakhir</CardTitle>
            <CardDescription>Diagnosa terbaru yang Anda lakukan.</CardDescription>
          </CardHeader>
          <CardContent>
            {lastDiagnosis ? (
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-muted shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lastDiagnosis.imagePreview} alt="Last scan" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none line-clamp-1">{lastDiagnosis.diagnosis}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lastDiagnosis.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/history">Lihat Detail</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <History className="h-8 w-8 mb-2 opacity-50" />
                <p>Belum ada aktivitas</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/dashboard/scan">Scan HP Sekarang</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Tips Teknisi</CardTitle>
            <CardDescription className="text-primary-foreground/80">Fitur Chatbot AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Gunakan fitur chat untuk bertanya hal spesifik seperti &quot;Berapa suhu aman untuk angkat IC Power?&quot; atau &quot;Persamaan transistor tipe ini apa?&quot;. AI dilatih untuk menjawab pertanyaan teknis.</p>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/dashboard/scan">Coba Chat AI</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
