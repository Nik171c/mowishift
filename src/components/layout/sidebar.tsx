import type { ReactNode } from "react";

import {
  ArrowLeftRight,
  CalendarDays,
  CalendarPlus,
  ChevronRight,
  FileBarChart,
  Home,
  MessageSquare,
  Repeat2,
  Settings,
  Users,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="flex h-screen w-[228px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="flex h-[72px] shrink-0 items-center border-b border-slate-100 px-5">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            M
          </div>

          <span className="text-base font-bold tracking-tight text-slate-900">
            MowiShift
          </span>
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {/* MAIN */}

        <div className="space-y-1">
          <SidebarLink to="/" end label="Hovudside" icon={<Home />} />

          <SidebarLink to="/skift" label="Skift" icon={<CalendarDays />} />

          <SidebarLink
            to="/bytte-av-skift"
            label="Bytte av skift"
            icon={<ArrowLeftRight />}
          />
        </div>

        {/* ===================================================
            FRÅVÆR
        ==================================================== */}

        <div className="mt-6">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Fråvær
          </p>

          <div className="space-y-1">
            <SidebarLink
              to="/fravaer/registrer?step=1"
              label="Registrer fråvær"
              icon={<CalendarPlus />}
            />

            <SidebarLink
              to="/fravaer/registrer?step=2"
              label="Finn erstattar"
              icon={<Users />}
            />

            <SidebarLink
              to="/fravaer/registrer?step=3"
              label="Avtal vakt"
              icon={<CalendarDays />}
            />
          </div>
        </div>

        {/* ===================================================
            OTHER
        ==================================================== */}

        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="space-y-1">
            <SidebarLink to="/tilsette" label="Tilsette" icon={<Users />} />

            <SidebarLink
              to="/meldingar"
              label="Meldingar"
              icon={<MessageSquare />}
              badge="3"
            />

            <SidebarLink
              to="/forespurnader/byte"
              label="Førespurnader om byte"
              icon={<ArrowLeftRight />}
              badge="3"
            />

            <SidebarLink
              to="/forespurnader"
              label="Førespurnader"
              icon={<Repeat2 />}
            />

            <SidebarLink
              to="/rapportar"
              label="Rapportar"
              icon={<FileBarChart />}
            />

            <SidebarLink
              to="/innstillingar"
              label="Innstillingar"
              icon={<Settings />}
            />
          </div>
        </div>
      </nav>

      {/* =====================================================
          USER
      ====================================================== */}

      <div className="shrink-0 border-t border-slate-100 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
            Y
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              Yuliia
            </p>

            <p className="truncate text-xs text-slate-500">Administrator</p>
          </div>
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   SIDEBAR LINK
============================================================ */

function SidebarLink({
  to,
  label,
  icon,
  end = false,
  badge,
}: {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
  badge?: string;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "block rounded-lg",
          isActive ? "bg-blue-50" : "hover:bg-slate-50",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <Button
          type="button"
          variant="ghost"
          className={[
            "h-10 w-full justify-start gap-3 px-3",
            isActive
              ? "font-semibold text-blue-700"
              : "font-medium text-slate-700",
          ].join(" ")}
        >
          <span
            className={[
              "flex h-[18px] w-[18px] shrink-0 items-center justify-center",
              isActive ? "text-blue-600" : "text-slate-500",
            ].join(" ")}
          >
            {icon}
          </span>

          <span className="min-w-0 flex-1 truncate text-left text-xs">
            {label}
          </span>

          {badge && (
            <Badge
              className={[
                "h-5 min-w-5 justify-center rounded-full px-1 text-[10px]",
                isActive ? "bg-blue-600 text-white" : "bg-red-500 text-white",
              ].join(" ")}
            >
              {badge}
            </Badge>
          )}

          {isActive && !badge && (
            <ChevronRight className="h-3.5 w-3.5 text-blue-500" />
          )}
        </Button>
      )}
    </NavLink>
  );
}
