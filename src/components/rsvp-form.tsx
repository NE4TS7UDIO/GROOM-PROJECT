"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { submitResponse } from "@/lib/submit";

type Attending = "yes" | "no" | null;

export function RsvpForm({ onSubmitted }: { onSubmitted: (name: string) => void }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const canSubmit = name.trim().length > 0 && attending !== null && status !== "submitting";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || attending === null) return;

    setStatus("submitting");
    const trimmedName = name.trim();

    submitResponse({
      stage: "karting",
      name: trimmedName,
      karting_rsvp: attending === "yes" ? "oui" : "non",
    });

    // Regardless of the karting answer, everyone continues to stage 2.
    window.setTimeout(() => onSubmitted(trimmedName), 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Ton prénom
        </span>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Prénom"
          required
          className="h-12 text-base"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Partant ?
        </span>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={attending === "yes" ? "default" : "outline"}
            onClick={() => setAttending("yes")}
            className="h-12 flex-1 text-base"
          >
            Oui
          </Button>
          <Button
            type="button"
            variant={attending === "no" ? "default" : "outline"}
            onClick={() => setAttending("no")}
            className="h-12 flex-1 text-base"
          >
            Non
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={!canSubmit} className="mt-2 h-12 text-base">
        {status === "submitting" ? (
          <>
            <Spinner variant="infinite" className="size-4" />
            Confirmation
          </>
        ) : (
          "Confirmer"
        )}
      </Button>
    </form>
  );
}
