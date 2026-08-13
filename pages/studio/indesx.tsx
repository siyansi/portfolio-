// "use client";

// import { motion } from "framer-motion";
// import { Reveal, Section, SectionHeading } from "@/component/hud";
// import { profile } from "@/lib/data";

// export function Studio() {
//   const { venture } = profile;
//   return (
//     <Section id="studio">
//       <SectionHeading code="CH 05" title="CreativeLance Marketing" kicker="the venture" />

//       <Reveal>
//         <div className="panel-hud corner-ticks relative overflow-hidden p-6 sm:p-10">
//           <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-signal/20 blur-[80px]" />
//           <p className="max-w-2xl font-display text-xl leading-snug sm:text-3xl">
//             {venture.tagline}
//           </p>
//           <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
//             {venture.blurb}
//           </p>
//           <div className="mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
//             {venture.stats.map(([v, l]) => (
//               <div key={l} className="bg-card/70 px-4 py-5">
//                 <p className="font-display text-2xl font-bold text-signal-glow sm:text-3xl">{v}</p>
//                 <p className="label-hud mt-1">{l}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Reveal>

//       <div className="mt-6 grid gap-6 sm:grid-cols-2">
//         {venture.services.map((s, i) => (
//           <Reveal key={s.code} delay={i * 0.07}>
//             <motion.article
//               whileHover={{ y: -6, rotateX: 3 }}
//               transition={{ type: "spring", stiffness: 180, damping: 18 }}
//               className="panel-hud corner-ticks group h-full p-6 [transform-style:preserve-3d]"
//             >
//               <span className="label-hud text-signal">{s.code}</span>
//               <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-signal">
//                 {s.title}
//               </h3>
//               <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
//               <span className="mt-5 block h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
//             </motion.article>
//           </Reveal>
//         ))}
//       </div>
//     </Section>
//   );
// }

// export default Studio;


"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "../reveal";

const timeline = [
  {
    num: "01",
    years: "2014 — 2015",
    role: "Cinematographer & Candid Photographer",
    org: "Freelance",
    desc: "Captured high-end wedding and event cinematography with focus on lighting, color grading, and creative framing.",
    tags: ["LIGHTING", "COLOR GRADING", "CAMERA OPERATING"],
  },
  {
    num: "02",
    years: "2015 — 2017",
    role: "Indoor & Outdoor Cameraman",
    org: "Lotus News",
    desc: "Managed multi-cam live broadcast setups, studio lighting, and fast-paced field video reporting.",
    tags: ["LIVE BROADCAST", "STUDIO LIGHTING", "FIELD COVERAGE"],
  },
  {
    num: "03",
    years: "2017 — 2019",
    role: "Media Production Lead",
    org: "FMPB Media (NGO)",
    desc: "Directed and edited documentary-style promotional films, interview series, and high-impact social campaigns.",
    tags: ["DOCUMENTARY", "DIRECTION", "POST-PRODUCTION"],
  },
  {
    num: "04",
    years: "2019 — 2021",
    role: "Social Media Producer",
    org: "Jesus Calls",
    desc: "Produced engaging daily digital content, short-form video strategies, and live stream broadcasts across social channels.",
    tags: ["CONTENT STRATEGY", "LIVE STREAMING", "SHORT FORM"],
  },
  {
    num: "05",
    years: "2021 — 2023",
    role: "Senior Video Editor & Motion Graphics",
    org: "Fanvideo",
    desc: "Crafted high-energy commercial promos, visual effects, motion titles, and cinematic narrative cuts.",
    tags: ["MOTION GRAPHICS", "COMMERCIAL EDITING", "VFX"],
  },
  {
    num: "06",
    years: "2023 — Present",
    role: "Brand Manager",
    org: "Nustartz",
    desc: "Overseeing end-to-end brand identity, video production pipelines, visual design systems, and digital marketing execution.",
    tags: ["BRAND IDENTITY", "CREATIVE DIRECTION", "MARKETING"],
  },
];

function TimelineCard({
  item,
  index,
  total,
}: {
  item: (typeof timeline)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const topOffset = 120 + index * 28;

  return (
    <div
      ref={cardRef}
      style={{ top: `${topOffset}px` }}
      className="sticky z-10 my-4 w-full transform-gpu transition-all duration-300"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ margin: "-10% 0px -20% 0px", once: false }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-background/95 p-6 md:p-8 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.2)]"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 size-64 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm tracking-widest text-primary font-semibold">
                [{item.num}]
              </span>
              <span className="font-mono text-xs tracking-wider text-muted-foreground">
                {item.years}
              </span>
            </div>

            <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
              {item.role}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary uppercase border border-primary/20">
                {item.org}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end justify-center gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-[-4px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary via-accent to-transparent transition-all duration-500 group-hover:w-full" />
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-6">
      <SectionHeading index="00" title="Experience" />

      <div className="relative mt-12 space-y-4 pb-10">
        {timeline.map((item, index) => (
          <TimelineCard
            key={item.role}
            item={item}
            index={index}
            total={timeline.length}
          />
        ))}
      </div>
    </section>
  );
}

export default Experience;