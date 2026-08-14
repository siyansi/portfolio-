// "use client";

// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";

// const links = [
//   ["01", "Pilot", "pilot"],
//   ["02", "Log", "log"],
//   ["03", "Systems", "systems"],
//   ["04", "Studio", "studio"],
//   ["05", "Dossier", "dossier"],
//   ["06", "Signal", "signal"],
// ] as const;

// export function Nav() {
//   const { scrollYProgress } = useScroll();
//   const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
//     <header className="fixed inset-x-0 top-0 z-50">
//       <div className="panel-hud flex items-center justify-between gap-4 border-x-0 border-t-0 px-5 py-3 sm:px-8">
//         <Link href="#top" className="flex items-center gap-2">
//           <span className="h-2 w-2 animate-blink-dot bg-signal" />
//           <span className="font-display text-sm font-bold tracking-[0.2em]">MDB</span>
//           <span className="label-hud hidden sm:inline">/ brand ops</span>
//         </Link>
//         <nav className="hidden items-center gap-6 md:flex">
//           {links.map(([n, label, id]) => (
//             <Link
//               key={id}
//               href={`#${id}`}
//               className="group flex items-baseline gap-1.5 transition-colors hover:text-signal"
//             >
//               <span className="label-hud group-hover:text-signal">{n}</span>
//               <span className="font-mono text-xs uppercase tracking-[0.18em]">{label}</span>
//             </Link>
//           ))}
//         </nav>
//         <Link
//           href="#signal"
//           className="border border-signal px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-signal transition-colors hover:bg-signal hover:text-signal-foreground"
//         >
//           Hire me
//         </Link>
//       </div>
//       <motion.div style={{ width }} className="h-px origin-left bg-signal" />
//     </header>
//   );
// }

"use client";

import { useEffect, useState, useRef } from "react";
import { IoRocketSharp } from "react-icons/io5";

const links = [
  { num: "01", label: "HOME", href: "#top" },
  { num: "02", label: "ABOUT", href: "#about" },
  { num: "03", label: "WORK", href: "#photography" },
  { num: "04", label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Trigger solid glass mode after scrolling down past top section
      setSolid(currentScroll > 50);

      if (totalHeight > 0) {
        setScrollPercent(
          Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100))
        );
      }

      // Detect active scrolling state
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 180);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        solid
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.2em]"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-white">MICHAEL</span>
          <span className="text-white/40">/</span>
          <span className="text-[10px] uppercase font-normal tracking-[0.25em] text-white/60">
            PORTFOLIO
          </span>
        </a>

        {/* Cleaned Nav Links */}
        <ul className="hidden items-center gap-8 font-mono text-[11px] tracking-[0.2em] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex items-center gap-1.5 text-white/70 transition-colors hover:text-primary"
              >
                <span className="text-[9px] text-white/40 transition-colors group-hover:text-primary/70">
                  {l.num}
                </span>
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <a
          href="#contact"
          className="rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95 transform-gpu"
        >
          Hire me
        </a>
      </nav>

      {/* Interactive Progress Line & Dynamic Rocket */}
      <div className="relative h-[2px] w-full bg-white/10">
        <div
          className="relative h-full bg-gradient-to-r from-primary via-emerald-400 to-primary transition-all duration-75 ease-out"
          style={{ width: `${scrollPercent}%` }}
        >
          {/* Rocket Tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <span
              className={`absolute -inset-3 rounded-full blur-md transition-all duration-300 ${
                isScrolling
                  ? "scale-150 opacity-100 bg-primary/60 animate-pulse"
                  : "scale-75 opacity-40 bg-primary/30"
              }`}
            />

            <span
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isScrolling
                  ? "scale-125 -rotate-[-47deg] drop-shadow-[0_0_12px_#10b981]"
                  : "scale-90 -rotate-[-47deg] drop-shadow-[0_0_6px_#10b981]"
              }`}
            >
              <span className="relative flex items-center justify-center">
                <span className="text-primary select-none filter">
                  <IoRocketSharp />
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;