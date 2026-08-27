import * as React from "react";

import { CommandList } from "@/shared/ui/command";

export interface ComboboxListProps extends React.ComponentPropsWithoutRef<
  typeof CommandList
> {}

export function ComboboxList(props: ComboboxListProps) {
  return <CommandList className="max-h-80" {...props} />;
}
