import { ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";

export function HeaderUser() {
  return (
    <Button variant="ghost" className="h-10 gap-3 px-2">
      <Avatar className="h-9 w-9">
        <AvatarFallback>MN</AvatarFallback>
      </Avatar>

      <div className="hidden flex-col items-start lg:flex">
        <span className="text-sm font-medium">Mowi Admin</span>

        <span className="text-xs text-muted-foreground">Administrator</span>
      </div>

      <ChevronDown className="hidden h-4 w-4 lg:block" />
    </Button>
  );
}
