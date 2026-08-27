import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      required: {
        true: "",
        false: "",
      },

      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },

    defaultVariants: {
      required: false,
      size: "default",
    },
  },
);

export interface LabelProps
  extends
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, size, children, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants({
          required,
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </LabelPrimitive.Root>
  );
});

Label.displayName = LabelPrimitive.Root.displayName;
