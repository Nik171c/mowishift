import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/shared/lib/utils";

export interface CommandProps extends React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
> {}

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      [
        "flex",
        "h-full",
        "w-full",
        "flex-col",
        "overflow-hidden",
        "rounded-xl",
        "bg-white",
        "text-slate-900",
      ].join(" "),
      className,
    )}
    {...props}
  />
));

Command.displayName = CommandPrimitive.displayName;
