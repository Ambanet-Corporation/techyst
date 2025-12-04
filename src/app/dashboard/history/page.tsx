import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Riwayat Servis</h2>
          <p className="text-muted-foreground">Daftar diagnosa yang pernah dilakukan.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari riwayat..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
            <p className="text-lg font-medium">Belum ada riwayat</p>
            <p className="text-sm text-muted-foreground">Mulai scan pertama Anda untuk melihat data di sini.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
