import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

export function CommandEmpty() {
  return (
    <CommandPrimitive.Empty className="py-8 text-center text-sm text-slate-500">
      Ingen resultat funne.
    </CommandPrimitive.Empty>
  );
}
