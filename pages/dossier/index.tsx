"use client";

import { motion } from "framer-motion";
import resumeAsset from "@/assets/resume.png";
import { Reveal, Section, SectionHeading } from "@/component/hud";

export function Dossier() {
  return (
    <Section id="dossier">
      <SectionHeading code="CH 08" title="Dossier" kicker="official resume" />
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_minmax(0,420px)]">
        <Reveal>
          <div className="panel-hud corner-ticks p-6 sm:p-8">
            <p className="label-hud">Document 01 · verified</p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Full resume, <span className="text-signal-glow">one page</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Objective, experience timeline, strengths, software proficiency, education and
              contact details — declared correct and true to the best of my knowledge.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={resumeAsset.src}
                target="_blank"
                rel="noreferrer"
                className="border border-signal bg-signal px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-signal-foreground transition-opacity hover:opacity-85"
              >
                Open full size
              </a>
              <a
                href={resumeAsset.src}
                download="Michael-D-Barnabas-Resume.png"
                className="border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] transition-colors hover:border-signal hover:text-signal"
              >
                Download
              </a>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Signature on file · Michael D Barnabas
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.a
            href={resumeAsset.src}
            target="_blank"
            rel="noreferrer"
            whileHover={{ rotateY: -6, rotateX: 4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 16 }}
            className="panel-hud corner-ticks block overflow-hidden [transform-style:preserve-3d]"
          >
            <img
              src={resumeAsset.src}
              alt="Resume of Michael D Barnabas, Brand Manager and Digital Marketer"
              loading="lazy"
              className="w-full"
            />
          </motion.a>
        </Reveal>
      </div>
    </Section>
  );
}

export default Dossier;