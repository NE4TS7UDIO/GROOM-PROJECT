"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export type ParallaxLayerConfig = {
  /** CSS selector, scoped to the container, matching the elements to move. */
  selector: string;
  /** Vertical shift applied over the scroll range, as a percent of the element's own height. */
  yPercent: number;
  /** Optional opacity to scrub towards (from its current value) over the same scroll range. */
  opacity?: number;
};

/**
 * Drives a scroll-scrubbed depth-parallax effect (GSAP ScrollTrigger + Lenis smooth
 * scroll) across layers inside `containerRef`, mirroring the mechanism in
 * src/components/ui/parallax-scrolling.tsx so it can be reused with custom markup.
 *
 * Lenis takes over smooth scrolling for the whole document, not just this section —
 * if a second component on the same page also calls this hook, the Lenis instances
 * will fight over scroll control. Lift Lenis to a single app-level instance before
 * adding parallax to more than one section.
 */
export function useParallaxLayers(
  containerRef: RefObject<HTMLElement | null>,
  layers: ParallaxLayerConfig[]
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = containerRef.current;
    if (!trigger) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0,
      },
    });

    layers.forEach((layer, idx) => {
      tl.to(
        trigger.querySelectorAll(layer.selector),
        {
          yPercent: layer.yPercent,
          ...(layer.opacity !== undefined ? { opacity: layer.opacity } : {}),
          ease: "none",
        },
        idx === 0 ? undefined : "<"
      );
    });

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(trigger);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
