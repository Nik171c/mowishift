import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

type ReplacementSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ReplacementSearch({ value, onChange }: ReplacementSearchProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Heading */}

      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Finn medarbeidar
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Søk etter namn eller filtrer lista.
        </p>
      </div>

      {/* Search */}

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Søk etter medarbeidar..."
            className="h-11 rounded-xl border-slate-200 pl-11 shadow-none"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl border-slate-200 px-4"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
