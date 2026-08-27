import { NavLink } from "react-router-dom";
import type { NavigationItem } from "./types";

interface SidebarNavigationItemProps {
  item: NavigationItem;
}

export function SidebarNavigationItem({ item }: SidebarNavigationItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      end={item.href === "/"}
      className={({ isActive }) =>
        [
          "sidebar-navigation-item",
          isActive ? "active" : "",
          item.disabled ? "disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
      aria-disabled={item.disabled}
      onClick={(event) => {
        if (item.disabled) {
          event.preventDefault();
        }
      }}
    >
      <Icon size={18} strokeWidth={1.8} />

      <span>{item.title}</span>
    </NavLink>
  );
}
