import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const skeletonVariants = cva(
  ["animate-pulse", "rounded-xl", "bg-slate-200", "dark:bg-slate-800"].join(
    " ",
  ),
  {
    variants: {
      variant: {
        default: "",

        circle: "rounded-full",

        text: "rounded-md",

        card: "rounded-2xl",
      },

      size: {
        xs: "h-3",

        sm: "h-4",

        default: "h-5",

        lg: "h-8",

        xl: "h-12",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SkeletonProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({
  className,
  variant,
  size,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        skeletonVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}
