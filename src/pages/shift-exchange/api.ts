import type { ReplacementEmployee, ShiftExchangeRequest } from "./types";

import { employees } from "./mock-data";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAvailableEmployees(): Promise<ReplacementEmployee[]> {
  await delay();

  return employees;
}

export async function searchEmployees(
  query: string,
): Promise<ReplacementEmployee[]> {
  await delay();

  return employees.filter((employee) =>
    employee.name.toLowerCase().includes(query.toLowerCase()),
  );
}

export async function submitShiftExchange(
  request: ShiftExchangeRequest,
): Promise<void> {
  await delay(1200);

  console.log("Shift exchange request", request);
}

export async function getEmployee(
  id: string,
): Promise<ReplacementEmployee | undefined> {
  await delay();

  return employees.find((employee) => employee.id === id);
}
