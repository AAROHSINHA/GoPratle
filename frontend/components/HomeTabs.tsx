"use client";

import { useState } from "react";
import EventForm from "@/components/event-form/EventForm";
import GigList from "@/components/gigs/GigList";

const tabs = [
  { id: "find", label: "Find Gigs" },
  { id: "post", label: "Post a Gig" },
] as const;

export default function HomeTabs() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("find");

  return (
    <>
      <div role="tablist" className="mb-8 flex gap-1 rounded-full bg-zinc-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition hover:cursor-pointer ${
              tab === t.id ? "bg-white text-[#FF4C18] shadow" : "text-zinc-500 hover:text-[#2E2E2E]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === "find" && <GigList />}
      {/* stays mounted so a half-filled form isn't lost when switching tabs */}
      <div hidden={tab !== "post"}>
        <EventForm />
      </div>
    </>
  );
}
