import { ArrowRight, ArrowUpDown } from "lucide-react";

type ShiftRequest = {
  id: number;
  employee: string;
  department: string;
  from: string;
  to: string;
  status: "Ny" | "Ventar";
};

const requests: ShiftRequest[] = [
  {
    id: 1,
    employee: "Yuliia Nosachova",
    department: "Produksjon",
    from: "07:00",
    to: "15:00",
    status: "Ny",
  },
  {
    id: 2,
    employee: "Ole Andersen",
    department: "Filet",
    from: "15:00",
    to: "23:00",
    status: "Ventar",
  },
  {
    id: 3,
    employee: "Maria Hansen",
    department: "Pakking",
    from: "23:00",
    to: "07:00",
    status: "Ny",
  },
];

export function DashboardShiftRequests() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Førespurnader om skiftbyte
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Nye førespurnader frå medarbeidarar
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <ArrowUpDown className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                {request.employee.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {request.employee}
                </h3>

                <p className="text-sm text-slate-500">{request.department}</p>

                <p className="mt-1 text-xs text-slate-400">
                  {request.from} → {request.to}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  request.status === "Ny"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {request.status}
              </span>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-blue-600 hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          className="w-full rounded-xl border border-slate-200 py-3 font-medium text-slate-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          Sjå alle førespurnader
        </button>
      </div>
    </section>
  );
}
