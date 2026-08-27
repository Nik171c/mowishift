// src/shared/ui/sheet.tsx

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm",
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0",
      "data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetContentProps extends React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> {
  side?: SheetSide;
}

const sideClasses: Record<SheetSide, string> = {
  top: cn(
    "inset-x-0 top-0 border-b",
    "data-[state=open]:slide-in-from-top",
    "data-[state=closed]:slide-out-to-top",
  ),

  bottom: cn(
    "inset-x-0 bottom-0 border-t",
    "data-[state=open]:slide-in-from-bottom",
    "data-[state=closed]:slide-out-to-bottom",
  ),

  left: cn(
    "inset-y-0 left-0 h-full w-80 border-r sm:max-w-sm",
    "data-[state=open]:slide-in-from-left",
    "data-[state=closed]:slide-out-to-left",
  ),

  right: cn(
    "inset-y-0 right-0 h-full w-80 border-l sm:max-w-sm",
    "data-[state=open]:slide-in-from-right",
    "data-[state=closed]:slide-out-to-right",
  ),
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />

    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col gap-4 bg-white p-6 shadow-xl",
        "transition ease-in-out",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "duration-300",
        sideClasses[side],
        className,
      )}
      {...props}
    >
      {children}

      <SheetPrimitive.Close
        className={cn(
          "absolute right-4 top-4 rounded-md p-2",
          "text-slate-500 transition-colors",
          "hover:bg-slate-100",
          "hover:text-slate-900",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-slate-300",
        )}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));

SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-left", className)}
    {...props}
  />
);

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-slate-900", className)}
    {...props}
  />
));

SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500", className)}
    {...props}
  />
));

SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
