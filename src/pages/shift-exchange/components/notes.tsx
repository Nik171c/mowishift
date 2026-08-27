import { MessageSquare } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Textarea } from "@/shared/ui/textarea";

export function Notes() {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-6 p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">
              4. Merknad
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Legg til ekstra informasjon dersom det er nødvendig.
            </p>
          </div>
        </div>

        <Textarea
          rows={6}
          placeholder="Skriv ei merknad..."
          className="resize-none rounded-2xl border-slate-200"
        />

        <div className="flex justify-end">
          <span className="text-xs text-slate-400">Maks 500 teikn</span>
        </div>
      </div>
    </Card>
  );
}
