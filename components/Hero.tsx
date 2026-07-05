"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-paper"
    >
      <motion.div
        style={{ scale: contentScale, y: contentY, opacity: contentOpacity }}
        className="section-container relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex aspect-[2.6/1] w-[88vw] max-w-3xl items-center justify-center"
        >
          {/* orbit rings */}
          <motion.span
            animate={{ rotate: [-8, -2, -8] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-[-14%] rounded-[50%] border border-ink/25"
          />
          <motion.span
            animate={{ rotate: [10, 4, 10] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-[-6%] rounded-[50%] border border-ink/15"
          />

          {/* red badge */}
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[50%] bg-red px-6 shadow-[0_25px_60px_-20px_rgba(151,22,22,0.55)]">
            <h1 className="font-display leading-[0.85] text-paper text-[clamp(3rem,13vw,8rem)]">
              portfolio
            </h1>
            <span className="mt-3 font-script text-ink text-[clamp(1.25rem,3.4vw,2rem)]">
              Habeba Ehab
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-red"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={22} />
        </motion.span>
      </motion.button>
    </section>
  );
}
