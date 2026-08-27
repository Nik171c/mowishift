import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Eye,
  EyeOff,
  FileText,
  Info,
  Plus,
  Trash2,
  Upload,
  UserPlus,
} from "lucide-react";

type Department = "bla" | "raud" | "filet";
type EmploymentType = "fast" | "vikariat";
type ShiftAvailability = "day" | "evening" | "both";

type Competence = {
  id: string;
  name: string;
  validTo: string;
};

type EmployeeForm = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;

  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;

  role: string;
  employmentType: EmploymentType;
  department: Department | "";
  workplace: string;

  positionPercent: number;
  contractType: string;
  startDate: string;
  endDate: string;

  shiftAvailability: ShiftAvailability | "";
  standardShift: string;
  pausePreset: string;

  systemRole: string;
  username: string;
  temporaryPassword: string;
  language: string;

  notes: string;
};

const departments = [
  { value: "bla", label: "Blå avdeling" },
  { value: "raud", label: "Raud avdeling" },
  { value: "filet", label: "Filet avdeling" },
] as const;

const roles = [
  "Operator",
  "Tekniker",
  "Lagermedarbeider",
  "Rengjering",
  "Vedlikehald",
  "Produksjonsmedarbeidar",
  "Annen",
];

const workplaces = [
  "Maskin A1",
  "Maskin A2",
  "Maskin A3",
  "Maskin A4",
  "Maskin A5",
];

const contractTypes = ["Fast", "Midlertidig", "Vikariat"];

const shiftOptions = [
  {
    value: "both",
    label: "Dag og kveld",
    description: "Kan jobbe både dag- og kveldsskift",
  },
  {
    value: "day",
    label: "Dag",
    description: "Kan berre jobbe dagskift",
  },
  {
    value: "evening",
    label: "Kveld",
    description: "Kan berre jobbe kveldsskift",
  },
];

const standardShifts = ["Dag (07:00 – 15:00)", "Kveld (15:45 – 23:30)"];

const pausePresets = [
  {
    value: "standard_2",
    label: "2 pauser (15 min + 30 min)",
  },
  {
    value: "standard_3",
    label: "3 pauser (15 min + 45 min + 15 min)",
  },
  {
    value: "tilpasset",
    label: "Tilpasset oppsett",
  },
];

const systemRoles = ["Tilsett", "Teamleiar", "Administrator"];

function createId() {
  return Math.random().toString(36).slice(2);
}

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let result = "";

  for (let i = 0; i < 10; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

export default function NyTilsett() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<EmployeeForm>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",

    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",

    role: "",
    employmentType: "fast",
    department: "",
    workplace: "",

    positionPercent: 100,
    contractType: "",
    startDate: "",
    endDate: "",

    shiftAvailability: "",
    standardShift: "",
    pausePreset: "",

    systemRole: "",
    username: "",
    temporaryPassword: "",
    language: "no",

    notes: "",
  });

  const [competences, setCompetences] = useState<Competence[]>([]);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const isRaud = form.department === "raud";
  const isBla = form.department === "bla";
  const isFilet = form.department === "filet";

  const departmentDescription = useMemo(() => {
    if (isRaud) {
      return "Raud avdeling – arbeidsplass og pauser må registrerast.";
    }

    if (isBla) {
      return "Blå avdeling – ingen arbeidsplass. Berre pauseoppsett.";
    }

    if (isFilet) {
      return "Filet avdeling – ingen arbeidsplass. Berre pauseoppsett.";
    }

    return "Vel avdeling for å sjå relevante felt.";
  }, [isRaud, isBla, isFilet]);

  function updateField<K extends keyof EmployeeForm>(
    field: K,
    value: EmployeeForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  }

  function handleDepartmentChange(value: Department) {
    setForm((current) => ({
      ...current,
      department: value,

      // VIKTIG:
      // Arbeidsplass eksisterer bare i Raud.
      workplace: value === "raud" ? current.workplace : "",
    }));

    setErrors((current) => ({
      ...current,
      department: "",
      workplace: "",
    }));
  }

  function addCompetence() {
    setCompetences((current) => [
      ...current,
      {
        id: createId(),
        name: "",
        validTo: "",
      },
    ]);
  }

  function updateCompetence(
    id: string,
    field: keyof Omit<Competence, "id">,
    value: string,
  ) {
    setCompetences((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  }

  function removeCompetence(id: string) {
    setCompetences((current) => current.filter((item) => item.id !== id));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "Fornamn er påkravd.";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = "Etternamn er påkravd.";
    }

    if (!form.birthDate) {
      nextErrors.birthDate = "Fødselsdato er påkravd.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "E-post er påkravd.";
    }

    if (!form.role) {
      nextErrors.role = "Stilling er påkravd.";
    }

    if (!form.department) {
      nextErrors.department = "Hovudavdeling er påkravd.";
    }

    if (isRaud && !form.workplace) {
      nextErrors.workplace = "Arbeidsplass er påkravd for Raud avdeling.";
    }

    if (!form.pausePreset) {
      nextErrors.pausePreset = "Pauseoppsett er påkravd.";
    }

    if (!form.shiftAvailability) {
      nextErrors.shiftAvailability = "Skiftmoglegheit er påkravd.";
    }

    if (!form.standardShift) {
      nextErrors.standardShift = "Standard skift er påkravd.";
    }

    if (!form.contractType) {
      nextErrors.contractType = "Kontrakttype er påkravd.";
    }

    if (!form.startDate) {
      nextErrors.startDate = "Startdato er påkravd.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSaving(true);

    try {
      /*
       * VIKTIG:
       *
       * Her har vi EIN datamodell for den nye tilsette.
       *
       * Arbeidsplass blir berre sendt dersom avdelinga er Raud.
       * For Blå og Filet blir workplace = null.
       */

      const employeePayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        birthDate: form.birthDate,
        gender: form.gender,

        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,

        role: form.role,
        employmentType: form.employmentType,

        department: form.department,

        workplace: form.department === "raud" ? form.workplace : null,

        positionPercent: form.positionPercent,

        contractType: form.contractType,
        startDate: form.startDate,
        endDate: form.employmentType === "vikariat" ? form.endDate : null,

        shiftAvailability: form.shiftAvailability,

        standardShift: form.standardShift,

        pausePreset: form.pausePreset,

        systemRole: form.systemRole,
        username: form.username,
        temporaryPassword: form.temporaryPassword,

        language: form.language,

        competences,
        notes: form.notes,

        createdAt: new Date().toISOString(),
      };

      console.log("MowiShift – ny tilsett:", employeePayload);

      /*
       * Når backend/store er koblet til:
       *
       * await createEmployee(employeePayload);
       */

      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/tilsette");
    } catch (error) {
      console.error("Kunne ikkje opprette tilsett:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[1500px] px-5 py-5"
      >
        {/* HEADER */}

        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => navigate("/tilsette")}
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Tilsette
              </button>

              <span className="text-slate-400">›</span>

              <span className="text-slate-700">Ny tilsett</span>
            </div>

            <h1 className="text-2xl font-semibold text-slate-950">
              Ny tilsett
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Registrer ny tilsett i systemet
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/tilsette")}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Avbryt
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Lagrar..." : "Lagre"}
            </button>
          </div>
        </div>

        {/* PERSONINFORMASJON */}

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionTitle
            icon={<UserPlus size={18} />}
            title="Personinformasjon"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Fornamn" required error={errors.firstName}>
              <Input
                value={form.firstName}
                placeholder="Skriv fornamn"
                onChange={(value) => updateField("firstName", value)}
              />
            </Field>

            <Field label="Etternamn" required error={errors.lastName}>
              <Input
                value={form.lastName}
                placeholder="Skriv etternamn"
                onChange={(value) => updateField("lastName", value)}
              />
            </Field>

            <Field label="Fødselsdato" required error={errors.birthDate}>
              <Input
                type="date"
                value={form.birthDate}
                onChange={(value) => updateField("birthDate", value)}
              />
            </Field>

            <Field label="Kjønn">
              <Select
                value={form.gender}
                placeholder="Velg kjønn"
                options={[
                  { value: "female", label: "Kvinne" },
                  { value: "male", label: "Mann" },
                  { value: "other", label: "Anna" },
                ]}
                onChange={(value) => updateField("gender", value)}
              />
            </Field>

            <Field label="Telefon">
              <Input
                value={form.phone}
                placeholder="+47 ___ __ ___"
                onChange={(value) => updateField("phone", value)}
              />
            </Field>

            <Field label="E-post" required error={errors.email}>
              <Input
                type="email"
                value={form.email}
                placeholder="Skriv e-postadresse"
                onChange={(value) => updateField("email", value)}
              />
            </Field>

            <Field label="Adresse">
              <Input
                value={form.address}
                placeholder="Skriv adresse"
                onChange={(value) => updateField("address", value)}
              />
            </Field>

            <Field label="Stad">
              <Input
                value={form.city}
                placeholder="Skriv stad"
                onChange={(value) => updateField("city", value)}
              />
            </Field>

            <Field label="Postnummer">
              <Input
                value={form.postalCode}
                placeholder="_____"
                onChange={(value) => updateField("postalCode", value)}
              />
            </Field>
          </div>
        </section>

        {/* ARBEIDSINFORMASJON */}

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionTitle
            icon={<FileText size={18} />}
            title="Arbeidsinformasjon"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field label="Stilling / rolle" required error={errors.role}>
              <Select
                value={form.role}
                placeholder="Velg stilling"
                options={roles.map((role) => ({
                  value: role,
                  label: role,
                }))}
                onChange={(value) => updateField("role", value)}
              />
            </Field>

            <Field label="Arbeidstype" required>
              <div className="flex h-11 items-center gap-5 rounded-lg border border-slate-200 px-4">
                <Radio
                  checked={form.employmentType === "fast"}
                  label="Fast tilsett"
                  onClick={() => updateField("employmentType", "fast")}
                />

                <Radio
                  checked={form.employmentType === "vikariat"}
                  label="Etter vikariat / På vikariat"
                  onClick={() => updateField("employmentType", "vikariat")}
                />
              </div>
            </Field>

            <Field label="Hovudavdeling" required error={errors.department}>
              <Select
                value={form.department}
                placeholder="Velg avdeling"
                options={departments.map((department) => ({
                  value: department.value,
                  label: department.label,
                }))}
                onChange={(value) =>
                  handleDepartmentChange(value as Department)
                }
              />
            </Field>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <Info size={17} className="mt-0.5 shrink-0" />

            <span>{departmentDescription}</span>
          </div>

          {/* RAUD */}

          {isRaud && (
            <div className="mt-4 rounded-xl border border-red-100 bg-white p-4">
              <h3 className="mb-4 text-sm font-semibold text-red-600">
                RAUD AVDELING – har arbeidsplass og pauser
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Arbeidsplass" required error={errors.workplace}>
                  <Select
                    value={form.workplace}
                    placeholder="Velg arbeidsplass"
                    options={workplaces.map((workplace) => ({
                      value: workplace,
                      label: workplace,
                    }))}
                    onChange={(value) => updateField("workplace", value)}
                  />
                </Field>

                <Field label="Pauseoppsett" required error={errors.pausePreset}>
                  <Select
                    value={form.pausePreset}
                    placeholder="Velg pauseoppsett"
                    options={pausePresets}
                    onChange={(value) => updateField("pausePreset", value)}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* BLÅ */}

          {isBla && (
            <DepartmentPauseBlock
              title="BLÅ AVDELING – har kun pausar (ingen arbeidsplass)"
              pauseValue={form.pausePreset}
              error={errors.pausePreset}
              onPauseChange={(value) => updateField("pausePreset", value)}
              variant="blue"
            />
          )}

          {/* FILET */}

          {isFilet && (
            <DepartmentPauseBlock
              title="FILET AVDELING – har kun pausar (ingen arbeidsplass)"
              pauseValue={form.pausePreset}
              error={errors.pausePreset}
              onPauseChange={(value) => updateField("pausePreset", value)}
              variant="purple"
            />
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field label="Stillingsprosent" required>
              <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={form.positionPercent}
                  onChange={(event) =>
                    updateField("positionPercent", Number(event.target.value))
                  }
                  className="min-w-0 flex-1 px-3 text-sm outline-none"
                />

                <span className="flex items-center border-l border-slate-200 bg-slate-50 px-4 text-sm text-slate-500">
                  %
                </span>
              </div>
            </Field>

            <Field label="Kontrakttype" required error={errors.contractType}>
              <Select
                value={form.contractType}
                placeholder="Velg kontrakttype"
                options={contractTypes.map((type) => ({
                  value: type.toLowerCase(),
                  label: type,
                }))}
                onChange={(value) => updateField("contractType", value)}
              />
            </Field>

            <Field label="Startdato" required error={errors.startDate}>
              <Input
                type="date"
                value={form.startDate}
                onChange={(value) => updateField("startDate", value)}
              />
            </Field>

            <Field label="Sluttdato">
              <Input
                type="date"
                value={form.endDate}
                disabled={form.employmentType === "fast"}
                onChange={(value) => updateField("endDate", value)}
              />

              {form.employmentType === "fast" && (
                <p className="mt-1 text-xs text-slate-500">
                  La vere tom ved fast tilsetting
                </p>
              )}
            </Field>
          </div>
        </section>

        {/* SKIFT OG ARBEIDSTID */}

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionTitle
            icon={<CalendarDays size={18} />}
            title="Skift og arbeidstid"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field
              label="Skiftmoglegheit"
              required
              error={errors.shiftAvailability}
              hint="Når kan tilsette jobbe?"
            >
              <Select
                value={form.shiftAvailability}
                placeholder="Velg skiftmoglegheit"
                options={shiftOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) =>
                  updateField("shiftAvailability", value as ShiftAvailability)
                }
              />
            </Field>

            <Field
              label="Standardskift (primær)"
              required
              error={errors.standardShift}
              hint="Hovudskift for den tilsette"
            >
              <Select
                value={form.standardShift}
                placeholder="Velg standardskift"
                options={standardShifts.map((shift) => ({
                  value: shift,
                  label: shift,
                }))}
                onChange={(value) => updateField("standardShift", value)}
              />
            </Field>

            <Field
              label="Standard pause"
              required
              error={errors.pausePreset}
              hint="Standard pauseoppsett for den tilsette"
            >
              <Select
                value={form.pausePreset}
                placeholder="Velg pauseoppsett"
                options={pausePresets}
                onChange={(value) => updateField("pausePreset", value)}
              />
            </Field>
          </div>

          <div className="mt-4 flex max-w-xl items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-800">
            <Info size={16} className="mt-0.5 shrink-0" />

            <div>
              <div className="mb-1 font-semibold">Skiftmoglegheit</div>

              <div>
                <strong>Dag og kveld</strong> – kan jobbe både dag- og
                kveldsskift
              </div>

              <div>
                <strong>Dag</strong> – kan berre jobbe dagskift
              </div>

              <div>
                <strong>Kveld</strong> – kan berre jobbe kveldsskift
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoBox
              title="Om pausar"
              lines={[
                "Pausar blir automatisk brukt i grafikk og i berekning av arbeidstid.",
                "Pausar kan tilpassast seinare i profilen.",
              ]}
            />

            <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Automatisk filtrering
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Skiftmoglegheita blir brukt når MowiShift finn tilsette som kan
                setjast opp på dag- eller kveldsskift.
              </p>
            </div>
          </div>
        </section>

        {/* TILGANG OG SYSTEM */}

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionTitle
            icon={<UserPlus size={18} />}
            title="Tilgang og system"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field label="Brukarrolle" required>
              <Select
                value={form.systemRole}
                placeholder="Velg rolle"
                options={systemRoles.map((role) => ({
                  value: role.toLowerCase(),
                  label: role,
                }))}
                onChange={(value) => updateField("systemRole", value)}
              />
            </Field>

            <Field label="Brukarnamn" required>
              <Input
                value={form.username}
                placeholder="Foreslått brukarnamn"
                onChange={(value) => updateField("username", value)}
              />
            </Field>

            <Field label="Midlertidig passord" required>
              <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.temporaryPassword}
                  placeholder="Skriv eller generer passord"
                  onChange={(event) =>
                    updateField("temporaryPassword", event.target.value)
                  }
                  className="min-w-0 flex-1 px-3 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="px-3 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </Field>

            <Field label="Språk">
              <Select
                value={form.language}
                placeholder="Velg språk"
                options={[
                  {
                    value: "no",
                    label: "Norsk (Nynorsk)",
                  },
                  {
                    value: "nb",
                    label: "Norsk (Bokmål)",
                  },
                  {
                    value: "en",
                    label: "English",
                  },
                ]}
                onChange={(value) => updateField("language", value)}
              />
            </Field>
          </div>

          <button
            type="button"
            onClick={() => updateField("temporaryPassword", generatePassword())}
            className="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Generer passord
          </button>
        </section>

        {/* TILLEGGSINFORMASJON */}

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionTitle
            icon={<FileText size={18} />}
            title="Tilleggsinformasjon"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-blue-700">
                  Kompetanse / sertifikat
                </label>

                <button
                  type="button"
                  onClick={addCompetence}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                >
                  <Plus size={15} />
                  Legg til kompetanse
                </button>
              </div>

              {competences.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 p-5 text-center text-sm text-slate-400">
                  Ingen kompetansar registrert
                </div>
              ) : (
                <div className="space-y-3">
                  {competences.map((competence) => (
                    <div
                      key={competence.id}
                      className="grid grid-cols-[1fr_180px_auto] gap-2"
                    >
                      <Input
                        value={competence.name}
                        placeholder="Kompetanse / sertifikat"
                        onChange={(value) =>
                          updateCompetence(competence.id, "name", value)
                        }
                      />

                      <Input
                        type="date"
                        value={competence.validTo}
                        onChange={(value) =>
                          updateCompetence(competence.id, "validTo", value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => removeCompetence(competence.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Field label="Notat">
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Skriv eventuelle merknader"
                className="min-h-[120px] w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </Field>
          </div>

          {/* DOCUMENTS */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Dokumentasjon
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 text-center hover:border-blue-400 hover:bg-blue-50">
                <Upload size={22} className="mb-2 text-slate-500" />

                <span className="text-sm font-semibold text-slate-700">
                  Last opp arbeidskontrakt
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PDF, JPG eller PNG. Maks 10MB
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    setContractFile(event.target.files?.[0] ?? null)
                  }
                />
              </label>

              <label className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 text-center hover:border-blue-400 hover:bg-blue-50">
                <Upload size={22} className="mb-2 text-slate-500" />

                <span className="text-sm font-semibold text-slate-700">
                  Last opp dokument
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PDF, JPG eller PNG. Maks 10MB
                </span>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    setDocuments(Array.from(event.target.files ?? []))
                  }
                />
              </label>
            </div>

            {contractFile && (
              <div className="mt-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <strong>Arbeidskontrakt:</strong> {contractFile.name}
              </div>
            )}

            {documents.length > 0 && (
              <div className="mt-2 space-y-1">
                {documents.map((file) => (
                  <div
                    key={`${file.name}-${file.size}`}
                    className="text-xs text-slate-500"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-slate-800">{icon}</span>

      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p className="mt-1 text-[11px] text-slate-400">{hint}</p>
      )}

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-400"
    />
  );
}

function Select({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function Radio({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-xs text-slate-700"
    >
      <span
        className={[
          "flex h-4 w-4 items-center justify-center rounded-full border",
          checked ? "border-blue-500" : "border-slate-300",
        ].join(" ")}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-blue-500" />}
      </span>

      {label}
    </button>
  );
}

function InfoBox({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-800">
        <Info size={16} />
        {title}
      </div>

      <div className="space-y-1 text-xs leading-5 text-blue-700">
        {lines.map((line) => (
          <div key={line}>• {line}</div>
        ))}
      </div>
    </div>
  );
}

function DepartmentPauseBlock({
  title,
  pauseValue,
  error,
  onPauseChange,
  variant,
}: {
  title: string;
  pauseValue: string;
  error?: string;
  onPauseChange: (value: string) => void;
  variant: "blue" | "purple";
}) {
  const styles =
    variant === "blue"
      ? "border-blue-100 bg-blue-50/30 text-blue-700"
      : "border-purple-100 bg-purple-50/30 text-purple-700";

  return (
    <div className={`mt-4 rounded-xl border p-4 ${styles}`}>
      <div className="mb-4 text-sm font-semibold">{title}</div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex min-h-[70px] items-center rounded-lg border border-blue-100 bg-blue-50 px-4 text-xs leading-5 text-slate-600">
          <div>
            <strong>Det er ingen arbeidsplass i denne avdelinga.</strong>

            <div>Tilsette blir fordelte etter pauseoppsett.</div>
          </div>
        </div>

        <Field label="Pauseoppsett" required error={error}>
          <Select
            value={pauseValue}
            placeholder="Velg pauseoppsett"
            options={pausePresets}
            onChange={onPauseChange}
          />
        </Field>
      </div>
    </div>
  );
}
