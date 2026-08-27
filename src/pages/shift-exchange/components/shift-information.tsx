import {
  Calendar,
  ChevronDown,
  Clock3,
  Factory,
  Info,
  PauseCircle,
} from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

export function ShiftInformation() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="space-y-6">
        {/* Title */}

        <h2 className="text-[15px] font-semibold text-slate-900">
          1. Opplysningar om vakta
        </h2>

        {/* Grid */}

        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {/* Date */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Dato <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Input
                value="20.07.2026"
                readOnly
                className="h-11 rounded-xl border-slate-200 pr-10"
              />

              <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          {/* Shift */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Skift <span className="text-red-500">*</span>
            </label>

            <button
              className="
                flex
                h-11
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
              "
            >
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-600" />

                <span className="text-sm">Kveldsskift</span>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          {/* Department */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Avdeling <span className="text-red-500">*</span>
            </label>

            <button
              className="
                flex
                h-11
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
              "
            >
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-red-500" />

                <span className="text-sm">Raud sone</span>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          {/* Pause */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Pause <span className="text-red-500">*</span>
            </label>

            <button
              className="
                flex
                h-11
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
              "
            >
              <div className="flex items-center gap-2">
                <PauseCircle className="h-4 w-4 text-violet-600" />

                <span className="text-sm">Pause 2</span>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          {/* Workplace */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Arbeidsplass <span className="text-red-500">*</span>
            </label>

            <button
              className="
                flex
                h-11
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
              "
            >
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-blue-600" />

                <span className="text-sm">Maskin A3</span>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <div />
        </div>

        {/* Information */}

        <div
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            p-4
          "
        >
          <Info className="mt-0.5 h-5 w-5 text-blue-600" />

          <div>
            <p className="text-sm font-medium text-blue-700">
              Maskin A3 i pause 2 har 1 medarbeidar.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Førespurnad blir sendt til denne medarbeidaren.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
