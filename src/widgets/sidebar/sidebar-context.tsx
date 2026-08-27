import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { SidebarContextType } from "./types";

const STORAGE_KEY = "mowishift.sidebar.collapsed";

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    updateScreen();

    window.addEventListener("resize", updateScreen);

    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const value = localStorage.getItem(STORAGE_KEY);

    if (value !== null) {
      setCollapsed(value === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const value = useMemo<SidebarContextType>(
    () => ({
      collapsed,
      mobileOpen,
      isMobile,
      toggleCollapsed,
      toggleMobile,
      close,
    }),
    [collapsed, mobileOpen, isMobile, toggleCollapsed, toggleMobile, close],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }

  return context;
}
