import { Link } from "react-router-dom";

type SidebarLogoProps = {
  collapsed: boolean;
};

export function SidebarLogo({ collapsed }: SidebarLogoProps) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-4 transition-all duration-300"
    >
      <div
        className="
          relative
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          bg-gradient-to-br
          from-slate-900
          via-slate-800
          to-slate-700
          shadow-md
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:shadow-lg
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-white/15
            via-transparent
            to-transparent
          "
        />

        <span
          className="
            relative
            text-2xl
            font-black
            tracking-tight
            text-white
          "
        >
          M
        </span>
      </div>

      {!collapsed && (
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight text-slate-900">
            MowiShift
          </h1>

          <p className="mt-0.5 text-sm text-slate-500">Workforce Management</p>
        </div>
      )}
    </Link>
  );
}
