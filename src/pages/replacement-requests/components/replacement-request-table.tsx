import { UserRound } from "lucide-react";

import type { ReplacementRequest } from "../data/replacement-requests-data";

import { RequestStatus } from "./request-status";

interface ReplacementRequestTableProps {
  requests: ReplacementRequest[];
  selectedRequest: ReplacementRequest | null;
  onHover: (request: ReplacementRequest) => void;
}

export function ReplacementRequestTable({
  requests,
  selectedRequest,
  onHover,
}: ReplacementRequestTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-4 py-3 text-left text-[9px] font-semibold text-slate-500">
                Erstattar
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Dato
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Skift
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Avdeling
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Pause
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Arbeidsplass
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Status
              </th>

              <th className="px-3 py-3 text-left text-[9px] font-semibold text-slate-500">
                Svar innan
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => {
              const isSelected = selectedRequest?.id === request.id;

              return (
                <tr
                  key={request.id}
                  onMouseEnter={() => onHover(request)}
                  className={[
                    "cursor-pointer border-b border-slate-100",
                    "transition-colors duration-150",
                    "last:border-b-0",
                    isSelected ? "bg-blue-50" : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <EmployeeAvatar name={request.replacement} />

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-slate-900">
                          {request.replacement}
                        </p>

                        <p className="text-[8px] text-slate-500">
                          for {request.employee}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-[9px] text-slate-700">
                    {request.date}
                  </td>

                  <td className="px-3 py-3">
                    <p className="text-[9px] font-medium text-slate-800">
                      {request.shift}
                    </p>

                    <p className="mt-0.5 text-[8px] text-slate-500">
                      ({request.fromTime} – {request.toTime})
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <p className="text-[9px] text-slate-700">
                      {request.department}
                    </p>

                    <p className="mt-0.5 text-[8px] text-slate-400">
                      {request.workplace}
                    </p>
                  </td>

                  <td className="px-3 py-3 text-[9px] text-slate-700">
                    {request.pause}
                  </td>

                  <td className="px-3 py-3 text-[9px] text-slate-700">
                    {request.workplace}
                  </td>

                  <td className="px-3 py-3">
                    <RequestStatus status={request.status} />
                  </td>

                  <td className="px-3 py-3 text-[9px] text-slate-600">
                    {request.responseDeadline}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
      {initial}
    </div>
  );
}
