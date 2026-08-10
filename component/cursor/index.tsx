"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, input, textarea, [data-cursor='hover']"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: active ? 2.2 : 1, opacity: active ? 0.45 : 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="h-8 w-8 rounded-full border border-signal"
        />
      </motion.div>
      <motion.div style={{ x, y }} className="absolute -translate-x-1/2 -translate-y-1/2">
        <div className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_16px_var(--signal)]" />
      </motion.div>
    </div>
  );
}

export default Cursor;