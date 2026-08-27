import { Building2, Fish, Package, Users } from "lucide-react";

type DashboardStat = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  background: string;
};

const stats: DashboardStat[] = [
  {
    title: "Tilsette",
    value: 48,
    subtitle: "aktive medarbeidarar",
    icon: Users,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    title: "Mi avdeling",
    value: 18,
    subtitle: "på jobb",
    icon: Building2,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  {
    title: "Produksjon",
    value: 15,
    subtitle: "aktive skift",
    icon: Fish,
    color: "text-red-500",
    background: "bg-red-50",
  },
  {
    title: "Filet",
    value: 15,
    subtitle: "aktive skift",
    icon: Package,
    color: "text-orange-500",
    background: "bg-orange-50",
  },
];

export function DashboardStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm text-slate-400">{stat.subtitle}</p>
              </div>

              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  transition-all
                  duration-300
                  group-hover:scale-110
                  ${stat.background}
                `}
              >
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
