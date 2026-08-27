import {
  ShiftTabs,
  ShiftInformation,
  AbsenceInformation,
  ReplacementTable,
  Notes,
  ShiftExchangeFooter,
} from "./components";

export default function ShiftExchangePage() {
  return (
    <main className="flex flex-1 flex-col bg-slate-50">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-8 py-8">
        {/* Header */}
        <header>
          <h1 className="text-[34px] font-bold tracking-tight text-slate-900">
            Bytte av skift
          </h1>
        </header>

        {/* Tabs */}
        <ShiftTabs />

        {/* 1 */}
        <ShiftInformation />

        {/* 2 */}
        <AbsenceInformation />

        {/* 3 */}
        <ReplacementTable />

        {/* 4 */}
        <Notes />

        {/* Footer */}
        <ShiftExchangeFooter />
      </div>
    </main>
  );
}
