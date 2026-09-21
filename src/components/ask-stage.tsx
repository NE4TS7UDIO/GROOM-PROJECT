"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DodgeButton } from "@/components/dodge-button";
import { GridOverlay } from "@/components/grid-overlay";
import { RevealDetails } from "@/components/reveal-details";
import { findGroomsman } from "@/data/groomsmen";
import { submitResponse } from "@/lib/submit";
import { useParallaxLayers } from "@/hooks/use-parallax-layers";

export function AskStage({ name }: { name: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const [answered, setAnswered] = useState(false);
  const person = findGroomsman(name);
  const displayName = person?.name ?? name;
  const role = person?.role ?? "Garçon d'honneur";

  // Background photo drifts slower than the overlay content (parallax) and
  // fades to fully transparent over the hero's own height, revealing the
  // solid black `bg-background` beneath it as a smooth crossfade rather
  // than a hard cut into the black section below.
  useParallaxLayers(heroRef, [
    { selector: '[data-hero-layer="background"]', yPercent: 20, opacity: 0 },
    { selector: '[data-hero-layer="content"]', yPercent: 0 },
  ]);

  function handleYes() {
    setAnswered(true);
    submitResponse({ stage: "groomsman", name: displayName, groomsman_answer: "oui" });
  }

  return (
    <div className="stage2-theme bg-background text-foreground">
      <section
        ref={heroRef}
        className="relative flex min-h-dvh w-full flex-col bg-background"
      >
        {/* overflow-hidden lives on this layer, not the section itself —
            the section needs to grow taller than one viewport for long
            names/lines without clipping the content layer below. */}
        <div data-hero-layer="background" className="absolute inset-0 overflow-hidden">
          {/* Filename carries a content hash (first 10 hex chars of the file's
              sha256) rather than a stable name — swapping this asset again
              means renaming the file and updating this src, but it also means
              Next's image-optimizer cache and browser caches key on a URL
              that actually changes, instead of silently serving a stale
              transform of the old photo at an unchanged path. */}
          <Image
            src="/images/stage2-hero-174b1d126e.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-80"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-background/30"
          />
        </div>

        <div
          data-hero-layer="content"
          className="relative flex min-h-dvh flex-1 flex-col justify-between gap-8 p-5 py-8 sm:gap-0 sm:p-10"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-wedding text-[11px] font-light uppercase leading-relaxed tracking-[0.22em] text-foreground sm:text-sm sm:tracking-[0.28em]">
                Une question.
                <br />
                Une seule personne.
                <br />
                Toi.
              </p>
              <div className="mt-3 h-px w-16 bg-border" />
              <p className="font-wedding mt-3 text-xs font-medium uppercase tracking-[0.3em] text-accent-hi">
                Grand Jour
              </p>
            </div>

            <span
              aria-hidden
              className="font-wedding hidden text-[11px] font-light uppercase tracking-[0.3em] text-muted-foreground sm:block"
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              {role}
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-wedding-serif wrap-break-word text-[13vw] leading-[0.92] tracking-tight sm:text-6xl sm:leading-[0.95] md:text-7xl lg:text-8xl">
              Veux-tu être mon garçon d&rsquo;honneur, {displayName} ?
            </h1>
            <div className="mt-5 h-0.75 w-28 bg-accent-hi sm:w-36" />
          </div>
        </div>
      </section>

      <section className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-10">
        <GridOverlay />
        {!answered ? (
          <div className="relative flex flex-col items-center gap-8">
            <Button
              type="button"
              size="lg"
              onClick={handleYes}
              className="font-wedding h-14 w-full max-w-xs px-10 text-sm font-medium uppercase tracking-[0.25em] sm:w-auto"
            >
              Oui
            </Button>
            <div className="relative h-28 w-full max-w-sm sm:h-20">
              <DodgeButton />
            </div>
          </div>
        ) : (
          <div className="relative w-full">
            <RevealDetails name={displayName} />
          </div>
        )}
      </section>
    </div>
  );
}
