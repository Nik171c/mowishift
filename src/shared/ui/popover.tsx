import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/shared/lib/utils";

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> {}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      align = "start",
      sideOffset = 8,
      collisionPadding = 12,
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          [
            "z-50",
            "w-72",
            "rounded-xl",
            "border",
            "border-slate-200",
            "bg-white",
            "p-2",
            "shadow-xl",
            "outline-none",

            "data-[state=open]:animate-in",
            "data-[state=closed]:animate-out",

            "data-[state=open]:fade-in-0",
            "data-[state=closed]:fade-out-0",

            "data-[state=open]:zoom-in-95",
            "data-[state=closed]:zoom-out-95",

            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
          ].join(" "),
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;
