"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { experience } from "@/lib/data";

function highlight(text: string) {
  const pattern = /(30%|3D model)/g;
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    pattern.test(part) ? (
      <span key={i} className="text-red font-bold">
        {part}
      </span> 
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function ExperienceCard({
  entry,
  index,
}: {
  entry: (typeof experience)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const rotate = isLeft ? -1 : 1;

  return (
    <div className="relative pl-14 md:pl-0">
      <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-red bg-paper text-red md:left-1/2 md:top-6 md:h-11 md:w-11 md:-translate-x-1/2">
        <Briefcase size={16} />
      </span>

      <div className="grid md:grid-cols-2 md:gap-x-16">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={isLeft ? "md:col-start-1" : "md:col-start-2"}
        >
          <motion.div
            whileHover={{ y: -4, rotate }}
            className="rounded-sm border border-ink/10 bg-paper-card p-6 md:p-8 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.5)] transition-transform"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-2xl md:text-3xl text-ink">
                {entry.role}
              </h3>
              <span className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink-dim">
                {entry.period}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-3 text-sm text-red font-semibold">
              {entry.company}
              <span className="flex items-center gap-1 text-ink-dim font-normal">
                <MapPin size={12} /> {entry.location}
              </span>
            </div>

            <ul className="mt-4 space-y-2.5">
              {entry.points.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-ink-dim leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                  <span>{highlight(point)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          title="Experience"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div ref={containerRef} className="relative space-y-16 md:space-y-24">
          <div className="absolute left-[17px] top-1 bottom-1 w-px bg-ink/10 md:left-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[17px] top-1 w-px bg-red md:left-1/2"
          />

          {experience.map((entry, index) => (
            <ExperienceCard key={entry.company} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
