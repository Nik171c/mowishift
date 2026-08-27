import * as React from "react";
import { Inbox } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center",
  {
    variants: {
      size: {
        sm: "min-h-[180px] p-6",
        default: "min-h-[260px] p-10",
        lg: "min-h-[360px] p-14",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

export interface EmptyStateProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  className,
  size,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        emptyStateVariants({
          size,
        }),
        className,
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
        {icon ?? <Inbox className="h-8 w-8 text-sky-600" strokeWidth={1.8} />}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-900">{title}</h3>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
