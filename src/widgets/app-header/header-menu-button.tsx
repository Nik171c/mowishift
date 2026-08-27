import { Menu } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useSidebar } from "@/widgets/sidebar";

export function HeaderMenuButton() {
  const { isMobile, open } = useSidebar();

  if (!isMobile) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Open navigation"
      onClick={open}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
