import type { Department, Shift, WorkScheduleEntry } from "@/types/mowishift";

export interface EmployeeProfile {
  id: string;
  name: string;
  role: string;

  department?: Department;

  avatarUrl?: string;

  phone?: string;
  email?: string;
  location?: string;

  employeeNumber?: string;
  birthDate?: string;
  gender?: string;
  languages?: string[];

  startDate?: string;
  employmentPercentage?: number;

  shiftPreference?: string;
  contractType?: string;

  nextShift?: WorkScheduleEntry;

  hoursToday?: number;
  hoursThisWeek?: number;
  hoursThisMonth?: number;
  overtime?: number;

  pauseSetup?: string;

  workplace?: string;
}

export interface EmployeeProfileCardProps {
  employee: EmployeeProfile;

  activeTab?: "overview" | "work" | "contract" | "competence" | "absence";

  onTabChange?: (
    tab: "overview" | "work" | "contract" | "competence" | "absence",
  ) => void;

  onEdit?: () => void;
  onAbsence?: () => void;
  onChat?: () => void;
}
