import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { absenceEmployee } from "./data/absence-data";
import type { ReplacementEmployee } from "./components/find-replacement";

import { AbsenceStepper } from "./components/absence-stepper";
import { EmployeeSection } from "./components/employee-section";
import { AbsenceDetails } from "./components/absence-details";
import { AbsenceReason } from "./components/absence-reason";
import { AbsenceDocumentation } from "./components/absence-documentation";
import { AbsenceActions } from "./components/absence-actions";
import { FindReplacement } from "./components/find-replacement";
import { ArrangeShift } from "./components/arrange-shift";
import { RequestSent } from "./components/request-sent";

import { Card } from "@/shared/ui/card";

export default function Absence() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Current step comes from URL:
  // /fravaer/registrer?step=1
  // /fravaer/registrer?step=2
  // /fravaer/registrer?step=3
  // /fravaer/registrer?step=4
  const urlStep = Number(searchParams.get("step")) || 1;

  // =====================================================
  // ABSENCE
  // =====================================================

  const [employee, setEmployee] = useState(absenceEmployee);

  const [date, setDate] = useState("2026-07-20");

  const [absenceType, setAbsenceType] = useState<"single" | "multiple">(
    "single",
  );

  const [wasAtWork, setWasAtWork] = useState<"yes" | "no">("yes");

  const [fromTime, setFromTime] = useState("18:45");
  const [toTime, setToTime] = useState("23:30");

  const [reason, setReason] = useState("sjukdom");
  const [comment, setComment] = useState("");

  const [hasCertificate, setHasCertificate] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  // =====================================================
  // REPLACEMENT
  // =====================================================

  const [replacement, setReplacement] = useState<ReplacementEmployee | null>(
    null,
  );

  // =====================================================
  // SHIFT
  // =====================================================

  const [shift, setShift] = useState<"day" | "evening">("evening");

  const [department, setDepartment] = useState("Raud avdeling");

  const [pause, setPause] = useState("Pause 2");

  const [workplace, setWorkplace] = useState("Maskin A3");

  // =====================================================
  // NAVIGATION
  // =====================================================

  const goToStep = (nextStep: number) => {
    navigate(`/fravaer/registrer?step=${nextStep}`);
  };

  const handleCancel = () => {
    navigate("/");
  };

  // =====================================================
  // STEP 2
  // =====================================================

  if (urlStep === 2) {
    return (
      <FindReplacement
        absentEmployee={{
          name: employee.name,
          department: employee.department,
          date: formatDateForDisplay(date),
          shift: shift === "evening" ? "Kveldsskift" : "Dagvakt",
          fromTime,
          toTime,
        }}
        selectedEmployee={replacement}
        onSelect={setReplacement}
        onBack={() => goToStep(1)}
        onContinue={() => goToStep(3)}
      />
    );
  }

  // =====================================================
  // STEP 3
  // =====================================================

  if (urlStep === 3 && replacement) {
    return (
      <ArrangeShift
        absentEmployee={{
          name: employee.name,
          department: employee.department,
        }}
        replacement={replacement}
        date={date}
        shift={shift}
        department={department}
        pause={pause}
        workplace={workplace}
        fromTime={fromTime}
        toTime={toTime}
        onDateChange={setDate}
        onShiftChange={setShift}
        onDepartmentChange={setDepartment}
        onPauseChange={setPause}
        onWorkplaceChange={setWorkplace}
        onFromTimeChange={setFromTime}
        onToTimeChange={setToTime}
        onBack={() => goToStep(2)}
        onSend={() => goToStep(4)}
      />
    );
  }

  // =====================================================
  // STEP 4
  // =====================================================

  if (urlStep === 4 && replacement) {
    return (
      <RequestSent
        absentEmployee={{
          name: employee.name,
          department: employee.department,
        }}
        replacement={{
          name: replacement.name,
          department: replacement.department,
        }}
        date={date}
        shift={shift === "evening" ? "Kveldsskift" : "Dagvakt"}
        department={department}
        pause={pause}
        workplace={workplace}
        fromTime={fromTime}
        toTime={toTime}
        onSendAnother={() => goToStep(1)}
        onViewRequests={() => navigate("/forespurnader/byte")}
        onDashboard={() => navigate("/")}
      />
    );
  }

  // =====================================================
  // STEP 1
  // =====================================================

  return (
    <main>
      <div className="mx-auto max-w-7xl px-6 py-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          1. Registrer fråvær
        </h1>

        <Card className="mt-4 overflow-hidden border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <AbsenceStepper currentStep={1} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-b border-slate-100 p-6 lg:border-b-0 lg:border-r">
              <EmployeeSection
                employee={employee}
                onEmployeeChange={setEmployee}
              />

              <AbsenceDetails
                date={date}
                absenceType={absenceType}
                wasAtWork={wasAtWork}
                fromTime={fromTime}
                toTime={toTime}
                onDateChange={setDate}
                onAbsenceTypeChange={setAbsenceType}
                onWasAtWorkChange={setWasAtWork}
                onFromTimeChange={setFromTime}
                onToTimeChange={setToTime}
              />
            </div>

            <div className="p-6">
              <AbsenceReason
                reason={reason}
                comment={comment}
                onReasonChange={setReason}
                onCommentChange={setComment}
              />

              <AbsenceDocumentation
                hasCertificate={hasCertificate}
                file={file}
                onCertificateChange={setHasCertificate}
                onFileChange={setFile}
              />
            </div>
          </div>

          <div className="px-6 pb-5">
            <AbsenceActions
              onCancel={handleCancel}
              onNext={() => goToStep(2)}
            />
          </div>
        </Card>
      </div>
    </main>
  );
}

function formatDateForDisplay(date: string) {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split("-");

  return `${day}.${month}.${year}`;
}
