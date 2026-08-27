import { Search } from "lucide-react";

import { Input } from "@/shared/ui/input";

export function HeaderSearch() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input placeholder="Search..." className="pl-10" />
    </div>
  );
}
