import { EVENT } from "@/lib/event";

const EVENT_DURATION_MS = 3 * 60 * 60 * 1000;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toIcsDate(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
    d.getUTCHours()
  )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function buildIcs() {
  const start = EVENT.date;
  const end = new Date(start.getTime() + EVENT_DURATION_MS);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grand Jour//FR",
    "BEGIN:VEVENT",
    `UID:grand-jour-${start.getTime()}@grandjour`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${EVENT.name}`,
    `LOCATION:${EVENT.venue}, ${EVENT.address}`,
    `DESCRIPTION:${EVENT.whatToBring}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "grand-jour.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function googleCalendarUrl() {
  const start = EVENT.date;
  const end = new Date(start.getTime() + EVENT_DURATION_MS);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.name,
    dates: `${toIcsDate(start)}/${toIcsDate(end)}`,
    location: `${EVENT.venue}, ${EVENT.address}`,
    details: EVENT.whatToBring,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
