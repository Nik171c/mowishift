import {
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Clock3,
  User,
  X,
} from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

export function AbsenceInformation() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="space-y-6">
        {/* Header */}

        <h2 className="text-[15px] font-semibold text-slate-900">
          2. Informasjon om den som er fråverande
        </h2>

        {/* First row */}

        <div className="grid grid-cols-2 gap-8">
          {/* Employee */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Medarbeidar som ikkje kan møte
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="flex h-11 items-center justify-between rounded-xl border border-slate-200 bg-white px-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                  <User className="h-4 w-4 text-slate-600" />
                </div>

                <span className="text-sm text-slate-900">Ole Olsen</span>
              </div>

              <X className="h-4 w-4 cursor-pointer text-slate-400 hover:text-slate-700" />
            </div>
          </div>

          {/* Reason */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Årsak til fråvær
              <span className="ml-1 text-red-500">*</span>
            </label>

            <button className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3">
              <span className="text-sm">Zabolel</span>

              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Second row */}

        <div className="grid grid-cols-3 gap-8">
          {/* Type */}

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Fråværstype
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="flex gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  defaultChecked
                  type="radio"
                  name="absence"
                  className="h-4 w-4"
                />

                <span className="text-sm">Usjin frå vakta</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input type="radio" name="absence" className="h-4 w-4" />

                <span className="text-sm">Ikkje møtt (heile vakta)</span>
              </label>
            </div>
          </div>

          {/* Period */}

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Fråværperiode
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  defaultChecked
                  type="radio"
                  name="period"
                  className="h-4 w-4"
                />

                <span className="text-sm">I dag</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="period" className="h-4 w-4" />

                <span className="text-sm">Fleire dagar</span>
              </label>
            </div>
          </div>

          {/* Time */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Tidspunkt / periode
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  readOnly
                  value="18:45"
                  className="h-11 rounded-xl pr-9"
                />

                <Clock3 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              <span className="text-slate-400">–</span>

              <div className="relative flex-1">
                <Input
                  readOnly
                  value="23:30"
                  className="h-11 rounded-xl pr-9"
                />

                <Clock3 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Certificate */}

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Legeerklæring
          </label>

          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input type="radio" name="doctor" className="h-4 w-4" />

              <span className="text-sm">Ja, legeerklæring er lagt ved</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                defaultChecked
                type="radio"
                name="doctor"
                className="h-4 w-4"
              />

              <span className="text-sm">
                Nei, legeerklæring ikkje tilgjengeleg
              </span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}
