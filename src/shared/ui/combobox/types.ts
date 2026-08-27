import * as React from "react";

export interface ComboboxProps<T> {
  items: T[];

  value?: T;

  placeholder?: string;

  searchPlaceholder?: string;

  emptyMessage?: string;

  disabled?: boolean;

  loading?: boolean;

  className?: string;

  onValueChange?: (value: T) => void;

  getKey: (item: T) => string;

  getLabel: (item: T) => string;

  renderItem?: (item: T) => React.ReactNode;
}
