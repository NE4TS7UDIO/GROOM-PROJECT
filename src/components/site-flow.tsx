"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { RsvpForm } from "@/components/rsvp-form";
import { AskStage } from "@/components/ask-stage";
import { PageLoader } from "@/components/page-loader";

export function SiteFlow() {
  const [stage, setStage] = useState<"karting" | "ask">("karting");
  const [name, setName] = useState("");
  // Gates the Stage 1 -> Stage 2 reveal behind the same spinner used on
  // initial app load, but shorter — this is a same-session transition the
  // visitor is already waiting on, not a cold boot.
  const [transitioning, setTransitioning] = useState(false);

  // The RSVP form sits below the full-height stage-1 hero, so on mobile the
  // page is already scrolled well past 0 when it's submitted. Without this,
  // stage 2 mounts at that same scroll offset and opens mid-hero instead of
  // at its top — happens while the loader overlay is covering the screen,
  // so it isn't visible as a jump.
  useEffect(() => {
    if (stage === "ask") window.scrollTo(0, 0);
  }, [stage]);

  if (stage === "ask") {
    return (
      <>
        {transitioning && (
          <PageLoader holdMs={700} fadeMs={450} onDone={() => setTransitioning(false)} />
        )}
        <AskStage name={name} />
      </>
    );
  }

  return (
    <>
      <Hero />
      <section className="flex flex-1 items-center justify-center bg-background px-4 py-14 sm:px-10 sm:py-20">
        <RsvpForm
          onSubmitted={(submittedName) => {
            setName(submittedName);
            setTransitioning(true);
            setStage("ask");
          }}
        />
      </section>
    </>
  );
}
