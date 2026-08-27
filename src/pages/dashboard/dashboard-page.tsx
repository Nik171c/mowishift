import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMessages } from "@/components/dashboard/dashboard-messages";
import { DashboardShiftRequests } from "@/components/dashboard/dashboard-shift-requests";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      <DashboardActions />

      <section className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <DashboardShiftRequests />

        <DashboardMessages />
      </section>
    </div>
  );
}
