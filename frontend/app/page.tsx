import Decorations from "@/components/event-form/Decorations";
import HomeTabs from "@/components/HomeTabs";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#FFF9F5] px-4 text-[#2E2E2E]">
      <Decorations />

      <main className="relative mx-auto my-12 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25),0_12px_30px_-10px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:p-10">
        <HomeTabs />
      </main>

      <footer className="relative mt-auto pb-6 text-center text-sm font-semibold text-zinc-500">
        Made By Aaroh Sinha
      </footer>
    </div>
  );
}
