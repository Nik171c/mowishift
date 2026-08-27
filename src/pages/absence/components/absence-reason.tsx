import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import { absenceReasons } from "../data/absence-data";

interface AbsenceReasonProps {
  reason: string;
  comment: string;
  onReasonChange: (value: string) => void;
  onCommentChange: (value: string) => void;
}

export function AbsenceReason({
  reason,
  comment,
  onReasonChange,
  onCommentChange,
}: AbsenceReasonProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-900">3. Årsak</h2>

      <div className="mt-5">
        <Label className="text-xs font-medium">
          Årsak til fråvær <span className="text-red-500">*</span>
        </Label>

        <select
          value={reason}
          onChange={(event) => onReasonChange(event.target.value)}
          className="mt-2 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {absenceReasons.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <Label className="text-xs font-medium">Merknad</Label>

        <Textarea
          value={comment}
          onChange={(event) => onCommentChange(event.target.value)}
          placeholder="Skriv kommentar (valfritt)..."
          className="mt-2 min-h-[92px] resize-none text-xs"
        />
      </div>
    </section>
  );
}
