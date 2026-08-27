import { FileText, Upload, X } from "lucide-react";
import { useRef } from "react";

import { Label } from "@/shared/ui/label";

interface AbsenceDocumentationProps {
  hasCertificate: boolean;
  file: File | null;
  onCertificateChange: (value: boolean) => void;
  onFileChange: (file: File | null) => void;
}

export function AbsenceDocumentation({
  hasCertificate,
  file,
  onCertificateChange,
  onFileChange,
}: AbsenceDocumentationProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="mt-7">
      <h2 className="text-sm font-semibold text-slate-900">4. Dokumentasjon</h2>

      <div className="mt-5">
        <Label className="text-xs font-medium">
          Har tilsett legeerklæring?
        </Label>

        <div className="mt-3 flex items-center gap-8">
          <label className="flex cursor-pointer items-center gap-2 text-[11px]">
            <input
              type="radio"
              name="certificate"
              checked={!hasCertificate}
              onChange={() => onCertificateChange(false)}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Nei
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-[11px]">
            <input
              type="radio"
              name="certificate"
              checked={hasCertificate}
              onChange={() => onCertificateChange(true)}
              className="h-3.5 w-3.5 accent-blue-600"
            />
            Ja
          </label>
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-xs font-medium">Last opp dokumentasjon</Label>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0] ?? null;

            onFileChange(selectedFile);
          }}
        />

        {!file ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 flex h-[118px] w-full flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white transition hover:border-blue-400 hover:bg-blue-50/30"
          >
            <Upload className="h-4 w-4 text-slate-400" />

            <span className="mt-2 text-[11px] text-slate-500">
              Dra dokumentet hit
            </span>

            <span className="my-1 text-[10px] text-slate-400">eller</span>

            <span className="text-xs font-semibold text-blue-600">
              + &nbsp;Last opp fil
            </span>

            <span className="mt-1 text-[10px] text-slate-400">
              PDF, JPG, PNG
            </span>
          </button>
        ) : (
          <div className="mt-2 flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <FileText className="h-4 w-4 shrink-0 text-slate-500" />

              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-slate-800">
                  {file.name}
                </p>

                <p className="text-[10px] text-slate-400">
                  {Math.round(file.size / 1024)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onFileChange(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
