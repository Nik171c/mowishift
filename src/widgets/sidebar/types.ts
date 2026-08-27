import type { LucideIcon } from "lucide-react";

export type SidebarItem = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
};

export type SidebarGroup = {
  id: string;
  title: string;
  items: SidebarItem[];
};

export type SidebarUser = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  online: boolean;
};

export type SidebarContextType = {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;

  toggleCollapsed: () => void;
  toggleMobile: () => void;
  close: () => void;
};

export const demoUser: SidebarUser = {
  id: "1",
  name: "Monika Olsen",
  role: "Administrator",
  company: "Mowi Norway AS",
  avatar: "https://i.pravatar.cc/150?img=47",
  online: true,
};
