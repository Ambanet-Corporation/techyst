"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { compressImage } from "@/lib/utils";
import { useScanHistory } from "@/hooks/use-scan-history";

export interface AnalysisResult {
  detected_components?: string[];
  analysis?: string;
  diagnosis?: string;
  recommendation?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function useScan() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  const { addRecord } = useScanHistory();

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Format File Tidak Didukung", {
        description: "Harap upload file gambar (JPG, PNG, WEBP).",
      });
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("Ukuran File Terlalu Besar", {
        description: "Maksimal ukuran file adalah 20MB.",
      });
      return;
    }

    try {
      const compressedFile = await compressImage(file);
      setImageFile(compressedFile);
      setPreviewUrl(URL.createObjectURL(compressedFile));
      setResult(null);
      setChatMessages([]);
      toast.info("Foto Siap Dianalisa", {
        description: "Klik tombol 'Mulai Diagnosa AI' untuk melanjutkan.",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Gagal Memproses Gambar", {
        description: "Terjadi kesalahan saat mengompresi gambar. Silakan coba foto lain.",
      });
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setImageFile(null);
    setResult(null);
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
          components: data.detected_components || [],
          diagnosis: data.diagnosis || "Tidak ada diagnosa spesifik",
          analysis: data.analysis || "",
          recommendation: data.recommendation || "",
        });
      };

      setResult(data);
      toast.success("Diagnosa Selesai!", {
        description: "AI telah berhasil menganalisa kerusakan.",
      });

      setChatMessages([
        {
          role: "assistant",
          content: `Saya sudah menganalisa board ini. ${data.diagnosis || ""} Ada yang mau ditanyakan detailnya?`,
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Analisa Gagal", {
        description: "Terjadi gangguan koneksi ke AI atau format gambar tidak terbaca. Silakan coba lagi.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = { role: "user", content: message };
    const updatedMessages = [...chatMessages, newMessage];

    setChatMessages(updatedMessages);
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
      toast.error("Gagal Mengirim Pesan", {
        description: "Periksa koneksi internet Anda.",
      });
    } finally {
      setIsChatting(false);
    }
  };

  return {
    imageFile,
    previewUrl,
    isAnalyzing,
    result,
    chatMessages,
    isChatting,
    handleFileChange,
    handleReset,
    handleAnalyze,
    handleSendMessage,
  };
}
