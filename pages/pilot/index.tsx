"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Panel, Reveal, Section, SectionHeading } from "@/component/hud";
import { profile } from "@/lib/data";

import pointcloud from "@/assets/portrait.png";


export function Pilot() {
  return (
    <Section id="pilot">
      <SectionHeading code="CH 02" title="The Pilot" kicker="identity module" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,300px)_1fr]">
        <Reveal>
          <motion.div
            whileHover={{ rotateY: -8, rotateX: 4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="panel-hud corner-ticks [transform-style:preserve-3d]"
          >
            <Image
              src={pointcloud}
              alt={`Portrait of ${profile.name}`}
              width={600}
              height={800}
              priority={false}
              className="w-full object-cover h-auto"
            />
            <div className="bg-signal px-4 py-2">
              <p className="font-display text-sm font-bold text-signal-foreground">
                {profile.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-foreground/85">
                {profile.role}
              </p>
            </div>
          </motion.div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.08}>
            <Panel bar="About me">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.about}
              </p>
            </Panel>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.14}>
              <Panel bar="Personal">
                <dl className="space-y-2.5">
                  {profile.personal.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                      <dt className="label-hud">{k}</dt>
                      <dd className="font-mono text-xs text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Panel>
            </Reveal>
            <Reveal delay={0.2}>
              <Panel bar="Education">
                <dl className="space-y-2.5">
                  {profile.education.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border/60 pb-2">
                      <dt className="label-hud">{k}</dt>
                      <dd className="font-mono text-xs text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  {profile.years} years operational
                </p>
              </Panel>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
export default Pilot;