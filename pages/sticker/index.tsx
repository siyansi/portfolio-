"use client";

const stickers = [
  { emoji: "🎬", top: "14%", left: "3%", delay: "0s" },
  { emoji: "📸", top: "8%", left: "93%", delay: "1.2s" },
  { emoji: "✨", top: "62%", left: "2%", delay: "2.1s" },
  { emoji: "🎨", top: "74%", left: "95%", delay: "0.6s" },
  { emoji: "📈", top: "40%", left: "96%", delay: "1.8s" },
];

export function Stickers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      {stickers.map((s) => (
        <span
          key={s.emoji}
          className="float-slow absolute grid size-11 place-items-center rounded-full glass text-lg opacity-50 transform-gpu will-change-transform"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}

export default Stickers;