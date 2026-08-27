import type { ReactNode } from "react";

import { SidebarProvider } from "@/widgets/sidebar";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
