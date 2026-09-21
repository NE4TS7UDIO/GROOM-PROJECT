"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const HOLD_MS = 1400;
const FADE_MS = 600;

export function PageLoader({
  holdMs = HOLD_MS,
  fadeMs = FADE_MS,
  onDone,
}: {
  /** How long the spinner holds at full opacity before fading. */
  holdMs?: number;
  /** How long the fade-out itself takes. */
  fadeMs?: number;
  /** Fires once the loader has fully faded out and unmounted — use this to
   *  reveal whatever content the loader was gating. */
  onDone?: () => void;
} = {}) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), holdMs);
    const unmountTimer = setTimeout(() => {
      setMounted(false);
      onDone?.();
    }, holdMs + fadeMs);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity ease-out",
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      style={{ transitionDuration: `${fadeMs}ms` }}
    >
      <Spinner variant="infinite" className="size-14 text-accent-hi" />
    </div>
  );
}
