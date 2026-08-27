// src/shared/ui/loading.tsx

import { Loader2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type LoadingProps = {
  className?: string;
  size?: number;
};

export function Loading({ className, size = 20 }: LoadingProps) {
  return (
    <Loader2
      className={cn("animate-spin text-sky-600", className)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

type InlineLoadingProps = {
  text?: string;
  className?: string;
};

export function InlineLoading({
  text = "Loading...",
  className,
}: InlineLoadingProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Loading />

      <span className="text-sm text-slate-500">{text}</span>
    </div>
  );
}

type PageLoadingProps = {
  text?: string;
};

export function PageLoading({ text = "Loading..." }: PageLoadingProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <InlineLoading text={text} />
    </div>
  );
}

type LoadingOverlayProps = {
  show: boolean;
  text?: string;
};

export function LoadingOverlay({
  show,
  text = "Loading...",
}: LoadingOverlayProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-lg">
        <InlineLoading text={text} />
      </div>
    </div>
  );
}
