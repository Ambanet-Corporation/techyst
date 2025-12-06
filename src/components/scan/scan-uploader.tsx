import { useRef } from "react";
import { ImagePlus, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ScanUploaderProps {
  previewUrl: string | null;
  isAnalyzing: boolean;
  result: any;
  onFileChange: (file: File | undefined) => void;
  onReset: () => void;
  onAnalyze: () => void;
}

export function ScanUploader({ previewUrl, isAnalyzing, result, onFileChange, onReset, onAnalyze }: ScanUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Button variant="secondary" onClick={onReset}>
                Ganti Foto Lain
              </Button>
            </div>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={(e) => onFileChange(e.target.files?.[0])} accept="image/*" className="hidden" />
      </Card>

      {previewUrl && !result && (
        <Button
          size="lg"
          onClick={onAnalyze}
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
  );
}
