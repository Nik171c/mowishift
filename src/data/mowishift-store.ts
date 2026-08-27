import { create } from "zustand";

import type {
  Department,
  Extravakt,
  User,
  WorkScheduleEntry,
  BlaGrafikk,
} from "@/types/mowishift";

/* =========================================================
   PERMISSIONS
========================================================= */

const isAdmin = (user: User) => {
  return user.role === "admin";
};

const canCreateDepartmentPlan = (user: User) => {
  return isAdmin(user);
};

const canEditSchedule = (user: User) => {
  return isAdmin(user);
};

const canFinishExtravakt = (user: User) => {
  return isAdmin(user);
};

const canPublishExtravakt = (user: User) => {
  return isAdmin(user);
};

const canSelectEmployees = (user: User) => {
  return isAdmin(user);
};

/* =========================================================
   STRICT BLÅ GRAFIKK RULES

   5 pauses
   2–3 employees per pause
   10–15 employees per shift
========================================================= */

export const BLA_PAUSE_COUNT = 5;

export const BLA_MIN_PER_PAUSE = 2;

export const BLA_MAX_PER_PAUSE = 3;

export const BLA_MIN_PER_SHIFT = 10;

export const BLA_MAX_PER_SHIFT = 15;

/* =========================================================
   EMPLOYEE PROFILE
========================================================= */

export interface MowiEmployee {
  id: string;

  name: string;

  role: "operator" | "admin";

  status: "active" | "inactive";

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

  contractType?: "fast" | "midlertidig";

  workplace?: string;

  pauseSetup?: string;

  hoursToday?: number;

  hoursThisWeek?: number;

  hoursThisMonth?: number;

  overtime?: number;
}

/* =========================================================
   BLÅ VALIDATION
========================================================= */

function validateBlaGrafikk(grafikk: BlaGrafikk, employees: MowiEmployee[]) {
  if (grafikk.department !== "bla") {
    throw new Error("Grafikken må tilhøyre Blå avdeling.");
  }

  if (grafikk.days.length === 0) {
    throw new Error("Grafikken må ha minst éin dag.");
  }

  const employeeMap = new Map(
    employees.map((employee) => [employee.id, employee]),
  );

  for (const day of grafikk.days) {
    /*
     * Exactly five pauses.
     */
    if (day.assignments.length !== BLA_PAUSE_COUNT) {
      throw new Error(`${day.date}: Grafikken må ha nøyaktig 5 pausar.`);
    }

    const employeeIdsForDay: string[] = [];

    /*
     * Every pause must contain
     * 2–3 employees.
     */
    for (const assignment of day.assignments) {
      const count = assignment.employeeIds.length;

      if (count < BLA_MIN_PER_PAUSE) {
        throw new Error(
          `${day.date}: Pause ${assignment.pause} har berre ${count} tilsette. Minimum er 2.`,
        );
      }

      if (count > BLA_MAX_PER_PAUSE) {
        throw new Error(
          `${day.date}: Pause ${assignment.pause} har ${count} tilsette. Maksimum er 3.`,
        );
      }

      /*
       * Check employees.
       */
      for (const employeeId of assignment.employeeIds) {
        const employee = employeeMap.get(employeeId);

        if (!employee) {
          throw new Error(`Tilsett ${employeeId} finst ikkje i MowiShift.`);
        }

        /*
         * Only active Blå employees
         * can be placed in Blå graphic.
         */
        if (employee.status !== "active") {
          throw new Error(`${employee.name} er ikkje aktiv.`);
        }

        if (employee.department !== "bla") {
          throw new Error(`${employee.name} er ikkje knytt til Blå avdeling.`);
        }

        employeeIdsForDay.push(employeeId);
      }
    }

    /*
     * One employee cannot be
     * assigned to two pauses
     * on the same day.
     */
    const uniqueEmployeeIds = new Set(employeeIdsForDay);

    if (uniqueEmployeeIds.size !== employeeIdsForDay.length) {
      throw new Error(
        `${day.date}: Ein tilsett kan ikkje stå i fleire pausar same dag.`,
      );
    }

    /*
     * Total must be 10–15.
     */
    const total = employeeIdsForDay.length;

    if (total < BLA_MIN_PER_SHIFT || total > BLA_MAX_PER_SHIFT) {
      throw new Error(
        `${day.date}: Skiftet har ${total} tilsette. Det må vere mellom 10 og 15.`,
      );
    }
  }

  return true;
}

/* =========================================================
   STORE INTERFACE
========================================================= */

interface MowiShiftStore {
  currentUser: User;

  /* =======================================================
     EMPLOYEES
  ======================================================= */

  employees: MowiEmployee[];

  selectedEmployeeId: string | null;

  selectEmployee: (employeeId: string) => void;

  addEmployee: (employee: MowiEmployee) => void;

  updateEmployee: (employeeId: string, changes: Partial<MowiEmployee>) => void;

  /* =======================================================
     EXISTING MOWISHIFT DATA
  ======================================================= */

  extravakter: Extravakt[];

  schedule: WorkScheduleEntry[];

  createExtravakt: (
    data: Omit<Extravakt, "id" | "status" | "createdAt">,
  ) => void;

  publishExtravakt: (id: string) => void;

  addInterest: (extravaktId: string, employeeId: string) => void;

  removeInterest: (extravaktId: string, employeeId: string) => void;

  selectEmployees: (extravaktId: string, employeeIds: string[]) => void;

  setDepartmentPlan: (
    extravaktId: string,
    departmentPlan: Record<Department, string[]>,
  ) => void;

  finishExtravakt: (extravaktId: string) => void;

  updateScheduleEntry: (
    entryId: string,
    changes: Partial<WorkScheduleEntry>,
  ) => void;

  deleteScheduleEntry: (entryId: string) => void;

  /* =======================================================
     BLÅ GRAFIKK
  ======================================================= */

  /*
   * First editing stage:
   *
   * create
   * ↓
   * auto-distribution
   * ↓
   * admin edits draft
   * ↓
   * publish
   */
  blaDraft: BlaGrafikk | null;

  /*
   * Current published graphic.
   */
  blaCurrent: BlaGrafikk | null;

  /*
   * Previous published versions.
   */
  blaHistory: BlaGrafikk[];

  /*
   * Save first draft.
   */
  saveBlaDraft: (draft: BlaGrafikk) => void;

  /*
   * First editing:
   * Admin edits after Auto-fordel
   * and before publication.
   */
  updateBlaDraft: (changes: Partial<BlaGrafikk>) => void;

  /*
   * Publish first version.
   */
  publishBlaDraft: () => BlaGrafikk;

  /*
   * Second editing:
   *
   * current published graphic
   * ↓
   * admin edits
   * ↓
   * new version
   * ↓
   * old version -> history
   */
  updatePublishedBlaGrafikk: (grafikk: BlaGrafikk) => void;

  /*
   * Archive current graphic.
   */
  archiveCurrentBlaGrafikk: () => void;
}

/* =========================================================
   CURRENT ADMIN
========================================================= */

const defaultUser: User = {
  id: "admin-1",

  name: "Kari Hansen",

  role: "admin",
};

/* =========================================================
   EMPLOYEES

   IMPORTANT:

   These are the SAME employees used by MowiShift.

   Blå workflow must use employeeId from this array.
========================================================= */

const defaultEmployees: MowiEmployee[] = [
  {
    id: "MOWI-0456",

    name: "Anna Hansen",

    role: "operator",

    status: "active",

    department: "bla",

    avatarUrl: "/images/anna-hansen.jpg",

    phone: "+47 123 45 678",

    email: "anna.hansen@mowi.no",

    location: "Fosnavåg, Norge",

    employeeNumber: "MOWI-0456",

    birthDate: "14.05.1992",

    gender: "Kvinne",

    languages: ["Norsk", "Engelsk"],

    startDate: "12.03.2023",

    employmentPercentage: 100,

    shiftPreference: "Dag (07:00 – 15:00)",

    contractType: "fast",

    workplace: "Maskin A3",

    pauseSetup: "2 pauser (15 min + 30 min)",

    hoursToday: 8,

    hoursThisWeek: 38,

    hoursThisMonth: 152,

    overtime: 6,
  },

  {
    id: "MOWI-1024",

    name: "Maria Nielsen",

    role: "operator",

    status: "active",

    department: "raud",

    phone: "+47 987 65 432",

    email: "maria.nielsen@mowi.no",

    location: "Fosnavåg, Norge",

    employeeNumber: "MOWI-1024",

    birthDate: "12.04.1992",

    gender: "Kvinne",

    languages: ["Norsk", "Engelsk"],

    startDate: "01.02.2023",

    employmentPercentage: 100,

    shiftPreference: "Ettermiddag (15:00 – 23:00)",

    contractType: "midlertidig",

    workplace: "Maskin A2",

    pauseSetup: "Pause 2",

    hoursToday: 7.5,

    hoursThisWeek: 37.5,

    hoursThisMonth: 149.5,

    overtime: 6.5,
  },
];

/* =========================================================
   STORE
========================================================= */

export const useMowiShiftStore = create<MowiShiftStore>((set, get) => ({
  /* =====================================================
         CURRENT USER
      ===================================================== */

  currentUser: defaultUser,

  /* =====================================================
         EMPLOYEES
      ===================================================== */

  employees: defaultEmployees,

  selectedEmployeeId: defaultEmployees[0]?.id ?? null,

  selectEmployee: (employeeId) => {
    const employeeExists = get().employees.some(
      (employee) => employee.id === employeeId,
    );

    if (!employeeExists) {
      return;
    }

    set({
      selectedEmployeeId: employeeId,
    });
  },

  addEmployee: (employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
    }));
  },

  updateEmployee: (employeeId, changes) => {
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              ...changes,
            }
          : employee,
      ),
    }));
  },

  /* =====================================================
         EXISTING MOWISHIFT DATA
      ===================================================== */

  extravakter: [],

  schedule: [],

  /* =====================================================
         CREATE EXTRAVAKT
      ===================================================== */

  createExtravakt: (data) => {
    const { currentUser } = get();

    if (!canPublishExtravakt(currentUser)) {
      throw new Error("Du har ikkje tilgang til å opprette extravakt.");
    }

    const now = new Date().toISOString();

    const extravakt: Extravakt = {
      ...data,

      id: crypto.randomUUID(),

      status: "published",

      createdAt: now,

      publishedAt: now,
    };

    set((state) => ({
      extravakter: [...state.extravakter, extravakt],
    }));
  },

  /* =====================================================
         PUBLISH EXTRAVAKT
      ===================================================== */

  publishExtravakt: (id) => {
    const { currentUser } = get();

    if (!canPublishExtravakt(currentUser)) {
      throw new Error("Berre admin kan publisere extravakt.");
    }

    set((state) => ({
      extravakter: state.extravakter.map((extravakt) =>
        extravakt.id === id
          ? {
              ...extravakt,

              status: "collecting_interest",

              publishedAt: new Date().toISOString(),
            }
          : extravakt,
      ),
    }));
  },

  /* =====================================================
         ADD INTEREST
      ===================================================== */

  addInterest: (extravaktId, employeeId) => {
    set((state) => ({
      extravakter: state.extravakter.map((extravakt) => {
        if (extravakt.id !== extravaktId) {
          return extravakt;
        }

        if (extravakt.interestedEmployeeIds.includes(employeeId)) {
          return extravakt;
        }

        return {
          ...extravakt,

          interestedEmployeeIds: [
            ...extravakt.interestedEmployeeIds,
            employeeId,
          ],
        };
      }),
    }));
  },

  /* =====================================================
         REMOVE INTEREST
      ===================================================== */

  removeInterest: (extravaktId, employeeId) => {
    set((state) => ({
      extravakter: state.extravakter.map((extravakt) =>
        extravakt.id === extravaktId
          ? {
              ...extravakt,

              interestedEmployeeIds: extravakt.interestedEmployeeIds.filter(
                (id) => id !== employeeId,
              ),
            }
          : extravakt,
      ),
    }));
  },

  /* =====================================================
         ADMIN SELECTS EMPLOYEES
      ===================================================== */

  selectEmployees: (extravaktId, employeeIds) => {
    const { currentUser } = get();

    if (!canSelectEmployees(currentUser)) {
      throw new Error("Berre admin kan velje medarbeidarar.");
    }

    set((state) => ({
      extravakter: state.extravakter.map((extravakt) =>
        extravakt.id === extravaktId
          ? {
              ...extravakt,

              selectedEmployeeIds: employeeIds,

              status: "planning",
            }
          : extravakt,
      ),
    }));
  },

  /* =====================================================
         DEPARTMENT PLAN
      ===================================================== */

  setDepartmentPlan: (extravaktId, departmentPlan) => {
    const { currentUser } = get();

    if (!canCreateDepartmentPlan(currentUser)) {
      throw new Error("Berre admin kan lage plan per avdeling.");
    }

    const allEmployees = Object.values(departmentPlan).flat();

    set((state) => ({
      extravakter: state.extravakter.map((extravakt) =>
        extravakt.id === extravaktId
          ? {
              ...extravakt,

              selectedEmployeeIds: allEmployees,

              departmentPlan,

              status: "planning",
            }
          : extravakt,
      ),
    }));
  },

  /* =====================================================
         FINISH EXTRAVAKT
         CREATE NORMAL SCHEDULE
      ===================================================== */

  finishExtravakt: (extravaktId) => {
    const { currentUser, extravakter } = get();

    if (!canFinishExtravakt(currentUser)) {
      throw new Error("Berre admin kan ferdigstille planen.");
    }

    const extravakt = extravakter.find((item) => item.id === extravaktId);

    if (!extravakt) {
      throw new Error("Extravakt vart ikkje funnen.");
    }

    const newEntries: WorkScheduleEntry[] = [];

    (
      Object.entries(extravakt.departmentPlan) as [Department, string[]][]
    ).forEach(([department, employeeIds]) => {
      employeeIds.forEach((employeeId) => {
        newEntries.push({
          id: crypto.randomUUID(),

          employeeId,

          date: extravakt.date,

          shift: extravakt.shift,

          department,

          source: "extravakt",

          extravaktId: extravakt.id,

          status: "scheduled",

          createdBy: currentUser.id,

          updatedBy: currentUser.id,
        });
      });
    });

    set((state) => ({
      schedule: [...state.schedule, ...newEntries],

      extravakter: state.extravakter.map((item) =>
        item.id === extravaktId
          ? {
              ...item,

              status: "finished",

              finishedAt: new Date().toISOString(),
            }
          : item,
      ),
    }));
  },

  /* =====================================================
         ADMIN EDITS NORMAL SCHEDULE
      ===================================================== */

  updateScheduleEntry: (entryId, changes) => {
    const { currentUser } = get();

    if (!canEditSchedule(currentUser)) {
      throw new Error("Berre admin kan redigere grafikken.");
    }

    set((state) => ({
      schedule: state.schedule.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,

              ...changes,

              updatedBy: currentUser.id,
            }
          : entry,
      ),
    }));
  },

  /* =====================================================
         ADMIN DELETES NORMAL SCHEDULE
      ===================================================== */

  deleteScheduleEntry: (entryId) => {
    const { currentUser } = get();

    if (!canEditSchedule(currentUser)) {
      throw new Error("Berre admin kan slette frå grafikken.");
    }

    set((state) => ({
      schedule: state.schedule.filter((entry) => entry.id !== entryId),
    }));
  },

  /* =====================================================
         BLÅ GRAFIKK STATE
      ===================================================== */

  blaDraft: null,

  blaCurrent: null,

  blaHistory: [],

  /* =====================================================
         SAVE BLÅ DRAFT
         
         FIRST STAGE
         
         Vel avdeling
         ↓
         Innstillingar
         ↓
         Lag grafikk
      ===================================================== */

  saveBlaDraft: (draft) => {
    const { currentUser } = get();

    if (!isAdmin(currentUser)) {
      throw new Error("Berre administrator kan lage grafikk.");
    }

    if (draft.department !== "bla") {
      throw new Error("Denne grafikken er ikkje for Blå avdeling.");
    }

    set({
      blaDraft: {
        ...draft,

        status: "draft",

        updatedAt: new Date().toISOString(),
      },
    });
  },

  /* =====================================================
         FIRST EDIT
         
         Auto-fordel
         ↓
         Admin redigerer
         ↓
         Publiser
      ===================================================== */

  updateBlaDraft: (changes) => {
    const { currentUser, blaDraft } = get();

    if (!isAdmin(currentUser)) {
      throw new Error("Berre administrator kan redigere grafikken.");
    }

    if (!blaDraft) {
      throw new Error("Ingen kladd for Blå avdeling.");
    }

    const updated: BlaGrafikk = {
      ...blaDraft,

      ...changes,

      status: "draft",

      updatedAt: new Date().toISOString(),
    };

    /*
     * We intentionally do NOT validate
     * the draft here.
     *
     * Why?
     *
     * Admin must be able to edit
     * one pause at a time.
     *
     * Temporary state can therefore
     * contain 1 person.
     *
     * STRICT validation happens
     * when publishing.
     */

    set({
      blaDraft: updated,
    });
  },

  /* =====================================================
         PUBLISH BLÅ DRAFT
         
         FIRST PUBLICATION
         
         draft
         ↓
         validation
         ↓
         current
         ↓
         schedule
      ===================================================== */

  publishBlaDraft: () => {
    const { currentUser, blaDraft, blaCurrent, employees } = get();

    if (!isAdmin(currentUser)) {
      throw new Error("Berre administrator kan publisere grafikken.");
    }

    if (!blaDraft) {
      throw new Error("Ingen kladd å publisere.");
    }

    /*
     * STRICT validation.
     *
     * 5 pauses
     * 2–3 per pause
     * 10–15 per shift
     * active Blå employees only
     * one employee once per day
     */
    validateBlaGrafikk(blaDraft, employees);

    const now = new Date().toISOString();

    /*
     * First publication = version 1.
     *
     * If a current graphic already
     * exists, next version is created.
     */
    const nextVersion = blaCurrent ? blaCurrent.version + 1 : 1;

    const published: BlaGrafikk = {
      ...blaDraft,

      id: crypto.randomUUID(),

      version: nextVersion,

      status: "published",

      publishedAt: now,

      updatedAt: now,
    };

    /*
     * Create WorkScheduleEntry
     * for every employee / day / pause.
     */
    const publishedEntries: WorkScheduleEntry[] = [];

    published.days.forEach((day) => {
      day.assignments.forEach((assignment) => {
        assignment.employeeIds.forEach((employeeId) => {
          publishedEntries.push({
            id: crypto.randomUUID(),

            employeeId,

            date: day.date,

            shift: published.shift,

            department: "bla",

            workplace: "Fastpakking",

            pause: assignment.pause,

            source: "normal_schedule",

            status: "scheduled",

            createdBy: currentUser.id,

            updatedBy: currentUser.id,

            grafikkId: published.id,

            grafikkVersion: published.version,
          });
        });
      });
    });

    set((state) => ({
      /*
       * Remove entries of the
       * previous CURRENT Blå graphic.
       */
      schedule: state.schedule.filter(
        (entry) =>
          !(
            entry.department === "bla" &&
            entry.grafikkId === state.blaCurrent?.id
          ),
      ),

      /*
       * Previous current graphic
       * becomes history.
       */
      blaHistory: state.blaCurrent
        ? [
            {
              ...state.blaCurrent,

              status: "archived",

              archivedAt: now,
            },

            ...state.blaHistory,
          ]
        : state.blaHistory,

      /*
       * New current graphic.
       */
      blaCurrent: published,

      /*
       * Draft is finished.
       */
      blaDraft: null,

      /*
       * New schedule entries.
       */
      schedule: [
        ...state.schedule.filter(
          (entry) =>
            !(
              entry.department === "bla" &&
              entry.grafikkId === state.blaCurrent?.id
            ),
        ),

        ...publishedEntries,
      ],
    }));

    return published;
  },

  /* =====================================================
         SECOND EDIT
         
         CURRENT GRAPHIC
         ↓
         Rediger grafikk
         ↓
         validation
         ↓
         old version -> history
         ↓
         new version -> current
         ↓
         schedule updated
      ===================================================== */

  updatePublishedBlaGrafikk: (grafikk) => {
    const { currentUser, blaCurrent, employees } = get();

    if (!isAdmin(currentUser)) {
      throw new Error("Berre administrator kan redigere grafikken.");
    }

    if (!blaCurrent) {
      throw new Error("Ingen gjeldande grafikk.");
    }

    /*
     * STRICT validation BEFORE
     * changing current graphic.
     */
    validateBlaGrafikk(grafikk, employees);

    const now = new Date().toISOString();

    /*
     * Create NEW version.
     *
     * Never overwrite old version.
     */
    const nextVersion: BlaGrafikk = {
      ...grafikk,

      id: crypto.randomUUID(),

      version: blaCurrent.version + 1,

      status: "published",

      publishedAt: now,

      updatedAt: now,
    };

    const updatedEntries: WorkScheduleEntry[] = [];

    nextVersion.days.forEach((day) => {
      day.assignments.forEach((assignment) => {
        assignment.employeeIds.forEach((employeeId) => {
          updatedEntries.push({
            id: crypto.randomUUID(),

            employeeId,

            date: day.date,

            shift: nextVersion.shift,

            department: "bla",

            workplace: "Fastpakking",

            pause: assignment.pause,

            source: "normal_schedule",

            status: "scheduled",

            createdBy: currentUser.id,

            updatedBy: currentUser.id,

            grafikkId: nextVersion.id,

            grafikkVersion: nextVersion.version,
          });
        });
      });
    });

    set((state) => ({
      /*
       * Remove entries belonging
       * to previous current version.
       */
      schedule: [
        ...state.schedule.filter(
          (entry) =>
            !(entry.department === "bla" && entry.grafikkId === blaCurrent.id),
        ),

        ...updatedEntries,
      ],

      /*
       * OLD CURRENT
       * ↓
       * HISTORY
       */
      blaHistory: [
        {
          ...blaCurrent,

          status: "archived",

          archivedAt: now,
        },

        ...state.blaHistory,
      ],

      /*
       * NEW CURRENT
       */
      blaCurrent: nextVersion,

      /*
       * No draft remains after
       * second editing.
       */
      blaDraft: null,
    }));
  },

  /* =====================================================
         ARCHIVE CURRENT BLÅ GRAFIKK
      ===================================================== */

  archiveCurrentBlaGrafikk: () => {
    const { currentUser, blaCurrent } = get();

    if (!isAdmin(currentUser)) {
      throw new Error("Berre administrator kan arkivere grafikken.");
    }

    if (!blaCurrent) {
      return;
    }

    const now = new Date().toISOString();

    set((state) => ({
      /*
       * Current becomes history.
       */
      blaCurrent: null,

      blaHistory: [
        {
          ...blaCurrent,

          status: "archived",

          archivedAt: now,
        },

        ...state.blaHistory,
      ],

      /*
       * Remove schedule entries
       * belonging to archived graphic.
       */
      schedule: state.schedule.filter(
        (entry) =>
          !(entry.department === "bla" && entry.grafikkId === blaCurrent.id),
      ),
    }));
  },
}));
