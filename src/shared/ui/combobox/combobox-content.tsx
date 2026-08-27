import * as React from "react";

import { PopoverContent } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";

export interface ComboboxContentProps extends React.ComponentPropsWithoutRef<
  typeof PopoverContent
> {}

export function ComboboxContent({ className, ...props }: ComboboxContentProps) {
  return (
    <PopoverContent className={cn("w-[380px] p-0", className)} {...props} />
  );
}
