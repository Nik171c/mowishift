import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

export interface DataTableSearchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

export function DataTableSearch({
  value,
  onChange,
  className,
  placeholder = "Søk...",
  ...props
}: DataTableSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400
        "
      />

      <Input
        value={value}
        placeholder={placeholder}
        className={cn("pl-10", className)}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}
