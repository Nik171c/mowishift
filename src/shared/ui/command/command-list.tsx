import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/shared/lib/utils";

export interface CommandListProps extends React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
> {}

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-80 overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;
