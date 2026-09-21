"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { GridOverlay } from "@/components/grid-overlay";
import { useParallaxLayers } from "@/hooks/use-parallax-layers";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { EVENT } from "@/lib/event";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoEnabled = usePrefersMotion();

  useParallaxLayers(heroRef, [
    { selector: '[data-hero-layer="background"]', yPercent: 18 },
    { selector: '[data-hero-layer="content"]', yPercent: 0 },
  ]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-background"
    >
      <div data-hero-layer="background" className="absolute inset-0">
        {videoEnabled ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-image.jpg"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/hero-image.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-70"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-background/40"
        />
        <GridOverlay />
      </div>

      <div data-hero-layer="content" className="absolute inset-0 flex flex-col">
        <div className="flex items-start justify-between px-4 py-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:px-10 sm:py-10 sm:text-xs">
          <span>[ Grand Prix ]</span>
          <span>[ Anvers ]</span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-4 pt-20 sm:justify-end sm:px-10 sm:pt-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-[18vw] font-black uppercase leading-[0.88] tracking-tight text-foreground sm:text-[9vw] lg:text-[7.5rem]">
              Anvers.
              <br />
              Sois là.
            </h1>
            <p className="mt-5 max-w-md font-sans text-base text-muted-foreground sm:mt-6 sm:text-lg">
              Karting indoor, Grand Prix en groupe, Noorderlaan 95a.
            </p>

            <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <span>Date — {EVENT.dateLabel}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 px-4 pb-8 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground sm:pb-10">
          <span>[ Défiler ]</span>
          <ChevronDown aria-hidden className="size-4 motion-safe:animate-bounce" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-0.5 overflow-hidden bg-line">
        <div className="hero-progress-sweep absolute inset-y-0 w-1/3 bg-accent-hi" />
      </div>
    </section>
  );
}
