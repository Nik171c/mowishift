import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Info,
  Plus,
  Users,
} from "lucide-react";
import "./extravakt.css";

type Department = "raud" | "bla" | "filet";

type Employee = {
  id: number;
  name: string;
  department: Department;
  selected: boolean;
};

const employees: Employee[] = [
  {
    id: 1,
    name: "Anna Hansen",
    department: "raud",
    selected: false,
  },
  {
    id: 2,
    name: "Per Olsen",
    department: "raud",
    selected: false,
  },
  {
    id: 3,
    name: "Kari Nilsen",
    department: "bla",
    selected: false,
  },
  {
    id: 4,
    name: "Morten Larsen",
    department: "bla",
    selected: false,
  },
  {
    id: 5,
    name: "Ingrid Berg",
    department: "filet",
    selected: false,
  },
  {
    id: 6,
    name: "Ole Kristiansen",
    department: "filet",
    selected: false,
  },
];

const departments = [
  {
    id: "raud" as Department,
    label: "Raud",
    color: "#ef4444",
  },
  {
    id: "bla" as Department,
    label: "Blå",
    color: "#2563eb",
  },
  {
    id: "filet" as Department,
    label: "Filet",
    color: "#7c3aed",
  },
];

export default function Extravakt() {
  /*
   * 1 = Ny førespurnad
   * 2 = Interessete medarbeidarar
   * 3 = Lag ferdig plan per avdeling
   * 4 = Ferdig plan
   */
  const [currentStep, setCurrentStep] = useState(1);

  const [leader, setLeader] = useState("");
  const [office, setOffice] = useState("");

  const [date, setDate] = useState("26.07.2026");
  const [shift, setShift] = useState("day");

  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([
    "raud",
    "bla",
    "filet",
  ]);

  const [employeeCount, setEmployeeCount] = useState("6");

  const [note, setNote] = useState("");

  const [specialOperator, setSpecialOperator] = useState("");

  const [interestedEmployees, setInterestedEmployees] =
    useState<Employee[]>(employees);

  /*
   * Når admin trykker "Publiser extravakt"
   * går vi til STEP 2.
   */
  const handlePublish = () => {
    setCurrentStep(2);
  };

  /*
   * Toggle medarbeidar.
   */
  const toggleEmployee = (id: number) => {
    setInterestedEmployees((current) =>
      current.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              selected: !employee.selected,
            }
          : employee,
      ),
    );
  };

  /*
   * Gå fra STEP 2 til STEP 3.
   */
  const handleContinueToPlan = () => {
    const selected = interestedEmployees.filter(
      (employee) => employee.selected,
    );

    if (selected.length === 0) {
      alert("Vel minst éin medarbeidar.");
      return;
    }

    setCurrentStep(3);
  };

  /*
   * STEP 4.
   */
  const handleFinishPlan = () => {
    setCurrentStep(4);
  };

  /*
   * Ny extravakt.
   */
  const handleNewExtravakt = () => {
    setCurrentStep(1);

    setLeader("");
    setOffice("");
    setDate("26.07.2026");
    setShift("day");
    setSelectedDepartments(["raud"]);
    setEmployeeCount("6");
    setNote("");
    setSpecialOperator("");

    setInterestedEmployees(employees);
  };

  return (
    <main className="extravakt-page">
      {/* ================================
          HEADER
      ================================= */}

      <header className="extravakt-header">
        <h1>Extravakt (laurdag)</h1>

        <ExtravaktStepper
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </header>

      {/* ================================
          STEP 1
      ================================= */}

      {currentStep === 1 && (
        <NewRequestStep
          leader={leader}
          setLeader={setLeader}
          office={office}
          setOffice={setOffice}
          date={date}
          setDate={setDate}
          shift={shift}
          setShift={setShift}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          employeeCount={employeeCount}
          setEmployeeCount={setEmployeeCount}
          note={note}
          setNote={setNote}
          specialOperator={specialOperator}
          setSpecialOperator={setSpecialOperator}
          onPublish={handlePublish}
        />
      )}

      {/* ================================
          STEP 2
      ================================= */}

      {currentStep === 2 && (
        <InterestedEmployeesStep
          date={date}
          shift={shift}
          selectedDepartments={selectedDepartments}
          employeeCount={employeeCount}
          interestedEmployees={interestedEmployees}
          onToggleEmployee={toggleEmployee}
          onContinue={handleContinueToPlan}
        />
      )}

      {/* ================================
          STEP 3
      ================================= */}

      {currentStep === 3 && (
        <DepartmentPlanStep
          employees={interestedEmployees.filter(
            (employee) => employee.selected,
          )}
          selectedDepartments={selectedDepartments}
          onFinish={handleFinishPlan}
        />
      )}

      {/* ================================
          STEP 4
      ================================= */}

      {currentStep === 4 && (
        <FinishedPlanStep
          date={date}
          shift={shift}
          selectedDepartments={selectedDepartments}
          employees={interestedEmployees.filter(
            (employee) => employee.selected,
          )}
          onNew={handleNewExtravakt}
        />
      )}
    </main>
  );
}

/* =========================================================
   STEPPER
========================================================= */

type StepperProps = {
  currentStep: number;
  onStepClick: (step: number) => void;
};

function ExtravaktStepper({ currentStep, onStepClick }: StepperProps) {
  const steps = [
    "Ny førespurnad",
    "Interessete medarbeidarar",
    "Lag ferdig plan per avdeling",
    "Ferdig plan",
  ];

  return (
    <div className="stepper">
      {steps.map((label, index) => {
        const step = index + 1;

        const completed = currentStep > step;
        const active = currentStep === step;

        return (
          <button
            key={label}
            type="button"
            className={`step ${
              active ? "active" : ""
            } ${completed ? "completed" : ""}`}
            onClick={() => {
              /*
               * Admin kan kun gå tilbake
               * eller til allerede fullførte steg.
               */
              if (step <= currentStep) {
                onStepClick(step);
              }
            }}
            disabled={step > currentStep}
          >
            <span className="step-circle">
              {completed ? <Check size={13} /> : step}
            </span>

            <span className="step-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   STEP 1
========================================================= */

type NewRequestProps = {
  leader: string;
  setLeader: (value: string) => void;
  office: string;
  setOffice: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  shift: string;
  setShift: (value: string) => void;
  selectedDepartments: Department[];
  setSelectedDepartments: (value: Department[]) => void;
  employeeCount: string;
  setEmployeeCount: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  specialOperator: string;
  setSpecialOperator: (value: string) => void;
  onPublish: () => void;
};

function NewRequestStep({
  leader,
  setLeader,
  office,
  setOffice,
  date,
  setDate,
  shift,
  setShift,
  selectedDepartments,
  setSelectedDepartments,
  employeeCount,
  setEmployeeCount,
  note,
  setNote,
  specialOperator,
  setSpecialOperator,
  onPublish,
}: NewRequestProps) {
  const toggleDepartment = (department: Department) => {
    setSelectedDepartments(
      selectedDepartments.includes(department)
        ? selectedDepartments.filter((item) => item !== department)
        : [...selectedDepartments, department],
    );
  };

  const canPublish =
    leader &&
    office &&
    date &&
    shift &&
    selectedDepartments.length > 0 &&
    Number(employeeCount) > 0;

  return (
    <section className="extravakt-card">
      <NordicField label="Leder" required>
        <select
          className="nordic-input"
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
        >
          <option value="">Vel leder</option>
          <option value="Kari Hansen">Kari Hansen</option>
          <option value="Ola Nilsen">Ola Nilsen</option>
        </select>
      </NordicField>

      <NordicField label="Kontor" required>
        <select
          className="nordic-input"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
        >
          <option value="">Vel kontor</option>
          <option value="Eggesbønes">Eggesbønes</option>
          <option value="Fosnavåg">Fosnavåg</option>
        </select>
      </NordicField>

      <NordicField label="Tlf">
        <input className="nordic-input disabled" value="93 04 5027" readOnly />
      </NordicField>

      <div className="divider" />

      <div className="section-heading">
        <div className="section-number">1</div>

        <div>
          <h2>Ny førespurnad</h2>
          <p>Opprett extravakt</p>
        </div>
      </div>

      <div className="two-columns">
        <NordicField label="Dato" required>
          <div className="icon-input">
            <input
              className="nordic-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <CalendarDays size={17} />
          </div>
        </NordicField>

        <NordicField label="Skift" required>
          <select
            className="nordic-input"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            <option value="day">Dagsskift (07:00 – 15:15)</option>

            <option value="evening">Ettermiddagsskift (15:00 – 23:15)</option>
          </select>
        </NordicField>
      </div>

      <NordicField label="Avdeling" required>
        <div className="department-buttons">
          {departments.map((department) => {
            const selected = selectedDepartments.includes(department.id);

            return (
              <button
                key={department.id}
                type="button"
                className={`department-button ${selected ? "selected" : ""}`}
                onClick={() => toggleDepartment(department.id)}
              >
                <span
                  className="department-dot"
                  style={{
                    background: department.color,
                  }}
                />

                {department.label}

                {selected && <Check size={15} />}
              </button>
            );
          })}
        </div>

        <span className="helper-text">
          Vel éi eller fleire avdelingar for extravakta.
        </span>
      </NordicField>

      <NordicField label="Tal medarbeidarar" required>
        <input
          className="nordic-input"
          type="number"
          min={1}
          value={employeeCount}
          onChange={(e) => setEmployeeCount(e.target.value)}
        />

        <span className="helper-text">Kor mange treng vi totalt?</span>
      </NordicField>

      <NordicField label="Merknad (valfritt)">
        <textarea
          className="nordic-textarea"
          value={note}
          maxLength={200}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Skriv ein merknad her..."
        />

        <span className="helper-text">{note.length} / 200</span>
      </NordicField>

      <div className="info-box">
        <Info size={17} />

        <span>
          Extravakta vert publisert for alle medarbeidarar. Dei som ønskjer å
          jobbe, kan melde interesse.
        </span>
      </div>

      <NordicField label="Spesialoperatør (na nynorsk)">
        <select
          className="nordic-input"
          value={specialOperator}
          onChange={(e) => setSpecialOperator(e.target.value)}
        >
          <option value="">Vel spesialoperatør</option>

          <option value="Per Hansen">Per Hansen</option>

          <option value="Anna Nilsen">Anna Nilsen</option>
        </select>
      </NordicField>

      <button
        className="publish-button"
        type="button"
        disabled={!canPublish}
        onClick={onPublish}
      >
        <Plus size={18} />
        Publiser extravakt
      </button>
    </section>
  );
}

/* =========================================================
   STEP 2
========================================================= */

type InterestedEmployeesProps = {
  date: string;
  shift: string;
  selectedDepartments: Department[];
  employeeCount: string;
  interestedEmployees: Employee[];
  onToggleEmployee: (id: number) => void;
  onContinue: () => void;
};

function InterestedEmployeesStep({
  date,
  shift,
  selectedDepartments,
  employeeCount,
  interestedEmployees,
  onToggleEmployee,
  onContinue,
}: InterestedEmployeesProps) {
  const selectedCount = interestedEmployees.filter(
    (employee) => employee.selected,
  ).length;

  return (
    <section className="extravakt-card">
      <div className="success-box">
        <div className="success-icon">
          <Check size={19} />
        </div>

        <div>
          <strong>Extravakt er publisert!</strong>

          <span>
            Førespurnaden er no synleg for alle medarbeidarar i dei valde
            avdelingane.
          </span>
        </div>
      </div>

      <div className="section-heading">
        <div className="section-number">2</div>

        <div>
          <h2>Interessete medarbeidarar</h2>

          <p>Vel kven som skal arbeid denne laurdagen</p>
        </div>
      </div>

      <div className="summary-card">
        <div>
          <span>Dato</span>
          <strong>{date} (Laurdag)</strong>
        </div>

        <div>
          <span>Skift</span>
          <strong>
            {shift === "day"
              ? "Dagsskift (07:00 – 15:15)"
              : "Ettermiddagsskift"}
          </strong>
        </div>

        <div>
          <span>Avdelingar</span>

          <strong className="department-summary">
            {selectedDepartments.map((department) => (
              <span key={department}>
                {departments.find((item) => item.id === department)?.label}
              </span>
            ))}
          </strong>
        </div>

        <div>
          <span>Behov</span>
          <strong>{employeeCount} medarbeidarar</strong>
        </div>
      </div>

      <div className="interest-header">
        <div>
          <h3>Medarbeidarar som har meldt interesse</h3>

          <p>{selectedCount} valde</p>
        </div>

        <div className="employee-count">
          <Users size={17} />
          {interestedEmployees.length}
        </div>
      </div>

      <div className="employee-list">
        {interestedEmployees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            className={`employee-row ${
              employee.selected ? "employee-selected" : ""
            }`}
            onClick={() => onToggleEmployee(employee.id)}
          >
            <div className="employee-avatar">
              {employee.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="employee-info">
              <strong>{employee.name}</strong>

              <span>
                {
                  departments.find((item) => item.id === employee.department)
                    ?.label
                }
              </span>
            </div>

            <div
              className={`employee-check ${employee.selected ? "checked" : ""}`}
            >
              {employee.selected && <Check size={15} />}
            </div>
          </button>
        ))}
      </div>

      <div className="step-actions">
        <button type="button" className="primary-action" onClick={onContinue}>
          Lag plan per avdeling
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   STEP 3
========================================================= */

type DepartmentPlanProps = {
  employees: Employee[];
  selectedDepartments: Department[];
  onFinish: () => void;
};

function DepartmentPlanStep({
  employees,
  selectedDepartments,
  onFinish,
}: DepartmentPlanProps) {
  return (
    <section className="extravakt-card">
      <div className="section-heading">
        <div className="section-number">3</div>

        <div>
          <h2>Lag ferdig plan per avdeling</h2>

          <p>Fordel dei valde medarbeidarane mellom avdelingane</p>
        </div>
      </div>

      <div className="plan-info">
        <Info size={18} />

        <span>
          Flytt medarbeidarane til rett avdeling før du lagar ferdig plan.
        </span>
      </div>

      <div className="department-plan-grid">
        {selectedDepartments.map((departmentId) => {
          const department = departments.find(
            (item) => item.id === departmentId,
          );

          const departmentEmployees = employees.filter(
            (employee) => employee.department === departmentId,
          );

          return (
            <div key={departmentId} className="department-plan-card">
              <div className="department-plan-header">
                <div className="department-title">
                  <span
                    className="department-dot"
                    style={{
                      background: department?.color,
                    }}
                  />

                  <strong>{department?.label}</strong>
                </div>

                <span>{departmentEmployees.length}</span>
              </div>

              <div className="department-workers">
                {departmentEmployees.length > 0 ? (
                  departmentEmployees.map((employee) => (
                    <div className="plan-employee" key={employee.id}>
                      <div className="employee-avatar small">
                        {employee.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span>{employee.name}</span>
                    </div>
                  ))
                ) : (
                  <span className="empty-plan">Ingen medarbeidarar</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="step-actions">
        <button type="button" className="primary-action" onClick={onFinish}>
          Ferdigstill plan
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   STEP 4
========================================================= */

type FinishedPlanProps = {
  date: string;
  shift: string;
  selectedDepartments: Department[];
  employees: Employee[];
  onNew: () => void;
};

function FinishedPlanStep({
  date,
  shift,
  selectedDepartments,
  employees,
  onNew,
}: FinishedPlanProps) {
  return (
    <section className="extravakt-card">
      <div className="success-box">
        <div className="success-icon">
          <Check size={19} />
        </div>

        <div>
          <strong>Extravakt er ferdig planlagt!</strong>

          <span>Alle valde medarbeidarar er no lagt inn i planen.</span>
        </div>
      </div>

      <div className="section-heading">
        <div className="section-number">4</div>

        <div>
          <h2>Ferdig plan</h2>

          <p>Extravakt er klar</p>
        </div>
      </div>

      <div className="finished-summary">
        <div className="finished-item">
          <CalendarDays size={20} />

          <div>
            <span>Dato</span>
            <strong>{date} (Laurdag)</strong>
          </div>
        </div>

        <div className="finished-item">
          <Clock3 size={20} />

          <div>
            <span>Skift</span>
            <strong>
              {shift === "day" ? "07:00 – 15:15" : "15:00 – 23:15"}
            </strong>
          </div>
        </div>

        <div className="finished-item">
          <Users size={20} />

          <div>
            <span>Medarbeidarar</span>
            <strong>{employees.length}</strong>
          </div>
        </div>
      </div>

      <div className="finished-departments">
        {selectedDepartments.map((departmentId) => {
          const department = departments.find(
            (item) => item.id === departmentId,
          );

          const count = employees.filter(
            (employee) => employee.department === departmentId,
          ).length;

          return (
            <div className="finished-department" key={departmentId}>
              <span
                className="department-dot"
                style={{
                  background: department?.color,
                }}
              />

              <strong>{department?.label}</strong>

              <span>{count} medarbeidarar</span>
            </div>
          );
        })}
      </div>

      <button type="button" className="secondary-action" onClick={onNew}>
        <Plus size={18} />
        Opprett ny extravakt
      </button>
    </section>
  );
}

/* =========================================================
   FIELD
========================================================= */

function NordicField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="nordic-field">
      <label>
        {label}

        {required && <span className="required">*</span>}
      </label>

      {children}
    </div>
  );
}
