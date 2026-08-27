import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Filter,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Settings2,
  MoreVertical,
  UserPlus,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMowiShiftStore, type MowiEmployee } from "@/data/mowishift-store";

/* =========================================================
   TYPES
========================================================= */

type EmployeeTab = "overview" | "work" | "contract" | "competence" | "absence";

/* =========================================================
   HELPERS
========================================================= */

const departmentLabels: Record<string, string> = {
  bla: "Blå avdeling",
  raud: "Raud avdeling",
  filet: "Filet avdeling",
};

function getDepartmentLabel(department?: string) {
  if (!department) return "—";

  return departmentLabels[department] ?? department;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRoleLabel(employee: MowiEmployee) {
  if (employee.role === "operator") {
    return "Operator";
  }

  return "Administrator";
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Tilsette() {
  const navigate = useNavigate();

  const { employees, selectedEmployeeId, selectEmployee, schedule } =
    useMowiShiftStore();

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<EmployeeTab>("overview");

  const [page, setPage] = useState(1);

  const pageSize = 8;

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.id.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department?.toLowerCase().includes(query),
    );
  }, [employees, search]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize),
  );

  const safePage = Math.min(page, totalPages);

  const visibleEmployees = filteredEmployees.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  /* =======================================================
     SELECTED EMPLOYEE
  ======================================================= */

  const selectedEmployee =
    employees.find((employee) => employee.id === selectedEmployeeId) ??
    employees[0];

  if (!selectedEmployee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          Ingen tilsette funne.
        </div>
      </div>
    );
  }

  /* =======================================================
     NEXT SHIFT
  ======================================================= */

  const nextShift = schedule
    .filter(
      (entry) =>
        entry.employeeId === selectedEmployee.id &&
        entry.status === "scheduled",
    )
    .sort(
      (a, b) =>
        new Date(`${a.date}T00:00:00`).getTime() -
        new Date(`${b.date}T00:00:00`).getTime(),
    )[0];

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-7">
      {/* ===================================================
          PAGE TITLE
      =================================================== */}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900">Tilsette</h1>

          <p className="mt-1 text-sm text-slate-500">
            Oversikt over alle tilsette i systemet
          </p>
        </div>

        {/* =================================================
            NEW EMPLOYEE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/tilsette/ny")}
          className="
            inline-flex
            h-11
            items-center
            gap-2
            rounded-lg
            bg-blue-600
            px-5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
          "
        >
          <UserPlus size={17} strokeWidth={2} />

          <span>Ny tilsett</span>
        </button>
      </div>

      {/* ===================================================
          MAIN TWO COLUMN LAYOUT
      =================================================== */}

      <div className="grid grid-cols-[425px_minmax(0,1fr)] gap-6">
        {/* =================================================
            LEFT — EMPLOYEE LIST
        ================================================= */}

        <aside>
          {/* SEARCH + FILTER */}

          <div className="mb-5 flex gap-3">
            <div className="relative flex-1">
              <Search
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Søk etter navn, rolle eller ansattnummer..."
                className="
                  h-[48px]
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-400
                "
              />
            </div>

            <button
              type="button"
              className="
                flex
                h-[48px]
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-slate-700
              "
            >
              <Filter size={18} />
              Filter
            </button>
          </div>

          {/* EMPLOYEE LIST */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >
            <div className="mb-4 px-1">
              <h2 className="text-[15px] font-bold text-slate-800">
                Tilsette ({filteredEmployees.length})
              </h2>
            </div>

            <div className="space-y-2">
              {visibleEmployees.map((employee) => {
                const selected = employee.id === selectedEmployee.id;

                return (
                  <button
                    key={employee.id}
                    type="button"
                    onClick={() => {
                      selectEmployee(employee.id);

                      setActiveTab("overview");
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      px-3
                      py-3
                      text-left
                      transition

                      ${
                        selected
                          ? "border-blue-500 bg-blue-50/40"
                          : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                      }
                    `}
                  >
                    {/* AVATAR */}

                    {employee.avatarUrl ? (
                      <img
                        src={employee.avatarUrl}
                        alt={employee.name}
                        className="
                          h-12
                          w-12
                          shrink-0
                          rounded-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-slate-100
                          text-sm
                          font-bold
                          text-blue-600
                        "
                      >
                        {getInitials(employee.name)}
                      </div>
                    )}

                    {/* NAME + ROLE */}

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-900
                        "
                      >
                        {employee.name}
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        {getRoleLabel(employee)}
                      </div>
                    </div>

                    {/* DEPARTMENT */}

                    <span
                      className={`
                        hidden
                        rounded-lg
                        px-2.5
                        py-1
                        text-[11px]
                        font-semibold
                        xl:block

                        ${
                          employee.department === "bla"
                            ? "bg-blue-50 text-blue-600"
                            : employee.department === "raud"
                              ? "bg-red-50 text-red-500"
                              : "bg-purple-50 text-purple-600"
                        }
                      `}
                    >
                      {getDepartmentLabel(employee.department)}
                    </span>

                    {/* STATUS */}

                    <span
                      className={`
                        h-2.5
                        w-2.5
                        shrink-0
                        rounded-full

                        ${
                          employee.status === "active"
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>

            {/* EMPTY SEARCH */}

            {visibleEmployees.length === 0 && (
              <div className="py-10 text-center text-sm text-slate-500">
                Ingen tilsette funne.
              </div>
            )}

            {/* PAGINATION */}

            {filteredEmployees.length > pageSize && (
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    disabled:opacity-40
                  "
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1,
                )
                  .slice(0, 3)
                  .map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`
                        h-9
                        w-9
                        rounded-lg
                        border
                        text-sm
                        font-semibold

                        ${
                          safePage === pageNumber
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-slate-200 bg-white text-slate-700"
                        }
                      `}
                    >
                      {pageNumber}
                    </button>
                  ))}

                {totalPages > 4 && (
                  <span className="px-1 text-slate-400">...</span>
                )}

                {totalPages > 3 && (
                  <button
                    type="button"
                    onClick={() => setPage(totalPages)}
                    className={`
                      h-9
                      w-9
                      rounded-lg
                      border
                      text-sm
                      font-semibold

                      ${
                        safePage === totalPages
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-white text-slate-700"
                      }
                    `}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setPage((value) => Math.min(totalPages, value + 1))
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    disabled:opacity-40
                  "
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </section>
        </aside>

        {/* =================================================
            RIGHT — EMPLOYEE PROFILE
        ================================================= */}

        <main className="min-w-0">
          {/* PROFILE HEADER */}

          <section
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-7
              py-5
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* PHOTO */}

                {selectedEmployee.avatarUrl ? (
                  <img
                    src={selectedEmployee.avatarUrl}
                    alt={selectedEmployee.name}
                    className="
                      h-[150px]
                      w-[150px]
                      rounded-2xl
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-[150px]
                      w-[150px]
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                      text-3xl
                      font-bold
                      text-blue-600
                    "
                  >
                    {getInitials(selectedEmployee.name)}
                  </div>
                )}

                {/* BASIC INFO */}

                <div>
                  <div className="flex items-center gap-3">
                    <h2
                      className="
                        text-[30px]
                        font-bold
                        text-slate-900
                      "
                    >
                      {selectedEmployee.name}
                    </h2>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-50
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-emerald-600
                      "
                    >
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-emerald-500
                        "
                      />
                      Aktiv
                    </span>
                  </div>

                  <div className="mt-2 text-[17px] text-slate-700">
                    {getRoleLabel(selectedEmployee)}
                  </div>

                  <div className="mt-3 text-[16px] text-slate-600">
                    Ansatt siden: {selectedEmployee.startDate ?? "—"}
                  </div>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    text-sm
                    font-semibold
                  "
                >
                  <Edit3 size={18} />
                  Rediger
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-xl
                    bg-slate-900
                    px-5
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <CalendarDays size={18} />
                  Meld fråvær
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                  "
                >
                  <MoreVertical size={19} />
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
              TABS
          ================================================= */}

          <nav
            className="
              mt-3
              flex
              h-[62px]
              items-stretch
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              shadow-sm
            "
          >
            <Tab
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Oversikt
            </Tab>

            <Tab
              active={activeTab === "work"}
              onClick={() => setActiveTab("work")}
            >
              Arbeid
            </Tab>

            <Tab
              active={activeTab === "contract"}
              onClick={() => setActiveTab("contract")}
            >
              Kontrakt
            </Tab>

            <Tab
              active={activeTab === "competence"}
              onClick={() => setActiveTab("competence")}
            >
              Kompetanse
            </Tab>

            <Tab
              active={activeTab === "absence"}
              onClick={() => setActiveTab("absence")}
            >
              Fråvær
            </Tab>
          </nav>

          {/* =================================================
              OVERVIEW
          ================================================= */}

          {activeTab === "overview" && (
            <Overview employee={selectedEmployee} nextShift={nextShift} />
          )}

          {/* =================================================
              OTHER TABS
              
              Keep your existing implementations here.
          ================================================= */}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  employee,
  nextShift,
}: {
  employee: MowiEmployee;
  nextShift?: any;
}) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {/* ===================================================
          ARBEIDSINFORMASJON
      =================================================== */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="mb-6 flex items-center gap-3">
          <Settings2 size={20} />

          <h3 className="text-[17px] font-bold">Arbeidsinformasjon</h3>
        </div>

        <div className="space-y-4">
          <WorkRow
            label="Avdeling"
            value={getDepartmentLabel(employee.department)}
            badge
          />

          <WorkRow label="Arbeidsplass" value={employee.workplace} />

          <WorkRow label="Stilling" value="Operator" />

          <WorkRow label="Skift" value={employee.shiftPreference} />

          <WorkRow label="Pauseoppsett" value={employee.pauseSetup} />

          <WorkRow
            label="Stillingsprosent"
            value={
              employee.employmentPercentage !== undefined
                ? `${employee.employmentPercentage}%`
                : undefined
            }
          />

          <WorkRow
            label="Kontrakttype"
            value={
              employee.contractType === "fast"
                ? "Fast"
                : employee.contractType === "midlertidig"
                  ? "Midlertidig"
                  : undefined
            }
          />
        </div>
      </section>

      {/* ===================================================
          KONTAKTINFORMASJON
      =================================================== */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <h3 className="mb-6 text-[17px] font-bold">Kontaktinformasjon</h3>

        {employee.phone && (
          <div className="mb-5 flex items-center gap-4">
            <Phone size={19} />

            <span className="text-sm">{employee.phone}</span>
          </div>
        )}

        {employee.email && (
          <div className="mb-5 flex items-center gap-4">
            <Mail size={19} />

            <span className="text-sm">{employee.email}</span>
          </div>
        )}

        {employee.location && (
          <div className="mb-5 flex items-center gap-4">
            <MapPin size={19} />

            <span className="text-sm">{employee.location}</span>
          </div>
        )}

        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-blue-600
          "
        >
          <MessageCircle size={19} />
          Chat med tilsett
        </button>
      </section>

      {/* ===================================================
          NØKKELINFORMASJON
      =================================================== */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <h3 className="mb-6 text-[17px] font-bold">Nøkkelinformasjon</h3>

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

      {/* ===================================================
          NESTE SKIFT
      =================================================== */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <CalendarDays size={20} />

          <h3 className="text-[17px] font-bold">Neste skift</h3>
        </div>

        {nextShift ? (
          <>
            <div
              className="
                flex
                items-center
                rounded-xl
                border
                border-blue-100
                bg-blue-50/50
                p-3
              "
            >
              <div
                className="
                  flex
                  h-[78px]
                  w-[70px]
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                "
              >
                <span className="text-xs">{formatWeekday(nextShift.date)}</span>

                <strong className="text-[26px]">
                  {formatDay(nextShift.date)}
                </strong>

                <small className="text-xs text-slate-500">
                  {formatMonth(nextShift.date)}
                </small>
              </div>

              <div className="ml-4">
                <strong className="text-[16px]">
                  {nextShift.shift.start} – {nextShift.shift.end}
                </strong>

                <div className="mt-2 text-sm text-slate-600">
                  {getDepartmentLabel(nextShift.department)} •{" "}
                  {nextShift.workplace ?? "—"}
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  {nextShift.shift.name}
                </div>
              </div>

              {nextShift.pause !== undefined && (
                <span
                  className="
                    ml-auto
                    rounded-lg
                    bg-blue-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-blue-600
                  "
                >
                  {nextShift.pause} pause
                </span>
              )}
            </div>

            <button
              type="button"
              className="
                mt-4
                text-sm
                font-semibold
                text-blue-600
              "
            >
              Se full vaktplan
            </button>
          </>
        ) : (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-200
              p-7
              text-center
              text-sm
              text-slate-500
            "
          >
            Ingen planlagt skift
          </div>
        )}
      </section>

      {/* ===================================================
          ARBEIDSTIDER
      =================================================== */}

      <section
        className="
          col-span-2
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <Clock3 size={20} />

          <h3 className="text-[17px] font-bold">Arbeidstider</h3>
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
            value={
              employee.hoursThisMonth !== undefined
                ? `${employee.hoursThisMonth} t`
                : "—"
            }
          />

          <HoursValue
            label="Gjennomsnitt per veke"
            value={
              employee.hoursThisWeek !== undefined
                ? `${employee.hoursThisWeek} t`
                : "—"
            }
          />

          <HoursValue
            label="Overtid"
            value={
              employee.overtime !== undefined ? `${employee.overtime} t` : "—"
            }
          />
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   TAB
========================================================= */

function Tab({
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
      className={`
        relative
        px-7
        text-sm
        ${active ? "font-semibold text-blue-600" : "font-medium text-slate-600"}
      `}
    >
      {children}

      {active && (
        <span
          className="
            absolute
            bottom-0
            left-4
            right-4
            h-0.5
            bg-blue-600
          "
        />
      )}
    </button>
  );
}

/* =========================================================
   WORK ROW
========================================================= */

function WorkRow({
  label,
  value,
  badge,
}: {
  label: string;
  value?: string;
  badge?: boolean;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[145px_1fr]
        items-center
        gap-3
        text-sm
      "
    >
      <span className="text-slate-500">{label}</span>

      {badge && value && value !== "—" ? (
        <strong
          className="
            w-fit
            rounded-lg
            bg-blue-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-blue-600
          "
        >
          {value}
        </strong>
      ) : (
        <strong className="font-semibold text-slate-800">{value ?? "—"}</strong>
      )}
    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div
      className="
        mb-5
        grid
        grid-cols-[145px_1fr]
        gap-3
        text-sm
      "
    >
      <span className="text-slate-500">{label}</span>

      <strong className="font-semibold text-slate-800">{value ?? "—"}</strong>
    </div>
  );
}

/* =========================================================
   HOURS TAB
========================================================= */

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
      className={`
        relative
        flex-1
        pb-3
        text-sm
        ${active ? "font-semibold text-blue-600" : "text-slate-500"}
      `}
    >
      {children}

      {active && (
        <span
          className="
            absolute
            bottom-[-1px]
            left-[20%]
            right-[20%]
            h-0.5
            bg-blue-600
          "
        />
      )}
    </button>
  );
}

/* =========================================================
   HOURS VALUE
========================================================= */

function HoursValue({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        border-l
        border-slate-200
        pl-6
        first:border-l-0
        first:pl-0
      "
    >
      <span className="block text-sm text-slate-500">{label}</span>

      <strong
        className="
          mt-1
          block
          text-[22px]
          font-bold
          text-slate-900
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   DATE HELPERS
========================================================= */

function getDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function formatWeekday(date: string) {
  return new Intl.DateTimeFormat("no-NO", {
    weekday: "short",
  })
    .format(getDate(date))
    .replace(".", "");
}

function formatDay(date: string) {
  return getDate(date).getDate();
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("no-NO", {
    month: "short",
  })
    .format(getDate(date))
    .replace(".", "");
}
