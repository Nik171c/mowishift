import { SidebarFooter } from "./sidebar-footer";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarUserCard } from "./sidebar-user-card";
import { useSidebar } from "./sidebar-context";

export function AppSidebar() {
  const { collapsed, mobileOpen, isMobile, toggleCollapsed, close } =
    useSidebar();

  return (
    <>
      {isMobile && mobileOpen && (
        <button
          type="button"
          onClick={close}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          flex-col
          border-r
          border-slate-200
          bg-white
          transition-all
          duration-300

          ${collapsed ? "w-24" : "w-80"}

          ${
            isMobile
              ? mobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
      >
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <SidebarLogo collapsed={collapsed} />

            {!isMobile && (
              <button
                type="button"
                onClick={toggleCollapsed}
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                ←
              </button>
            )}
          </div>

          <SidebarUserCard collapsed={collapsed} />
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <SidebarNavigation collapsed={collapsed} onNavigate={close} />
        </div>

        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}
