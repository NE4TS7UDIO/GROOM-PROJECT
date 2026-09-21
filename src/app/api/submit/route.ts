import { NextResponse } from "next/server";

type SubmitBody =
  | { stage: "karting"; name: string; karting_rsvp: "oui" | "non" }
  | { stage: "groomsman"; name: string; groomsman_answer: "oui" };

export async function POST(request: Request) {
  const body = (await request.json()) as SubmitBody;
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[submit] SHEETS_WEBHOOK_URL not configured — see docs/google-sheets-setup.md. Skipping write.",
      body
    );
    return NextResponse.json({ ok: true, recorded: false });
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, submitted_at: new Date().toISOString() }),
    });
    return NextResponse.json({ ok: true, recorded: true });
  } catch (error) {
    console.error("[submit] Failed to write to Google Sheet", error);
    return NextResponse.json({ ok: true, recorded: false });
  }
}
