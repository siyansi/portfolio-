"use client";

import { motion } from "framer-motion";
import { Reveal, Section, SectionHeading } from "@/component/hud";
import { profile } from "@/lib/data";


export function Log() {
  return (
    <Section id="log">
      <SectionHeading code="CH 03" title="Flight Log" kicker="work experience" />
      <div className="relative pl-6 sm:pl-10">
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-signal via-accent to-transparent sm:left-2"
        />
        {profile.experience.map((item, i) => (
          <Reveal key={item.org + item.period} delay={i * 0.05} className="relative pb-8">
            <span className="absolute -left-6 top-2 h-2 w-2 bg-signal sm:-left-[2.1rem]" />
            <motion.div
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="panel-hud corner-ticks group p-4 sm:p-5"
            >
              <p className="label-hud text-accent">{item.period}</p>
              <h3 className="mt-1.5 text-lg font-bold transition-colors group-hover:text-signal sm:text-xl">
                {item.org}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {item.role}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
export default Log;
