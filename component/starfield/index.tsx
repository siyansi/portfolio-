// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";

// export function Starfield() {
//   const { scrollYProgress } = useScroll();
//   const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
//   const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
//   const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.25, 0.5]);

//   const stars = (size: number, count: number, seed: number) =>
//     Array.from({ length: count }, (_, i) => {
//       const x = ((i * 73 + seed * 17) % 100).toFixed(2);
//       const y = ((i * 137 + seed * 41) % 100).toFixed(2);
//       return `radial-gradient(${size}px ${size}px at ${x}% ${y}%, oklch(1 0 0 / 0.7), transparent 60%)`;
//     }).join(",");

//   return (
//     <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
//       <motion.div
//         style={{ y: y1, backgroundImage: stars(1.4, 60, 1) }}
//         className="absolute inset-[-20%] opacity-70"
//       />
//       <motion.div
//         style={{ y: y2, backgroundImage: stars(2.4, 28, 5) }}
//         className="absolute inset-[-20%] opacity-50"
//       />
//       <motion.div
//         style={{ opacity: glow }}
//         className="absolute left-1/2 top-[-30vh] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-signal/25 blur-[120px]"
//       />
//       <div className="grid-floor absolute inset-x-0 bottom-0 h-[45vh] opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" />
//       <div className="scan-line absolute inset-0" />
//     </div>
//   );
// }