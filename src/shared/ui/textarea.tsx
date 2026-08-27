import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const textareaVariants = cva(
  [
    "flex w-full rounded-xl border border-slate-300 bg-white px-3 py-2",
    "text-sm shadow-sm",
    "placeholder:text-slate-400",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-sky-500",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "resize-none",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "min-h-[80px]",
        default: "min-h-[120px]",
        lg: "min-h-[180px]",
      },

      resize: {
        none: "resize-none",
        vertical: "resize-y",
        both: "resize",
      },
    },

    defaultVariants: {
      size: "default",
      resize: "none",
    },
  },
);

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, resize, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          textareaVariants({
            size,
            resize,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
