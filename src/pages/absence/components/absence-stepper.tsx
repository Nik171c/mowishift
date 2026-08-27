interface AbsenceStepperProps {
  currentStep?: number;
}

const steps = [
  {
    number: 1,
    label: "Fråvær",
  },
  {
    number: 2,
    label: "Erstattar",
  },
  {
    number: 3,
    label: "Avtal vakt",
  },
];

export function AbsenceStepper({ currentStep = 1 }: AbsenceStepperProps) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const active = currentStep === step.number;
        const completed = currentStep > step.number;

        return (
          <div key={step.number} className="flex min-w-0 flex-1 items-center">
            <div className="flex items-center gap-2">
              <div
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  "text-[10px] font-semibold",
                  active || completed
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500",
                ].join(" ")}
              >
                {step.number}
              </div>

              <span
                className={[
                  "whitespace-nowrap text-[11px]",
                  active ? "font-semibold text-blue-600" : "text-slate-500",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-3 h-px flex-1 bg-slate-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
