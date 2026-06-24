"use client";

import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export default function ChaosWrapper({ children }: { children: React.ReactNode }) {
  const chaosMode = useStore((state) => state.chaosMode);
  const isMatrixMode = useStore((state) => state.isMatrixMode);

  useEffect(() => {
    if (chaosMode) {
      document.body.classList.add("chaos-mode");
    } else {
      document.body.classList.remove("chaos-mode");
    }

    if (isMatrixMode) {
      document.body.classList.add("matrix-mode");
    } else {
      document.body.classList.remove("matrix-mode");
    }
  }, [chaosMode, isMatrixMode]);

  return <>{children}</>;
}
