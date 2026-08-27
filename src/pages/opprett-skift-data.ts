import type {
  BlaEmployee,
  BlaOffice,
  BlaResponsiblePerson,
} from "@/types/mowishift";
import type { Shift } from "@/types/mowishift";

/* =========================================================
   ADMIN
========================================================= */

export const blaAdmins: BlaResponsiblePerson[] = [
  {
    id: "admin-1",
    name: "Kari Hansen",
  },
  {
    id: "admin-2",
    name: "Per Olsen",
  },
];

/* =========================================================
   OFFICE
========================================================= */

export const blaOffices: BlaOffice[] = [
  {
    id: "bla-office-1",
    name: "Eggesbønes",
  },
];

/* =========================================================
   SHIFTS
========================================================= */

export const blaShifts: Shift[] = [
  {
    id: "bla-day",
    name: "Dag",
    start: "07:30",
    end: "15:45",
  },
  {
    id: "bla-evening",
    name: "Kveld",
    start: "15:45",
    end: "23:30",
  },
];

/* =========================================================
   SPECIAL OPERATOR
========================================================= */

export const blaSpecialOperators: BlaResponsiblePerson[] = [
  {
    id: "special-1",
    name: "Ola Nordmann",
  },
  {
    id: "special-2",
    name: "Anna Olsen",
  },
];

/* =========================================================
   TK
========================================================= */

export const blaTk: BlaResponsiblePerson[] = [
  {
    id: "tk-1",
    name: "Thomas Kristensen",
  },
  {
    id: "tk-2",
    name: "Line Hansen",
  },
];

/* =========================================================
   TRAINING
========================================================= */

export const blaTraining: BlaResponsiblePerson[] = [
  {
    id: "training-1",
    name: "Maria Olsen",
  },
  {
    id: "training-2",
    name: "Jonas Hansen",
  },
];

/* =========================================================
   EMPLOYEES
   Real project should later load these from employee store/API.
========================================================= */

export const blaEmployees: BlaEmployee[] = [
  {
    id: "bla-001",
    name: "Anna Hansen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-002",
    name: "Ola Hansen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-003",
    name: "Kari Olsen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-004",
    name: "Per Olsen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-005",
    name: "Maria Hansen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-006",
    name: "Jonas Olsen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-007",
    name: "Lise Hansen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-008",
    name: "Thomas Olsen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-009",
    name: "Emma Hansen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-010",
    name: "Martin Olsen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-011",
    name: "Nora Hansen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-012",
    name: "Erik Olsen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-013",
    name: "Sofie Hansen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-014",
    name: "Mats Olsen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-015",
    name: "Ida Hansen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-016",
    name: "Anders Olsen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-017",
    name: "Julie Hansen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-018",
    name: "Kristian Olsen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-019",
    name: "Silje Hansen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-020",
    name: "Daniel Olsen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-021",
    name: "Ingrid Hansen",
    category: "kun-dag",
    role: "tilsett",
  },
  {
    id: "bla-022",
    name: "Magnus Olsen",
    category: "rotere",
    role: "tilsett",
  },
  {
    id: "bla-023",
    name: "Elise Hansen",
    category: "kun-kveld",
    role: "tilsett",
  },
  {
    id: "bla-024",
    name: "Henrik Olsen",
    category: "kun-dag",
    role: "tilsett",
  },
];
