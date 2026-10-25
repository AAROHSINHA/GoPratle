import axios from "axios";
import { OTHER, type Category } from "@/components/event-form/config";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://gopratle-v9ev.onrender.com/api"
    : "http://localhost:5000/api");

export const api = axios.create({ baseURL: API_URL });

export type Gig = {
  _id: string;
  event: {
    eventName: string;
    eventType: string;
    startDate: string;
    endDate?: string;
    city: string;
    venue?: string;
  };
  budget: { min: number; max: number };
  additionalRequirements?: string;
  postedOn: string;
  [key: string]: unknown;
};

export async function getGigs(category: Category) {
  const { data } = await api.get<Gig[]>(`/requirements/${slugs[category]}`);
  return data;
}

const slugs: Record<Category, string> = {
  "Event Planner": "event-planner",
  Performer: "performer",
  Crew: "crew",
};

type Values = Record<string, string>;

// Dropdown value, or the typed text when "Other" was chosen.
const text = (v: Values, name: string) =>
  v[name] === OTHER ? v[`${name}Other`] : v[name];

const num = (value?: string) => (value ? Number(value) : undefined);

// Turns the flat form values into the shape the backend models expect.
function buildPayload(category: Category, v: Values) {
  const common = {
    event: {
      eventName: v.eventName,
      eventType: text(v, "eventType"),
      startDate: v.startDate,
      endDate: v.endDate || undefined,
      city: v.city,
      venue: v.venue || undefined,
    },
    budget: { min: num(v.budgetMin), max: num(v.budgetMax) },
    additionalRequirements: v.additional || undefined,
  };

  switch (category) {
    case "Event Planner":
      return {
        ...common,
        services: text(v, "services"),
        expectedAttendees: num(v.attendees),
      };
    case "Performer":
      return {
        ...common,
        performanceType: text(v, "performanceType"),
        genre: text(v, "genre"),
        numberOfPerformers: num(v.performers),
        duration: text(v, "duration"),
      };
    case "Crew":
      return {
        ...common,
        crewRoles: text(v, "roles"),
        numberOfPeople: num(v.people),
        skillsExperience: v.skills,
      };
  }
}

export async function saveEvent(category: Category, values: Values) {
  const { data } = await api.post<{ id: string }>(
    `/requirements/${slugs[category]}`,
    buildPayload(category, values),
  );
  return data;
}

// Readable message from a failed request.
export function errorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; errors?: Record<string, string> }
      | undefined;
    if (data?.errors) return Object.values(data.errors).join(". ");
    if (data?.message) return data.message;
    if (!error.response) return "Cannot reach the server. Is the backend running?";
  }
  return "Something went wrong. Please try again.";
}
