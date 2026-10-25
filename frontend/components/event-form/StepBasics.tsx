"use client";

import type { FormEvent } from "react";
import { basicsFields, categories } from "./config";
import { useEventForm } from "./EventFormContext";
import Field from "./Field";

export default function StepBasics() {
  const { category, setCategory, setStep } = useEventForm();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (category) setStep(2);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {basicsFields.map((f) => (
          <Field key={f.name} field={f} />
        ))}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold tracking-wide">What do you need?</p>
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
      </div>

      <button
        type="submit"
        disabled={!category}
        className="self-end rounded-full bg-[#FF4C18] px-8 py-2.5 font-semibold text-white shadow-lg shadow-[#FF4C18]/30 transition hover:-translate-y-0.5 hover:bg-[#E63E0F] hover:shadow-xl hover:cursor-pointer active:scale-95 disabled:pointer-events-none disabled:opacity-40"
      >
        Continue
      </button>
    </form>
  );
}
