import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/shared/lib/utils";

export interface CommandSeparatorProps extends React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
> {}

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-2 my-2 h-px bg-slate-200", className)}
    {...props}
  />
));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
