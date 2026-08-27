import type { ReplacementRequestStatus } from "../data/replacement-requests-data";

interface RequestStatusProps {
  status: ReplacementRequestStatus;
}

const statusConfig = {
  pending: {
    label: "Ventar på svar",
    className: "border-amber-200 bg-amber-50 text-amber-600",
    dotClassName: "bg-amber-500",
  },

  approved: {
    label: "Godkjend",
    className: "border-emerald-200 bg-emerald-50 text-emerald-600",
    dotClassName: "bg-emerald-500",
  },

  rejected: {
    label: "Avslått",
    className: "border-red-200 bg-red-50 text-red-600",
    dotClassName: "bg-red-500",
  },
};

export function RequestStatus({ status }: RequestStatusProps) {
  const config = statusConfig[status];

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "rounded-full border px-2 py-1",
        "whitespace-nowrap text-[9px] font-medium",
        config.className,
      ].join(" ")}
    >
      <span
        className={["h-1.5 w-1.5 rounded-full", config.dotClassName].join(" ")}
      />

      {config.label}
    </span>
  );
}
