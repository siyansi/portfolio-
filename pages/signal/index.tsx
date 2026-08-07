"use client";

import { motion } from "framer-motion";
import { Reveal, Section, SectionHeading } from "@/component/hud";
import { profile } from "@/lib/data";

export function Signal() {
  const { contact } = profile;
  const items = [
    { label: "Phone", value: contact.phones.join(" / "), href: `tel:${contact.phones[0]}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Address", value: contact.address, href: undefined },
  ];

  return (
    <Section id="signal" className="pb-32">
      <SectionHeading code="CH 07" title="Open a Signal" kicker="contact channel" />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="space-y-px bg-border">
            {items.map((it) => (
              <motion.div
                key={it.label}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="bg-card/70 px-5 py-5"
              >
                <p className="label-hud text-signal">{it.label}</p>
                {it.href ? (
                  <a
                    href={it.href}
                    className="mt-2 block font-mono text-sm break-words transition-colors hover:text-signal"
                  >
                    {it.value}
                  </a>
                ) : (
                  <p className="mt-2 font-mono text-sm text-muted-foreground">{it.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="panel-hud corner-ticks flex h-full flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="label-hud">Declaration</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                I hereby declare that the above information is correct and true to the best of my
                knowledge and belief.
              </p>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="mt-8 inline-flex items-center justify-between gap-4 bg-[image:var(--gradient-signal)] px-6 py-4 font-display text-lg font-bold text-signal-foreground transition-opacity hover:opacity-90"
            >
              Start a project
              <span className="font-mono text-xs">→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <p className="label-hud">© {new Date().getFullYear()} Michael D Barnabas</p>
        <p className="label-hud">CreativeLance Marketing · Coimbatore, India</p>
      </footer>
    </Section>
  );
}

export default Signal;
