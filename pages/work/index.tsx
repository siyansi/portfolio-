// "use client";

// import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import { Reveal, Section, SectionHeading } from "@/component/hud";
// import work1 from "@/assets/work-1.jpg";
// import work2 from "@/assets/work-2.jpg";
// import work3 from "@/assets/work-3.jpg";

// interface ProjectItem {
//   code: string;
//   title: string;
//   kind: string;
//   copy: string;
//   img: string | { src: string };
// }

// const projects: ProjectItem[] = [
//   {
//     code: "PRJ 01",
//     title: "Nustartz Web Portal",
//     kind: "Web design · Front-end",
//     copy: "Marketing site and client portal — design system, landing pages and conversion-first UX.",
//     img: work1,
//   },
//   {
//     code: "PRJ 02",
//     title: "CreativeLance App UI",
//     kind: "Product UI · Figma",
//     copy: "Mobile app interface for campaign tracking, built from a reusable component library.",
//     img: work2,
//   },
//   {
//     code: "PRJ 03",
//     title: "Brand Identity Systems",
//     kind: "Branding · Packaging",
//     copy: "Logo systems, stationery and packaging rolled out across 40+ partner brands.",
//     img: work3,
//   },
// ];

// export function Work() {
//   return (
//     <Section id="work">
//       <SectionHeading code="CH 06" title="Selected Projects" kicker="brands · websites · portals" />
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {projects.map((p, i) => {
//           const imgSrc = typeof p.img === "string" ? p.img : p.img.src;

//           return (
//             <Reveal key={p.code} delay={i * 0.08}>
//               <motion.article
//                 whileHover={{ y: -8 }}
//                 transition={{ type: "spring", stiffness: 190, damping: 18 }}
//                 className="panel-hud corner-ticks group flex h-full flex-col overflow-hidden transform-gpu will-change-transform"
//               >
//                 <div className="relative aspect-16/10 overflow-hidden border-b border-border">
//                   <img
//                     src={imgSrc}
//                     alt={p.title}
//                     loading="lazy"
//                     width={1280}
//                     height={800}
//                     className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
//                 </div>
//                 <div className="flex flex-1 flex-col p-6">
//                   <div className="flex items-center justify-between">
//                     <span className="label-hud text-signal">{p.code}</span>
//                     <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-signal" />
//                   </div>
//                   <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-signal">
//                     {p.title}
//                   </h3>
//                   <p className="label-hud mt-1">{p.kind}</p>
//                   <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
//                   <span className="mt-auto block h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
//                 </div>
//               </motion.article>
//             </Reveal>
//           );
//         })}
//       </div>
//     </Section>
//   );
// }

// export default Work;
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";
import ux1 from "@/assets/ux-1.jpg";
import ux2 from "@/assets/ux-2.jpg";
import ux3 from "@/assets/ux-3.jpg";
import photoBreak from "@/assets/photo-1.jpg";

import { Reveal, SectionHeading } from "../reveal";

const getImageSrc = (img: string | { src: string }) =>
  typeof img === "string" ? img : img.src;

// ----------------------------------------------------
// MOVING NEON BORDER WRAPPER COMPONENT
// ----------------------------------------------------
function GlowCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 transform-gpu ${className}`}
    >
      {/* Moving Neon Light Border */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_70%,#10b981_90%,#34d399_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Static Base Border */}
      <span className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-transparent" />

      {/* Inner Dark Glass Panel */}
      <div className="relative size-full overflow-hidden rounded-2xl bg-neutral-950/90 backdrop-blur-xl transition-all duration-500 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]">
        {children}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PHOTOGRAPHY DATA & CATEGORIES
// ----------------------------------------------------
const photoCategories = [
  "All",
  // "UI / UX Design",
  "Clients & Studio",
  "Food Photography",
  "Nature & Travel",
  "Products",
];

const photos = [
  { src: ux1, alt: "Pulse Fitness App UI", tag: "Mobile App", category: "UI / UX Design", span: "md:col-span-4 md:row-span-2", resolution: "4K UHD · 2400x3200" },
  { src: ux2, alt: "Nexora Analytics Dashboard", tag: "Dashboard", category: "UI / UX Design", span: "md:col-span-8", resolution: "5K Retina · 5120x2880" },
  { src: ux3, alt: "Noir E-Commerce Store", tag: "Web Store", category: "UI / UX Design", span: "md:col-span-4", resolution: "4K UHD · 3840x2160" },
  { src: photo2, alt: "Editorial Studio Portrait", tag: "Editorial", category: "Clients & Studio", span: "md:col-span-4", resolution: "f/1.8 · ISO 100 · 85mm" },
  { src: photo1, alt: "Fashion Campaign Shoot", tag: "Fashion", category: "Clients & Studio", span: "md:col-span-4", resolution: "f/2.8 · ISO 200 · 50mm" },
  { src: video2, alt: "Artisanal Culinary Dish", tag: "Culinary", category: "Food Photography", span: "md:col-span-6", resolution: "f/2.0 · ISO 400 · 35mm" },
  { src: photo3, alt: "Landscape Haze", tag: "Nature", category: "Nature & Travel", span: "md:col-span-6", resolution: "f/8.0 · ISO 100 · 24mm" },
  { src: photo4, alt: "Camera Lens Still Life", tag: "Commercial", category: "Products", span: "md:col-span-8", resolution: "f/4.0 · ISO 100 · 105mm" },
];

// ----------------------------------------------------
// VIDEO DATA & CATEGORIES
// ----------------------------------------------------
const videoCategories = [
  "All",
  "Reels",
  "Short Films",
  "Ads & Highlights",
  "Songs",
  "Weddings",
  "Real Estate",
];

const videoList = [
  {
    title: "Urban Beats Reel",
    meta: "Instagram Reel",
    duration: "00:15",
    role: "Edit · FX · DI",
    category: "Reels",
    poster: video1,
    videoUrl: "/videos/reels-1.mp4",
  },
  {
    title: "Ride the Dusk",
    meta: "Short Film",
    duration: "01:30",
    role: "Direction · DI · Grade",
    category: "Short Films",
    poster: video1,
    videoUrl: "/videos/short-film-1.mp4",
  },
  {
    title: "Kitchen Stories Ad",
    meta: "Commercial Spot",
    duration: "00:45",
    role: "Edit · Sound Design",
    category: "Ads & Highlights",
    poster: video2,
    videoUrl: "/videos/ad-1.mp4",
  },
  {
    title: "Green Room Music Video",
    meta: "Music Video",
    duration: "03:00",
    role: "Direction · Motion",
    category: "Songs",
    poster: video3,
    videoUrl: "/videos/song-1.mp4",
  },
  {
    title: "Royal Palace Wedding",
    meta: "Highlights Film",
    duration: "04:12",
    role: "Direction · Editing",
    category: "Weddings",
    poster: video2,
    videoUrl: "/videos/wedding-1.mp4",
  },
  {
    title: "Panoramic Coastal Villa",
    meta: "Architecture Showcase",
    duration: "01:00",
    role: "Drone · Edit · Grade",
    category: "Real Estate",
    poster: video1,
    videoUrl: "/videos/real-estate-1.mp4",
  },
];

const projects = [
  {
    src: ux1,
    title: "Pulse Fitness App",
    meta: "Mobile · Design System",
    desc: "End-to-end product design for a habit-first training app.",
  },
  {
    src: ux2,
    title: "Nexora Analytics",
    meta: "Dashboard · Data Viz",
    desc: "Dense reporting UI made calm with hierarchy and motion.",
  },
  {
    src: ux3,
    title: "Noir Commerce",
    meta: "Web · Storefront",
    desc: "Conversion-focused product page with a premium dark look.",
  },
];

// ----------------------------------------------------
// FULL IMAGE BREAK COMPONENT
// ----------------------------------------------------
export function FullImageBreak({
  imageSrc = photoBreak,
  tagline = "Every Frame Tells A Story.",
  subtext = "Bridging brand vision with high-end visual production.",
}: {
  imageSrc?: any;
  tagline?: string;
  subtext?: string;
}) {
  return (
    <section className="relative w-full h-[120vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt="Showcase Visual"
          fill
          className="object-cover object-center filter brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      <div className="relative z-20 -mt-[25vh] bg-background/90 backdrop-blur-2xl rounded-t-[2.5rem] p-10 md:p-20 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase">
            [CQP — 05]
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-foreground">
            {tagline}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
            {subtext}
          </p>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// PHOTOGRAPHY SECTION
// ----------------------------------------------------
export function Photography() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  const filteredPhotos =
    activeTab === "All"
      ? photos
      : photos.filter((p) => p.category === activeTab);

  return (
    <section id="photography" className="relative mx-auto max-w-6xl px-6 py-28">
      {/* Neon Green Ambient Backdrop */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-96 rounded-full bg-emerald-500/20 blur-[130px] z-0" />

      <div className="relative z-10">
        <SectionHeading index="01" title="Photography & Collections" />

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {photoCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeTab === cat
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid with Moving Neon Cards */}
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-12 auto-rows-[280px]">
          <AnimatePresence>
            {filteredPhotos.map((p, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={p.alt + i}
                className={`h-full w-full ${p.span}`}
              >
                <GlowCard className="h-full cursor-pointer" onClick={() => setSelectedPhoto(p)}>
                  <div className="relative size-full">
                    <img
                      src={getImageSrc(p.src)}
                      alt={p.alt}
                      loading="lazy"
                      className="size-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Hover Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span className="rounded-full border border-emerald-500/40 bg-black/70 px-3 py-1 font-mono text-[10px] tracking-widest text-emerald-400 uppercase backdrop-blur-md">
                        {p.tag}
                      </span>
                      <span className="font-mono text-[10px] text-white/80 uppercase">
                        🔍 Inspect Frame
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-emerald-500/30 bg-neutral-950 p-2 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
            >
              <img
                src={getImageSrc(selectedPhoto.src)}
                alt={selectedPhoto.alt}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
              <div className="flex items-center justify-between p-3 font-mono text-xs">
                <span className="text-emerald-400">{selectedPhoto.alt}</span>
                <span className="text-white/60">{selectedPhoto.resolution}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ----------------------------------------------------
// VIDEOS SECTION (WITH MOVING BORDERS & TIME/DURATION UI)
// ----------------------------------------------------
export function Videos() {
  const [activeVideoTab, setActiveVideoTab] = useState("All");

  const filteredVideos =
    activeVideoTab === "All"
      ? videoList
      : videoList.filter((v) => v.category === activeVideoTab);

  return (
    <section id="videos" className="relative mx-auto max-w-6xl px-6 py-28">
      {/* Neon Green Backdrop Aura */}
      <div className="pointer-events-none absolute top-1/3 right-10 size-96 rounded-full bg-emerald-600/15 blur-[150px] z-0" />

      <div className="relative z-10">
        <SectionHeading index="02" title="Video Showcase & Editing" />

        {/* Video Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {videoCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveVideoTab(cat)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeVideoTab === cat
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredVideos.map((v, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={v.title + i}
              >
                <GlowCard>
                  {/* HTML5 Video Box */}
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <video
                      src={v.videoUrl}
                      poster={getImageSrc(v.poster)}
                      controls
                      playsInline
                      preload="metadata"
                      className="size-full object-cover"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 rounded-md bg-black/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-emerald-400 uppercase backdrop-blur-md border border-emerald-500/30 pointer-events-none">
                      {v.category}
                    </div>

                    {/* Time / Duration Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 font-mono text-[10px] tracking-wider text-white/90 backdrop-blur-md border border-white/10 pointer-events-none">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {v.duration}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {v.title}
                    </h4>
                    
                    <div className="mt-1 flex items-center justify-between font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                      <span>{v.meta}</span>
                      <span className="text-emerald-400/80">4K · 60FPS</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="font-mono text-xs text-emerald-400">{v.role}</span>

                      {/* Direct Download Link */}
                      <a
                        href={v.videoUrl}
                        download
                        className="font-mono text-[10px] tracking-wider text-white/70 hover:text-emerald-400 uppercase transition-colors"
                      >
                        Download ⤓
                      </a>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// UI / UX SECTION (WITH MOVING NEON BORDERS)
// ----------------------------------------------------
export function UiUx() {
  return (
    <section id="uiux" className="relative mx-auto max-w-6xl px-6 py-28">
      {/* Neon Glow Aura */}
      <div className="pointer-events-none absolute bottom-10 left-10 size-96 rounded-full bg-emerald-500/10 blur-[140px] z-0" />

      <div className="relative z-10">
        <SectionHeading index="03" title="UI / UX & Design Systems" />

        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 50}>
              <GlowCard>
                <article className="grid items-center gap-6 p-5 md:grid-cols-[1.2fr_1fr]">
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={getImageSrc(p.src)}
                      alt={`${p.title} interface design`}
                      loading="lazy"
                      className="h-64 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] transform-gpu"
                    />
                  </div>
                  <div className="md:px-4">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-emerald-400 uppercase">
                      <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                      {p.meta}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <span className="mt-5 inline-block font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase transition-all duration-300 group-hover:translate-x-1 cursor-pointer">
                      View Case Study →
                    </span>
                  </div>
                </article>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// DEFAULT EXPORT FOR NEXT.JS ROUTE
// ----------------------------------------------------
export default function WorkPage() {
  return (
    <main className="space-y-12">
      <Photography />
      <Videos />
      <UiUx />
    </main>
  );
}