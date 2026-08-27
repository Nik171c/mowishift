import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export interface ComboboxTriggerProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  label: string;
}

export function ComboboxTrigger({
  label,
  className,
  ...props
}: ComboboxTriggerProps) {
  return (
    <Button
      variant="outline"
      className={cn("w-full justify-between font-normal", className)}
      {...props}
    >
      <span className="truncate">{label}</span>

      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
}
