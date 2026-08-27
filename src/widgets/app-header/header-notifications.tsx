import { Bell } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function HeaderNotifications() {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-5 w-5" />
      </Button>

      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
    </div>
  );
}
