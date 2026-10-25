function Star({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute fill-[#FF4C18] ${className}`}
      aria-hidden
    >
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
    </svg>
  );
}

// Purely decorative background for the page canvas.
export default function Decorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF4C18_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15]" />

      {/* stars */}
      <Star className="animate-float left-[8%] top-[14%] h-4 w-4" />
      <Star className="animate-twinkle right-[10%] top-[10%] h-3 w-3" />
      <Star className="animate-twinkle bottom-[18%] left-[6%] h-2.5 w-2.5 [animation-delay:-1.5s]" />
      <Star className="animate-float bottom-[12%] right-[8%] h-4 w-4 [animation-delay:-3s]" />

      {/* rings and dots */}
      <div className="animate-float absolute right-[18%] top-[32%] h-3 w-3 rounded-full border border-[#FF4C18]/60" />
      <div className="animate-twinkle absolute left-[14%] top-[55%] h-1.5 w-1.5 rounded-full bg-[#2E2E2E]/70" />
    </div>
  );
}
