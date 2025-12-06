"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScanLine, Cpu, Zap, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing-navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <LandingNavbar />

      <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 opacity-50" />

        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM_ONLINE :: V2.0.4
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Mata Kedua untuk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 text-glow">Teknisi Indonesia</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform diagnosa kerusakan HP berbasis AI Vision. Deteksi jalur putus, IC rusak, dan anomali komponen dalam hitungan detik.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard/scan">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-primary/50 rounded-none clip-path-polygon">
                <ScanLine className="mr-2 h-5 w-5" />
                SCAN SEKARANG
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 hover:text-white rounded-none">
                Lihat Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="container mx-auto max-w-5xl mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="cyber-glass rounded-xl overflow-hidden border border-white/10 p-1">
            <div className="bg-slate-950/80 rounded-lg overflow-hidden relative aspect-video flex items-center justify-center group">
              <div className="absolute inset-0 bg-[url('/demo/scan-preview.png')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

              <div className="relative z-20 flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full border-2 border-primary/50 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20" />
                  <ScanLine className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-cyan-400">AI_VISION_MODULE :: ACTIVE</div>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-scan" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 border-t border-white/5 relative bg-slate-950/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Deteksi Komponen",
                desc: "Mengenali IC Power, CPU, EMMC, dan jalur vital secara otomatis dengan presisi tinggi.",
                color: "text-blue-400",
              },
              {
                icon: Zap,
                title: "Diagnosa Instan",
                desc: "Tak perlu menebak. Dapatkan rekomendasi perbaikan berbasis data dalam < 5 detik.",
                color: "text-yellow-400",
              },
              {
                icon: ShieldCheck,
                title: "Database Terpercaya",
                desc: "Dilatih dengan ribuan dataset kerusakan HP populer di pasar Indonesia.",
                color: "text-green-400",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className={`h-12 w-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-sans">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-white/5 text-center text-muted-foreground text-sm font-mono">
        <p>Techyst © 2025. All rights reserved.</p>
      </footer>
    </main>
  );
}
