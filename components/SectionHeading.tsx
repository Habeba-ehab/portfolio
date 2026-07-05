"use client";

import { motion } from "framer-motion";
import { Squiggle } from "./decor/Squiggle";

export function SectionHeading({
  title,
  align = "left",
  titleClassName = "text-4xl md:text-6xl text-ink",
  showUnderline = true,
}: {
  title: string;
  align?: "left" | "center";
  titleClassName?: string;
  showUnderline?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <h2 className={`font-display ${titleClassName}`}>{title}</h2>
      {showUnderline && (
        <Squiggle
          className={`h-3 w-28 text-red mt-2 ${align === "center" ? "mx-auto" : ""}`}
        />
      )}
    </motion.div>
  );
}
