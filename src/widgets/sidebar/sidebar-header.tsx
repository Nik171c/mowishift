import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/shared/ui/button";

type SidebarHeaderProps = {
  collapsed: boolean;
  isMobile: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
};

export function SidebarHeader({
  collapsed,
  isMobile,
  onToggleCollapse,
  onClose,
}: SidebarHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b px-4">
      {!collapsed && (
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight">
            MowiShift
          </h1>

          <p className="text-xs text-muted-foreground">Workforce Management</p>
        </div>
      )}

      {collapsed && !isMobile && (
        <div className="flex w-full justify-center">
          <span className="text-2xl font-bold text-primary">M</span>
        </div>
      )}

      <div className="ml-auto flex items-center">
        {isMobile ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="size-5" />
            ) : (
              <ChevronLeft className="size-5" />
            )}
          </Button>
        )}
      </div>
    </header>
  );
}
