import { ArrowLeftRight, MessageSquare } from "lucide-react";

import type { ReplacementRequest } from "../data/replacement-requests-data";

import { RequestStatus } from "./request-status";

interface ReplacementRequestDetailsProps {
  request: ReplacementRequest | null;
}

export function ReplacementRequestDetails({
  request,
}: ReplacementRequestDetailsProps) {
  if (!request) {
    return (
      <aside className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs text-slate-400">
          Hald peikaren over ein førespurnad for å sjå detaljar.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">
        Detaljar førespurnad
      </h2>

      {/* REQUEST HEADER */}

      <div className="mt-5 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <ArrowLeftRight className="h-4 w-4 text-blue-600" />
            </div>

            <span className="text-[10px] font-semibold text-slate-800">
              Førespurnad om byte
            </span>
          </div>

          <RequestStatus status={request.status} />
        </div>

        {/* DETAILS */}

        <div className="divide-y divide-slate-100 px-4">
          <DetailRow label="Fråværande" value={request.employee} />

          <DetailRow label="Erstattar" value={request.replacement} />

          <DetailRow label="Dato" value={request.date} />

          <DetailRow
            label="Vakt"
            value={`${request.shift} (${request.fromTime} – ${request.toTime})`}
          />

          <DetailRow label="Avdeling" value={request.department} />

          <DetailRow label="Pause" value={request.pause} />

          <DetailRow label="Arbeidsplass" value={request.workplace} />

          <DetailRow label="Svar innan" value={request.responseDeadline} />
        </div>
      </div>

      {/* COMMENT */}

      {request.comment && (
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-3.5 w-3.5 text-slate-500" />

            <h3 className="text-xs font-semibold text-slate-700">Kommentar</h3>
          </div>

          <div className="mt-2 rounded-lg bg-slate-50 p-4">
            <p className="text-[10px] leading-5 text-slate-600">
              {request.comment}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 py-3">
      <span className="text-[10px] text-slate-500">{label}</span>

      <span className="max-w-[190px] text-right text-[10px] font-semibold leading-4 text-slate-800">
        {value}
      </span>
    </div>
  );
}
