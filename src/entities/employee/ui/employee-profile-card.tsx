import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock3,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  MoreVertical,
  Phone,
  Settings2,
} from "lucide-react";

import type { EmployeeProfile, EmployeeProfileCardProps } from "../types";

const departmentLabels: Record<string, string> = {
  bla: "Blå avdeling",
  raud: "Raud avdeling",
  filet: "Filet avdeling",
};

function formatDepartment(department?: string) {
  if (!department) {
    return "—";
  }

  return departmentLabels[department] ?? department;
}

function formatHours(value?: number) {
  if (value === undefined) {
    return "—";
  }

  return `${value} t`;
}

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  return value;
}

export function EmployeeProfileCard({
  employee,
  activeTab = "overview",
  onTabChange,
  onEdit,
  onAbsence,
  onChat,
}: EmployeeProfileCardProps) {
  const nextShift = employee.nextShift;

  const department = employee.department ?? nextShift?.department;

  const workplace = employee.workplace ?? nextShift?.workplace;

  const pauseSetup =
    employee.pauseSetup ??
    (nextShift?.pause ? `Pause ${nextShift.pause}` : "—");

  const shiftName = nextShift?.shift.name ?? employee.shiftPreference ?? "—";

  return (
    <div className="min-h-screen bg-slate-50 px-7 py-4 text-slate-900">
      {/* Breadcrumb */}
      <div className="mb-2 flex h-8 items-center gap-2 text-[16px]">
        <ArrowLeft className="h-5 w-5" />

        <button type="button" className="font-semibold">
          Tilsette
        </button>

        <ChevronRight className="h-4 w-4 text-slate-400" />

        <span className="font-bold">{employee.name}</span>
      </div>

      <div className="grid grid-cols-[400px_minmax(0,1fr)] gap-5">
        {/* LEFT */}
        <aside className="flex flex-col gap-4">
          {/* Photo */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {employee.avatarUrl ? (
              <img
                src={employee.avatarUrl}
                alt={employee.name}
                className="h-[265px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[265px] items-center justify-center bg-slate-100">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-3xl font-semibold text-slate-500 shadow-sm">
                  {employee.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-[17px] font-bold">Kontaktinformasjon</h2>

            {employee.phone && (
              <div className="mb-5 flex items-center gap-4 text-[16px]">
                <Phone className="h-5 w-5" />
                <span>{employee.phone}</span>
              </div>
            )}

            {employee.email && (
              <div className="mb-5 flex items-center gap-4 text-[16px]">
                <Mail className="h-5 w-5" />
                <span>{employee.email}</span>
              </div>
            )}

            {employee.location && (
              <div className="mb-5 flex items-center gap-4 text-[16px]">
                <MapPin className="h-5 w-5" />
                <span>{employee.location}</span>
              </div>
            )}

            {onChat && (
              <button
                type="button"
                onClick={onChat}
                className="flex items-center gap-3 border-0 bg-transparent p-0 text-[16px] font-semibold text-blue-600"
              >
                <MessageCircle className="h-5 w-5" />
                Chat med tilsett
              </button>
            )}
          </section>

          {/* Key information */}
          <section className="min-h-[380px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-[17px] font-bold">Nøkkelinformasjon</h2>

            <InfoRow
              label="Ansattnummer"
              value={employee.employeeNumber ?? employee.id}
            />

            <InfoRow label="Fødselsdato" value={employee.birthDate} />

            <InfoRow label="Kjønn" value={employee.gender} />

            <InfoRow label="Språk" value={employee.languages?.join(", ")} />

            <InfoRow label="Skiftpreferanse" value={employee.shiftPreference} />

            <InfoRow
              label="Tilgjengelighet"
              value={
                employee.employmentPercentage !== undefined
                  ? `${employee.employmentPercentage}%`
                  : undefined
              }
            />
          </section>
        </aside>

        {/* MAIN */}
        <main className="min-w-0">
          {/* Header */}
          <header className="flex min-h-[145px] items-center justify-between rounded-2xl border border-slate-200 bg-white px-7 py-6 shadow-sm">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-[30px] font-bold tracking-tight">
                  {employee.name}
                </h1>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Aktiv
                </span>
              </div>

              <div className="mt-2 text-[17px]">{employee.role}</div>

              <div className="mt-3 text-[16px]">
                Ansatt siden: {formatDate(employee.startDate)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  className="flex h-[50px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-[16px] font-semibold"
                >
                  <Edit3 className="h-[18px] w-[18px]" />
                  Rediger
                </button>
              )}

              {onAbsence && (
                <button
                  type="button"
                  onClick={onAbsence}
                  className="flex h-[50px] items-center gap-2 rounded-xl bg-slate-900 px-6 text-[16px] font-semibold text-white"
                >
                  <CalendarDays className="h-[18px] w-[18px]" />
                  Meld fråvær
                </button>
              )}

              <button
                type="button"
                className="flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-slate-200 bg-white"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Tabs */}
          <nav className="mt-3 flex h-[65px] items-stretch rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
            <EmployeeTab
              active={activeTab === "overview"}
              onClick={() => onTabChange?.("overview")}
            >
              Oversikt
            </EmployeeTab>

            <EmployeeTab
              active={activeTab === "work"}
              onClick={() => onTabChange?.("work")}
            >
              Arbeid
            </EmployeeTab>

            <EmployeeTab
              active={activeTab === "contract"}
              onClick={() => onTabChange?.("contract")}
            >
              Kontrakt
            </EmployeeTab>

            <EmployeeTab
              active={activeTab === "competence"}
              onClick={() => onTabChange?.("competence")}
            >
              Kompetanse
            </EmployeeTab>

            <EmployeeTab
              active={activeTab === "absence"}
              onClick={() => onTabChange?.("absence")}
            >
              Fråvær
            </EmployeeTab>
          </nav>

          {/* ONLY OVERVIEW CONTENT */}
          {activeTab === "overview" && (
            <div className="mt-4 flex flex-col gap-4">
              {/* Work information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <Settings2 className="h-5 w-5" />
                  <h2 className="text-[18px] font-bold">Arbeidsinformasjon</h2>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <WorkRow
                      label="Avdeling"
                      value={department ? formatDepartment(department) : "—"}
                      badge={Boolean(department)}
                    />

                    <WorkRow label="Arbeidsplass" value={workplace} />

                    <WorkRow label="Stilling" value={employee.role} />

                    <WorkRow label="Skift" value={shiftName} />
                  </div>

                  <div className="space-y-4">
                    <WorkRow label="Pauseoppsett" value={pauseSetup} />

                    <WorkRow
                      label="Stillingsprosent"
                      value={
                        employee.employmentPercentage !== undefined
                          ? `${employee.employmentPercentage}%`
                          : "—"
                      }
                    />

                    <WorkRow
                      label="Kontrakttype"
                      value={employee.contractType}
                    />
                  </div>
                </div>
              </section>

              {/* Next shift */}
              <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <CalendarDays className="h-5 w-5" />
                  <h2 className="text-[18px] font-bold">Neste skift</h2>
                </div>

                {nextShift ? (
                  <>
                    <div className="flex min-h-[100px] items-center rounded-xl border border-blue-100 bg-blue-50/60 p-3">
                      <div className="flex h-[78px] w-[72px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white">
                        <span className="text-xs">
                          {formatShiftDay(nextShift.date)}
                        </span>

                        <strong className="text-[27px] leading-tight">
                          {formatShiftDate(nextShift.date)}
                        </strong>

                        <small className="text-xs text-slate-500">
                          {formatShiftMonth(nextShift.date)}
                        </small>
                      </div>

                      <div className="ml-4">
                        <div className="text-[17px] font-bold">
                          {nextShift.shift.start} – {nextShift.shift.end}
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span>{formatDepartment(nextShift.department)}</span>

                          <span className="text-slate-400">•</span>

                          <span>{nextShift.workplace ?? "—"}</span>
                        </div>

                        <div className="mt-2 text-sm text-slate-500">
                          {nextShift.shift.name}
                        </div>
                      </div>

                      {nextShift.pause && (
                        <span className="ml-auto rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-600">
                          Pause {nextShift.pause}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="mt-4 border-0 bg-transparent p-0 text-[15px] font-semibold text-blue-600"
                    >
                      Se full vaktplan
                    </button>
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                    Ingen planlagt skift
                  </div>
                )}
              </section>

              {/* Working hours */}
              <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <Clock3 className="h-5 w-5" />
                  <h2 className="text-[18px] font-bold">Arbeidstider</h2>
                </div>

                <div className="mb-5 flex border-b border-slate-200">
                  <HoursTab>I dag</HoursTab>

                  <HoursTab>Denne veka</HoursTab>

                  <HoursTab active>Denne månaden</HoursTab>

                  <HoursTab>Totalt</HoursTab>
                </div>

                <div className="grid grid-cols-3">
                  <HoursValue
                    label="Timer denne måneden"
                    value={formatHours(employee.hoursThisMonth)}
                  />

                  <HoursValue
                    label="Gjennomsnitt per veke"
                    value={formatHours(employee.hoursThisWeek)}
                  />

                  <HoursValue
                    label="Overtid"
                    value={formatHours(employee.overtime)}
                  />
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* --------------------------------
   SMALL COMPONENTS
-------------------------------- */

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="mb-5 grid grid-cols-[145px_1fr] gap-4 text-[15px]">
      <span className="text-slate-600">{label}</span>

      <strong className="font-semibold text-slate-800">{value ?? "—"}</strong>
    </div>
  );
}

function WorkRow({
  label,
  value,
  badge = false,
}: {
  label: string;
  value?: string;
  badge?: boolean;
}) {
  return (
    <div className="grid grid-cols-[205px_1fr] items-center text-[15px]">
      <span className="text-slate-600">{label}</span>

      {badge && value ? (
        <strong className="w-fit rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-600">
          {value}
        </strong>
      ) : (
        <strong className="font-semibold text-slate-800">{value ?? "—"}</strong>
      )}
    </div>
  );
}

function EmployeeTab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-8 text-[16px] font-medium ${
        active ? "font-semibold text-blue-600" : "text-slate-700"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600" />
      )}
    </button>
  );
}

function HoursTab({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`relative flex-1 pb-3 text-sm ${
        active ? "font-semibold text-blue-600" : "text-slate-500"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-[-1px] left-[20%] right-[20%] h-0.5 bg-blue-600" />
      )}
    </button>
  );
}

function HoursValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-slate-200 pl-5 first:border-l-0 first:pl-0">
      <span className="block text-sm text-slate-600">{label}</span>

      <strong className="mt-1 block text-[22px] font-bold">{value}</strong>
    </div>
  );
}

function formatShiftDay(date: string) {
  const value = new Date(`${date}T00:00:00`);

  return new Intl.DateTimeFormat("no-NO", {
    weekday: "short",
  })
    .format(value)
    .replace(".", "");
}

function formatShiftDate(date: string) {
  const value = new Date(`${date}T00:00:00`);

  return value.getDate().toString();
}

function formatShiftMonth(date: string) {
  const value = new Date(`${date}T00:00:00`);

  return new Intl.DateTimeFormat("no-NO", {
    month: "short",
  })
    .format(value)
    .replace(".", "");
}
