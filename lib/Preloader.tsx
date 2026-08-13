"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CREATIVE_ROLES = [
  { label: "Brand Manager", color: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30" },
  { label: "Content Creator", color: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30" },
  { label: "Video Editor", color: "bg-violet-500", text: "text-violet-400", border: "border-violet-500/30" },
  { label: "Colorist", color: "bg-rose-500", text: "text-rose-400", border: "border-rose-500/30" },
  { label: "Marketing ", color: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30" },
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isRenderTriggered, setIsRenderTriggered] = useState(false);

  // Smooth progress calculation & dynamic role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 2;
        // Cycle roles based on progress step
        const roleIdx = Math.min(
          Math.floor((next / 100) * CREATIVE_ROLES.length),
          CREATIVE_ROLES.length - 1
        );
        setActiveRoleIndex(roleIdx);
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Trigger interactive "Render Finish" action
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsRenderTriggered(true);
        setTimeout(() => onComplete(), 700);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const currentRole = CREATIVE_ROLES[activeRoleIndex];

  // SVG Radial Math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 overflow-hidden select-none"
      >
        {/* Dynamic Color-Shifting Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 size-[600px] rounded-full bg-gradient-to-tr from-emerald-600/30 via-cyan-500/20 to-transparent blur-[140px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -right-1/4 size-[600px] rounded-full bg-gradient-to-br from-violet-600/30 via-rose-500/20 to-transparent blur-[140px]"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center z-10">
          
          {/* Animated Waveform Ring surrounding the central ring */}
          <div className="absolute flex items-center justify-center gap-1.5 size-64 opacity-20">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  height: [8, Math.sin(i + progress) * 36 + 12, 8],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.03,
                }}
                className="w-1 rounded-full bg-white"
              />
            ))}
          </div>

          {/* Central Radial Progress & Brand Core */}
          <div className="relative flex items-center justify-center">
            
            {/* SVG Progress Circle */}
            <svg className="size-44 -rotate-90 transform drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-white/10"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-150 ease-out"
              />
            </svg>

            {/* Inner Interactive Studio Hub */}
            <motion.div
              animate={isRenderTriggered ? { scale: [1, 0.9, 1.25, 0] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute flex size-24 flex-col items-center justify-center rounded-full bg-neutral-900/90 border border-white/15 backdrop-blur-xl shadow-2xl"
            >
              <span className="font-mono text-xs font-bold text-white/50 tracking-widest uppercase">
                {progress === 100 ? "READY" : "EXPORT"}
              </span>
              <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                {progress}%
              </span>
            </motion.div>
          </div>

          {/* Figma Style Cursor 1: Brand Manager / Director */}
          <motion.div
            initial={{ x: 140, y: 140, opacity: 0 }}
            animate={
              progress === 100
                ? { x: 22, y: -10, opacity: 1, scale: isRenderTriggered ? 0.85 : 1 }
                : { x: 90, y: 80, opacity: 0.7 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 z-30 pointer-events-none flex items-center"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill="currentColor"
                stroke="#000"
                strokeWidth="1.5"
              />
            </svg>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole.label}
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.9 }}
                className={`ml-2 rounded-md ${currentRole.color} px-2.5 py-0.5 font-mono text-[10px] font-bold text-neutral-950 shadow-lg tracking-wide`}
              >
                {currentRole.label}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Figma Style Cursor 2: Secondary Collaborator (Colorist/VFX) */}
          <motion.div
            initial={{ x: -140, y: -120, opacity: 0 }}
            animate={
              progress === 100
                ? { x: -75, y: 25, opacity: 1, scale: isRenderTriggered ? 0.85 : 1 }
                : { x: -110, y: -80, opacity: 0.4 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="absolute left-1/2 top-1/2 z-20 pointer-events-none flex items-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill="currentColor"
                stroke="#000"
                strokeWidth="1.5"
              />
            </svg>
            <span className="ml-2 rounded-md bg-violet-500 px-2 py-0.5 font-mono text-[9px] font-bold text-white shadow-md">
              Branding 
            </span>
          </motion.div>

          {/* Video Timeline & Studio Technical Overlay Info */}
          <div className="mt-12 flex flex-col items-center gap-1.5 font-mono">
            <div className="flex items-center gap-3 text-xs tracking-wider text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                TIMELINE
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-white/80">00:00:{progress < 10 ? `0${progress}` : progress}</span>
              <span className="text-neutral-600">|</span>
              <span className={`${currentRole.text} transition-colors duration-300`}>
                60 FPS
              </span>
            </div>

            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mt-1">
              {progress < 100 ? "Rendering Sequence..." : "Composition Finalized"}
            </p>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}