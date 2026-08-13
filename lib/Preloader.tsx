"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Animate progress to 100% over ~2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Trigger click after progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const clickTimer = setTimeout(() => {
        setClicked(true);
        setTimeout(() => onComplete(), 600);
      }, 400);

      return () => clearTimeout(clickTimer);
    }
  }, [progress, onComplete]);

  // SVG Circular progress values
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ y: "-100vh" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Circular Ring and Progress Center */}
          <div className="relative flex items-center justify-center">
            <svg className="size-32 -rotate-90 transform">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-white/10"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-primary transition-all duration-75 ease-out"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Brand Badge */}
            <motion.div
              animate={clicked ? { scale: [1, 0.85, 1.1, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="absolute flex size-20 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="font-mono text-sm font-bold tracking-wider text-white">
                MB
              </span>
            </motion.div>
          </div>

          {/* Figma Style Cursor */}
          <motion.div
            initial={{ x: 120, y: 120, opacity: 0 }}
            animate={
              progress === 100
                ? { x: 12, y: 12, opacity: 1, scale: clicked ? 0.85 : 1 }
                : { x: 80, y: 80, opacity: 0.6 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
          >
            {/* SVG Cursor Pointer */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill="currentColor"
                stroke="white"
                strokeWidth="1"
              />
            </svg>

            {/* Figma-Style Label Tag */}
            <div className="ml-3 rounded bg-primary px-2 py-0.5 font-mono text-[9px] font-bold text-primary-foreground shadow-md">
              Editor
            </div>
          </motion.div>

          <p className="mt-8 font-mono text-xs tracking-[0.3em] text-white/50 uppercase">
            {progress}% Loading
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}