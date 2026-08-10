"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Section, SectionHeading } from "@/component/hud";
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";

interface ReelItem {
  src: string | { src: string };
  title: string;
  meta: string;
}

const reels: ReelItem[] = [
  { src: reel3, title: "Brand Ad Film", meta: "Nustartz · 00:42" },
  { src: reel2, title: "Motion Graphics Pack", meta: "CreativeLance · 00:18" },
  { src: reel1, title: "Product Commercial", meta: "Retail · 00:30" },
  { src: reel4, title: "Brand Documentary", meta: "NGO Media · 02:10" },
];

const brands = [
  "Nustartz",
  "Fanvideo",
  "Jesus Calls",
  "Lotus News",
  "FMPB Media",
  "Jesus Redeems",
  "CreativeLance",
];

function Card({ src, title, meta }: ReelItem) {
  const imageSrc = typeof src === "string" ? src : src.src;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative w-[220px] shrink-0 sm:w-[260px] transform-gpu will-change-transform"
    >
      <div className="corner-ticks relative aspect-9/16 overflow-hidden border border-border bg-card">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          width={720}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-signal bg-background/60 text-signal backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
            <Play className="h-5 w-5" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-sm font-bold uppercase tracking-wide">{title}</p>
          <p className="label-hud mt-1">{meta}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function Reel() {
  const track = [...reels, ...reels];

  return (
    <Section id="reel" className="max-w-none overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <SectionHeading code="CH 05" title="The Reel" kicker="editing · motion · film" />
      </div>

      <div className="group/track relative -mx-5 mt-2 sm:-mx-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee-left gap-5 px-5 [animation-play-state:running] group-hover/track:[animation-play-state:paused] sm:px-8">
          {track.map((r, i) => (
            <Card key={`${r.title}-${i}`} {...r} />
          ))}
        </div>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-border py-5">
        <div className="flex w-max animate-marquee-left-fast items-center gap-12 pr-12">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display text-lg font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-signal sm:text-2xl"
            >
              {b}
              <span className="ml-12 text-signal">•</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Reel;