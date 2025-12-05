"use client";

import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing-navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Cpu, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="h-full min-h-screen bg-slate-950 overflow-auto">
      <LandingNavbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-4 space-y-8 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center rounded-lg bg-slate-800 px-3 py-1 text-sm font-medium text-slate-200 mb-4">
            <Zap className="mr-2 h-4 w-4 text-yellow-400" />
            Ditenagai AI Vision & LLM
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Asisten Digital Pintar untuk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500">Teknisi HP Indonesia</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Identifikasi komponen motherboard secara instan dan dapatkan panduan perbaikan berbasis AI. Solusi inklusif untuk UMKM servis HP agar lebih cepat dan akurat.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 text-lg px-8 h-12 rounded-full">
              Coba Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#fitur">
            <Button size="lg" variant="outline" className="text-white border-slate-700 hover:bg-slate-800 text-lg px-8 h-12 rounded-full">
              Pelajari Cara Kerja
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full px-4">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center hover:border-sky-500/50 transition duration-300">
            <div className="p-3 bg-sky-500/10 rounded-full mb-4">
              <Cpu className="h-8 w-8 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Deteksi Komponen</h3>
            <p className="text-slate-400 text-sm">Upload foto PCB, AI akan mendeteksi IC Power, CPU, dan jalur vital secara visual.</p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center hover:border-violet-500/50 transition duration-300">
            <div className="p-3 bg-violet-500/10 rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Diagnosa Akurat</h3>
            <p className="text-slate-400 text-sm">Konsultasikan gejala kerusakan (Amper gantung, Short) dan dapatkan solusi langkah demi langkah.</p>
          </div>

          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center hover:border-pink-500/50 transition duration-300">
            <div className="p-3 bg-pink-500/10 rounded-full mb-4">
              <Zap className="h-8 w-8 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bahasa Bengkel</h3>
            <p className="text-slate-400 text-sm">AI dilatih dengan istilah teknisi lokal. Tidak perlu pusing dengan bahasa Inggris teknis yang rumit.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
