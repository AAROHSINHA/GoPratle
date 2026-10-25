import Decorations from "@/components/event-form/Decorations";
import EventForm from "@/components/event-form/EventForm";

export default function Home() {
  return (
    <div className="relative flex-1 overflow-hidden bg-[#FFF9F5] px-4 py-12 text-[#2E2E2E]">
      <Decorations />
      <main className="relative mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25),0_12px_30px_-10px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:p-10">
        <EventForm />
      </main>
    </div>
  );
}
