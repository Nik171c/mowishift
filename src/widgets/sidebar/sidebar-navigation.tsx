import { ScrollArea } from "@/shared/ui/scroll-area";

import { navigation } from "./navigation";
import { SidebarNavigationItem } from "./sidebar-navigation-item";

type SidebarNavigationProps = {
  collapsed: boolean;
  onNavigate?: () => void;
};

export function SidebarNavigation({
  collapsed,
  onNavigate,
}: SidebarNavigationProps) {
  return (
    <ScrollArea className="h-full">
      <nav className="flex flex-col gap-8">
        {navigation.map((group) => (
          <section key={group.id}>
            {!collapsed && (
              <h2
                className="
                  mb-4
                  px-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                {group.title}
              </h2>
            )}

            <div className="space-y-2">
              {group.items.map((item) => (
                <SidebarNavigationItem
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        ))}
      </nav>
    </ScrollArea>
  );
}
