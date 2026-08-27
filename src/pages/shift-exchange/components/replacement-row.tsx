import { CheckCircle2, Circle, Clock3, UserCircle2 } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";

import type { ReplacementEmployee } from "../types";

type ReplacementRowProps = {
  employee: ReplacementEmployee;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function ReplacementRow({
  employee,
  selected,
  onSelect,
}: ReplacementRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-2xl border p-5 transition-all",
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
      )}
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        {/* Avatar */}

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <UserCircle2 className="h-10 w-10 text-slate-500" />
        </div>

        {/* Info */}

        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-900">
            {employee.name}
          </h4>

          <p className="text-sm text-slate-500">{employee.department}</p>

          <div className="flex items-center gap-5 pt-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock3 className="h-3.5 w-3.5" />
              {employee.workedHours} t denne veka
            </div>

            <div className="text-xs text-slate-500">{employee.position}</div>
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <Badge
          className={cn(
            "rounded-full px-3 py-1 font-medium",
            employee.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700",
          )}
        >
          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />

          {employee.status}
        </Badge>

        <button
          type="button"
          onClick={() => onSelect(employee.id)}
          className="transition-transform hover:scale-105"
        >
          {selected ? (
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
          ) : (
            <Circle className="h-6 w-6 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
}
