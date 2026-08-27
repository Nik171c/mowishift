import { Search, UserRound, X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { absenceEmployee, type AbsenceEmployee } from "../data/absence-data";

interface EmployeeSectionProps {
  employee: AbsenceEmployee;
  onEmployeeChange: (employee: AbsenceEmployee) => void;
}

const employees: AbsenceEmployee[] = [
  absenceEmployee,
  {
    id: "anna-berg",
    name: "Anna Berg",
    department: "Blå avdeling",
    position: "Produksjonsmedarbeidar",
  },
  {
    id: "maria-hansen",
    name: "Maria Hansen",
    department: "Filet avdeling",
    position: "Produksjonsmedarbeidar",
  },
];

export function EmployeeSection({
  employee,
  onEmployeeChange,
}: EmployeeSectionProps) {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-900">1. Tilsett</h2>

      <div className="mt-5">
        <Label className="text-xs font-medium">
          Tilsett <span className="text-red-500">*</span>
        </Label>

        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Søk etter namn eller etternamn"
            className="h-9 pl-9 text-xs"
          />
        </div>

        {search.length > 0 && (
          <div className="relative z-10 mt-1 rounded-md border border-slate-200 bg-white shadow-lg">
            {filteredEmployees.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onEmployeeChange(item);
                  setSearch("");
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  <UserRound className="h-4 w-4 text-slate-500" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    {item.name}
                  </p>

                  <p className="text-[10px] text-slate-500">
                    {item.department} · {item.position}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
              <UserRound className="h-4 w-4 text-slate-500" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-900">
                {employee.name}
              </p>

              <p className="text-[10px] text-slate-500">
                {employee.department} · {employee.position}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-slate-400 hover:text-slate-700"
            onClick={() =>
              onEmployeeChange({
                id: "",
                name: "",
                department: "",
                position: "",
              })
            }
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <Label className="text-[10px] font-medium">Avdeling</Label>

          <Input
            value={employee.department}
            readOnly
            className="mt-1 h-8 bg-slate-50 text-[11px]"
          />
        </div>

        <div>
          <Label className="text-[10px] font-medium">Stilling</Label>

          <Input
            value={employee.position}
            readOnly
            className="mt-1 h-8 bg-slate-50 text-[11px]"
          />
        </div>
      </div>
    </section>
  );
}
