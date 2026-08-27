import { Filter, Home, Search } from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import {
  replacementRequests,
  type ReplacementRequest,
} from "./data/replacement-requests-data";

import { ReplacementRequestTable } from "./components/replacement-request-table";

import { ReplacementRequestDetails } from "./components/replacement-request-details";

type RequestTab = "pending" | "approved" | "rejected" | "all";

const tabs: {
  value: RequestTab;
  label: string;
}[] = [
  {
    value: "pending",
    label: "Ventar på svar",
  },
  {
    value: "approved",
    label: "Godkjende",
  },
  {
    value: "rejected",
    label: "Avslåtte",
  },
  {
    value: "all",
    label: "Alle",
  },
];

export default function ReplacementRequests() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<RequestTab>("pending");

  const [selectedRequest, setSelectedRequest] =
    useState<ReplacementRequest | null>(replacementRequests[0] ?? null);

  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return replacementRequests.filter((request) => {
      const matchesTab = activeTab === "all" || request.status === activeTab;

      const matchesSearch =
        !query ||
        request.employee.toLowerCase().includes(query) ||
        request.replacement.toLowerCase().includes(query) ||
        request.department.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const pendingCount = replacementRequests.filter(
    (request) => request.status === "pending",
  ).length;

  const approvedCount = replacementRequests.filter(
    (request) => request.status === "approved",
  ).length;

  const rejectedCount = replacementRequests.filter(
    (request) => request.status === "rejected",
  ).length;

  const handleHover = (request: ReplacementRequest) => {
    setSelectedRequest(request);
  };

  return (
    <main className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-5">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Førespurnader om byte
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Sjå og handter førespurnader om skiftbyte.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            className="h-10 px-4 text-xs"
          >
            <Home className="mr-2 h-4 w-4" />
            Hovudside
          </Button>
        </header>

        {/* =====================================================
            TABS
        ====================================================== */}

        <div className="mt-8 border-b border-slate-200">
          <div className="flex items-center gap-7">
            {tabs.map((tab) => {
              const active = activeTab === tab.value;

              const count =
                tab.value === "pending"
                  ? pendingCount
                  : tab.value === "approved"
                    ? approvedCount
                    : tab.value === "rejected"
                      ? rejectedCount
                      : replacementRequests.length;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={[
                    "relative flex items-center gap-2 pb-3 text-xs font-medium",
                    active
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900",
                  ].join(" ")}
                >
                  {tab.label}

                  <span
                    className={[
                      "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[9px]",
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {count}
                  </span>

                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* ===================================================
              TABLE CARD
          ==================================================== */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* TOOLBAR */}

            <div className="flex items-center gap-3 border-b border-slate-100 p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Søk etter tilsett..."
                  className="h-10 pl-10 text-xs"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-10 px-4 text-xs"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>

            {/* TABLE */}

            <div className="p-3">
              {filteredRequests.length > 0 ? (
                <ReplacementRequestTable
                  requests={filteredRequests}
                  selectedRequest={selectedRequest}
                  onHover={handleHover}
                />
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">
                    Ingen førespurnader funne.
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
              <p className="text-[10px] text-slate-500">
                Viser 1 til {filteredRequests.length} av{" "}
                {replacementRequests.length} førespurnader
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-300"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-[10px] font-semibold text-white"
                >
                  1
                </button>

                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          {/* ===================================================
              DETAILS
          ==================================================== */}

          <ReplacementRequestDetails request={selectedRequest} />
        </div>
      </div>
    </main>
  );
}
