import type { User, WorkScheduleEntry } from "@/types/mowishift";

export function isAdmin(user: User): boolean {
  return user.role === "admin";
}

export function canEditSchedule(user: User): boolean {
  return isAdmin(user);
}

export function canEditEmployeeSchedule(
  user: User,
  entry: WorkScheduleEntry,
): boolean {
  if (!isAdmin(user)) {
    return false;
  }

  return true;
}

export function canDeleteSchedule(user: User): boolean {
  return isAdmin(user);
}

export function canCreateExtravakt(user: User): boolean {
  return isAdmin(user);
}

export function canPublishExtravakt(user: User): boolean {
  return isAdmin(user);
}

export function canSelectEmployees(user: User): boolean {
  return isAdmin(user);
}

export function canCreateDepartmentPlan(user: User): boolean {
  return isAdmin(user);
}

export function canFinishExtravakt(user: User): boolean {
  return isAdmin(user);
}
