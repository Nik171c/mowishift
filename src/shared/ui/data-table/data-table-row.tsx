import * as React from "react";

import { cn } from "@/shared/lib/utils";

import { DataTableCell } from "./data-table-cell";

import type { DataTableColumn } from "./types";

export interface DataTableRowProps<T> {
  item: T;

  columns: DataTableColumn<T>[];

  onClick?: (item: T) => void;
}

export function DataTableRow<T>({
  item,
  columns,
  onClick,
}: DataTableRowProps<T>) {
  return (
    <tr
      onClick={() => onClick?.(item)}
      className={cn(
        "border-b border-slate-100",
        "transition-colors",
        onClick && "cursor-pointer hover:bg-sky-50",
      )}
    >
      {columns.map((column) => (
        <DataTableCell key={column.id} align={column.align}>
          {column.render(item)}
        </DataTableCell>
      ))}
    </tr>
  );
}
