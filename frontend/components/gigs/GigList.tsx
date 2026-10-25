"use client";

import { useEffect, useState } from "react";
import { categories, type Category } from "@/components/event-form/config";
import { errorMessage, getGigs, type Gig } from "@/lib/api";
import GigCard from "./GigCard";

function Results({ category }: { category: Category }) {
  const [gigs, setGigs] = useState<Gig[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getGigs(category)
      .then((data) => active && setGigs(data))
      .catch((e) => active && setError(errorMessage(e)));
    return () => {
      active = false;
    };
  }, [category]);

  if (error) {
    return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>;
  }
  if (!gigs) return <p className="py-8 text-center font-medium text-zinc-500">Loading gigs…</p>;
  if (gigs.length === 0) {
    return <p className="py-8 text-center font-medium text-zinc-500">No open gigs yet. Check back soon!</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {gigs.map((gig) => (
        <GigCard key={gig._id} gig={gig} category={category} />
      ))}
    </div>
  );
}

export default function GigList() {
  const [category, setCategory] = useState<Category>("Performer");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {categories.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setCategory(c.name)}
            aria-pressed={category === c.name}
            className={`rounded-2xl border-2 p-4 text-left transition duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg active:scale-95 ${
              category === c.name
                ? "border-[#FF4C18] bg-[#FFF9F5] shadow-md"
                : "border-zinc-200 hover:border-[#FF4C18]"
            }`}
          >
            <span className="block text-base font-bold">{c.name}</span>
            <span className="text-sm font-medium text-zinc-500">{c.description}</span>
          </button>
        ))}
      </div>
      <Results key={category} category={category} />
    </div>
  );
}
