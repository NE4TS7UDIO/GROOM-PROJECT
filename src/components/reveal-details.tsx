import { Calendar, MapPin, Shirt } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/event";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";

const FACTS = [
  { icon: Calendar, label: "Date", value: EVENT.dateLabel },
  { icon: MapPin, label: "Lieu", value: `${EVENT.venue}, ${EVENT.address}` },
  { icon: Shirt, label: "Tenue", value: EVENT.whatToBring },
];

export function RevealDetails({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-8 text-center duration-700 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="font-wedding-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          Merci d&rsquo;avoir dit oui, {name}.
        </h2>
        <div className="mx-auto mt-5 h-0.75 w-28 bg-accent-hi" />
      </div>

      {/* Icon + label row — reuses the poster reference's bottom pictogram
          band, restyled to Stage 2's real facts (date/venue/dress code)
          instead of gameplay pillars. Original line icons (lucide), not
          the source key art's iconography. */}
      <dl className="grid w-full grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
        {FACTS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon aria-hidden className="size-5 text-accent-hi" strokeWidth={1.5} />
            <dt className="font-wedding text-[11px] font-light uppercase tracking-[0.28em] text-muted-foreground">
              {label}
            </dt>
            <dd className="font-wedding text-sm font-light text-foreground">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="font-wedding flex flex-wrap justify-center gap-3">
        <Button
          type="button"
          onClick={downloadIcs}
          className="h-11 px-6 font-medium uppercase tracking-[0.15em]"
        >
          Ajouter au calendrier (.ics)
        </Button>
        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            variant: "outline",
            className: "h-11 px-6 font-medium uppercase tracking-[0.15em]",
          })}
        >
          Google Calendar
        </a>
      </div>
    </div>
  );
}
