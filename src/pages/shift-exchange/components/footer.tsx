import { ArrowRight, X } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function ShiftExchangeFooter() {
  return (
    <footer className="flex items-center justify-between border-t border-slate-200 pt-6">
      <Button variant="outline" className="h-11 rounded-xl px-6">
        <X className="mr-2 h-4 w-4" />
        Avbryt
      </Button>

      <Button className="h-11 rounded-xl px-7">
        Send førespurnad
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </footer>
  );
}
