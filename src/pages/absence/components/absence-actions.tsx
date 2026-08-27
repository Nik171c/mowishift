import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface AbsenceActionsProps {
  onCancel: () => void;
  onNext: () => void;
}

export function AbsenceActions({ onCancel, onNext }: AbsenceActionsProps) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="h-9 px-5 text-xs"
      >
        Avbryt
      </Button>

      <Button
        type="button"
        onClick={onNext}
        className="h-9 min-w-[105px] bg-blue-600 px-5 text-xs hover:bg-blue-700"
      >
        Neste
        <ArrowRight className="ml-2 h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
