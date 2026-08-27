import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface CommandItemProps extends React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
> {
  selected?: boolean;
}

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, children, selected, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      [
        "relative",
        "flex",
        "cursor-pointer",
        "select-none",
        "items-center",
        "gap-3",
        "rounded-lg",
        "px-3",
        "py-2.5",
        "text-sm",
        "outline-none",

        "data-[selected=true]:bg-sky-50",
        "data-[selected=true]:text-sky-700",

        "data-[disabled=true]:pointer-events-none",
        "data-[disabled=true]:opacity-50",
      ].join(" "),
      className,
    )}
    {...props}
  >
    <div className="flex flex-1 items-center gap-3">{children}</div>

    {selected && <Check className="h-4 w-4 text-sky-600" strokeWidth={2.5} />}
  </CommandPrimitive.Item>
));

CommandItem.displayName = CommandPrimitive.Item.displayName;
