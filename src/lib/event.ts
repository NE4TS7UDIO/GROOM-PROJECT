/**
 * Event details for the stage-2 reveal.
 *
 * `date` is a placeholder — none of the three options in docs/site-spec.md
 * (20 Feb / 6 Mar / 13 Mar 2027) is confirmed yet. This uses the "currently
 * favored" one so the reveal/calendar flow has something real to render;
 * swap it freely, nothing else in the code depends on this value.
 */
export const EVENT = {
  name: "Grand Prix",
  venue: "Indoorkarting Antwerpen",
  address: "Noorderlaan 95a, 2030 Antwerpen",
  date: new Date("2027-02-20T14:00:00+01:00"),
  dateLabel: "20 février 2027",
  whatToBring: "Chaussures fermées obligatoires. Tenue casual.",
};
