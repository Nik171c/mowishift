import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DataTableToolbar({
  className,
  children,
  ...props
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
