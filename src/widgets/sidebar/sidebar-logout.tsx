import { LogOut } from "lucide-react";

import { Button } from "@/shared/ui/button";

type SidebarLogoutProps = {
  collapsed: boolean;
  onLogout?: () => void;
};

export function SidebarLogout({ collapsed, onLogout }: SidebarLogoutProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onLogout}
      className={`
        h-12
        w-full
        rounded-2xl
        transition-colors

        ${collapsed ? "justify-center px-0" : "justify-start px-4"}

        text-slate-600
        hover:bg-red-50
        hover:text-red-600
      `}
    >
      <LogOut className="h-5 w-5" />

      {!collapsed && <span className="ml-3 font-medium">Logg ut</span>}
    </Button>
  );
}
