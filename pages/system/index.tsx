// "use client";

// import { motion } from "framer-motion";
// import { Panel, Reveal, Section, SectionHeading } from "@/component/hud";
// import { profile } from "@/lib/data";

// export function Systems() {
//   return (
//     <Section id="systems">
//       <SectionHeading code="CH 04" title="Systems Online" kicker="strengths & software" />
//       <div className="grid gap-6 lg:grid-cols-2">
//         <Reveal>
//           <Panel bar="Strength & skills" className="h-full">
//             <ul className="flex flex-wrap gap-2">
//               {profile.strengths.map((s, i) => (
//                 <motion.li
//                   key={s}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: i * 0.035 }}
//                   whileHover={{ y: -3 }}
//                   className="border border-border bg-secondary/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-signal hover:text-signal"
//                 >
//                   {s}
//                 </motion.li>
//               ))}
//             </ul>
//           </Panel>
//         </Reveal>
//         <Reveal delay={0.1}>
//           <Panel bar="Software skill" className="h-full">
//             <div className="space-y-4">
//               {profile.software.map(([name, level], i) => (
//                 <div key={name}>
//                   <div className="flex items-baseline justify-between">
//                     <span className="font-mono text-xs uppercase tracking-[0.16em]">{name}</span>
//                     <span className="label-hud text-signal">{level}%</span>
//                   </div>
//                   <div className="mt-2 h-1.5 bg-secondary">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       whileInView={{ width: `${level}%` }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
//                       className="h-full bg-[image:var(--gradient-signal)]"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Panel>
//         </Reveal>
//       </div>
//     </Section>
//   );
// }
// export default Systems;
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Reveal, SectionHeading } from "../reveal";

// --- constants ---
const strengths = [
  "Brand Building", "Cinematography", "Photography", "Editing & DI",
  "UI/UX Design", "Direction", "Content Writing", "Screenplay",
  "Sound FX", "Live Recording", "Visualizer", "AI Tools",
];

const software = [
  { name: "Final Cut Pro X", level: 92 },
  { name: "Adobe After Effects", level: 88 },
  { name: "Adobe Photoshop", level: 90 },
  { name: "Adobe Premiere Pro", level: 94 },
  { name: "DaVinci Resolve", level: 85 },
  { name: "Figma", level: 82 },
];

const reviews = [
  { quote: "He turned a vague brief into a campaign that doubled our reach in one quarter. Calm, fast, obsessive about the frame.", name: "Ananya R.", role: "Marketing Head, Nustartz", emoji: "🚀" },
  { quote: "The edit came back better than the storyboard. Pacing, sound and grade were all on point the first time.", name: "Karthik S.", role: "Founder, Fanvideo", emoji: "🎞️" },
  { quote: "Rare mix of designer and filmmaker — our app screens and launch film finally felt like one brand.", name: "Meera J.", role: "Product Lead, Pulse", emoji: "💚" },
  { quote: "He turned a vague brief into a campaign that doubled our reach in one quarter. Calm, fast, obsessive about the frame.", name: "Ananya R.", role: "Marketing Head, Nustartz", emoji: "🚀" },
  { quote: "The edit came back better than the storyboard. Pacing, sound and grade were all on point the first time.", name: "Karthik S.", role: "Founder, Fanvideo", emoji: "🎞️" },
  { quote: "Rare mix of designer and filmmaker — our app screens and launch film finally felt like one brand.", name: "Meera J.", role: "Product Lead, Pulse", emoji: "💚" },
];

// --- Interactive Card Component (3D Tilt & Glow) ---
function InteractiveCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setXRotation(((y - centerY) / centerY) * -10); 
    setYRotation(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setXRotation(0);
    setYRotation(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: xRotation, rotateY: yRotation }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/5 group-hover:opacity-100 group-hover:shadow-[0_0_40px_8px_rgba(var(--primary-rgb),0.2)]" />
      <div className="relative rounded-2xl border border-border/60 bg-background/50 p-7 backdrop-blur-xl transition-colors duration-300 group-hover:border-primary/50">
        {children}
      </div>
    </motion.div>
  );
}

// --- Animated Progress Bar Component ---
function AnimatedProgressBar({ level }: { level: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      animate(0, level, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => setWidth(latest),
      });
    }
  }, [isInView, level]);

  return (
    <div ref={ref} className="mt-3 h-1.5 w-full rounded-full bg-border/40 overflow-hidden relative">
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-primary shadow-[0_0_15px_3px_var(--glow)] transform-gpu"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 mb- py-28 overflow-hidden">
      <div className="absolute inset-0 size-full bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)] opacity-30" />

      <SectionHeading index="04" title="Skills & Software" />
      
      <div className="relative z-10 grid gap-16 md:grid-cols-2 mt-16 items-start">
        <div className="rounded-3xl border border-border/50 bg-background/30 p-8 backdrop-blur-sm shadow-inner-glow">
          <p className="mb-8 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"/>
            Core Strengths
          </p>
          <div className="flex flex-wrap gap-3">
            {strengths.map((s, i) => (
              <Reveal as="span" key={s} delay={i * 30}>
                <span className="inline-block cursor-default rounded-full border border-border/80 bg-background/50 px-5 py-2.5 text-sm text-foreground/90 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-neon-glow hover:-translate-y-0.5 transform-gpu">
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-background/30 p-8 backdrop-blur-sm shadow-inner-glow">
          <p className="mb-8 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"/>
            Expertise Matrix
          </p>
          <ul className="space-y-6">
            {software.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 50}>
                <div className="group font-mono text-sm">
                  <div className="flex items-center justify-between transition-colors group-hover:text-primary">
                    <span>{s.name}</span>
                    <motion.span 
                      className="text-muted-foreground group-hover:text-primary"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      {s.level}%
                    </motion.span>
                  </div>
                  <AnimatedProgressBar level={s.level} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="mx-auto max-w-6xl px-6 mb-16">
        <SectionHeading index="05" title="Client Trust" />
      </div>

      <div className="flex overflow-hidden perspective-1000 [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]">
        <div className="flex gap-6 animate-marquee-slow hover:pause py-1 px-4">
          {reviews.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={0} className="flex-none">
              <InteractiveCard className="group w-[350px] h-[300px] flex flex-col justify-between">
                <div>
                  <span className="inline-block text-3xl mb-6">{r.emoji}</span>
                  <blockquote className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    “{r.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-border/60 pt-4">
                  <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">{r.name}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary/80">
                    {r.role}
                  </p>
                </figcaption>
              </InteractiveCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-12 mt-2 rounded-[3rem] bg-neutral-950/60 border border-border/50 mb-10 overflow-hidden backdrop-blur-2xl">
      <div className="absolute inset-0 size-full bg-[radial-gradient(#262626_1px,transparent_1px)] [size:2rem_2rem] opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 size-[450px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute -top-20 -left-20 size-[350px] rounded-full bg-primary/5 blur-[120px]" />

      <SectionHeading index="06" title="Initiate" />
      
      <div className="relative z-10 grid gap-12 lg:grid-cols-12 mt-16 items-start">
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <Reveal>
            <h3 className="font-display text-4xl leading-tight md:text-5xl">
              Let's build a brand <br />
              <span className="text-primary text-neon-glow">worth remembering.</span>
            </h3>
            <p className="mt-6 text-muted-foreground text-base leading-relaxed">
              Currently accepting select opportunities for branding, film direction, motion graphics, and digital product experience design.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {[
              { label: "Direct Email", value: "mikejesusaddicts@gmail.com", href: "mailto:mikejesusaddicts@gmail.com", icon: "✉️" },
              { label: "Phone / WhatsApp", value: "+91 96777 73875", href: "tel:+919677773875", icon: "📞" },
            ].map((link, i) => (
              <Reveal key={link.label} delay={i * 40}>
                <a
                  href={link.href}
                  className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.12)] transform-gpu"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase group-hover:text-primary">
                      {link.label}
                    </p>
                    <p className="mt-1 text-sm font-mono text-foreground truncate group-hover:text-neon-glow">
                      {link.value}
                    </p>
                  </div>
                  <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {link.icon}
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={80}>
              <div className="rounded-2xl border border-border/60 bg-background/30 p-5 backdrop-blur-md">
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Studio Location
                </p>
                <p className="mt-2 text-sm text-foreground/90 font-sans leading-relaxed">
                  Anna Nagar, Coimbatore, Tamil Nadu — 641044
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="relative rounded-3xl border border-border/70 bg-neutral-900/40 p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-border/70 bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 outline-none focus:border-primary focus:bg-background/80 focus:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border/70 bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 outline-none focus:border-primary focus:bg-background/80 focus:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Subject / Project Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full rounded-xl border border-border/70 bg-background/50 px-4 py-3.5 text-sm text-foreground transition-all duration-300 outline-none focus:border-primary focus:bg-background/80 focus:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-neutral-900 text-muted-foreground">Select a category...</option>
                    <option value="Brand Identity" className="bg-neutral-900">Brand Identity & Strategy</option>
                    <option value="Cinematography / Film" className="bg-neutral-900">Cinematography & Video Editing</option>
                    <option value="UI/UX Design" className="bg-neutral-900">UI/UX Design & Development</option>
                    <option value="Motion Graphics" className="bg-neutral-900">Motion Graphics & VFX</option>
                    <option value="Other" className="bg-neutral-900">General Inquiry / Coffee</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your goals, timelines, or brief..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-border/70 bg-background/50 p-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 outline-none resize-none focus:border-primary focus:bg-background/80 focus:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden rounded-xl bg-primary px-8 py-4 font-mono text-xs tracking-[0.25em] text-primary-foreground uppercase font-semibold shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.6)] disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <span className="size-2 rounded-full bg-primary-foreground animate-ping" />
                        Transmitting...
                      </>
                    ) : status === "success" ? (
                      "✓ Message Received"
                    ) : (
                      "Send Message →"
                    )}
                  </span>
                  
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out hover:translate-x-full" />
                </motion.button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="relative z-10 mt-28 flex flex-col items-center gap-4 border-t border-border/50 pt-10 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span>© {new Date().getFullYear()} D Barnabas</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-foreground">Brand</span>
          <span>·</span>
          <span className="text-foreground">Film</span>
          <span>·</span>
          <span className="text-foreground">Design</span>
        </div>
      </footer>
    </section>
  );
}

// --- Default Export for Next.js Route ---
export default function SystemPage() {
  return (
    <main className="space-y-12">
      <Skills />
      <Reviews />
      <Contact />
    </main>
  );
}