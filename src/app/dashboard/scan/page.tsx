"use client";

import { ScanLine } from "lucide-react";
import { ScanSkeleton } from "@/components/scan-skeleton";
import { useScan } from "@/hooks/use-scan";
import { ScanUploader } from "@/components/scan/scan-uploader";
import { ScanResults } from "@/components/scan/scan-results";
import { ScanChat } from "@/components/scan/scan-chat";

export default function ScanPage() {
  const { imageFile, previewUrl, isAnalyzing, result, chatMessages, isChatting, handleFileChange, handleReset, handleAnalyze, handleSendMessage } = useScan();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <ScanUploader previewUrl={previewUrl} isAnalyzing={isAnalyzing} result={result} onFileChange={handleFileChange} onReset={handleReset} onAnalyze={handleAnalyze} />

        {isAnalyzing ? (
          <div className="w-full md:w-7/12 flex flex-col gap-4 h-full overflow-hidden">
            <ScanSkeleton />
          </div>
        ) : result ? (
          <ScanResults result={result}>
            <ScanChat messages={chatMessages} isChatting={isChatting} onSendMessage={handleSendMessage} />
          </ScanResults>
        ) : (
          <div className="w-full md:w-7/12 flex flex-col gap-4 h-full overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-xl bg-slate-950/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />

              <div className="p-6 bg-white/5 rounded-full mb-6 relative group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <ScanLine className="w-12 h-12 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                <div className="absolute inset-0 rounded-full border border-primary/20 scale-125 animate-pulse opacity-0 group-hover:opacity-100" />
              </div>

              <h3 className="text-xl font-bold font-sans tracking-tight text-foreground">WORKSTATION STANDBY</h3>
              <p className="text-muted-foreground text-xs font-mono mt-2 max-w-xs mx-auto">
                WAITING FOR INPUT STREAM...
                <br />
                PLEASE INITIALIZE SCAN SEQUENCE.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
