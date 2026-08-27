import { ArrowRight, Check, ExternalLink, Info, Send } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface RequestSentProps {
  absentEmployee: {
    name: string;
    department: string;
  };

  replacement: {
    name: string;
    department: string;
  };

  date: string;
  shift: string;
  department: string;
  pause: string;
  workplace: string;
  fromTime: string;
  toTime: string;

  onSendAnother: () => void;
  onViewRequests: () => void;
  onDashboard: () => void;
}

export function RequestSent({
  absentEmployee,
  replacement,
  date,
  shift,
  department,
  pause,
  workplace,
  fromTime,
  toTime,
  onSendAnother,
  onViewRequests,
  onDashboard,
}: RequestSentProps) {
  return (
    <main className="min-h-full bg-slate-50">
      <div className="mx-auto flex w-full max-w-[900px] justify-center px-5 py-8">
        <section className="w-full rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm sm:px-10">
          {/* =====================================================
              SUCCESS HEADER
          ====================================================== */}

          <div className="flex flex-col items-center text-center">
            {/* Send icon */}

            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                <Send className="h-12 w-12 text-blue-600" strokeWidth={1.8} />
              </div>

              {/* Green check */}

              <div className="absolute -bottom-2 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-500">
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              </div>
            </div>

            <h1 className="mt-7 text-2xl font-bold tracking-tight text-slate-900">
              Førespurnad sendt!
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Førespurnaden er sendt til{" "}
              <span className="font-medium text-slate-700">
                {replacement.name}
              </span>
              .
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Du vil få beskjed når han har svart.
            </p>
          </div>

          {/* =====================================================
              REQUEST DETAILS
          ====================================================== */}

          <div className="mt-8 rounded-xl border border-slate-200 bg-white">
            <div className="px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Detaljar om førespurnaden
              </h2>
            </div>

            <div className="border-t border-slate-100">
              <DetailRow
                label="Fråvær"
                value={`${absentEmployee.name} (${absentEmployee.department})`}
              />

              <DetailRow
                label="Erstattar"
                value={`${replacement.name} (${replacement.department})`}
              />

              <DetailRow label="Dato" value={formatDate(date)} />

              <DetailRow
                label="Vakt"
                value={`${shift} (${fromTime} – ${toTime})`}
              />

              <DetailRow label="Avdeling" value={department} />

              <DetailRow label="Pause" value={pause} />

              <DetailRow label="Arbeidsplass" value={workplace} last />
            </div>
          </div>

          {/* =====================================================
              WHAT HAPPENS NEXT
          ====================================================== */}

          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                <Info className="h-4 w-4 text-blue-600" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-700">
                  Kva skjer no?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {replacement.name} har fått ei førespurnad i appen sin.
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Han kan godkjenne eller avslå vakta.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              ACTIONS
          ====================================================== */}

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={onSendAnother}
              className="h-11 justify-center border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Send ein annan førespurnad
            </Button>

            <Button
              type="button"
              onClick={onViewRequests}
              className="h-11 justify-center bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
            >
              Gå til førespurnader
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* =====================================================
              DASHBOARD
          ====================================================== */}

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onDashboard}
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Tilbake til dashboard
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   DETAIL ROW
============================================================ */

function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={[
        "flex min-h-[48px] items-center justify-between gap-6 px-5 py-3",
        !last && "border-b border-slate-100",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="shrink-0 text-xs font-medium text-slate-500">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   DATE FORMAT
============================================================ */

function formatDate(date: string) {
  if (!date) {
    return "";
  }

  if (date.includes(".")) {
    return date;
  }

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}.${month}.${year}`;
}
