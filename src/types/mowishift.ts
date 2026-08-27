export type UserRole = "admin" | "employee";

export type Department = "raud" | "bla" | "filet";

export type ShiftStatus = "scheduled" | "cancelled";

export type ScheduleSource = "normal_schedule" | "extravakt";

export type ExtravaktStatus =
  | "published"
  | "collecting_interest"
  | "planning"
  | "finished";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department?: Department;
}

export interface Shift {
  id: string;
  name: string;
  start: string;
  end: string;
}

export interface Extravakt {
  id: string;
  status: ExtravaktStatus;
  date: string;
  shift: Shift;
  leaderId: string;
  officeId: string;
  departments: Department[];
  requiredEmployees: number;
  note?: string;
  specialOperatorId?: string;
  interestedEmployeeIds: string[];
  selectedEmployeeIds: string[];
  departmentPlan: Record<Department, string[]>;
  createdAt: string;
  publishedAt?: string;
  finishedAt?: string;
}

export interface WorkScheduleEntry {
  id: string;

  employeeId: string;

  date: string;

  shift: Shift;

  department: Department;

  workplace?: string;

  pause?: number;

  source: ScheduleSource;

  extravaktId?: string;

  status: ShiftStatus;

  createdBy: string;

  updatedBy: string;

  /**
   * Blå avdeling grafikk
   */
  grafikkId?: string;

  grafikkVersion?: number;
}

/* =========================================================
   BLÅ AVDELING
========================================================= */

export type BlaEmployeeCategory = "kun-kveld" | "kun-dag" | "rotere";

export type GrafikStatus = "draft" | "published" | "archived";

export interface BlaEmployee {
  id: string;
  name: string;
  category: BlaEmployeeCategory;
  role: "admin" | "elev" | "spesialoperator" | "tilsett";
}

export interface BlaResponsiblePerson {
  id: string;
  name: string;
}

export interface BlaOffice {
  id: string;
  name: string;
}

export interface BlaPauseAssignment {
  pause: number;
  employeeIds: string[];
}

export interface BlaGrafikkDay {
  date: string;
  assignments: BlaPauseAssignment[];
}

export interface BlaGrafikk {
  id: string;

  /**
   * Version 0 = draft.
   * Version 1+ = published version.
   */
  version: number;

  department: "bla";

  title: string;

  weekNumber: number;

  year: number;

  shift: Shift;

  dates: string[];

  leaderId: string;

  officeId: string;

  phone: string;

  specialOperatorId: string;

  tkId: string;

  trainingId: string;

  status: GrafikStatus;

  days: BlaGrafikkDay[];

  createdBy: string;

  createdAt: string;

  publishedAt?: string;

  updatedAt: string;

  archivedAt?: string;
}
