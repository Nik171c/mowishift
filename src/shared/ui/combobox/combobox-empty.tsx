import * as React from "react";
import { SearchX } from "lucide-react";

export interface ComboboxEmptyProps {
  title?: string;
  description?: string;
}

export function ComboboxEmpty({
  title = "Ingen resultat",
  description = "Prøv eit anna søkjeord.",
}: ComboboxEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10">
      <div className="mb-4 rounded-full bg-slate-100 p-3">
        <SearchX className="h-6 w-6 text-slate-500" strokeWidth={2} />
      </div>

      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>

      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}
