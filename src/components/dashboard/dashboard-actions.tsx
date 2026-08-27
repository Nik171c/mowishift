import {
  ArrowRight,
  CalendarPlus,
  PencilLine,
  UserCheck,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

type ActionCard = {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  onClick?: () => void;
};

export function DashboardActions() {
  const navigate = useNavigate();

  const actions: ActionCard[] = [
    {
      title: "Opprett skift",
      description: "Lag ny skiftplan",
      icon: CalendarPlus,
      gradient: "from-blue-600 to-blue-500",
    },
    {
      title: "Endre turnus",
      description: "Rediger skiftplan",
      icon: PencilLine,
      gradient: "from-emerald-600 to-green-500",
    },
    {
      title: "Registrer fråvær",
      description: "Registrer fråvær og finn erstattar",
      icon: UserCheck,
      gradient: "from-amber-400 to-yellow-500",
      onClick: () => navigate("/fravaer/registrer"),
    },
    {
      title: "Finn vikar",
      description: "Finn erstatning",
      icon: RefreshCw,
      gradient: "from-violet-600 to-purple-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            type="button"
            onClick={action.onClick}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              bg-gradient-to-r
              ${action.gradient}
              p-6
              text-left
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              active:scale-[0.98]
            `}
          >
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Icon className="h-7 w-7" />
              </div>

              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <div className="relative mt-8">
              <h3 className="text-xl font-semibold">{action.title}</h3>

              <p className="mt-2 text-sm text-white/90">{action.description}</p>
            </div>
          </button>
        );
      })}
    </section>
  );
}
