"use client";

import { motion } from "framer-motion";

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 16"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M2 10c15-9 30-9 45 0s30 9 45 0 30-9 45 0 30 9 45 0 30-9 44 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
      />
    </motion.svg>
  );
}
