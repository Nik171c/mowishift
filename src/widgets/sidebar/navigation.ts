import {
  CalendarDays,
  ClipboardList,
  FileText,
  Gauge,
  LayoutDashboard,
  Settings,
  Users,
  Bell,
  ArrowLeftRight,
  Clock3,
} from "lucide-react";

import type { NavigationGroup } from "./types";

export const navigation: NavigationGroup[] = [
  {
    id: "planning",
    title: "Planlegging",
    items: [
      {
        id: "dashboard",
        title: "Oversikt",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        id: "shift-plan",
        title: "Skiftplan",
        href: "/shifts",
        icon: CalendarDays,
      },
      {
        id: "extravakt",
        title: "Extravakt (laurdag)",
        href: "/extravakt",
        icon: Clock3,
      },
      {
        id: "shift-exchange",
        title: "Bytte av skift",
        href: "/shift-exchange",
        icon: ArrowLeftRight,
      },
    ],
  },

  {
    id: "administration",
    title: "Administrasjon",
    items: [
      {
        id: "employees",
        title: "Tilsette",
        href: "/tilsette",
        icon: Users,
      },
      {
        id: "documents",
        title: "Dokument",
        href: "/documents",
        icon: FileText,
      },
      {
        id: "alerts",
        title: "Varsel",
        href: "/alerts",
        icon: Bell,
      },
    ],
  },

  {
    id: "system",
    title: "System",
    items: [
      {
        id: "settings",
        title: "Innstillingar",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
