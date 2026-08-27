import * as React from "react";

import { Skeleton } from "@/shared/ui/skeleton";

export interface DataTableLoadingProps {
  rows?: number;
  columns?: number;
}

export function DataTableLoading({
  rows = 8,
  columns = 6,
}: DataTableLoadingProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 p-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <Skeleton key={columnIndex} className="h-5" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
