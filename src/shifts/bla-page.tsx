import {
  CalendarDays,
  Eye,
  History,
  PencilLine,
  Plus,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useMowiShiftStore } from "@/data/mowishift-store";

export default function BlaSkiftplanPage() {
  const navigate = useNavigate();

  const current = useMowiShiftStore((state) => state.blaCurrent);

  const history = useMowiShiftStore((state) => state.blaHistory);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <button
            type="button"
            onClick={() => navigate("/opprett-skift")}
            className="mb-3 text-xs font-semibold text-blue-600"
          >
            ← Tilbake til avdelingar
          </button>

          <h1 className="text-2xl font-bold text-slate-900">
            Blå avdeling (Fastpakking)
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gjeldande grafikk og historikk.
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-5 py-4 text-xs font-semibold text-blue-900">
          <p>✣ 5 pausar per skift</p>

          <p className="mt-1">＋ 2–3 tilsette per pause</p>

          <p className="mt-1">◈ 10–15 tilsette per skift</p>
        </div>
      </div>

      {!current ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

          <p className="mt-3 text-sm text-slate-500">
            Ingen publisert grafikk enno.
          </p>

          <button
            type="button"
            onClick={() => navigate("/opprett-skift")}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Opprett grafikk
          </button>
        </div>
      ) : (
        <>
          {/* =================================================
              CURRENT
          ================================================= */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Gjeldande grafikk
                </h2>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
                  <span>▣ Veke {current.weekNumber}</span>

                  <span>
                    {current.dates[0]} –{" "}
                    {current.dates[current.dates.length - 1]}
                  </span>

                  <span>◷ {current.shift.name}</span>

                  <span className="rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                    Publisert
                  </span>
                </div>

                <p className="mt-2 text-[11px] text-slate-400">
                  Versjon {current.version}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/opprett-skift/bla/overview")}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  <Eye className="h-4 w-4" />
                  Se grafikk
                </button>

                {/* SECOND EDIT */}
                <button
                  type="button"
                  onClick={() => navigate("/opprett-skift?edit=current")}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  <PencilLine className="h-4 w-4" />
                  Rediger grafikk
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
              HISTORY
          ================================================= */}

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Tidlegare grafikk
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">Siste 4 versjonar</p>

            {history.length === 0 ? (
              <p className="mt-5 text-sm text-slate-500">
                Ingen arkiverte versjonar enno.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-slate-100">
                {history.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-3 py-4 md:flex-row md:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Veke {item.weekNumber}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.shift.name} · Versjon {item.version}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {item.dates[0]} – {item.dates[item.dates.length - 1]}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-600">
                        Arkivert
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          alert("Historisk grafikk er skrivebeskytta.")
                        }
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-blue-600"
                      >
                        Se grafikk
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mt-5 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">
            <p className="flex items-center gap-2 font-bold">
              <ShieldCheck className="h-4 w-4" />
              Viktig
            </p>

            <p className="mt-2 text-xs leading-5">
              Når admin redigerer gjeldande grafikk, blir den gamle publiserte
              versjonen automatisk flytta til historikk.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
