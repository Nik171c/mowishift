import { LogOut } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { demoUser } from "./types";

type SidebarFooterProps = {
  collapsed: boolean;
};

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white p-5">
      {!collapsed && (
        <div
          className="
            mb-5
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-4
          "
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={demoUser.avatar}
                alt={demoUser.name}
                className="h-14 w-14 rounded-full object-cover"
              />

              {demoUser.online && (
                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-white
                    bg-emerald-500
                  "
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-900">
                {demoUser.name}
              </h3>

              <p className="truncate text-xs text-slate-500">{demoUser.role}</p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {demoUser.company}
              </p>
            </div>
          </div>
        </div>
      )}

      <Button
        type="button"
        variant="ghost"
        className={`
          h-12
          w-full
          rounded-2xl
          px-4

          ${collapsed ? "justify-center" : "justify-start"}

          text-slate-600
          hover:bg-red-50
          hover:text-red-600
        `}
      >
        <LogOut className="h-5 w-5" />

        {!collapsed && <span className="ml-3 font-medium">Logg ut</span>}
      </Button>
    </footer>
  );
}
