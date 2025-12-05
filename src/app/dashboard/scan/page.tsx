"use client";

import { useState, useRef } from "react";
import { Upload, Send, Loader2, Cpu, AlertTriangle, CheckCircle2, Wrench } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  detected_components: string[];
  analysis: string;
  diagnosis: string;
  recommendation: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ScanPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatting, setIsChatting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setChatMessages([]);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menganalisa gambar");
      }

      setResult(data);
      toast.success("Diagnosa Selesai!");

      // Tambahkan konteks awal ke chat
      setChatMessages([
        {
          role: "assistant",
          content: `Saya sudah menganalisa board ini. ${data.diagnosis} Ada yang mau ditanyakan detailnya?`,
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat analisa.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = { role: "user", content: inputMessage };
    const updatedMessages = [...chatMessages, newMessage];

    setChatMessages(updatedMessages);
    setInputMessage("");
    setIsChatting(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (data.role && data.content) {
        setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch (error) {
      toast.error("Gagal mengirim pesan");
    } finally {
      setIsChatting(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col overflow-hidden border-2 border-dashed relative">
            {!previewUrl ? (
              <div onClick={() => fileInputRef.current?.click()} className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition p-10 text-center">
                <div className="bg-primary/10 p-6 rounded-full mb-4">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Upload Foto PCB</h3>
                <p className="text-muted-foreground mt-2">Klik untuk ambil foto atau upload gambar mesin HP</p>
                <span className="text-xs text-muted-foreground mt-4 px-3 py-1 bg-muted rounded-full">Support JPG, PNG (Max 5MB)</span>
              </div>
            ) : (
              <div className="relative flex-1 bg-black/5 flex items-center justify-center overflow-hidden">
                <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4 shadow-lg"
                  onClick={() => {
                    setPreviewUrl(null);
                    setImageFile(null);
                    setResult(null);
                  }}
                >
                  Ganti Foto
                </Button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </Card>

          {imageFile && !result && (
            <Button size="lg" onClick={handleAnalyze} disabled={isAnalyzing} className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Sedang Menganalisa...
                </>
              ) : (
                <>
                  <Cpu className="mr-2 h-6 w-6" />
                  Mulai Diagnosa AI
                </>
              )}
            </Button>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4 h-full overflow-hidden">
          {result ? (
            <Card className="flex-1 flex flex-col overflow-hidden shadow-md border-primary/20">
              <div className="flex-1 overflow-y-auto p-0">
                <div className="p-6 space-y-6">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Cpu className="h-5 w-5" />
                      <h3>Komponen Terdeteksi</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.detected_components.map((comp, i) => (
                        <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                        <AlertTriangle className="h-5 w-5" />
                        <h4>Diagnosa Kerusakan</h4>
                      </div>
                      <p className="text-sm leading-relaxed">{result.diagnosis}</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold">
                        <Wrench className="h-5 w-5" />
                        <h4>Rekomendasi Perbaikan</h4>
                      </div>
                      <p className="text-sm leading-relaxed">{result.recommendation}</p>
                    </motion.div>
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-muted/50 border space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      <h4>Analisa Visual</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.analysis}</p>
                  </motion.div>
                </div>

                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-6 py-3 font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Konsultasi Teknisi AI
                </div>

                <div className="p-4 space-y-4 min-h-[200px]">
                  {chatMessages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted text-foreground rounded-bl-none border")}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isChatting && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-3 rounded-bl-none flex gap-1 items-center">
                        <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div className="p-4 bg-background border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Tanya detail kerusakan..." className="flex-1" disabled={isChatting} />
                  <Button type="submit" size="icon" disabled={isChatting || !inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl bg-muted/10">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Wrench className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium">Belum ada data</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2">Upload foto mesin HP di sebelah kiri dan klik &quot;Mulai Diagnosa&quot; untuk melihat hasil analisa AI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
