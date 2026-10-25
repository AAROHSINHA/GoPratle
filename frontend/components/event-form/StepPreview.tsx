"use client";

import { useState } from "react";
import { errorMessage, saveEvent } from "@/lib/api";
import { basicsFields, categoryFields, displayValue, type FieldDef } from "./config";
import { useEventForm } from "./EventFormContext";

function Section({
  title,
  fields,
  values,
}: {
  title: string;
  fields: FieldDef[];
  values: Record<string, string>;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold tracking-tight">{title}</h2>
      <dl className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
        {fields.map((f) => (
          <div
            key={f.name}
            className="grid gap-1 p-4 transition hover:bg-[#FFF9F5] sm:grid-cols-3"
          >
            <dt className="text-sm font-semibold text-zinc-500">
              {f.label.replace(" (optional)", "")}
            </dt>
            <dd className="text-[15px] font-semibold sm:col-span-2">{displayValue(f, values) || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function StepPreview() {
  const { category, values, setStep, reset } = useEventForm();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  if (!category) return null;

  const onSave = async () => {
    setSaving(true);
    setError("");
    try {
      await saveEvent(category, values);
      setSaved(true);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Event saved 🎉</h2>
        <p className="font-medium text-zinc-500">Your requirement has been posted.</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#FF4C18] px-8 py-2.5 font-semibold text-white shadow-lg shadow-[#FF4C18]/30 transition hover:-translate-y-0.5 hover:bg-[#E63E0F] hover:shadow-xl hover:cursor-pointer active:scale-95"
        >
          Add another event
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Section title="Event Basics" fields={basicsFields} values={values} />
      <Section title={category} fields={categoryFields[category]} values={values} />
      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="rounded-full border-2 border-zinc-200 px-8 py-2.5 font-semibold transition hover:-translate-y-0.5 hover:border-[#FF4C18] hover:text-[#FF4C18] hover:cursor-pointer active:scale-95"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-full bg-[#FF4C18] px-8 py-2.5 font-semibold text-white shadow-lg shadow-[#FF4C18]/30 transition hover:-translate-y-0.5 hover:bg-[#E63E0F] hover:shadow-xl hover:cursor-pointer active:scale-95 disabled:pointer-events-none disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Event"}
        </button>
      </div>
    </div>
  );
}
