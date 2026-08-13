"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";

import heroOne from "@/assets/ChatGPT Image Aug 12, 2026, 03_59_09 AM.png";
import heroTwo from "@/assets/ChatGPT Image Aug 12, 2026, 04_12_55 AM.png";
import { Reveal } from "../reveal";
import { Stickers } from "../sticker";

const stats = [
  { value: 8, suffix: "+", label: "Years experience" },
  { value: 75, suffix: "+", label: "Brand campaigns" },
  { value: 2, suffix: "", label: "Media houses" },
  { value: 4, suffix: "", label: "Languages" },
];

const marquee = [
  { text: "Brand Building", emoji: "🚀" },
  { text: "Cinematography", emoji: "🎥" },
  { text: "Photography", emoji: "📸" },
  { text: "Editing & DI", emoji: "🎬" },
  { text: "UI / UX", emoji: "✨" },
  { text: "Direction", emoji: "🎯" },
  { text: "Content Writing", emoji: "✍️" },
  { text: "Motion Graphics", emoji: "🔥" },
  { text: "Marketing", emoji: "📈" },
];

/* -------------------------------------------------------
   Lightweight counter
------------------------------------------------------- */

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(nodeRef, {
    once: true,
    margin: "-50px",
  });

  useEffect(() => {
    const node = nodeRef.current;

    if (!node || !isInView) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(current) {
        node.textContent = Math.floor(current).toString();
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span className="font-display text-4xl font-black text-primary md:text-5xl">
      <span ref={nodeRef}>0</span>
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------
   HERO
------------------------------------------------------- */

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredMarqueeIndex, setHoveredMarqueeIndex] = useState<
    number | null
  >(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* =====================================================
     PHASE 1: Text fade out
  ===================================================== */

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.07, 0.12],
    [1, 0.35, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.12],
    ["0px", "-70px"]
  );

  const textScale = useTransform(
    scrollYProgress,
    [0, 0.12],
    [1, 0.96]
  );

  /* =====================================================
     PHASE 2: Image 1 fades & blurs completely out
  ===================================================== */

  const heroOneBlur = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.42],
    [0, 4, 16]
  );

  const heroOneScale = useTransform(
    scrollYProgress,
    [0.15, 0.42],
    [1, 1.05]
  );

  // Fades out to 0 opacity before Image 2 fully shows
  const heroOneOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.38],
    [1, 0]
  );

  const heroOneFilter = useTransform(
    heroOneBlur,
    (value) => `blur(${value}px)`
  );

  /* =====================================================
     PHASE 3: Image 2 fades in and replaces Image 1
  ===================================================== */

  const imageTwoOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.45, 0.55],
    [0, 0.8, 1]
  );

  const imageTwoBlur = useTransform(
    scrollYProgress,
    [0.32, 0.45, 0.55],
    [12, 4, 0]
  );

  const imageTwoScale = useTransform(
    scrollYProgress,
    [0.32, 0.55],
    [1.04, 1]
  );

  const imageTwoFilter = useTransform(
    imageTwoBlur,
    (value) => `blur(${value}px)`
  );

  /* =====================================================
     PHASE 4: Glass section rises
  ===================================================== */

  const glassY = useTransform(
    scrollYProgress,
    [0.72, 0.88, 1],
    ["100%", "25%", "0%"]
  );

  const stageScale = useTransform(
    scrollYProgress,
    [0.72, 1],
    [1, 0.94]
  );

  const glassRadius = useTransform(
    scrollYProgress,
    [0.72, 0.9],
    ["3.5rem", "2rem"]
  );

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative h-[500vh] w-full"
    >
      {/* =================================================
          STICKY HERO VIEWPORT
      ================================================= */}

      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        {/* NAME / INTRO */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            scale: textScale,
          }}
          className="pointer-events-none absolute left-8 top-1/2 z-40 max-w-xl -translate-y-1/2 md:left-16"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            [ CQP — 01 ] VISUAL ARTIST
          </p>

          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-white md:text-8xl">
            Michael
            <br />
            <span className="italic text-primary">
              Barnabas
            </span>
          </h1>

          <p className="mt-6 max-w-sm font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            Brand growth · Cinematography · Editing · Product design
          </p>
        </motion.div>

        {/* HERO IMAGE STAGE */}
        <motion.div
          style={{ scale: stageScale }}
          className="relative flex h-screen w-screen items-center justify-center transform-gpu overflow-hidden"
        >
          <div className="relative h-screen w-full overflow-hidden transform-gpu">
            {/* IMAGE 1 (Starts 100% full screen, fades completely out) */}
            <motion.div
              style={{
                filter: heroOneFilter,
                scale: heroOneScale,
                opacity: heroOneOpacity,
              }}
              className="absolute inset-0 z-10 h-full w-full transform-gpu will-change-[filter,transform,opacity]"
            >
              <Image
                src={heroOne}
                alt="Michael Barnabas"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* IMAGE 2 (Appears on scroll and replaces Image 1) */}
            <motion.div
              style={{
                opacity: imageTwoOpacity,
                scale: imageTwoScale,
                filter: imageTwoFilter,
              }}
              className="absolute inset-0 z-20 h-full w-full transform-gpu will-change-[opacity,transform,filter]"
            >
              <Image
                src={heroTwo}
                alt="Studio Showcase"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* OVERLAY */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>
        </motion.div>

        {/* GLASS SECTION */}
        <motion.div
          style={{
            y: glassY,
            borderTopLeftRadius: glassRadius,
            borderTopRightRadius: glassRadius,
          }}
          className="absolute inset-x-0 bottom-0 top-0 z-50 overflow-hidden border-t border-white/10 bg-background/95 pb-16 pt-20 shadow-[0_-25px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl will-change-transform"
        >
          <Stickers />

          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
              {/* BIO */}
              <div>
                <Reveal>
                  <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                    Available for freelance
                  </p>
                </Reveal>

                <Reveal delay={40}>
                  <h2 className="font-display text-4xl font-semibold leading-[0.95] text-foreground md:text-6xl">
                    Michael{" "}
                    <span className="text-primary">
                      Barnabas
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={80}>
                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                    I drive brand growth through strategic marketing, compelling storytelling and data-backed digital execution — leveraging 7+ years across brand building, cinematography, editing and product design.
                  </p>
                </Reveal>

                <Reveal delay={120} className="mt-9 flex flex-wrap gap-4">
                  <a
                    href="#photography"
                    className="group relative overflow-hidden rounded-full bg-primary px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)] active:scale-95"
                  >
                    <span className="relative z-10">View work</span>
                  </a>

                  <a
                    href="#contact"
                    className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                  >
                    Get in touch
                  </a>
                </Reveal>
              </div>

              {/* SHOWCASE CARD */}
              <Reveal delay={100}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]">
                  <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                    [CQP — 01]
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                    Bringing Ideas To Life
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Specializing in digital experiences, cinematography, and brand systems engineered to convert.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* STATS */}
            <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border/40 pt-10 md:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 40}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* MARQUEE */}
          <div className="relative z-10 mt-20 w-full overflow-hidden border-y border-border/40 bg-background/50 py-10 backdrop-blur-md">
            <div className="flex w-max animate-marquee gap-8 font-mono text-xs uppercase tracking-[0.3em] hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
                <div
                  key={`${m.text}-${i}`}
                  className="group relative flex pointer-events-auto cursor-pointer items-center gap-8 whitespace-nowrap"
                  onMouseEnter={() => setHoveredMarqueeIndex(i)}
                  onMouseLeave={() => setHoveredMarqueeIndex(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.85 }}
                    animate={{
                      opacity: hoveredMarqueeIndex === i ? 1 : 0,
                      y: hoveredMarqueeIndex === i ? -36 : 8,
                      scale: hoveredMarqueeIndex === i ? 1 : 0.85,
                    }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none absolute left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-primary/20 px-6 py-1 text-sm shadow-lg backdrop-blur-xl"
                  >
                    <span>{m.emoji}</span>
                  </motion.div>

                  <span className="text-muted-foreground transition-all duration-300 group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.8)]">
                    {m.text}
                  </span>

                  <span className="text-primary/40 transition-colors group-hover:text-primary">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;