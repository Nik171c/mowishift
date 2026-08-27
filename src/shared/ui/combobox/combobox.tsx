import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/shared/ui/command";

import { Button } from "@/shared/ui/button";

import { ComboboxItem } from "./combobox-item";

import { ComboboxLoading } from "./combobox-loading";

import type { ComboboxProps } from "./types";

export function Combobox<T>({
  items,
  value,
  placeholder = "Vel...",
  searchPlaceholder = "Søk...",
  emptyMessage = "Ingen resultat.",
  loading = false,
  disabled = false,
  className,
  onValueChange,
  getKey,
  getLabel,
  renderItem,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = React.useMemo(() => {
    if (!value) return placeholder;

    return getLabel(value);
  }, [value, placeholder, getLabel]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled} className={className}>
          {selectedLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />

          <CommandList>
            {loading ? (
              <ComboboxLoading />
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>

                <CommandGroup>
                  {items.map((item) => (
                    <ComboboxItem
                      key={getKey(item)}
                      selected={value ? getKey(item) === getKey(value) : false}
                      onSelect={() => {
                        onValueChange?.(item);
                        setOpen(false);
                      }}
                    >
                      {renderItem ? renderItem(item) : getLabel(item)}
                    </ComboboxItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
