"use client";

import { Panel, Reveal, Section, SectionHeading } from "@/component/hud";
import { profile } from "@/lib/data";

export function Pilot() {
  return (
    <Section id="pilot">
      <SectionHeading code="CH 02" title="The Pilot" kicker="identity module" />
      <div className="grid gap-6">
        <Reveal>
          <div className="panel-hud corner-ticks flex flex-wrap items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-display text-lg font-bold text-signal">{profile.name}</p>
              <p className="label-hud mt-1">{profile.role}</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              Founder · CreativeLance Marketing
            </p>
          </div>
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