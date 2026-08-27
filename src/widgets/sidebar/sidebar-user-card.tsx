import { demoUser } from "./types";

type SidebarUserCardProps = {
  collapsed: boolean;
};

export function SidebarUserCard({ collapsed }: SidebarUserCardProps) {
  if (collapsed) {
    return null;
  }

  return (
    <div
      className="
        mt-6
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={demoUser.avatar}
            alt={demoUser.name}
            className="
              h-16
              w-16
              rounded-full
              object-cover
            "
          />

          {demoUser.online && (
            <span
              className="
                absolute
                bottom-0
                right-0
                h-4
                w-4
                rounded-full
                border-2
                border-white
                bg-emerald-500
              "
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-lg
              font-semibold
              text-slate-900
            "
          >
            {demoUser.name}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {demoUser.role}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span
              className="
                text-xs
                font-medium
                text-emerald-600
              "
            >
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
