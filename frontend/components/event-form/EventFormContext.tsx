"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Category } from "./config";

type Step = 1 | 2 | 3;

type EventFormState = {
  step: Step;
  setStep: (step: Step) => void;
  category: Category | null;
  setCategory: (category: Category) => void;
  values: Record<string, string>;
  setValue: (name: string, value: string) => void;
  reset: () => void;
};

const EventFormContext = createContext<EventFormState | null>(null);

export function EventFormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  const setValue = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const reset = () => {
    setStep(1);
    setCategory(null);
    setValues({});
  };

  return (
    <EventFormContext.Provider
      value={{ step, setStep, category, setCategory, values, setValue, reset }}
    >
      {children}
    </EventFormContext.Provider>
  );
}

export function useEventForm() {
  const ctx = useContext(EventFormContext);
  if (!ctx) throw new Error("useEventForm must be used inside EventFormProvider");
  return ctx;
}
