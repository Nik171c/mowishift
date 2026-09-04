import React, { useState } from "react";
import { CalendarDays, ChevronRight, FileText, History, MessageCircle } from "lucide-react";
import type { MowiEmployee } from "@/data/mowishift-store";

type AbsenceData = {
  date: string;
  reason: "sjukdom" | "skade" | "anna";
  shift: { id: string; name: string; start: string; end: string };
  department: string;
  workplace: string;
  replacementEmployeeId?: string;
  message?: string;
};

interface EmployeeAbsenceTabProps {
  employee: MowiEmployee;
  absence?: AbsenceData;
  replacement?: MowiEmployee;
  onNewAbsence?: () => void;
  onGoToShiftExchange?: () => void;
}

type SubTab = "fraver" | "meldinger" | "historia" | "dokument";

const reasonLabels: Record<AbsenceData["reason"], string> = {
  sjukdom: "Sjukdom",
  skade: "Skade",
  anna: "Anna",
};

const departmentLabels: Record<string, string> = {
  bla: "Blå avdeling",
  raud: "Raud avdeling",
  filet: "Filet avdeling",
};

export default function EmployeeAbsenceTab({
  employee,
  absence,
  replacement,
  onNewAbsence,
  onGoToShiftExchange,
}: EmployeeAbsenceTabProps) {
  const [tab, setTab] = useState<SubTab>("fraver");
  const reasonLabel = absence ? reasonLabels[absence.reason] : "Sjukdom";
  const departmentLabel = absence ? (departmentLabels[absence.department] ?? absence.department) : "Blå avdeling";
  const shiftLabel = absence
    ? `${absence.shift.name} (${absence.shift.start} – ${absence.shift.end})`
    : employee.shiftPreference ?? "Dag (07:00 – 15:00)";
  const dateLabel = absence ? formatDate(absence.date) : "29.08.2026";
  const workplace = absence?.workplace ?? employee.workplace ?? "Maskin A3";

  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <nav className="flex h-[64px] items-stretch gap-8 border-b border-slate-200 px-6">
        <SubTab active={tab === "fraver"} icon={<CalendarDays size={20} />} onClick={() => setTab("fraver")}>Fråvær</SubTab>
        <SubTab active={tab === "meldinger"} icon={<MessageCircle size={20} />} onClick={() => setTab("meldinger")}>Meldinger</SubTab>
        <SubTab active={tab === "historia"} icon={<History size={20} />} onClick={() => setTab("historia")}>Historia</SubTab>
        <SubTab active={tab === "dokument"} icon={<FileText size={20} />} onClick={() => setTab("dokument")}>Dokument</SubTab>
      </nav>

      {tab === "fraver" && (
        <div className="p-6">
          <div className="overflow-hidden rounded-2xl border border-red-100 bg-red-50/40">
            <div className="p-6">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <CalendarDays size={30} className="text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-slate-900">{employee.name} er sjuk i dag</h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">{employee.name} vil ikkje jobbe i dag.</p>
                  </div>
                </div>
                <button type="button" onClick={onNewAbsence} className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-200">
                  Ny fråværsregistrering
                </button>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <InfoRow label="Fråvær no" value={<span className="rounded-lg bg-red-100 px-3 py-1 text-[13px] font-semibold text-red-500">{reasonLabel}</span>} />
                <InfoRow label="Dato" value={`${dateLabel} (i dag)`} />
                <InfoRow label="Skift" value={shiftLabel} />
                <InfoRow label="Avdeling" value={departmentLabel} />
                <InfoRow label="Arbeidsplass" value={workplace} />

                <div className="border-t border-slate-100 p-5">
                  <div className="text-sm font-semibold text-slate-800">Erstattet av</div>
                  {replacement ? (
                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">{getInitials(replacement.name)}</div>
                        <div className="shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-800">{replacement.name}</span>
                            <span className="rounded-md bg-emerald-100 px-2 py-1 text-[11px] font-bold text-emerald-600">Godkjent</span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{replacement.role === "operator" ? "Operator" : "Administrator"}</p>
                        </div>
                        <div className="ml-4 min-w-0 flex-1">
                          <div className="text-sm font-bold text-slate-800">Tar {employee.name.split(" ")[0]} sitt skift</div>
                          <p className="mt-1 text-xs text-slate-500">{dateLabel} • {shiftLabel} • {workplace}</p>
                        </div>
                        <button type="button" onClick={onGoToShiftExchange} className="flex shrink-0 items-center gap-1 text-xs font-bold text-blue-600">Se i Bytte av skift <ChevronRight size={17} /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">Ingen erstattar er registrert.</div>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-red-100 bg-white px-6 py-5">
              <button type="button" onClick={onGoToShiftExchange} className="mx-auto flex items-center gap-2 text-sm font-bold text-blue-600">Gå til Bytte av skift <ChevronRight size={19} /></button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-[16px] font-bold text-slate-900">Meldingar</h3>
            <div className="mt-5 rounded-xl border border-red-100 bg-red-50/40 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100"><MessageCircle size={24} className="text-red-500" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Ny melding frå {employee.name}</h4>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{dateLabel} kl. 06:15</p>
                    </div>
                    <span className="rounded-lg bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-500">Ulest</span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{absence?.message ?? "Hei, eg har fått feber og blir heime i dag. Kan dessverre ikkje komme på jobb."}</p>
                </div>
                <ChevronRight size={20} className="mt-3 shrink-0 text-slate-400" />
              </div>
            </div>
            <button type="button" onClick={() => setTab("meldinger")} className="mx-auto mt-6 flex items-center gap-2 text-sm font-bold text-blue-600">Vis alle meldingar <ChevronRight size={19} /></button>
          </div>
        </div>
      )}

      {tab === "meldinger" && <SimplePanel title="Meldingar" icon={<MessageCircle size={21} />}><p className="text-sm text-slate-600">{absence?.message ?? "Ingen melding registrert."}</p></SimplePanel>}
      {tab === "historia" && <SimplePanel title="Historia" icon={<History size={21} />}><p className="text-sm text-slate-600">Fråvær registrert: {dateLabel} — {reasonLabel}.</p></SimplePanel>}
      {tab === "dokument" && <SimplePanel title="Dokument" icon={<FileText size={21} />}><p className="text-sm text-slate-600">Fråværsregistrering</p></SimplePanel>}
    </section>
  );
}

function SubTab({ children, icon, active, onClick }: { children: React.ReactNode; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`relative flex items-center gap-2 text-sm font-semibold ${active ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>{icon}{children}{active && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-blue-600" />}</button>;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="grid min-h-[60px] grid-cols-[190px_minmax(0,1fr)] items-center border-b border-slate-100 px-5 last:border-b-0"><span className="text-sm font-semibold text-slate-800">{label}</span><div className="text-sm font-semibold text-slate-700">{value}</div></div>;
}

function SimplePanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="p-6"><div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="mb-5 flex items-center gap-3">{icon}<h2 className="text-lg font-bold text-slate-900">{title}</h2></div>{children}</div></div>;
}

function getInitials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}
