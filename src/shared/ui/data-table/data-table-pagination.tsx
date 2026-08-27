import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

export interface DataTablePaginationProps {
  page: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  page,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 p-4">
      <p className="text-sm text-slate-500">
        Side {page} av {totalPages}
      </p>

      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
