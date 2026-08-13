
"use client";

import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import heroOne from "@/assets/ChatGPT Image Aug 14, 2026, 01_58_31 AM.png";
import heroTwo from "@/assets/ChatGPT Image Aug 14, 2026, 02_20_16 AM.png";

import { Reveal } from "../reveal";
import { Stickers } from "../sticker";

/* =========================================================
   TYPES
========================================================= */

type HeroImageProps = {
  image: StaticImageData;
  progress: ReturnType<typeof useSpring>;
  isFirst: boolean;
  imagePosition?: string;
};

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Years experience",
  },
  {
    value: 75,
    suffix: "+",
    label: "Brand campaigns",
  },
  {
    value: 2,
    suffix: "",
    label: "Media houses",
  },
  {
    value: 4,
    suffix: "",
    label: "Languages",
  },
];

/* =========================================================
   MARQUEE
========================================================= */

const marquee = [
  {
    text: "Brand Building",
    emoji: "🚀",
  },
  {
    text: "Cinematography",
    emoji: "🎥",
  },
  {
    text: "Photography",
    emoji: "📸",
  },
  {
    text: "Editing & DI",
    emoji: "🎬",
  },
  {
    text: "UI / UX",
    emoji: "✨",
  },
  {
    text: "Direction",
    emoji: "🎯",
  },
  {
    text: "Content Writing",
    emoji: "✍️",
  },
  {
    text: "Motion Graphics",
    emoji: "🔥",
  },
  {
    text: "Marketing",
    emoji: "📈",
  },
];

/* =========================================================
   ANIMATED COUNTER
========================================================= */

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
    <span className="font-display text-4xl font-black text-primary sm:text-5xl">
      <span ref={nodeRef}>0</span>
      {suffix}
    </span>
  );
}

/* =========================================================
   IMAGE COMPONENT
========================================================= */

function HeroImage({
  image,
  progress,
  isFirst,
  imagePosition = "center center",
}: HeroImageProps) {
  /*
   ========================================================
   IMAGE 1
   ========================================================

   0.00 → 0.34
   Completely visible and sharp.

   0.34 → 0.47
   Starts blurring.

   0.47 → 0.58
   Completely fades out.


   ========================================================
   IMAGE 2
   ========================================================

   0.32 → 0.45
   Enters blurred.

   0.45 → 0.56
   Becomes sharp.

   0.56 → 0.78
   FULLY CLEAR.

   0.78 → 1
   Remains clear underneath glass.
   */

  const opacity = useTransform(
    progress,
    isFirst
      ? [0, 0.33, 0.46, 0.58]
      : [0.31, 0.43, 0.55, 0.78],
    isFirst
      ? [1, 1, 0.45, 0]
      : [0, 0.35, 1, 1]
  );

  const blur = useTransform(
    progress,
    isFirst
      ? [0, 0.33, 0.46, 0.58]
      : [0.31, 0.43, 0.55, 0.78],
    isFirst
      ? [0, 0, 8, 18]
      : [18, 8, 0, 0]
  );

  const scale = useTransform(
    progress,
    isFirst
      ? [0, 0.33, 0.58]
      : [0.31, 0.55, 0.78],
    isFirst
      ? [1, 1.012, 1.05]
      : [1.05, 1, 1]
  );

  const filter = useTransform(
    blur,
    (value) => `blur(${value}px)`
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        filter,
      }}
      className="absolute inset-0 h-full w-full transform-gpu overflow-hidden will-change-[opacity,transform,filter]"
    >
      <Image
        src={image}
        alt="Portfolio visual"
        fill
        priority={isFirst}
        quality={95}
        sizes="100vw"
        className="object-cover object-center p-20 ml-28 "
        style={{
          objectPosition: imagePosition,
        }}
      />

      {/* Base dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      {/* Left readability gradient */}
  

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Top gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
    </motion.div>
  );
}

/* =========================================================
   FIRST CONTENT
========================================================= */

function FirstContent({
  progress,
}: {
  progress: ReturnType<typeof useSpring>;
}) {
  /*
   * First content:
   *
   * OPEN     = 100%
   * TRANSITION = fades
   * IMAGE 2   = completely gone
   */

  const opacity = useTransform(
    progress,
    [0, 0.32, 0.45, 0.56],
    [1, 1, 0.4, 0]
  );

  const y = useTransform(
    progress,
    [0, 0.42, 0.56],
    ["0px", "-20px", "-70px"]
  );

  const blur = useTransform(
    progress,
    [0, 0.36, 0.56],
    ["blur(0px)", "blur(0px)", "blur(12px)"]
  );

  const scale = useTransform(
    progress,
    [0, 0.56],
    [1, 0.96]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter: blur,
      }}
      className="absolute left-5 top-1/2 w-[calc(100%-2.5rem)] -translate-y-1/2 sm:left-8 sm:w-[calc(100%-4rem)] md:left-14 md:max-w-2xl lg:left-20"
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs">
        [ CQP — 01 ] VISUAL ARTIST
      </p>

      <h1 className="font-display text-[clamp(3.2rem,11vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.045em] text-white">
        Michael
        <br />

        <span className="italic text-primary">
          Barnabas
        </span>
      </h1>

      <p className="mt-5 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/70 sm:text-xs sm:tracking-[0.2em]">
        Brand growth · Cinematography · Editing ·
        Product design
      </p>
    </motion.div>
  );
}

/* =========================================================
   SECOND CONTENT
========================================================= */

function SecondContent({
  progress,
}: {
  progress: ReturnType<typeof useSpring>;
}) {
  /*
   * Second content appears exactly with Image 2.
   *
   * 0.32 = hidden
   * 0.43 = blurred
   * 0.55 = completely visible
   * 0.78 = stays visible
   */

  const opacity = useTransform(
    progress,
    [0.32, 0.43, 0.55, 0.78],
    [0, 0.35, 1, 1]
  );

  const y = useTransform(
    progress,
    [0.32, 0.43, 0.55, 0.78],
    ["60px", "30px", "0px", "0px"]
  );

  const blur = useTransform(
    progress,
    [0.32, 0.43, 0.55],
    ["blur(18px)", "blur(7px)", "blur(0px)"]
  );

  const scale = useTransform(
    progress,
    [0.32, 0.55],
    [1.04, 1]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter: blur,
      }}
      className="absolute left-5 top-1/2 w-[calc(100%-2.5rem)] -translate-y-1/2 sm:left-8 sm:w-[calc(100%-4rem)] md:left-14 md:max-w-2xl lg:left-20"
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs">
        [ CQP — 02 ] CREATIVE STRATEGIST
      </p>

      <h2 className="font-display text-[clamp(3.2rem,11vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.045em] text-white">
        Build Your
        <br />

        <span className="italic text-primary">
           Brand
        </span>
      </h2>

      <p className="mt-5 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/70 sm:text-xs sm:tracking-[0.2em]">
        Marketing · UI / UX · Storytelling · Digital
        experiences
      </p>
    </motion.div>
  );
}

/* =========================================================
   MAIN HERO
========================================================= */

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredMarqueeIndex, setHoveredMarqueeIndex] =
    useState<number | null>(null);

  /*
   * 400vh gives us enough room for:
   *
   * 0 → 34%   Image 1
   * 34 → 58%  Image transition
   * 58 → 78%  Image 2 HOLD
   * 78 → 100% Glass section
   */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * Spring smoothing.
   *
   * Low mass keeps it responsive.
   * Damping removes wheel/touch jitter.
   */

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.2,
  });

  /* =======================================================
     HERO SCALE
  ======================================================= */

  const stageScale = useTransform(
    smoothProgress,
    [0, 0.72, 1],
    [1, 1, 0.96]
  );

  /* =======================================================
     GLASS SECTION
  ======================================================= */

  /*
   * IMPORTANT:
   *
   * Glass stays at 105% until 76%.
   *
   * Therefore Image 2 gets a proper clear period.
   */

  const glassY = useTransform(
    smoothProgress,
    [0.76, 0.82, 0.92, 1],
    ["105%", "105%", "22%", "0%"]
  );

  const glassOpacity = useTransform(
    smoothProgress,
    [0.76, 0.82, 0.9],
    [0, 0.15, 1]
  );

  const glassRadius = useTransform(
    smoothProgress,
    [0.82, 0.96],
    ["4rem", "2rem"]
  );

  /* =======================================================
     SCROLL INDICATOR
  ======================================================= */

  const scrollIndicatorOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.3],
    [1, 0.8, 0]
  );

  /* =======================================================
     IMAGE COUNTER
  ======================================================= */

  const counterOpacity = useTransform(
    smoothProgress,
    [0, 0.72, 0.82],
    [1, 1, 0]
  );

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative h-[400vh] w-full"
    >
      {/* ===================================================
          STICKY SCREEN
      =================================================== */}

      <div className="sticky top-0 h-[100svh] min-h-[870px] w-full overflow-hidden bg-black">
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 z-0 bg-black" />

        {/* =================================================
            IMAGE STAGE
        ================================================= */}

        <motion.div
          style={{
            scale: stageScale,
          }}
          className="absolute inset-0 z-10 overflow-hidden transform-gpu will-change-transform"
        >
          {/* IMAGE 1 */}

          <HeroImage
            image={heroOne}
            progress={smoothProgress}
            isFirst={true}
            imagePosition="center center"
          />

          {/* IMAGE 2 */}

          <HeroImage
            image={heroTwo}
            progress={smoothProgress}
            isFirst={false}
            imagePosition="center center"
          />
        </motion.div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 z-50">
          <FirstContent progress={smoothProgress} />

          <SecondContent progress={smoothProgress} />
        </div>

        {/* =================================================
            TOP GRADIENT
        ================================================= */}

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[55] h-32 bg-gradient-to-b from-black/50 to-transparent" />

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <motion.div
          style={{
            opacity: scrollIndicatorOpacity,
          }}
          className="absolute bottom-7 left-1/2 z-[80] -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
              Scroll
            </span>

            <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>

        {/* =================================================
            IMAGE COUNTER
        ================================================= */}

        <motion.div
          style={{
            opacity: counterOpacity,
          }}
          className="absolute bottom-7 right-5 z-[80] font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:right-8"
        >
          <span className="text-primary">
            01
          </span>

          <span className="mx-2">
            /
          </span>

          <span>
            02
          </span>
        </motion.div>

        {/* =================================================
            GLASS SECTION
        ================================================= */}

        <motion.div
          style={{
            y: glassY,
            opacity: glassOpacity,
            borderTopLeftRadius: glassRadius,
            borderTopRightRadius: glassRadius,
          }}
          className="absolute inset-x-0 bottom-0 top-0 z-[100] overflow-hidden border-t border-white/10 bg-background/95 pb-16 pt-20 shadow-[0_-25px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl transform-gpu will-change-transform"
        >
          {/* =================================================
              STICKERS
          ================================================= */}

          <Stickers />

          {/* =================================================
              ABOUT CONTENT
          ================================================= */}

          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
              {/* =================================================
                  BIO
              ================================================= */}

              <div>
                <Reveal>
                  <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur-md sm:text-xs">
                    Available for freelance
                  </p>
                </Reveal>

                <Reveal delay={40}>
                  <h2 className="font-display text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl md:text-6xl">
                    Michael{" "}
                    <span className="text-primary">
                      Barnabas
                    </span>
                  </h2>
                </Reveal>

                <Reveal delay={80}>
                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                    I drive brand growth through strategic
                    marketing, compelling storytelling and
                    data-backed digital execution — leveraging
                    7+ years across brand building,
                    cinematography, editing and product design.
                  </p>
                </Reveal>

                <Reveal
                  delay={120}
                  className="mt-8 flex flex-wrap gap-3 sm:gap-4"
                >
                  <a
                    href="#photography"
                    className="group relative overflow-hidden rounded-full bg-primary px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)] active:scale-95 sm:px-8 sm:text-xs"
                  >
                    <span className="relative z-10">
                      View work
                    </span>
                  </a>

                  <a
                    href="#contact"
                    className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-white/10 sm:px-8 sm:text-xs"
                  >
                    Get in touch
                  </a>
                </Reveal>
              </div>

              {/* =================================================
                  SHOWCASE CARD
              ================================================= */}

              <Reveal delay={100}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
                    [ CQP — 01 ]
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    Bringing Ideas To Life
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Specializing in digital experiences,
                    cinematography, and brand systems
                    engineered to convert.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

            <div className="mt-14 grid grid-cols-2 gap-7 border-t border-border/40 pt-8 sm:mt-20 sm:gap-8 sm:pt-10 md:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 40}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />

                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* =================================================
              MARQUEE
          ================================================= */}

          <div className="relative z-10 mt-14 w-full overflow-hidden border-y border-border/40 bg-background/50 py-7 backdrop-blur-md sm:mt-20 sm:py-10">
            <div className="flex w-max animate-marquee gap-6 font-mono text-[10px] uppercase tracking-[0.22em] hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-8 sm:text-xs sm:tracking-[0.3em]">
              {[
                ...marquee,
                ...marquee,
                ...marquee,
                ...marquee,
              ].map((item, index) => (
                <div
                  key={`${item.text}-${index}`}
                  className="group relative flex cursor-pointer items-center gap-5 whitespace-nowrap sm:gap-8"
                  onMouseEnter={() =>
                    setHoveredMarqueeIndex(index)
                  }
                  onMouseLeave={() =>
                    setHoveredMarqueeIndex(null)
                  }
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity:
                        hoveredMarqueeIndex === index
                          ? 1
                          : 0,
                      y:
                        hoveredMarqueeIndex === index
                          ? -30
                          : 8,
                      scale:
                        hoveredMarqueeIndex === index
                          ? 1
                          : 0.85,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="pointer-events-none absolute left-1/2 top-0 z-50 flex -translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-primary/20 px-5 py-1 text-sm shadow-lg backdrop-blur-xl"
                  >
                    <span>
                      {item.emoji}
                    </span>
                  </motion.div>

                  <span className="text-muted-foreground transition-all duration-300 group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.8)]">
                    {item.text}
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

