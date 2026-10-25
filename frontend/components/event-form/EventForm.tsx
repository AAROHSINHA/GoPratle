"use client";

import { EventFormProvider, useEventForm } from "./EventFormContext";
import StepBasics from "./StepBasics";
import StepDetails from "./StepDetails";
import StepPreview from "./StepPreview";

const titles = ["Event Basics", "Requirements", "Preview"];

function Steps() {
  const { step } = useEventForm();
  return (
    <>
      <div className="mb-3 flex gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-[#FF4C18]" : "bg-zinc-200"}`}
          />
        ))}
      </div>
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#FF4C18]">
        Step {step} of 3
      </p>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">{titles[step - 1]}</h1>
      {step === 1 && <StepBasics />}
      {step === 2 && <StepDetails />}
      {step === 3 && <StepPreview />}
    </>
  );
}

export default function EventForm() {
  return (
    <EventFormProvider>
      <Steps />
    </EventFormProvider>
  );
}
