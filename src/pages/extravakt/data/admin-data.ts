export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export const admins: Admin[] = [
  {
    id: "admin-001",
    firstName: "Roman",
    lastName: "Hansen",
    fullName: "Roman Hansen",
  },
  {
    id: "admin-002",
    firstName: "Ole",
    lastName: "Olsen",
    fullName: "Ole Olsen",
  },
  {
    id: "admin-003",
    firstName: "Maryna",
    lastName: "Ivanova",
    fullName: "Maryna Ivanova",
  },
  {
    id: "admin-004",
    firstName: "Natalia",
    lastName: "Petrov",
    fullName: "Natalia Petrov",
  },
  {
    id: "admin-005",
    firstName: "Andrii",
    lastName: "Bondar",
    fullName: "Andrii Bondar",
  },
  {
    id: "admin-006",
    firstName: "Ragnhild",
    lastName: "Sæter",
    fullName: "Ragnhild Sæter",
  },
];
