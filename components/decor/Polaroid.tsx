"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Polaroid({
  rotate = -6,
  caption,
  children,
  className = "",
  delay = 0,
}: {
  rotate?: number;
  caption?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      className={`w-fit rounded-sm bg-paper-card p-3 pb-5 shadow-[0_18px_35px_-15px_rgba(0,0,0,0.5)] border border-ink/5 ${className}`}
    >
      <div className="overflow-hidden bg-paper-dim">{children}</div>
      {caption && (
        <p className="mt-3 text-center font-body font-semibold text-xs uppercase tracking-[0.25em] text-red">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
