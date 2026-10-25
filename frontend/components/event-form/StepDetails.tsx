"use client";

import type { FormEvent } from "react";
import { categoryFields } from "./config";
import { useEventForm } from "./EventFormContext";
import Field from "./Field";

export default function StepDetails() {
  const { category, setStep } = useEventForm();
  if (!category) return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-tight">{category} details</h2>
      {categoryFields[category].map((f) => (
        <Field key={f.name} field={f} />
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="rounded-full border-2 border-zinc-200 px-8 py-2.5 font-semibold transition hover:-translate-y-0.5 hover:border-[#FF4C18] hover:text-[#FF4C18] hover:cursor-pointer active:scale-95"
        >
          Back
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#FF4C18] px-8 py-2.5 font-semibold text-white shadow-lg shadow-[#FF4C18]/30 transition hover:-translate-y-0.5 hover:bg-[#E63E0F] hover:shadow-xl hover:cursor-pointer active:scale-95"
        >
          Preview &amp; Apply
        </button>
      </div>
    </form>
  );
}
