import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface CommandInputProps extends React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
> {}

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-slate-200 px-3">
    <Search className="mr-2 h-4 w-4 text-slate-400" />

    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full bg-transparent text-sm outline-none placeholder:text-slate-400",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;
