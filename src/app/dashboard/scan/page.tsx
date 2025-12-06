"use client";

import { useState, useRef } from "react";
import { Upload, Send, Loader2, Cpu, AlertTriangle, CheckCircle2, Wrench, Sparkles, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useScanHistory } from "@/hooks/use-scan-history";

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

  const { addRecord } = useScanHistory();

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

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        addRecord({
          imagePreview: base64String,
          components: data.detected_components,
          diagnosis: data.diagnosis,
          analysis: data.analysis,
          recommendation: data.recommendation,
        });
      };

      setResult(data);
      toast.success("Diagnosa Selesai!");

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
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-5/12 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col overflow-hidden border-2 border-dashed border-primary/20 bg-muted/10 relative hover:border-primary/50 transition-colors duration-300 glass">
            {!previewUrl ? (
              <div onClick={() => fileInputRef.current?.click()} className="flex-1 flex flex-col items-center justify-center cursor-pointer p-10 text-center group">
                <div className="bg-background p-6 rounded-full mb-6 shadow-xl group-hover:scale-110 transition duration-300">
                  <ImagePlus className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upload Foto PCB</h3>
                <p className="text-muted-foreground mt-2 max-w-xs">Tap di sini untuk mengambil foto mesin HP yang rusak</p>
                <span className="mt-6 px-4 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">Support AI Vision</span>
              </div>
            ) : (
              <div className="relative flex-1 bg-black/80 flex items-center justify-center overflow-hidden group">
                <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setPreviewUrl(null);
                      setImageFile(null);
                      setResult(null);
                    }}
                  >
                    Ganti Foto Lain
                  </Button>
                </div>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </Card>

          {imageFile && !result && (
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full text-lg h-16 font-bold shadow-xl shadow-primary/30 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Sedang Menganalisa...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-6 w-6 fill-yellow-400 text-yellow-400" />
                  Mulai Diagnosa AI
                </>
              )}
            </Button>
          )}
        </div>

        <div className="w-full md:w-7/12 flex flex-col gap-4 h-full overflow-hidden">
          {result ? (
            <Card className="flex-1 flex flex-col overflow-hidden shadow-2xl border-none glass">
              <div className="flex-1 overflow-y-auto p-0 scrollbar-thin">
                <div className="p-6 space-y-6">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-bold text-lg">
                      <Cpu className="h-5 w-5" />
                      <h3>Komponen Terdeteksi</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.detected_components.map((comp, i) => (
                        <Badge key={i} variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-sm">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        <h4>Diagnosa Kerusakan</h4>
                      </div>
                      <p className="text-sm leading-relaxed opacity-90">{result.diagnosis}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold mb-2">
                        <Wrench className="h-5 w-5" />
                        <h4>Rekomendasi Perbaikan</h4>
                      </div>
                      <p className="text-sm leading-relaxed opacity-90">{result.recommendation}</p>
                    </motion.div>
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-background/40 border space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-blue-500">
                      <CheckCircle2 className="h-5 w-5" />
                      <h4>Analisa Visual</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.analysis}</p>
                  </motion.div>
                </div>

                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-t px-6 py-3 font-semibold flex items-center gap-2 text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Konsultasi Live dengan Suhu AI
                </div>

                <div className="p-4 space-y-4 min-h-[150px]">
                  {chatMessages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted/80 backdrop-blur text-foreground rounded-bl-none border")}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isChatting && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-3 rounded-bl-none flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div className="p-4 bg-background/50 backdrop-blur border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Tanya detail kerusakan..." className="flex-1 bg-background/50" disabled={isChatting} />
                  <Button type="submit" size="icon" disabled={isChatting || !inputMessage.trim()} className="bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 glass">
              <div className="p-6 bg-muted/50 rounded-full mb-6 animate-pulse">
                <Wrench className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-bold">Area Kerja Kosong</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2 mb-6">Upload foto mesin HP di panel sebelah kiri untuk memulai diagnosa canggih.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
