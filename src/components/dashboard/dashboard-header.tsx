import { CalendarDays } from "lucide-react";

export function DashboardHeader() {
  const today = new Intl.DateTimeFormat("nn-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Oversikt
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Velkomen tilbake til MowiShift.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
          <CalendarDays className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-400">I dag</p>

          <p className="text-base font-semibold capitalize text-slate-800">
            {today}
          </p>
        </div>
      </div>
    </section>
  );
}
