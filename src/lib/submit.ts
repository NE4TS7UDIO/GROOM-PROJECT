export type SubmitPayload =
  | { stage: "karting"; name: string; karting_rsvp: "oui" | "non" }
  | { stage: "groomsman"; name: string; groomsman_answer: "oui" };

/** Fire-and-forget write to the response sheet — never blocks the UI flow. */
export function submitResponse(payload: SubmitPayload) {
  fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("[submit] request failed", error);
  });
}
