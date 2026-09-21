export type Groomsman = {
  name: string;
  role: "Témoin" | "Garçon d'honneur";
  /** Stage-2 personal line. */
  personalLine: string;
};

/**
 * personalLine below is an AI-drafted starter, not real content — written
 * without knowing anything specific about these nine people, so it's
 * deliberately generic-but-sincere rather than faking a specific shared
 * memory that could be wrong. Swap each one for a real reference before
 * this goes out; see docs/content.md for the original brief on tone.
 */
export const groomsmen: Groomsman[] = [
  {
    name: "Michael",
    role: "Témoin",
    personalLine:
      "Toi, tu savais déjà — mais ça se demande quand même, pour de vrai.",
  },
  {
    name: "Josue",
    role: "Garçon d'honneur",
    personalLine: "Depuis le temps qu'on se connaît, ça ne pouvait être que toi.",
  },
  {
    name: "Michée",
    role: "Garçon d'honneur",
    personalLine: "Les meilleurs souvenirs, c'est souvent avec toi qu'ils sont arrivés.",
  },
  {
    name: "Joeffrey",
    role: "Garçon d'honneur",
    personalLine: "T'as toujours été là, sans même qu'on ait besoin de le dire.",
  },
  {
    name: "Joseph",
    role: "Garçon d'honneur",
    personalLine: "Un vrai frère, ça se choisit — je t'ai choisi il y a longtemps.",
  },
  {
    name: "Samuel",
    role: "Garçon d'honneur",
    personalLine: "On en a traversé, des trucs, toi et moi. Celle-là, je veux la vivre avec toi aussi.",
  },
  {
    name: "Narik",
    role: "Garçon d'honneur",
    personalLine: "Peu de gens comprennent aussi bien que toi sans que j'aie à expliquer.",
  },
  {
    name: "Milan",
    role: "Garçon d'honneur",
    personalLine: "Si je devais choisir avec qui rire le jour de mon mariage, ce serait toi.",
  },
  {
    name: "Dilal",
    role: "Garçon d'honneur",
    personalLine: "T'as vu passer les pires versions de moi. Je veux que tu voies la meilleure aussi.",
  },
  {
    name: "Raphaël",
    role: "Garçon d'honneur",
    personalLine: "On a grandi ensemble, à notre façon. Continuons encore un peu.",
  },
];

export const fallbackPersonalLine = "Un garçon d'honneur, ça se demande.";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

export function findGroomsman(typedName: string): Groomsman | undefined {
  const target = normalize(typedName);
  if (!target) return undefined;
  return groomsmen.find((g) => normalize(g.name) === target);
}
