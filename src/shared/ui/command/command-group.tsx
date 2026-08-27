import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/shared/lib/utils";

export interface CommandGroupProps extends React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
> {}

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      [
        "overflow-hidden",
        "p-2",
        "text-slate-900",

        "[&_[cmdk-group-heading]]:px-2",
        "[&_[cmdk-group-heading]]:pb-2",
        "[&_[cmdk-group-heading]]:pt-1",
        "[&_[cmdk-group-heading]]:text-xs",
        "[&_[cmdk-group-heading]]:font-semibold",
        "[&_[cmdk-group-heading]]:uppercase",
        "[&_[cmdk-group-heading]]:tracking-wider",
        "[&_[cmdk-group-heading]]:text-slate-400",
      ].join(" "),
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;
