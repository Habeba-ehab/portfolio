"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t-2 border-red/30 py-6">
      <div className="section-container flex flex-col items-center justify-between gap-3 text-xs tracking-[0.15em] text-ink-dim sm:flex-row">
        <span>{contactInfo.email}</span>
        <span className="font-script normal-case tracking-normal text-2xl text-red">
          Habeba Ehab
        </span>
        <span>{new Date().getFullYear()}</span>

        <motion.button
          onClick={() =>
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          whileHover={{ scale: 1.1, rotate: -8 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-ink/15 text-ink-dim transition-colors hover:border-red hover:text-red"
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
}
