import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ScanPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Diagnosis</h2>
        <p className="text-muted-foreground">Upload foto motherboard atau komponen HP untuk dianalisa.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Gambar</CardTitle>
            <CardDescription>Format yang didukung: JPG, PNG</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-muted/50 transition cursor-pointer">
              <div className="p-4 bg-muted rounded-full">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Klik untuk upload atau drag & drop</p>
                <p className="text-xs text-muted-foreground">Maksimal ukuran 5MB</p>
              </div>
              <Button variant="secondary">Pilih File</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hasil Analisa</CardTitle>
            <CardDescription>Deteksi komponen dan diagnosa AI akan muncul di sini.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground text-sm">Belum ada gambar yang diupload</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
