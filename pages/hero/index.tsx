// "use client";

// import { useRef } from "react";
// import craft from "@/assets/craft.png";
// import { profile } from "@/lib/data";
// import { motion, useScroll, useTransform } from "framer-motion";

// export function Hero() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
//   // Motion transforms
//   const craftX = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
//   const craftScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
//   const craftRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
//   const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
//   const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   // Dynamic 3D Thruster Glow Linked to Scroll
//   const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.4]);
//   const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

//   return (
//     <div id="top" ref={ref} className="relative min-h-[105svh] overflow-hidden">
//       {/* 3D Spacecraft Container */}
//       <motion.div
//         style={{ x: craftX, scale: craftScale, rotate: craftRotate }}
//         className="pointer-events-none absolute left-1/2 top-[26vh] w-[130vw] max-w-[1400px] -translate-x-1/2 sm:top-[22vh] sm:w-[92vw] transform-gpu will-change-transform"
//       >
//         <div className="relative flex items-center justify-center [perspective:1000px]">
          
//           {/* 3D Atmospheric Thruster Engine Glow (Guaranteed Visibility) */}
//           <motion.div
//             style={{ opacity: glowOpacity, scale: glowScale }}
//             className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 transform-gpu"
//           >
//             {/* SVG Radial Glow Core */}
//             <svg viewBox="0 0 800 800" className="h-full w-full opacity-90 blur-2xl">
//               <defs>
//                 <radialGradient id="spaceGlow" cx="50%" cy="50%" r="50%">
//                   <stop offset="0%" stopColor="#ff1e1e" stopOpacity="0.9" />
//                   <stop offset="35%" stopColor="#b91c1c" stopOpacity="0.6" />
//                   <stop offset="70%" stopColor="#450a0a" stopOpacity="0.25" />
//                   <stop offset="100%" stopColor="#000000" stopOpacity="0" />
//                 </radialGradient>
//               </defs>
//               <circle cx="400" cy="400" r="380" fill="url(#spaceGlow)" />
//             </svg>
//           </motion.div>

//           {/* Spacecraft Image */}
//           <img
//             src={craft.src}
//             alt="3D rendered crimson-lit spacecraft representing the brand ops mission"
//             width={1280}
//             height={768}
//             className="animate-float-craft relative z-10 w-full opacity-90 transform-gpu"
//           />
//         </div>
//       </motion.div>

//       {/* Main UI & Typography Layer */}
//       <motion.div
//         style={{ y: titleY, opacity: fade }}
//         className="relative mx-auto flex min-h-[105svh] w-full max-w-6xl flex-col justify-center px-5 pt-28 sm:px-8 transform-gpu will-change-transform"
//       >
//         <motion.p
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           className="label-hud"
//         >
//           CH 01 · Mission brief · Coimbatore, IN
//         </motion.p>

//         <h1 className="mt-4 max-w-4xl text-[13vw] font-bold leading-[0.86] sm:text-[7.4rem] [perspective:1000px]">
//           {"MICHAEL".split("").map((c, i) => (
//             <motion.span
//               key={`a${i}`}
//               initial={{ opacity: 0, y: 40, rotateX: -60 }}
//               animate={{ opacity: 1, y: 0, rotateX: 0 }}
//               transition={{ duration: 0.7, delay: 0.15 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
//               className="inline-block transform-gpu will-change-transform"
//             >
//               {c}
//             </motion.span>
//           ))}
//           <br />
//           <span className="text-signal-glow">
//             {"D BARNABAS".split("").map((c, i) => (
//               <motion.span
//                 key={`b${i}`}
//                 initial={{ opacity: 0, y: 40, rotateX: -60 }}
//                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                 transition={{ duration: 0.7, delay: 0.45 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
//                 className="inline-block transform-gpu will-change-transform"
//               >
//                 {c === " " ? "\u00A0" : c}
//               </motion.span>
//             ))}
//           </span>
//         </h1>

//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.9 }}
//           className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
//         >
//           <div>
//             <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
//               {profile.role}
//             </p>
//             <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
//               {profile.objective}
//             </p>
//           </div>
//           <div className="panel-hud corner-ticks px-5 py-4">
//             <p className="label-hud">Status</p>
//             <p className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
//               <span className="h-1.5 w-1.5 animate-blink-dot bg-signal" /> Available for briefs
//             </p>
//             <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
//               Founder · CreativeLance Marketing
//             </p>
//           </div>
//         </motion.div>
//       </motion.div>

//       <div className="absolute inset-x-0 bottom-6 flex justify-center">
//         <span className="label-hud animate-blink-dot">scroll to launch</span>
//       </div>
//     </div>
//   );
// }

// // Fixed: Export default added to pass Next.js route validator
// export default Hero;

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import spaceBg from "@/assets/space-bg.jpg";
import { profile } from "@/lib/data";

const EASE_SMOOTH = [0.25, 0.1, 0.25, 1.0] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* space backdrop */}
      <motion.img
        src={typeof spaceBg === "string" ? spaceBg : spaceBg.src}
        alt=""
        aria-hidden
        width={1920}
        height={1088}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transform-gpu will-change-transform"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent" />
      <div aria-hidden className="scan-line absolute inset-0 opacity-50" />

      <motion.div
        style={{ y: textY }}
        className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8 transform-gpu will-change-transform"
      >
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE_SMOOTH }}
          className="label-hud"
        >
          CH 01 · Design ops · Coimbatore, IN
        </motion.p>

        <h1 className="mt-5 text-[13vw] font-bold leading-[0.86] sm:text-[7.5vw] xl:text-[6.6rem]">
          {["MICHAEL", "D BARNABAS"].map((line, li) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + li * 0.08, ease: EASE_SMOOTH }}
                className={li === 1 ? "inline-block text-signal-glow transform-gpu will-change-transform" : "inline-block transform-gpu will-change-transform"}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: EASE_SMOOTH }}
          className="mt-7 font-mono text-[11px] uppercase tracking-[0.3em] text-accent sm:text-xs"
        >
          UI/UX Designer · Brand Manager · Marketing
        </motion.p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32, ease: EASE_SMOOTH }}
          >
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              I design brand systems and digital products that convert — pairing interface craft
              and cinematic content with 7+ years of brand building and data-backed campaigns.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#reel"
                className="group relative overflow-hidden bg-signal px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.26em] text-signal-foreground transition-all duration-300 active:scale-95 transform-gpu"
              >
                <span className="relative z-10">View the work</span>
                <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 ease-out group-hover:translate-x-0" />
              </a>
              <a
                href="#signal"
                className="border border-border px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.26em] transition-colors duration-200 hover:border-signal hover:text-signal"
              >
                Open a signal
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.38, ease: EASE_SMOOTH }}
            className="panel-hud corner-ticks w-full max-w-sm p-6 transform-gpu will-change-transform"
          >
            <p className="label-hud">Status</p>
            <p className="mt-2 flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-signal">
              <span className="h-2 w-2 animate-blink-dot bg-signal" />
              Available for briefs
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Founder · {profile.venture.name}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3">
        <span className="label-hud animate-blink-dot">scroll to launch</span>
        <span className="h-10 w-px bg-gradient-to-b from-signal to-transparent" />
      </div>
    </div>
  );
}

export default Hero;