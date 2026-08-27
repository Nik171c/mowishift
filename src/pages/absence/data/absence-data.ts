export interface AbsenceEmployee {
  id: string;
  name: string;
  department: string;
  position: string;
}

export const absenceEmployee: AbsenceEmployee = {
  id: "ole-olsen",
  name: "Ole Olsen",
  department: "Raud avdeling",
  position: "Produksjonsmedarbeidar",
};

export const absenceReasons = [
  {
    value: "sjukdom",
    label: "Sjukdom",
  },
  {
    value: "skade",
    label: "Skade",
  },
  {
    value: "anna",
    label: "Anna",
  },
] as const;
