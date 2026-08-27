import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  UserRound,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { ReplacementEmployee } from "./find-replacement";

interface ArrangeShiftProps {
  absentEmployee: {
    name: string;
    department: string;
  };

  replacement: ReplacementEmployee;

  date: string;
  shift: "day" | "evening";
  department: string;
  pause: string;
  workplace: string;
  fromTime: string;
  toTime: string;

  onDateChange: (value: string) => void;
  onShiftChange: (value: "day" | "evening") => void;
  onDepartmentChange: (value: string) => void;
  onPauseChange: (value: string) => void;
  onWorkplaceChange: (value: string) => void;
  onFromTimeChange: (value: string) => void;
  onToTimeChange: (value: string) => void;

  onBack: () => void;
  onSend: () => void;
}

export function ArrangeShift({
  absentEmployee,
  replacement,
  date,
  shift,
  department,
  pause,
  workplace,
  fromTime,
  toTime,
  onDateChange,
  onShiftChange,
  onDepartmentChange,
  onPauseChange,
  onWorkplaceChange,
  onFromTimeChange,
  onToTimeChange,
  onBack,
  onSend,
}: ArrangeShiftProps) {
  return (
    <main className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1360px] px-6 py-6">
        {/* TITLE */}

        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          3. Avtal vakt
        </h1>

        {/* STEPPER */}

        <div className="mt-4">
          <div className="flex max-w-[500px] items-center">
            <Step number={1} label="Fråvær" completed />

            <StepLine />

            <Step number={2} label="Erstattar" completed />

            <StepLine />

            <Step number={3} label="Avtal vakt" active />
          </div>
        </div>

        <Card className="mt-4 border-slate-200 bg-white shadow-sm">
          <div className="p-4">
            {/* EMPLOYEES */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <EmployeeCard
                title="Fråværande"
                name={absentEmployee.name}
                department={absentEmployee.department}
              />

              <EmployeeCard
                title="Erstattar"
                name={replacement.name}
                department={replacement.department}
              />
            </div>

            {/* DATE / SHIFT */}

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-[10px] font-medium">
                  Dato <span className="text-red-500">*</span>
                </Label>

                <div className="relative mt-1">
                  <Input
                    type="date"
                    value={date}
                    onChange={(event) => onDateChange(event.target.value)}
                    className="h-8 pr-8 text-[10px]"
                  />

                  <Calendar className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                </div>
              </div>

              <div>
                <Label className="text-[10px] font-medium">
                  Vakt <span className="text-red-500">*</span>
                </Label>

                <div className="mt-2 flex gap-5">
                  <RadioOption
                    label="Dagvakt"
                    checked={shift === "day"}
                    onChange={() => onShiftChange("day")}
                  />

                  <RadioOption
                    label="Kveldsskift"
                    checked={shift === "evening"}
                    onChange={() => onShiftChange("evening")}
                  />
                </div>
              </div>
            </div>

            {/* DEPARTMENT / PAUSE / WORKPLACE */}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <SelectField
                label="Avdeling"
                required
                value={department}
                onChange={onDepartmentChange}
                options={["Raud avdeling", "Blå avdeling", "Filet avdeling"]}
              />

              <SelectField
                label="Pause"
                required
                value={pause}
                onChange={onPauseChange}
                options={[
                  "Pause 1",
                  "Pause 2",
                  "Pause 3",
                  "Pause 4",
                  "Pause 5",
                ]}
              />

              <SelectField
                label="Arbeidsplass"
                required
                value={workplace}
                onChange={onWorkplaceChange}
                options={[
                  "Manuell",
                  "Maskin A1",
                  "Maskin A2",
                  "Maskin A3",
                  "Maskin A4",
                  "Maskin A5",
                ]}
              />
            </div>

            {/* TIME */}

            <div className="mt-4">
              <Label className="text-[10px] font-medium">Tidspunkt</Label>

              <div className="mt-1 flex items-center gap-2">
                <div className="relative">
                  <Input
                    type="time"
                    value={fromTime}
                    onChange={(event) => onFromTimeChange(event.target.value)}
                    className="h-8 w-[100px] pr-7 text-[10px]"
                  />

                  <Clock className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
                </div>

                <span className="text-[10px] text-slate-400">til</span>

                <div className="relative">
                  <Input
                    type="time"
                    value={toTime}
                    onChange={(event) => onToTimeChange(event.target.value)}
                    className="h-8 w-[100px] pr-7 text-[10px]"
                  />

                  <Clock className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
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
            onClick={onSend}
            className="h-8 min-w-[130px] px-4 text-[10px]"
          >
            Send førespurnad
            <ArrowRight className="ml-1.5 h-3 w-3" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function EmployeeCard({
  title,
  name,
  department,
}: {
  title: string;
  name: string;
  department: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 p-3">
      <p className="text-[9px] font-semibold text-slate-600">{title}</p>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
          <UserRound className="h-4 w-4 text-slate-500" />
        </div>

        <div>
          <p className="text-[10px] font-semibold text-slate-900">{name}</p>

          <p className="text-[9px] text-slate-500">{department}</p>
        </div>
      </div>
    </div>
  );
}

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5 text-[10px]">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="h-3 w-3 accent-blue-600"
      />

      {label}
    </label>
  );
}

function SelectField({
  label,
  required,
  value,
  options,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label className="text-[10px] font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-700 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
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
          "whitespace-nowrap text-[9px]",
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
