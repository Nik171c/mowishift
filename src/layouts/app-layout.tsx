import { Outlet } from "react-router-dom";

import { AppHeader } from "@/widgets/app-header";
import { AppSidebar } from "@/widgets/sidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
          <AppHeader />

          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
