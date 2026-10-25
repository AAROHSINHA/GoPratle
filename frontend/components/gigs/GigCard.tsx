import type { Category } from "@/components/event-form/config";
import type { Gig } from "@/lib/api";

// [label, key in the saved document] for each category
const details: Record<Category, [string, string][]> = {
  "Event Planner": [
    ["Services", "services"],
    ["Expected attendees", "expectedAttendees"],
  ],
  Performer: [
    ["Performance", "performanceType"],
    ["Genre", "genre"],
    ["Performers", "numberOfPerformers"],
    ["Duration", "duration"],
  ],
  Crew: [
    ["Roles", "crewRoles"],
    ["People needed", "numberOfPeople"],
    ["Skills", "skillsExperience"],
  ],
};

const date = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function GigCard({ gig, category }: { gig: Gig; category: Category }) {
  const { event, budget } = gig;

  return (
    <article className="rounded-2xl border border-zinc-200 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#FF4C18] hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight">{event.eventName}</h3>
        <span className="shrink-0 rounded-full bg-[#FFF9F5] px-3 py-1 text-xs font-bold text-[#FF4C18]">
          {event.eventType}
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-zinc-500">
        {event.city}
        {event.venue && ` · ${event.venue}`} · {date(event.startDate)}
        {event.endDate && ` – ${date(event.endDate)}`}
      </p>

      <p className="mt-3 text-xl font-bold text-[#FF4C18]">
        {inr(budget.min)} – {inr(budget.max)}
      </p>

      <dl className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {details[category].map(([label, key]) => (
          <div key={key}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</dt>
            <dd className="text-[15px] font-semibold">{String(gig[key])}</dd>
          </div>
        ))}
      </dl>

      {gig.additionalRequirements && (
        <p className="mt-3 text-sm font-medium text-zinc-600">{gig.additionalRequirements}</p>
      )}

      <p className="mt-4 text-xs font-semibold text-zinc-400">Posted on {date(gig.postedOn)}</p>
    </article>
  );
}
