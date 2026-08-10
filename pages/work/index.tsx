"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section, SectionHeading } from "@/component/hud";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";

interface ProjectItem {
  code: string;
  title: string;
  kind: string;
  copy: string;
  img: string | { src: string };
}

const projects: ProjectItem[] = [
  {
    code: "PRJ 01",
    title: "Nustartz Web Portal",
    kind: "Web design · Front-end",
    copy: "Marketing site and client portal — design system, landing pages and conversion-first UX.",
    img: work1,
  },
  {
    code: "PRJ 02",
    title: "CreativeLance App UI",
    kind: "Product UI · Figma",
    copy: "Mobile app interface for campaign tracking, built from a reusable component library.",
    img: work2,
  },
  {
    code: "PRJ 03",
    title: "Brand Identity Systems",
    kind: "Branding · Packaging",
    copy: "Logo systems, stationery and packaging rolled out across 40+ partner brands.",
    img: work3,
  },
];

export function Work() {
  return (
    <Section id="work">
      <SectionHeading code="CH 06" title="Selected Projects" kicker="brands · websites · portals" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const imgSrc = typeof p.img === "string" ? p.img : p.img.src;

          return (
            <Reveal key={p.code} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 190, damping: 18 }}
                className="panel-hud corner-ticks group flex h-full flex-col overflow-hidden transform-gpu will-change-transform"
              >
                <div className="relative aspect-16/10 overflow-hidden border-b border-border">
                  <img
                    src={imgSrc}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="label-hud text-signal">{p.code}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-signal" />
                  </div>
                  <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-signal">
                    {p.title}
                  </h3>
                  <p className="label-hud mt-1">{p.kind}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                  <span className="mt-auto block h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export default Work;