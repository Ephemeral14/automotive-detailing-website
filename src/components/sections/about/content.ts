/**
 * Copy for the About page. Deliberately about method and standards —
 * no invented people, dates, awards or figures.
 */

export const aboutSections = [
  { id: "philosophy", label: "Philosophy" },
  { id: "approach", label: "Approach" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "standards", label: "Standards" },
  { id: "studio", label: "The studio" },
] as const;

export type AboutSectionId = (typeof aboutSections)[number]["id"];

/** Editorial index ("01") for a section, derived from its position in the page index. */
export function sectionIndex(id: AboutSectionId) {
  return String(aboutSections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
}

export type Principle = {
  title: string;
  body: string;
  inPractice: string;
};

export const principles: Principle[] = [
  {
    title: "Assess before acting",
    body: "Every vehicle is inspected panel by panel before a plan is agreed. Paint, leather, glass and trim are judged separately, because each asks for something different.",
    inPractice: "A written plan, agreed with you before work begins.",
  },
  {
    title: "The least aggressive method first",
    body: "We begin with the gentlest product, pad and pressure that could work, and step up only when a test spot proves it necessary. Clear coat removed is clear coat gone for good.",
    inPractice: "A test spot before every correction.",
  },
  {
    title: "Light tells the truth",
    body: "Swirls, holograms and haze hide in flattering light. We inspect under several sources and colour temperatures, so what you see in the studio is what you will see in the sun.",
    inPractice: "Final inspection under daylight-balanced light.",
  },
  {
    title: "Time is part of the process",
    body: "Products need dwell time, panels need to cool between passes and coatings need to cure. We schedule around the process, never the other way round.",
    inPractice: "Coatings are cured before the car is collected.",
  },
];

export type CraftNote = { term: string; detail: string };

export const craftNotes: CraftNote[] = [
  {
    term: "Hand-finishing",
    detail:
      "Edges, emblems, seams and vents are worked with soft brushes and cut-down pads — never left to a machine that cannot reach them properly.",
  },
  {
    term: "Tools",
    detail:
      "Pads, brushes and polishers are matched to the paint system in front of us, then cleaned, inspected and retired before they can mark a finish.",
  },
  {
    term: "Microfiber discipline",
    detail:
      "Towels are colour-coded by task, laundered apart from everything else and never reused once dropped. One grain of grit can undo a day of correction.",
  },
  {
    term: "Patience",
    detail:
      "Dwell times are respected, panels cool between passes and nothing is hurried towards a deadline. Rushing is the one shortcut we never take.",
  },
];

export type Standard = { title: string; detail: string };

export const standards: Standard[] = [
  {
    title: "Paint depth measured before any machine work",
    detail:
      "Readings are taken on every panel and noted on the vehicle’s file. They decide how far correction can safely go — and where it should not go at all.",
  },
  {
    title: "Inspection under multiple colour temperatures",
    detail:
      "Warm, neutral and daylight-balanced sources, plus a handheld swirl finder. A defect that hides in one light rarely survives all of them.",
  },
  {
    title: "Two-bucket hand wash — never automated",
    detail:
      "Grit guards, a dedicated wheel bucket and a fresh mitt for each section of the car. No brushes, no rollers, no tunnel.",
  },
  {
    title: "Products chosen for compatibility, not habit",
    detail:
      "Cleaners, polishes and coatings are selected for the specific paint, leather or trim in front of us, and tested on an inconspicuous area first.",
  },
  {
    title: "Scope agreed before work begins",
    detail:
      "You approve a written plan and estimate at drop-off. If we find something unexpected, we stop and ask before going any further.",
  },
  {
    title: "Photo-documented handover",
    detail:
      "Condition is photographed on arrival and again on completion. You leave with the images, a record of the work and clear aftercare notes.",
  },
];

export const studioFacts: CraftNote[] = [
  { term: "Visits", detail: "By private appointment only" },
  { term: "The bay", detail: "One vehicle at a time" },
  { term: "Handover", detail: "A walk-round under studio light" },
];
