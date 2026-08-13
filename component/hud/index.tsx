// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef, type ReactNode } from "react";

// export function Reveal({
//   children,
//   delay = 0,
//   y = 28,
//   className,
// }: {
//   children: ReactNode;
//   delay?: number;
//   y?: number;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-12% 0px" });
//   return (
//     <motion.div
//       ref={ref}
//       className={className}
//       initial={{ opacity: 0, y, filter: "blur(6px)" }}
//       animate={
//         inView
//           ? { opacity: 1, y: 0, filter: "blur(0px)" }
//           : { opacity: 0, y, filter: "blur(6px)" }
//       }
//       transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export function SectionHeading({
//   code,
//   title,
//   kicker,
// }: {
//   code: string;
//   title: string;
//   kicker?: string;
// }) {
//   return (
//     <Reveal className="mb-10">
//       <div className="flex items-center gap-3">
//         <span className="label-hud text-signal-glow">{code}</span>
//         <span className="h-px flex-1 bg-border" />
//         {kicker && <span className="label-hud">{kicker}</span>}
//       </div>
//       <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2>
//     </Reveal>
//   );
// }

// export function Panel({
//   children,
//   className = "",
//   bar,
// }: {
//   children: ReactNode;
//   className?: string;
//   bar?: string;
// }) {
//   return (
//     <div className={`panel-hud corner-ticks ${className}`}>
//       {bar && (
//         <div className="relative overflow-hidden bg-signal px-3 py-1.5">
//           <span className="label-hud text-signal-foreground">{bar}</span>
//           <span className="absolute inset-y-0 w-16 animate-sweep bg-signal-foreground/25" />
//         </div>
//       )}
//       <div className="p-5 sm:p-7">{children}</div>
//     </div>
//   );
// }

// export function Section({
//   id,
//   children,
//   className = "",
// }: {
//   id: string;
//   children: ReactNode;
//   className?: string;
// }) {
//   return (
//     <section
//       id={id}
//       className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 ${className}`}
//     >
//       {children}
//     </section>
//   );
// }



"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={`${className ?? ""} transform-gpu will-change-transform`}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  code,
  title,
  kicker,
}: {
  code: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-center gap-3">
        <span className="label-hud text-signal-glow">{code}</span>
        <span className="h-px flex-1 bg-border" />
        {kicker && <span className="label-hud">{kicker}</span>}
      </div>
      <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2>
    </Reveal>
  );
}

export function Panel({
  children,
  className = "",
  bar,
}: {
  children: ReactNode;
  className?: string;
  bar?: string;
}) {
  return (
    <div className={`panel-hud corner-ticks ${className}`}>
      {bar && (
        <div className="relative overflow-hidden bg-signal px-3 py-1.5">
          <span className="label-hud text-signal-foreground">{bar}</span>
          <span className="absolute inset-y-0 w-16 animate-sweep bg-signal-foreground/25" />
        </div>
      )}
      <div className="p-5 sm:p-7">{children}</div>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

export default Reveal;