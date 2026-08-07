"use client";

import { motion } from "framer-motion";
import { Panel, Reveal, Section, SectionHeading } from "@/component/hud";
import { profile } from "@/lib/data";

export function Systems() {
  return (
    <Section id="systems">
      <SectionHeading code="CH 04" title="Systems Online" kicker="strengths & software" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Panel bar="Strength & skills" className="h-full">
            <ul className="flex flex-wrap gap-2">
              {profile.strengths.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.035 }}
                  whileHover={{ y: -3 }}
                  className="border border-border bg-secondary/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-signal hover:text-signal"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </Panel>
        </Reveal>
        <Reveal delay={0.1}>
          <Panel bar="Software skill" className="h-full">
            <div className="space-y-4">
              {profile.software.map(([name, level], i) => (
                <div key={name}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.16em]">{name}</span>
                    <span className="label-hud text-signal">{level}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[image:var(--gradient-signal)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
export default Systems;