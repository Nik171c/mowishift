import { useMemo, useState } from "react";

import { Card } from "@/shared/ui/card";

import { employees } from "../mock-data";

import { ReplacementSearch } from "./replacement-search";
import { ReplacementRow } from "./replacement-row";

export function ReplacementTable() {
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const filteredEmployees = useMemo(() => {
    if (!search.trim()) return employees;

    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-8 p-7">
        {/* Header */}

        <div>
          <h2 className="text-[15px] font-semibold text-slate-900">
            3. Vel medarbeidar som skal ta vakta
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Vel den medarbeidaren som skal overta vakta.
          </p>
        </div>

        {/* Search */}

        <ReplacementSearch value={search} onChange={setSearch} />

        {/* List */}

        <div className="space-y-4">
          {filteredEmployees.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
              <p className="text-sm text-slate-500">
                Ingen medarbeidarar funne.
              </p>
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <ReplacementRow
                key={employee.id}
                employee={employee}
                selected={selectedEmployee === employee.id}
                onSelect={setSelectedEmployee}
              />
            ))
          )}
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-slate-200 pt-5">
          <span className="text-sm text-slate-500">
            {filteredEmployees.length} medarbeidarar
          </span>

          <button
            type="button"
            className="
              text-sm
              font-semibold
              text-blue-600
              transition-colors
              hover:text-blue-700
            "
          >
            Vis fleire medarbeidarar
          </button>
        </div>
      </div>
    </Card>
  );
}
