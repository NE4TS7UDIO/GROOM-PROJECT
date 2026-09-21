import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return !window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// Reads prefers-reduced-motion via useSyncExternalStore instead of an
// effect + setState: this returns the SSR-safe false snapshot through
// hydration, then React reconciles the real client value on its own,
// without a hydration mismatch (an effect-set value would flash-swap
// image -> video only for allowed users).
export function usePrefersMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
