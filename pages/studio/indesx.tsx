"use client";

import { motion } from "framer-motion";
import { Reveal, Section, SectionHeading } from "@/component/hud";
import { profile } from "@/lib/data";

export function Studio() {
  const { venture } = profile;
  return (
    <Section id="studio">
      <SectionHeading code="CH 05" title="CreativeLance Marketing" kicker="the venture" />

      <Reveal>
        <div className="panel-hud corner-ticks relative overflow-hidden p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-signal/20 blur-[80px]" />
          <p className="max-w-2xl font-display text-xl leading-snug sm:text-3xl">
            {venture.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {venture.blurb}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {venture.stats.map(([v, l]) => (
              <div key={l} className="bg-card/70 px-4 py-5">
                <p className="font-display text-2xl font-bold text-signal-glow sm:text-3xl">{v}</p>
                <p className="label-hud mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {venture.services.map((s, i) => (
          <Reveal key={s.code} delay={i * 0.07}>
            <motion.article
              whileHover={{ y: -6, rotateX: 3 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="panel-hud corner-ticks group h-full p-6 [transform-style:preserve-3d]"
            >
              <span className="label-hud text-signal">{s.code}</span>
              <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-signal">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <span className="mt-5 block h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Studio;
