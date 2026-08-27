export type EmployeeStatus =
  | "På jobb no"
  | "Tilgjengeleg"
  | "Fråverande"
  | "På ferie"
  | "Opptatt";

export interface ReplacementEmployee {
  id: string;

  name: string;

  department: string;

  position: string;

  status: EmployeeStatus;

  available: boolean;

  workedHours: number;

  monthlyHours: number;

  overtime: number;

  avatar?: string;
}

export interface ShiftInformationModel {
  date: string;

  shift: string;

  department: string;

  workplace: string;

  pause: string;
}

export interface AbsenceInformationModel {
  employeeId: string;

  reason: string;

  from: string;

  to: string;

  hasCertificate: boolean;

  comment: string;
}

export interface ShiftExchangeRequest {
  shift: ShiftInformationModel;

  absence: AbsenceInformationModel;

  replacementId: string;

  notes: string;
}
