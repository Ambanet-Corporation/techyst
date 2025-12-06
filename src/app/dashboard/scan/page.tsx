"use client";

import { Wrench } from "lucide-react";
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
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 glass">
              <div className="p-6 bg-muted/50 rounded-full mb-6 animate-pulse">
                <Wrench className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-bold">Area Kerja Kosong</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-2 mb-6">Upload foto mesin HP di panel sebelah kiri untuk memulai diagnosa canggih.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
