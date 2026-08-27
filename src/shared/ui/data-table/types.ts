import * as React from "react";

export interface DataTableColumn<T> {
  id: string;

  header: React.ReactNode;

  width?: number | string;

  align?: "left" | "center" | "right";

  sortable?: boolean;

  render: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];

  columns: DataTableColumn<T>[];

  loading?: boolean;

  emptyTitle?: string;

  emptyDescription?: string;

  className?: string;

  getRowKey: (item: T) => string;

  onRowClick?: (item: T) => void;
}
