import * as React from "react";
import { ArrowDownUp, ArrowDown, ArrowUp } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import type { DataTableColumn } from "./types";

export interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[];

  sortBy?: string;

  sortDirection?: "asc" | "desc";

  onSort?: (columnId: string) => void;
}

export function DataTableHeader<T>({
  columns,
  sortBy,
  sortDirection,
  onSort,
}: DataTableHeaderProps<T>) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50">
      <tr>
        {columns.map((column) => {
          const active = sortBy === column.id;

          return (
            <th
              key={column.id}
              style={{ width: column.width }}
              className={cn(
                "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500",
                column.align === "center" && "text-center",
                column.align === "right" && "text-right",
              )}
            >
              {column.sortable ? (
                <button
                  type="button"
                  onClick={() => onSort?.(column.id)}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    transition-colors
                    hover:text-sky-600
                  "
                >
                  {column.header}

                  {active ? (
                    sortDirection === "asc" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowDownUp className="h-4 w-4 opacity-50" />
                  )}
                </button>
              ) : (
                column.header
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
