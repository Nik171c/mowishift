export type ReplacementRequestStatus = "pending" | "approved" | "rejected";

export interface ReplacementRequest {
  id: string;
  employee: string;
  employeeDepartment: string;
  replacement: string;
  replacementDepartment: string;
  date: string;
  shift: string;
  fromTime: string;
  toTime: string;
  department: string;
  pause: string;
  workplace: string;
  status: ReplacementRequestStatus;
  responseDeadline: string;
  comment?: string;
}

export const replacementRequests: ReplacementRequest[] = [
  {
    id: "request-001",
    employee: "Ole Olsen",
    employeeDepartment: "Raud avdeling",
    replacement: "Roman Hansen",
    replacementDepartment: "Blå avdeling",
    date: "20.07.2026",
    shift: "Kveldsskift",
    fromTime: "18:45",
    toTime: "23:30",
    department: "Raud avdeling",
    pause: "Pause 2",
    workplace: "Maskin A3",
    status: "pending",
    responseDeadline: "20.07.2026, 12:00",
    comment: "Treng vikar på grunn av fråvær.",
  },

  {
    id: "request-002",
    employee: "Romina Pettersen",
    employeeDepartment: "Filet avdeling",
    replacement: "Anna Berg",
    replacementDepartment: "Blå avdeling",
    date: "21.07.2026",
    shift: "Dagvakt",
    fromTime: "07:00",
    toTime: "15:00",
    department: "Blå avdeling",
    pause: "Pause 1",
    workplace: "Maskin A1",
    status: "approved",
    responseDeadline: "21.07.2026, 09:00",
  },

  {
    id: "request-003",
    employee: "Ruben Sandvik",
    employeeDepartment: "Raud avdeling",
    replacement: "Borys Petrenko",
    replacementDepartment: "Blå avdeling",
    date: "22.07.2026",
    shift: "Nattvakt",
    fromTime: "23:00",
    toTime: "07:00",
    department: "Filet avdeling",
    pause: "Pause 3",
    workplace: "Maskin A2",
    status: "approved",
    responseDeadline: "22.07.2026, 10:00",
  },

  {
    id: "request-004",
    employee: "Anna Berg",
    employeeDepartment: "Blå avdeling",
    replacement: "Ingrid Nilsen",
    replacementDepartment: "Filet avdeling",
    date: "23.07.2026",
    shift: "Dagvakt",
    fromTime: "07:00",
    toTime: "15:00",
    department: "Blå avdeling",
    pause: "Pause 1",
    workplace: "Maskin A1",
    status: "rejected",
    responseDeadline: "23.07.2026, 12:00",
  },

  {
    id: "request-005",
    employee: "Ole Olsen",
    employeeDepartment: "Raud avdeling",
    replacement: "Ruben Sandvik",
    replacementDepartment: "Raud avdeling",
    date: "25.07.2026",
    shift: "Dagvakt",
    fromTime: "07:00",
    toTime: "15:15",
    department: "Raud avdeling",
    pause: "Pause 2",
    workplace: "Maskin A2",
    status: "pending",
    responseDeadline: "25.07.2026, 12:00",
  },
];
