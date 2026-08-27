import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogClose = DialogPrimitive.Close;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      `
      fixed inset-0 z-50
      bg-black/50
      backdrop-blur-sm

      data-[state=open]:animate-in
      data-[state=closed]:animate-out

      data-[state=open]:fade-in-0
      data-[state=closed]:fade-out-0
      `,
      className,
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `
        fixed
        left-1/2
        top-1/2
        z-50

        w-full
        max-w-xl

        -translate-x-1/2
        -translate-y-1/2

        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl

        data-[state=open]:animate-in
        data-[state=closed]:animate-out

        data-[state=open]:zoom-in-95
        data-[state=closed]:zoom-out-95

        duration-200
        `,
        className,
      )}
      {...props}
    >
      {children}

      <DialogClose
        className="
          absolute
          right-4
          top-4

          rounded-md

          p-1

          text-slate-400

          transition-colors

          hover:bg-slate-100
          hover:text-slate-900
        "
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
        border-b
        border-slate-200
        p-6
        `,
        className,
      )}
      {...props}
    />
  );
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      `
      text-xl
      font-semibold
      text-slate-900
      `,
      className,
    )}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      `
      mt-2
      text-sm
      leading-6
      text-slate-500
      `,
      className,
    )}
    {...props}
  />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
        flex
        justify-end
        gap-3

        border-t
        border-slate-200

        p-6
        `,
        className,
      )}
      {...props}
    />
  );
}
