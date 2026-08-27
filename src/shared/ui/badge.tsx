import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-slate-100 text-slate-800",

        primary: "border-transparent bg-sky-100 text-sky-700",

        success: "border-transparent bg-emerald-100 text-emerald-700",

        warning: "border-transparent bg-amber-100 text-amber-700",

        danger: "border-transparent bg-red-100 text-red-700",

        info: "border-transparent bg-cyan-100 text-cyan-700",

        outline: "border-slate-300 bg-white text-slate-700",
      },

      size: {
        sm: "h-5 px-2 text-[11px]",
        default: "h-6 px-2.5",
        lg: "h-7 px-3 text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}
