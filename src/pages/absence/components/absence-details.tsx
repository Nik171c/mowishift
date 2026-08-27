import { Calendar, Clock } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

interface AbsenceDetailsProps {
  date: string;
  absenceType: "single" | "multiple";
  wasAtWork: "yes" | "no";
  fromTime: string;
  toTime: string;
  onDateChange: (value: string) => void;
  onAbsenceTypeChange: (value: "single" | "multiple") => void;
  onWasAtWorkChange: (value: "yes" | "no") => void;
  onFromTimeChange: (value: string) => void;
  onToTimeChange: (value: string) => void;
}

export function AbsenceDetails({
  date,
  absenceType,
  wasAtWork,
  fromTime,
  toTime,
  onDateChange,
  onAbsenceTypeChange,
  onWasAtWorkChange,
  onFromTimeChange,
  onToTimeChange,
}: AbsenceDetailsProps) {
  return (
    <section className="mt-7">
      <h2 className="text-sm font-semibold text-slate-900">2. Fråvær</h2>

      <div className="mt-5">
        <Label className="text-xs font-medium">
          Fråvær frå <span className="text-red-500">*</span>
        </Label>

        <div className="relative mt-2">
          <Input
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="h-9 pr-9 text-xs"
          />

          <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-xs font-medium">
          Fråværstype <span className="text-red-500">*</span>
        </Label>

        <div className="mt-3 flex items-center gap-8">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-slate-700">
            <input
              type="radio"
              name="absence-type"
              checked={absenceType === "single"}
              onChange={() => onAbsenceTypeChange("single")}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Berre denne vakta
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-slate-700">
            <input
              type="radio"
              name="absence-type"
              checked={absenceType === "multiple"}
              onChange={() => onAbsenceTypeChange("multiple")}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Fleire dagar
          </label>
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-xs font-medium">
          Var tilsett på jobb denne dagen?
        </Label>

        <div className="mt-3 flex items-center gap-8">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-slate-700">
            <input
              type="radio"
              name="was-at-work"
              checked={wasAtWork === "yes"}
              onChange={() => onWasAtWorkChange("yes")}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Ja, eg var på jobb
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-slate-700">
            <input
              type="radio"
              name="was-at-work"
              checked={wasAtWork === "no"}
              onChange={() => onWasAtWorkChange("no")}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Nei, eg var ikkje på jobb
          </label>
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-xs font-medium">
          Fråvær frå klokka <span className="text-red-500">*</span>
        </Label>

        <div className="mt-2 flex items-center gap-2">
          <div className="relative">
            <Input
              type="time"
              value={fromTime}
              onChange={(event) => onFromTimeChange(event.target.value)}
              className="h-9 w-[118px] pr-8 text-xs"
            />

            <Clock className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>

          <span className="text-xs text-slate-500">til</span>

          <div className="relative">
            <Input
              type="time"
              value={toTime}
              onChange={(event) => onToTimeChange(event.target.value)}
              className="h-9 w-[118px] pr-8 text-xs"
            />

            <Clock className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
