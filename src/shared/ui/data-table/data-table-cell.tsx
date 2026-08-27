import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface DataTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function DataTableCell({
  className,
  align = "left",
  ...props
}: DataTableCellProps) {
  return (
    <td
      className={cn(
        "px-6 py-4 text-sm text-slate-700",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    />
  );
}
