import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  Info,
  Lightbulb,
  Mail,
  Plus,
  RefreshCw,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useMowiShiftStore } from "@/data/mowishift-store";

import {
  blaAdmins,
  blaEmployees,
  blaOffices,
  blaShifts,
  blaSpecialOperators,
  blaTk,
  blaTraining,
} from "@/pages/opprett-skift-data";

import type {
  BlaEmployeeCategory,
  BlaGrafikk,
  BlaGrafikkDay,
  BlaPauseAssignment,
} from "@/types/mowishift";

/* =========================================================
   STRICT BLÅ RULES
========================================================= */

const PAUSE_COUNT = 5;

const MIN_PER_PAUSE = 2;

const MAX_PER_PAUSE = 3;

const MIN_PER_SHIFT = 10;

const MAX_PER_SHIFT = 15;

const DEFAULT_DATES = [
  "17.08.2026",
  "18.08.2026",
  "19.08.2026",
  "20.08.2026",
  "21.08.2026",
];

const pauseTimes = [
  "15:45 – 16:30",
  "17:15 – 18:00",
  "18:45 – 19:30",
  "20:15 – 21:00",
  "22:00 – 22:45",
];

const categoryLabel: Record<BlaEmployeeCategory, string> = {
  "kun-kveld": "Kun kveld",
  "kun-dag": "Kun dag",
  rotere: "Rotere",
};

/* =========================================================
   HELPERS
========================================================= */

function createEmptyDays(): BlaGrafikkDay[] {
  return DEFAULT_DATES.map((date) => ({
    date,

    assignments: Array.from(
      {
        length: PAUSE_COUNT,
      },
      (_, index) => ({
        pause: index + 1,

        employeeIds: [],
      }),
    ),
  }));
}

function createDraft(): BlaGrafikk {
  return {
    id: crypto.randomUUID(),

    version: 0,

    department: "bla",

    title: "Blå avdeling (Fastpakking)",

    weekNumber: 34,

    year: 2026,

    shift: blaShifts[1],

    dates: DEFAULT_DATES,

    leaderId: blaAdmins[0].id,

    officeId: blaOffices[0].id,

    phone: "93 04 50 27",

    specialOperatorId: blaSpecialOperators[0].id,

    tkId: blaTk[0].id,

    trainingId: blaTraining[0].id,

    status: "draft",

    days: createEmptyDays(),

    createdBy: "admin-1",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };
}

/* =========================================================
   VALIDATION
========================================================= */

function validateDay(day: BlaGrafikkDay): string | null {
  const total = day.assignments.reduce(
    (sum, assignment) => sum + assignment.employeeIds.length,
    0,
  );

  for (const assignment of day.assignments) {
    if (assignment.employeeIds.length < MIN_PER_PAUSE) {
      return `Pause ${assignment.pause} har berre ${assignment.employeeIds.length} tilsette. Minimum er 2.`;
    }

    if (assignment.employeeIds.length > MAX_PER_PAUSE) {
      return `Pause ${assignment.pause} har for mange tilsette. Maksimum er 3.`;
    }
  }

  if (total < MIN_PER_SHIFT || total > MAX_PER_SHIFT) {
    return `Dagen må ha mellom 10 og 15 tilsette. No har dagen ${total}.`;
  }

  return null;
}

function validateGrafikk(grafikk: BlaGrafikk): string | null {
  for (const day of grafikk.days) {
    const error = validateDay(day);

    if (error) {
      return `${day.date}: ${error}`;
    }
  }

  return null;
}

/* =========================================================
   AUTO DISTRIBUTION
========================================================= */

function autoDistribute(
  draft: BlaGrafikk,
  selectedIds: string[],
): BlaGrafikkDay[] {
  const eligible = blaEmployees.filter((employee) => {
    if (!selectedIds.includes(employee.id)) {
      return false;
    }

    /*
     * Day shift:
     * Kun kveld is not allowed.
     *
     * Evening:
     * Kun dag is not allowed.
     */
    if (draft.shift.id === "bla-day") {
      return employee.category !== "kun-kveld";
    }

    return employee.category !== "kun-dag";
  });

  if (eligible.length < MIN_PER_SHIFT) {
    throw new Error(`Du må ha minst ${MIN_PER_SHIFT} tilgjengelege tilsette.`);
  }

  /*
   * We always create 15 positions:
   *
   * 5 pauses × 3 employees.
   *
   * Admin can later remove people,
   * but never below 2 per pause.
   */
  return draft.dates.map((date, dayIndex) => {
    const rotated = eligible.map(
      (_, index) =>
        eligible[(index + dayIndex * MAX_PER_PAUSE) % eligible.length],
    );

    const selectedForDay = rotated.slice(0, MAX_PER_SHIFT);

    return {
      date,

      assignments: Array.from(
        {
          length: PAUSE_COUNT,
        },
        (_, pauseIndex) => ({
          pause: pauseIndex + 1,

          employeeIds: selectedForDay
            .slice(
              pauseIndex * MAX_PER_PAUSE,

              (pauseIndex + 1) * MAX_PER_PAUSE,
            )
            .map((employee) => employee.id),
        }),
      ),
    };
  });
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function OpprettSkiftPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const editCurrent = searchParams.get("edit") === "current";

  const blaCurrent = useMowiShiftStore((state) => state.blaCurrent);

  const blaDraft = useMowiShiftStore((state) => state.blaDraft);

  const saveBlaDraft = useMowiShiftStore((state) => state.saveBlaDraft);

  const publishBlaDraft = useMowiShiftStore((state) => state.publishBlaDraft);

  const updatePublishedBlaGrafikk = useMowiShiftStore(
    (state) => state.updatePublishedBlaGrafikk,
  );

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [draft, setDraft] = useState<BlaGrafikk | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    blaEmployees.map((employee) => employee.id),
  );

  const [filter, setFilter] = useState<"all" | BlaEmployeeCategory>("all");

  const [error, setError] = useState("");

  /*
   * false:
   * first edit after Auto-fordel
   *
   * true:
   * second edit of current published graphic
   */
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (editCurrent && blaCurrent) {
      setDraft(structuredClone(blaCurrent));

      setSelectedIds(blaEmployees.map((employee) => employee.id));

      setEditMode(true);

      setStep(3);

      return;
    }

    if (editCurrent && blaCurrent) {
      const currentCopy = structuredClone(blaCurrent);

      setDraft(currentCopy);

      setSelectedIds(blaEmployees.map((employee) => employee.id));

      setEditMode(true);

      setStep(3);

      setError("");

      return;
    }

    /*
     * Existing draft.
     *
     * IMPORTANT:
     * Remove any old fake employee IDs
     * such as bla-001, bla-002, etc.
     */
    if (blaDraft) {
      const realEmployeeIds = new Set(
        blaEmployees.map((employee) => employee.id),
      );

      const cleanedDraft = structuredClone(blaDraft);

      cleanedDraft.days = cleanedDraft.days.map((day) => ({
        ...day,

        assignments: day.assignments.map((assignment) => ({
          ...assignment,

          employeeIds: assignment.employeeIds.filter((employeeId) =>
            realEmployeeIds.has(employeeId),
          ),
        })),
      }));

      setDraft(cleanedDraft);

      setStep(3);

      setEditMode(false);

      setError("");

      return;
    }

    /*
     * New workflow.
     */
    if (!editCurrent) {
      setDraft(null);

      setEditMode(false);

      setStep(1);

      setError("");
    }
  }, [editCurrent, blaCurrent, blaDraft, blaEmployees]);

  const visibleEmployees = useMemo(
    () =>
      blaEmployees.filter(
        (employee) => filter === "all" || employee.category === filter,
      ),

    [filter],
  );

  /*
   * STEP 1
   */
  const chooseBla = () => {
    const next = createDraft();

    setDraft(next);

    setEditMode(false);

    setError("");

    saveBlaDraft(next);

    setStep(2);
  };

  /*
   * STEP 2 -> STEP 3
   */
  const goToEditor = () => {
    if (!draft) {
      return;
    }

    saveBlaDraft(draft);

    setStep(3);
  };

  /*
   * AUTO-FORDEL
   */
  const runAutoDistribution = () => {
    if (!draft) {
      return;
    }

    try {
      setError("");

      const days = autoDistribute(draft, selectedIds);

      const next: BlaGrafikk = {
        ...draft,

        days,
      };

      setDraft(next);

      saveBlaDraft(next);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikkje fordele tilsette.",
      );
    }
  };

  /*
   * EDIT ASSIGNMENT
   */
  const changeAssignment = (
    dayIndex: number,
    pauseIndex: number,
    employeeId: string,
  ) => {
    if (!draft) {
      return;
    }

    const next = structuredClone(draft);

    const assignment = next.days[dayIndex].assignments[pauseIndex];

    /*
     * Remove employee
     */
    if (assignment.employeeIds.includes(employeeId)) {
      assignment.employeeIds = assignment.employeeIds.filter(
        (id) => id !== employeeId,
      );

      setError("");

      setDraft(next);

      saveBlaDraft(next);

      return;
    }

    /*
     * Maximum 3
     */
    if (assignment.employeeIds.length >= MAX_PER_PAUSE) {
      setError("Ei pause kan aldri ha meir enn 3 tilsette.");

      return;
    }

    /*
     * Same employee cannot be
     * in two pauses on same day.
     */
    const alreadyUsed = next.days[dayIndex].assignments.some(
      (item, index) =>
        index !== pauseIndex && item.employeeIds.includes(employeeId),
    );

    if (alreadyUsed) {
      setError(
        "Denne tilsette er allereie plassert i ein annan pause denne dagen.",
      );

      return;
    }

    assignment.employeeIds.push(employeeId);

    setError("");

    setDraft(next);

    saveBlaDraft(next);
  };

  /*
   * PUBLISH / SAVE SECOND EDIT
   */
  const publish = () => {
    if (!draft) {
      return;
    }

    const validation = validateGrafikk(draft);

    if (validation) {
      setError(validation);

      return;
    }

    try {
      setError("");

      /*
       * SECOND EDIT
       */
      if (editMode && blaCurrent) {
        updatePublishedBlaGrafikk({
          ...draft,

          status: "published",
        });

        navigate("/opprett-skift/bla/overview");

        return;
      }

      /*
       * FIRST PUBLICATION
       */
      saveBlaDraft(draft);

      publishBlaDraft();

      navigate("/opprett-skift/bla/overview");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikkje publisere grafikken.",
      );
    }
  };

  if (step === 1) {
    return <DepartmentSelection onSelectBla={chooseBla} />;
  }

  if (!draft) {
    return null;
  }

  if (step === 2) {
    return (
      <BlaSettings
        draft={draft}
        onBack={() => setStep(1)}
        onContinue={goToEditor}
      />
    );
  }

  return (
    <BlaEditor
      draft={draft}
      editMode={editMode}
      visibleEmployees={visibleEmployees}
      selectedIds={selectedIds}
      filter={filter}
      error={error}
      onFilterChange={setFilter}
      onToggleEmployee={(id) =>
        setSelectedIds((ids) =>
          ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id],
        )
      }
      onAutoDistribute={runAutoDistribution}
      onChangeAssignment={changeAssignment}
      onBack={() => setStep(2)}
      onPublish={publish}
    />
  );
}

/* =========================================================
   1. VEL AVDELING
========================================================= */

function DepartmentSelection({ onSelectBla }: { onSelectBla: () => void }) {
  return (
    <PageShell>
      <PageTitle
        title="Vel avdeling"
        subtitle="Vel avdeling for å opprette, redigere eller erstatte tilsette i grafikken."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <DepartmentCard
          title="Blå avdeling"
          subtitle="Fastpakking"
          color="blue"
          lines={["5 pausar per skift", "2–3 tilsette per pause"]}
          onClick={onSelectBla}
        />

        <DepartmentCard
          title="Raud avdeling"
          color="red"
          lines={["Eiga arbeidsstruktur", "Kommer seinare"]}
          disabled
        />

        <DepartmentCard
          title="Filet avdeling"
          color="orange"
          lines={["Eiga arbeidsstruktur", "Kommer seinare"]}
          disabled
        />
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-blue-100 bg-blue-50/60 p-5">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-4 w-4 text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Kvar avdeling har sin eigen struktur og grafikk.
            </p>

            <p className="mt-1 text-xs text-blue-700">
              Vel avdeling for å komme vidare.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function DepartmentCard({
  title,
  subtitle,
  color,
  lines,
  disabled,
  onClick,
}: {
  title: string;
  subtitle?: string;
  color: "blue" | "red" | "orange";
  lines: string[];
  disabled?: boolean;
  onClick?: () => void;
}) {
  const iconClass =
    color === "blue"
      ? "bg-blue-600"
      : color === "red"
        ? "bg-red-600"
        : "bg-orange-500";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "relative min-h-56 rounded-xl border bg-white p-6 text-left shadow-sm transition",
        color === "blue"
          ? "border-blue-500 ring-1 ring-blue-100 hover:-translate-y-0.5 hover:shadow-md"
          : "border-slate-200",
        disabled ? "cursor-default opacity-70" : "",
      ].join(" ")}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClass} text-white`}
      >
        <Settings2 className="h-5 w-5" />
      </div>

      <h2 className="mt-5 text-base font-bold text-slate-900">{title}</h2>

      {subtitle && (
        <p className="mt-1 text-xs font-medium text-slate-600">{subtitle}</p>
      )}

      <ul className="mt-5 space-y-2 text-xs text-slate-600">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />

            {line}
          </li>
        ))}
      </ul>

      <span className="absolute bottom-6 right-5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-600">
        <ArrowRight className="h-4 w-4" />
      </span>
    </button>
  );
}

/* =========================================================
   2. BLÅ SETTINGS
========================================================= */

function BlaSettings({
  draft,
  onBack,
  onContinue,
}: {
  draft: BlaGrafikk;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <PageShell>
      <BackLink label="Tilbake til avdelingar" onClick={onBack} />

      <PageTitle
        title="Blå avdeling (Fastpakking) – innstillingar for grafikk"
        subtitle="Her set du opp informasjon som blir brukt når du lagar grafikken."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={<ShieldCheck />} title="Avdelingsinformasjon" />

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Field
            label="Leder"
            value={
              blaAdmins.find((item) => item.id === draft.leaderId)?.name ?? "—"
            }
          />

          <Field
            label="Kontor"
            value={
              blaOffices.find((item) => item.id === draft.officeId)?.name ?? "—"
            }
          />

          <Field label="Telefonnummer" value={draft.phone} />

          <Field
            label="Spesialoperatør"
            value={
              blaSpecialOperators.find(
                (item) => item.id === draft.specialOperatorId,
              )?.name ?? "—"
            }
          />

          <Field
            label="TK"
            value={blaTk.find((item) => item.id === draft.tkId)?.name ?? "—"}
          />

          <Field
            label="Opplæring (Råd)"
            value={
              blaTraining.find((item) => item.id === draft.trainingId)?.name ??
              "—"
            }
          />
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={<CalendarDays />} title="Skift og dato" />

        <div className="grid gap-4 md:grid-cols-3">
          <Field
            label="Skift"
            value={`${draft.shift.name} (${draft.shift.start} – ${draft.shift.end})`}
          />

          <Field label="Veke nummer" value={String(draft.weekNumber)} />

          <Field
            label="Datoer"
            value={`${draft.dates[0]} – ${draft.dates[draft.dates.length - 1]}`}
          />
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <RuleCard title="5 pausar" text="Kvar skift har fem pausar." />

        <RuleCard
          title="2–3 tilsette"
          text="Kvar pause må ha minimum 2 og maksimum 3 tilsette."
        />

        <RuleCard
          title="10–15 tilsette"
          text="Totalt per skift må det vere mellom 10 og 15 tilsette."
        />
      </section>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Gå til grafikkoversikt
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </PageShell>
  );
}

function RuleCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <p className="text-sm font-bold text-slate-800">{title}</p>

      <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}

/* =========================================================
   3. LAG GRAFIKK
========================================================= */

function BlaEditor({
  draft,
  editMode,
  visibleEmployees,
  selectedIds,
  filter,
  error,
  onFilterChange,
  onToggleEmployee,
  onAutoDistribute,
  onChangeAssignment,
  onBack,
  onPublish,
}: {
  draft: BlaGrafikk;
  editMode: boolean;
  visibleEmployees: typeof blaEmployees;
  selectedIds: string[];
  filter: "all" | BlaEmployeeCategory;
  error: string;
  onFilterChange: (value: "all" | BlaEmployeeCategory) => void;
  onToggleEmployee: (id: string) => void;
  onAutoDistribute: () => void;
  onChangeAssignment: (
    dayIndex: number,
    pauseIndex: number,
    employeeId: string,
  ) => void;
  onBack: () => void;
  onPublish: () => void;
}) {
  const totalSelected = selectedIds.length;

  return (
    <PageShell wide>
      <BackLink label="Tilbake til innstillingar" onClick={onBack} />

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <PageTitle
          title={
            editMode
              ? "Rediger gjeldande grafikk – Blå avdeling"
              : "Lag grafikk – Blå avdeling (Fastpakking)"
          }
          subtitle={
            editMode
              ? "Dette er andre redigering av ein publisert grafikk."
              : "Vel tilsette og bruk automatisk fordeling før du kontrollerer og publiserer grafikken."
          }
        />

        <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-xs text-blue-900">
          <p className="font-semibold">5 pausar per skift</p>

          <p className="mt-1">2–3 tilsette per pause</p>

          <p className="mt-1">10–15 tilsette per skift</p>
        </div>
      </div>

      {/* =====================================================
          EMPLOYEES
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <SectionTitle
            icon={<Users />}
            title={`Tilsette (${totalSelected})`}
          />

          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "Alle"],
                ["kun-kveld", "Kun kveld"],
                ["kun-dag", "Kun dag"],
                ["rotere", "Rotere"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onFilterChange(value)}
                className={[
                  "rounded-lg px-3 py-2 text-xs font-semibold",
                  filter === value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {visibleEmployees.map((employee) => {
            const selected = selectedIds.includes(employee.id);

            return (
              <button
                key={employee.id}
                type="button"
                onClick={() => onToggleEmployee(employee.id)}
                className={[
                  "flex items-center gap-3 rounded-xl border p-3 text-left transition",
                  selected
                    ? "border-blue-300 bg-blue-50"
                    : "border-slate-200 bg-white",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    selected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  {selected ? <Check className="h-4 w-4" /> : employee.name[0]}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-slate-800">
                    {employee.name}
                  </span>

                  <span className="mt-0.5 block text-[10px] text-slate-400">
                    {categoryLabel[employee.category]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          AUTO DISTRIBUTION
      ====================================================== */}

      <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />

              <h2 className="text-sm font-bold text-blue-900">
                Automatisk fordeling
              </h2>
            </div>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-blue-800/80">
              MowiShift fordeler dei valde tilsette automatisk mellom dei fem
              pausane. Du kan redigere resultatet før publisering.
            </p>
          </div>

          <button
            type="button"
            onClick={onAutoDistribute}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Sparkles className="h-4 w-4" />
            Auto-fordel
          </button>
        </div>
      </section>

      {/* =====================================================
          GRAPHIC TABLE
      ====================================================== */}

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Grafikk – veke {draft.weekNumber}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {draft.shift.name} · {draft.shift.start} – {draft.shift.end}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-600">
            Før publisering kan grafikken redigerast
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1050px]">
            <div className="grid grid-cols-[170px_repeat(5,minmax(150px,1fr))] gap-2">
              <div />

              {draft.days.map((day) => (
                <div key={day.date} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-bold text-slate-800">{day.date}</p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {draft.shift.name}
                  </p>
                </div>
              ))}

              {Array.from(
                {
                  length: PAUSE_COUNT,
                },
                (_, pauseIndex) => (
                  <div key={pauseIndex} className="contents">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-bold text-slate-800">
                        {pauseIndex + 1}. Pause
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {pauseTimes[pauseIndex]}
                      </p>

                      <p className="mt-2 text-[10px] font-semibold text-blue-600">
                        2–3 tilsette
                      </p>
                    </div>

                    {draft.days.map((day, dayIndex) => (
                      <PauseCell
                        key={`${day.date}-${pauseIndex}`}
                        assignment={day.assignments[pauseIndex]}
                        day={day}
                        onToggle={(employeeId) =>
                          onChangeAssignment(dayIndex, pauseIndex, employeeId)
                        }
                      />
                    ))}
                  </div>
                ),
              )}

              <div className="rounded-xl bg-slate-900 p-3 text-xs font-bold text-white">
                Totalt tilsette
              </div>

              {draft.days.map((day) => {
                const total = day.assignments.reduce(
                  (sum, assignment) => sum + assignment.employeeIds.length,
                  0,
                );

                const valid =
                  total >= MIN_PER_SHIFT &&
                  total <= MAX_PER_SHIFT &&
                  day.assignments.every(
                    (assignment) =>
                      assignment.employeeIds.length >= MIN_PER_PAUSE &&
                      assignment.employeeIds.length <= MAX_PER_PAUSE,
                  );

                return (
                  <div
                    key={day.date}
                    className={[
                      "rounded-xl p-3 text-center text-xs font-bold",
                      valid
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700",
                    ].join(" ")}
                  >
                    {valid ? "✓" : "!"} {total} / 15
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RULES / ERROR
      ====================================================== */}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-emerald-50 p-5">
          <h3 className="text-sm font-bold text-emerald-900">
            Bemanning per skift
          </h3>

          <p className="mt-2 text-2xl font-bold text-emerald-700">10–15</p>

          <p className="mt-1 text-xs text-emerald-700">
            5 pausar × 2–3 tilsette
          </p>

          <p className="mt-3 text-xs font-semibold text-emerald-700">
            ✓ Kvar pause må ha 2–3 tilsette
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-amber-900">
            <Lightbulb className="h-4 w-4" />
            Tips
          </h3>

          <ul className="mt-3 space-y-2 text-[11px] text-amber-900/80">
            <li>
              • Auto-fordel gir eit forslag basert på tilgjengeleg og rotasjon.
            </li>

            <li>• Du kan korrigere resultatet før publisering.</li>

            <li>
              • Ei pause kan aldri ha mindre enn 2 eller meir enn 3 tilsette.
            </li>
          </ul>
        </div>
      </div>

      {error && (
        <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert className="h-5 w-5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          FINAL ACTION
      ====================================================== */}

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onPublish}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {editMode ? "Lagre endring" : "Publiser grafikk"}

          <Send className="h-4 w-4" />
        </button>
      </div>
    </PageShell>
  );
}

/* =========================================================
   PAUSE CELL
========================================================= */

function PauseCell({
  assignment,
  day,
  onToggle,
}: {
  assignment: BlaPauseAssignment;
  day: BlaGrafikkDay;
  onToggle: (employeeId: string) => void;
}) {
  const available = blaEmployees.filter(
    (employee) =>
      !day.assignments.some((item) => item.employeeIds.includes(employee.id)),
  );

  const count = assignment.employeeIds.length;

  const valid = count >= MIN_PER_PAUSE && count <= MAX_PER_PAUSE;

  return (
    <div
      className={[
        "min-h-[145px] rounded-xl border p-2",
        valid ? "border-slate-200 bg-white" : "border-red-200 bg-red-50/30",
      ].join(" ")}
    >
      {assignment.employeeIds.map((id) => {
        const employee = blaEmployees.find((item) => item.id === id);

        if (!employee) {
          return null;
        }

        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className="mb-1 flex w-full items-center gap-2 rounded-lg bg-slate-50 px-2 py-2 text-left hover:bg-blue-50"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-700">
              {employee.name[0]}
            </span>

            <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-slate-700">
              {employee.name}
            </span>

            <X className="h-3 w-3 text-slate-400" />
          </button>
        );
      })}

      {count < MAX_PER_PAUSE && (
        <select
          aria-label="Legg til tilsett"
          value=""
          onChange={(event) => {
            if (event.target.value) {
              onToggle(event.target.value);
            }
          }}
          className="mt-1 w-full rounded-lg border border-dashed border-blue-200 bg-blue-50/40 px-2 py-2 text-[8px] text-blue-700"
        >
          <option value="">+ Legg til tilsett</option>

          {available.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      )}

      <div
        className={[
          "mt-2 text-center text-[9px] font-semibold",
          valid ? "text-emerald-600" : "text-red-600",
        ].join(" ")}
      >
        {count}/3 · minimum 2
      </div>
    </div>
  );
}

/* =========================================================
   4. GRAFIKKOVERSIKT
========================================================= */

export function BlaOverviewPage() {
  const navigate = useNavigate();

  const current = useMowiShiftStore((state) => state.blaCurrent);

  if (!current) {
    return (
      <PageShell>
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

          <p className="mt-3 text-sm text-slate-500">
            Ingen publisert grafikk enno.
          </p>

          <button
            type="button"
            onClick={() => navigate("/opprett-skift")}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Opprett grafikk
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell wide>
      <BackLink
        label="Tilbake til avdelingar"
        onClick={() => navigate("/opprett-skift")}
      />

      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <PageTitle
          title="Blå avdeling (Fastpakking) – grafikkoversikt"
          subtitle="Her kan admin kontrollere og sende den ferdige grafikken vidare."
        />

        <div className="rounded-xl bg-blue-50 px-5 py-4 text-xs text-blue-900">
          <p>5 pausar per skift</p>

          <p className="mt-1">2–3 tilsette per pause</p>

          <p className="mt-1">10–15 tilsette per skift</p>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <SectionTitle icon={<ShieldCheck />} title="Avdelingsinformasjon" />

        <div className="grid gap-4 md:grid-cols-5">
          <Field
            label="Leder"
            value={
              blaAdmins.find((item) => item.id === current.leaderId)?.name ??
              "—"
            }
          />

          <Field
            label="Kontor"
            value={
              blaOffices.find((item) => item.id === current.officeId)?.name ??
              "—"
            }
          />

          <Field label="Telefonnummer" value={current.phone} />

          <Field
            label="Datoer"
            value={`${current.dates[0]} – ${
              current.dates[current.dates.length - 1]
            }`}
          />

          <Field
            label="Skift"
            value={`${current.shift.name} (${current.shift.start} – ${current.shift.end})`}
          />
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900">
          Grafikk – veke {current.weekNumber}
        </h2>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[170px_repeat(5,1fr)] gap-2">
              <div />

              {current.days.map((day) => (
                <div key={day.date} className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-bold text-slate-800">{day.date}</p>
                </div>
              ))}

              {current.days[0].assignments.map((_, pauseIndex) => (
                <div key={pauseIndex} className="contents">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-700">
                      {pauseIndex + 1}. Pause
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400">
                      {pauseTimes[pauseIndex]}
                    </p>
                  </div>

                  {current.days.map((day) => (
                    <div
                      key={`${day.date}-${pauseIndex}`}
                      className="rounded-lg border border-slate-100 p-2"
                    >
                      {day.assignments[pauseIndex].employeeIds.map((id) => {
                        const employee = blaEmployees.find(
                          (item) => item.id === id,
                        );

                        if (!employee) {
                          return null;
                        }

                        return (
                          <div
                            key={id}
                            className="mb-1 flex items-center gap-2 rounded bg-slate-50 px-2 py-1"
                          >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[8px] font-bold text-blue-700">
                              {employee.name[0]}
                            </span>

                            <span className="truncate text-[9px] font-medium text-slate-700">
                              {employee.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}

              <div className="rounded-lg bg-slate-900 p-3 text-xs font-bold text-white">
                Totalt tilsette
              </div>

              {current.days.map((day) => {
                const total = day.assignments.reduce(
                  (sum, assignment) => sum + assignment.employeeIds.length,
                  0,
                );

                return (
                  <div
                    key={day.date}
                    className="rounded-lg bg-emerald-50 p-3 text-center text-xs font-bold text-emerald-700"
                  >
                    ✓ {total} / 15
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">Ansvarlege</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Field
              label="Spesialoperatør"
              value={
                blaSpecialOperators.find(
                  (item) => item.id === current.specialOperatorId,
                )?.name ?? "—"
              }
            />

            <Field
              label="TK"
              value={
                blaTk.find((item) => item.id === current.tkId)?.name ?? "—"
              }
            />

            <Field
              label="Opplæring (Råd)"
              value={
                blaTraining.find((item) => item.id === current.trainingId)
                  ?.name ?? "—"
              }
            />
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800">Handlingar</h2>

          <ActionButton
            icon={<Mail />}
            title="Send melding"
            subtitle="Send melding til alle kollegaer i denne avdelinga"
            onClick={() => alert("Melding sendt til tilsette i Blå avdeling.")}
          />

          <ActionButton
            icon={<RefreshCw />}
            title="Bytte ønske / vakt"
            subtitle="Legg inn ønske om å byte vakt eller pause"
            onClick={() => navigate("/shift-exchange")}
          />

          <ActionButton
            icon={<Plus />}
            title="Opprett ny grafikk"
            subtitle="Lag ny grafikk for denne avdelinga"
            onClick={() => navigate("/opprett-skift")}
          />
        </aside>
      </section>

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/shifts")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
        >
          Gjeldande + historikk
        </button>

        {/* SECOND EDIT */}
        <button
          type="button"
          onClick={() => navigate("/opprett-skift?edit=current")}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Rediger grafikk
        </button>

        <button
          type="button"
          onClick={() =>
            alert("PDF-generering kan koplast til backend seinare.")
          }
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
        >
          <Download className="h-4 w-4" />
          Last ned PDF
        </button>
      </div>
    </PageShell>
  );
}

/* =========================================================
   COMMON COMPONENTS
========================================================= */

function ActionButton({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left hover:bg-slate-50"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold text-slate-800">{title}</span>

        <span className="mt-0.5 block text-[9px] text-slate-500">
          {subtitle}
        </span>
      </span>

      <ChevronRight className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[9px] font-semibold text-slate-500">{label}</p>

      <div className="flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-medium text-slate-700">
        {value}

        <ChevronDown className="ml-auto h-3.5 w-3.5 text-slate-400" />
      </div>
    </div>
  );
}

function PageShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={
        wide ? "mx-auto w-full max-w-[1500px]" : "mx-auto w-full max-w-[1200px]"
      }
    >
      {children}
    </div>
  );
}

function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-[24px] font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </header>
  );
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 flex items-center gap-2 text-xs font-semibold text-blue-600"
    >
      <ArrowLeft className="h-4 w-4" />

      {label}
    </button>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </span>

      <h2 className="text-base font-bold text-slate-800">{title}</h2>
    </div>
  );
}
