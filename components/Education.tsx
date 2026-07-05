"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { education } from "@/lib/data";
import { Polaroid } from "./decor/Polaroid";
import { ProfilePhoto } from "./decor/ProfilePhoto";

function EducationEntry({
  entry,
  index,
}: {
  entry: (typeof education)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <h3 className="font-display text-4xl text-ink md:text-5xl">
        {entry.institution}
      </h3>

      <p className="mt-3 text-lg font-semibold text-red md:text-xl">
        {entry.degree}
      </p>

      <p className="mt-5 text-lg text-ink-dim md:text-xl">
        Graduating <span className="font-bold text-red">{entry.period}</span>
      </p>

      {entry.cgpa && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
          className="relative mt-6 inline-block"
        >
          <img
            src="/washi_tape_beige_opaque.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full select-none"
          />
          <p className="px-7 py-3 font-display text-2xl text-red md:text-3xl">
            {entry.grade && `${entry.grade} · `}CGPA {entry.cgpa}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-16 md:py-24">
      <div className="section-container">
        <SectionHeading
          title="Education"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="flex flex-wrap items-start gap-10 md:gap-16">
          <Polaroid rotate={-4} caption="2026" className="w-56 shrink-0 md:w-72">
            <ProfilePhoto
              src="/Habeba_Grad.jpeg"
              alt="Habeba Ehab graduation"
              initials="HE"
            />
          </Polaroid>

          <div className="min-w-[18rem] flex-1 space-y-12">
            {education.map((entry, index) => (
              <EducationEntry key={entry.institution} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
