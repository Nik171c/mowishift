import * as React from "react";
import { Check } from "lucide-react";

import { CommandItem } from "@/shared/ui/command";
import { cn } from "@/shared/lib/utils";

export interface ComboboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CommandItem>,
  "children"
> {
  children: React.ReactNode;

  selected?: boolean;

  leftSection?: React.ReactNode;

  description?: React.ReactNode;

  badge?: React.ReactNode;

  rightSection?: React.ReactNode;
}

export function ComboboxItem({
  children,
  selected = false,
  leftSection,
  description,
  badge,
  rightSection,
  className,
  ...props
}: ComboboxItemProps) {
  return (
    <CommandItem
      selected={selected}
      className={cn("py-3", className)}
      {...props}
    >
      {leftSection && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          {leftSection}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-slate-900">
            {children}
          </span>

          {badge}
        </div>

        {description && (
          <div className="mt-1 truncate text-xs text-slate-500">
            {description}
          </div>
        )}
      </div>

      {rightSection}

      {selected && (
        <Check
          className="ml-2 h-4 w-4 shrink-0 text-sky-600"
          strokeWidth={2.5}
        />
      )}
    </CommandItem>
  );
}
