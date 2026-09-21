import { cn } from "@/lib/utils";

export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--gd-line) 1px, transparent 1px), linear-gradient(to bottom, var(--gd-line) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        opacity: 0.35,
      }}
    />
  );
}
