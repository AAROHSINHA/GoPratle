export type Category = "Event Planner" | "Performer" | "Crew";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "textarea" | "select" | "range";
  options?: string[];
  required?: boolean;
};

export const OTHER = "Other";

const inr = (n: string) => `₹${Number(n).toLocaleString("en-IN")}`;

// Text shown in the preview for a field (handles "Other" and budget ranges).
export function displayValue(field: FieldDef, values: Record<string, string>) {
  const { name, type } = field;
  if (type === "range") {
    const min = values[`${name}Min`];
    const max = values[`${name}Max`];
    return min && max ? `${inr(min)} – ${inr(max)}` : "";
  }
  const value = values[name];
  return value === OTHER ? values[`${name}Other`] || OTHER : value;
}

const budget: FieldDef = { name: "budget", label: "Budget Range", type: "range", required: true };

export const categories: { name: Category; description: string }[] = [
  { name: "Event Planner", description: "Plan and run the event" },
  { name: "Performer", description: "Artists, bands, DJs" },
  { name: "Crew", description: "Sound, lights, staff" },
];

export const basicsFields: FieldDef[] = [
  { name: "eventName", label: "Event Name", required: true },
  {
    name: "eventType",
    label: "Event Type",
    type: "select",
    options: ["Wedding", "Corporate", "Concert", "Birthday", "Festival", OTHER],
    required: true,
  },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "endDate", label: "End Date (optional)", type: "date" },
  { name: "city", label: "Location / City", required: true },
  { name: "venue", label: "Venue (optional)" },
];

const extra: FieldDef = {
  name: "additional",
  label: "Additional Requirements (optional)",
  type: "textarea",
};

export const categoryFields: Record<Category, FieldDef[]> = {
  "Event Planner": [
    {
      name: "services",
      label: "Services Required",
      type: "select",
      options: [
        "Full Event Management",
        "Venue Sourcing",
        "Decor & Styling",
        "Catering",
        "Photography & Video",
        "Entertainment Booking",
        OTHER,
      ],
      required: true,
    },
    budget,
    { name: "attendees", label: "Expected Attendees", type: "number", required: true },
    extra,
  ],
  Performer: [
    {
      name: "performanceType",
      label: "Performance Type",
      type: "select",
      options: ["Live Music", "DJ Set", "Dance", "Stand-up Comedy", "Magic Show", "Anchor / MC", OTHER],
      required: true,
    },
    {
      name: "genre",
      label: "Genre",
      type: "select",
      options: ["Bollywood", "Pop", "Rock", "Classical", "Hip-Hop", "EDM", "Jazz", "Folk", OTHER],
      required: true,
    },
    { name: "performers", label: "Number of Performers", type: "number", required: true },
    {
      name: "duration",
      label: "Duration",
      type: "select",
      options: ["30 minutes", "1 hour", "2 hours", "3 hours", "4+ hours", OTHER],
      required: true,
    },
    budget,
    extra,
  ],
  Crew: [
    {
      name: "roles",
      label: "Crew Roles Required",
      type: "select",
      options: [
        "Sound Engineer",
        "Lighting Technician",
        "Stage Manager",
        "Security",
        "Ushers / Hospitality",
        "Photographer",
        OTHER,
      ],
      required: true,
    },
    { name: "people", label: "Number of People", type: "number", required: true },
    { name: "skills", label: "Skills / Experience", required: true },
    budget,
    extra,
  ],
};
