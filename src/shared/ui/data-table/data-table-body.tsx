import * as React from "react";

import { DataTableRow } from "./data-table-row";
import type { DataTableColumn } from "./types";

export interface DataTableBodyProps<T> {
  data: T[];

  columns: DataTableColumn<T>[];

  getRowKey: (item: T) => string;

  onRowClick?: (item: T) => void;
}

export function DataTableBody<T>({
  data,
  columns,
  getRowKey,
  onRowClick,
}: DataTableBodyProps<T>) {
  return (
    <tbody>
      {data.map((item) => (
        <DataTableRow
          key={getRowKey(item)}
          item={item}
          columns={columns}
          onClick={onRowClick}
        />
      ))}
    </tbody>
  );
}
