"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference to skip animation if user prefers
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal transform-gpu ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className="mb-14 flex items-center gap-6">
      <span className="font-mono text-xs tracking-[0.3em] text-primary">{index}</span>
      <h2 className="font-display text-3xl font-semibold tracking-[0.18em] uppercase md:text-4xl">
        {title}
      </h2>
      <span className="section-line hidden flex-1 md:block" />
    </Reveal>
  );
}

export default Reveal;