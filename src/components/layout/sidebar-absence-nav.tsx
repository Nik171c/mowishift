import { ArrowLeftRight, CalendarOff, UserRoundPlus } from "lucide-react";

import { NavLink } from "react-router-dom";

import { Button } from "@/shared/ui/button";

const absenceItems = [
  {
    label: "Registrer fråvær",
    href: "/fravaer/registrer?step=1",
    icon: CalendarOff,
  },
  {
    label: "Finn erstattar",
    href: "/fravaer/registrer?step=2",
    icon: UserRoundPlus,
  },
  {
    label: "Avtal vakt",
    href: "/fravaer/registrer?step=3",
    icon: ArrowLeftRight,
  },
];

export default function SidebarAbsenceNav() {
  return (
    <div className="space-y-1">
      {/* Fråvær heading */}

      <div className="px-3 pb-1 pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Fråvær
        </span>
      </div>

      {absenceItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink key={item.href} to={item.href}>
            {({ isActive }) => (
              <Button
                type="button"
                variant="ghost"
                className={[
                  "h-10 w-full justify-start gap-3 px-3 pl-5",
                  isActive
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "font-medium text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-[18px] w-[18px] shrink-0 items-center justify-center",
                    isActive ? "text-blue-600" : "text-slate-400",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <span className="min-w-0 truncate text-left">{item.label}</span>
              </Button>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}
