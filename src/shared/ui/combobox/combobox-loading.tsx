import * as React from "react";

import { Skeleton } from "@/shared/ui/skeleton";

export interface ComboboxLoadingProps {
  rows?: number;
}

export function ComboboxLoading({ rows = 6 }: ComboboxLoadingProps) {
  return (
    <div className="space-y-1 p-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="
            flex
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
          "
        >
          <Skeleton variant="circle" className="h-10 w-10" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />

            <Skeleton size="sm" className="w-28" />
          </div>

          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      ))}
    </div>
  );
}
