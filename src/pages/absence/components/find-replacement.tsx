import { ArrowLeft, ArrowRight, Search, UserRound } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export interface ReplacementEmployee {
  id: string;
  name: string;
  department: string;
  hours: string;
  position: string;
}

interface FindReplacementProps {
  absentEmployee: {
    name: string;
    department: string;
    date: string;
    shift: string;
    fromTime: string;
    toTime: string;
  };

  selectedEmployee: ReplacementEmployee | null;

  onSelect: (employee: ReplacementEmployee) => void;

  onBack: () => void;

  onContinue: () => void;
}

const employees: ReplacementEmployee[] = [
  {
    id: "roman-hansen",
    name: "Roman Hansen",
    department: "Blå avdeling",
    hours: "32 t denne veka",
    position: "Operatør",
  },
  {
    id: "romina-pettersen",
    name: "Romina Pettersen",
    department: "Filet avdeling",
    hours: "28 t denne veka",
    position: "Operatør",
  },
  {
    id: "ruben-sandvik",
    name: "Ruben Sandvik",
    department: "Raud avdeling",
    hours: "30 t denne veka",
    position: "Operatør",
  },
  {
    id: "borys-petrenko",
    name: "Borys Petrenko",
    department: "Blå avdeling",
    hours: "35 t denne veka",
    position: "Operatør",
  },
  {
    id: "ingrid-nilsen",
    name: "Ingrid Nilsen",
    department: "Filet avdeling",
    hours: "31 t denne veka",
    position: "Operatør",
  },
];

export function FindReplacement({
  absentEmployee,
  selectedEmployee,
  onSelect,
  onBack,
  onContinue,
}: FindReplacementProps) {
  return (
    <main className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1360px] px-6 py-6">
        {/* TITLE */}

        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          2. Finn erstattar
        </h1>

        {/* STEPPER */}

        <div className="mt-4">
          <div className="flex max-w-[500px] items-center">
            <Step number={1} label="Fråvær" completed />

            <StepLine />

            <Step number={2} label="Erstattar" active />

            <StepLine />

            <Step number={3} label="Avtal vakt" />
          </div>
        </div>

        {/* MAIN CARD */}

        <Card className="mt-4 overflow-hidden border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[125px_1fr]">
            {/* ABSENT EMPLOYEE */}

            <div className="border-b border-slate-100 p-4 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-semibold text-slate-700">Fråvær</p>

              <div className="mt-4 flex justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  <UserRound className="h-5 w-5 text-slate-500" />
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-[11px] font-semibold text-slate-900">
                  {absentEmployee.name}
                </p>

                <p className="mt-1 text-[9px] text-slate-500">
                  {absentEmployee.department}
                </p>

                <p className="mt-3 text-[9px] text-slate-600">
                  {absentEmployee.date} · {absentEmployee.shift}
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  {absentEmployee.fromTime} – {absentEmployee.toTime}
                </p>
              </div>
            </div>

            {/* REPLACEMENT SEARCH */}

            <div className="p-4">
              <p className="text-[10px] font-semibold text-slate-700">
                Søk etter tilsett
              </p>

              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                <Input
                  placeholder="Søk etter namn eller etternamn"
                  className="h-8 pl-8 text-[10px]"
                />
              </div>

              {/* FILTERS */}

              <div className="mt-3 grid grid-cols-3 gap-3">
                <FilterSelect label="Avdeling" value="Alle avdelingar" />

                <FilterSelect label="Vakt" value={absentEmployee.shift} />

                <FilterSelect label="Status" value="Tilgjengeleg" />
              </div>

              {/* AVAILABLE EMPLOYEES */}

              <div className="mt-4">
                <p className="text-[10px] font-semibold text-slate-800">
                  Tilgjengelege tilsette
                </p>

                <div className="mt-2 overflow-hidden rounded-md border border-slate-200">
                  {employees.map((employee) => {
                    const selected = selectedEmployee?.id === employee.id;

                    return (
                      <div
                        key={employee.id}
                        className={[
                          "flex min-h-[34px] items-center gap-2 border-b border-slate-100 px-2 last:border-b-0",
                          selected ? "bg-blue-50" : "bg-white",
                        ].join(" ")}
                      >
                        <input
                          type="radio"
                          name="replacement"
                          checked={selected}
                          onChange={() => onSelect(employee)}
                          className="h-3 w-3 accent-blue-600"
                        />

                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <UserRound className="h-3.5 w-3.5 text-slate-500" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-semibold text-slate-900">
                              {employee.name}
                            </span>

                            <span className="text-[9px] text-slate-500">
                              {employee.department}
                            </span>

                            <span className="flex items-center gap-1 text-[9px] text-slate-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Tilgjengeleg
                            </span>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant={selected ? "default" : "outline"}
                          onClick={() => onSelect(employee)}
                          className="h-6 min-w-[40px] px-2 text-[9px]"
                        >
                          Vel
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ACTIONS */}

        <div className="mt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-8 px-4 text-[10px]"
          >
            <ArrowLeft className="mr-1.5 h-3 w-3" />
            Tilbake
          </Button>

          <Button
            type="button"
            disabled={!selectedEmployee}
            onClick={onContinue}
            className="h-8 min-w-[105px] px-4 text-[10px]"
          >
            Fortsett
            <ArrowRight className="ml-1.5 h-3 w-3" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function Step({
  number,
  label,
  active = false,
  completed = false,
}: {
  number: number;
  label: string;
  active?: boolean;
  completed?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={[
          "flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-semibold",
          active || completed
            ? "bg-blue-600 text-white"
            : "bg-slate-200 text-slate-500",
        ].join(" ")}
      >
        {completed ? "✓" : number}
      </div>

      <span
        className={[
          "text-[9px] whitespace-nowrap",
          active || completed
            ? "font-semibold text-blue-600"
            : "text-slate-500",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function StepLine() {
  return <div className="mx-2 h-px w-10 bg-slate-200" />;
}

function FilterSelect({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[8px] font-medium text-slate-500">{label}</p>

      <select
        defaultValue={value}
        className="h-7 w-full rounded-md border border-slate-200 bg-white px-2 text-[9px] text-slate-700 outline-none"
      >
        <option>{value}</option>
        <option>Alle</option>
      </select>
    </div>
  );
}
