import { cn } from "@/shared/lib/utils";

const tabs = [
  {
    id: "new",
    title: "Ny førespurnad",
    count: null,
    active: true,
  },
  {
    id: "requests",
    title: "Førespurnader",
    count: 4,
    active: false,
  },
  {
    id: "recommended",
    title: "Tilrådde",
    count: 2,
    active: false,
  },
  {
    id: "history",
    title: "Historikk",
    count: 36,
    active: false,
  },
];

export function ShiftTabs() {
  return (
    <div className="border-b border-slate-200">
      <nav className="flex items-end gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={cn(
              "relative flex h-12 items-center gap-2 border-b-2 px-0 text-[14px] font-semibold transition-colors",
              tab.active
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900",
            )}
          >
            <span>{tab.title}</span>

            {tab.count !== null && (
              <span
                className={cn(
                  "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-semibold",
                  tab.active
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-700",
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
