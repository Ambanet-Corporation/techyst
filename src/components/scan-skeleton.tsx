import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ScanSkeleton() {
  return (
    <Card className="flex-1 flex flex-col overflow-hidden shadow-2xl border-none glass">
      <div className="p-6 space-y-6 animate-pulse">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full bg-primary/20" />
            <Skeleton className="h-6 w-48 bg-primary/20" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-5 w-5 rounded bg-amber-500/20" />
              <Skeleton className="h-5 w-32 bg-amber-500/20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[90%]" />
              <Skeleton className="h-3 w-[95%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-dashed border-green-500/30 bg-green-500/5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-5 w-5 rounded bg-green-500/20" />
              <Skeleton className="h-5 w-40 bg-green-500/20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[85%]" />
              <Skeleton className="h-3 w-[90%]" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-background/40 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 bg-blue-500/20" />
            <Skeleton className="h-5 w-36 bg-blue-500/20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[95%]" />
          </div>
        </div>
      </div>

      <div className="mt-auto border-t bg-background/50 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full bg-green-500" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </Card>
  );
}
