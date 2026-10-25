"use client";

import { OTHER, type FieldDef } from "./config";
import { useEventForm } from "./EventFormContext";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-[15px] shadow-sm outline-none transition hover:border-[#FF4C18]/60 focus:border-[#FF4C18] focus:ring-4 focus:ring-[#FF4C18]/15";

export default function Field({ field }: { field: FieldDef }) {
  const { values, setValue } = useEventForm();
  const { name, label, type = "text", options, required } = field;
  const common = {
    id: name,
    name,
    required,
    value: values[name] ?? "",
    className: inputClass,
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={type === "range" ? `${name}Min` : name} className="text-sm font-semibold tracking-wide text-[#2E2E2E]">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...common}
          rows={3}
          onChange={(e) => setValue(name, e.target.value)}
        />
      ) : type === "select" ? (
        <>
          <select {...common} onChange={(e) => setValue(name, e.target.value)}>
            <option value="">Select…</option>
            {options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {values[name] === OTHER && (
            <input
              name={`${name}Other`}
              aria-label={`${label} (other)`}
              placeholder="Please specify"
              required
              autoFocus
              className={`${inputClass} mt-2`}
              value={values[`${name}Other`] ?? ""}
              onChange={(e) => setValue(`${name}Other`, e.target.value)}
            />
          )}
        </>
      ) : type === "range" ? (
        <div className="flex items-center gap-2">
          <Rupee
            id={`${name}Min`}
            placeholder="Min"
            value={values[`${name}Min`] ?? ""}
            onChange={(v) => setValue(`${name}Min`, v)}
          />
          <span className="font-semibold text-zinc-400">to</span>
          <Rupee
            id={`${name}Max`}
            placeholder="Max"
            min={values[`${name}Min`]}
            value={values[`${name}Max`] ?? ""}
            onChange={(v) => setValue(`${name}Max`, v)}
          />
        </div>
      ) : (
        <input
          {...common}
          type={type}
          min={type === "number" ? 0 : undefined}
          onChange={(e) => setValue(name, e.target.value)}
        />
      )}
    </div>
  );
}

function Rupee({
  id,
  placeholder,
  value,
  min,
  onChange,
}: {
  id: string;
  placeholder: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-zinc-500">
        ₹
      </span>
      <input
        id={id}
        name={id}
        type="number"
        required
        min={min || 0}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} pl-9`}
      />
    </div>
  );
}
