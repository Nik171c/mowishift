import * as React from "react";

import { cn } from "@/shared/lib/utils";

import { EmptyState } from "@/shared/ui/empty-state";

import { DataTableBody } from "./data-table-body";
import { DataTableHeader } from "./data-table-header";
import { DataTableLoading } from "./data-table-loading";

import type { DataTableProps } from "./types";

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyTitle = "Ingen data",
  emptyDescription,
  className,
  getRowKey,
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return <DataTableLoading />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white",
        className,
      )}
    >
      <table className="w-full border-collapse">
        <DataTableHeader columns={columns} />

        <DataTableBody
          data={data}
          columns={columns}
          getRowKey={getRowKey}
          onRowClick={onRowClick}
        />
      </table>
    </div>
  );
}
