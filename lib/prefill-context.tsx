"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface PrefillContextValue {
  espacio: string;
  setEspacio: (e: string) => void;
}

const PrefillContext = createContext<PrefillContextValue | null>(null);

export function PrefillProvider({ children }: { children: ReactNode }) {
  const [espacio, setEspacio] = useState("");
  return (
    <MotionConfig reducedMotion="user">
      <PrefillContext.Provider value={{ espacio, setEspacio }}>{children}</PrefillContext.Provider>
    </MotionConfig>
  );
}

export function usePrefill() {
  const ctx = useContext(PrefillContext);
  if (!ctx) throw new Error("usePrefill must be used within PrefillProvider");
  return ctx;
}
