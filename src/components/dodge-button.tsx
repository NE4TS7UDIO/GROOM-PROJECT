"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TAUNTS = ["Non", "Essaie voir", "Toujours non", "Non, sérieux", "Raté"];
const DODGE_RADIUS = 120;
const MIN_SCALE = 0.55;
const SCALE_STEP = 0.07;

/**
 * The joke "decline" button from docs/site-spec.md: it flees the pointer
 * and shrinks a little each time, and never actually submits anything.
 * Must render inside a `position: relative` container it can roam in.
 */
export function DodgeButton({ className }: { className?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dodgesRef = useRef(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  function relocate() {
    const btn = btnRef.current;
    const zone = btn?.parentElement;
    if (!btn || !zone) return;

    const btnRect = btn.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();
    const maxX = Math.max(zoneRect.width - btnRect.width, 0);
    const maxY = Math.max(zoneRect.height - btnRect.height, 0);

    setPos({ x: Math.random() * maxX, y: Math.random() * maxY });
    dodgesRef.current += 1;
    setDodges(dodgesRef.current);
  }

  useEffect(() => {
    relocate();

    function handlePointerMove(e: PointerEvent) {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      if (distance < DODGE_RADIUS) relocate();
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const scale = Math.max(1 - dodges * SCALE_STEP, MIN_SCALE);
  const label = TAUNTS[Math.min(dodges, TAUNTS.length - 1)];

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={relocate}
      onTouchStart={relocate}
      aria-label="Bouton non — pour rire, il ne se laisse pas cliquer"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className={cn(
        "font-wedding absolute left-0 top-0 h-12 select-none whitespace-nowrap rounded-lg border border-border bg-transparent px-6 text-base font-normal text-muted-foreground",
        className
      )}
    >
      {label}
    </button>
  );
}
