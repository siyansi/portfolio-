"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  ["01", "Pilot", "pilot"],
  ["02", "Log", "log"],
  ["03", "Systems", "systems"],
  ["04", "Studio", "studio"],
  ["05", "Dossier", "dossier"],
  ["06", "Signal", "signal"],
] as const;

export function Nav() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="panel-hud flex items-center justify-between gap-4 border-x-0 border-t-0 px-5 py-3 sm:px-8">
        <Link href="#top" className="flex items-center gap-2">
          <span className="h-2 w-2 animate-blink-dot bg-signal" />
          <span className="font-display text-sm font-bold tracking-[0.2em]">MDB</span>
          <span className="label-hud hidden sm:inline">/ brand ops</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([n, label, id]) => (
            <Link
              key={id}
              href={`#${id}`}
              className="group flex items-baseline gap-1.5 transition-colors hover:text-signal"
            >
              <span className="label-hud group-hover:text-signal">{n}</span>
              <span className="font-mono text-xs uppercase tracking-[0.18em]">{label}</span>
            </Link>
          ))}
        </nav>
        <Link
          href="#signal"
          className="border border-signal px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-signal transition-colors hover:bg-signal hover:text-signal-foreground"
        >
          Hire me
        </Link>
      </div>
      <motion.div style={{ width }} className="h-px origin-left bg-signal" />
    </header>
  );
}