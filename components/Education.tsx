"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
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
        {entry.degree}{" "}
        <span className="inline-flex items-center gap-1.5 align-middle text-base font-normal text-ink-dim">
          <MapPin size={14} /> {entry.location}
        </span>
      </p>

      <p className="mt-5 text-lg text-ink-dim md:text-xl">
        Graduating <span className="font-bold text-red">{entry.period}</span>
        {entry.cgpa && (
          <>
            {" "}
            &middot; CGPA <span className="font-bold text-red">{entry.cgpa}</span>
          </>
        )}
      </p>

      {entry.coursework && entry.coursework.length > 0 && (
        <p className="mt-4 text-lg leading-relaxed text-ink-dim md:text-xl">
          Coursework:{" "}
          {entry.coursework.map((course, i) => (
            <span key={course}>
              <span className="font-semibold text-ink transition-colors hover:text-red cursor-default">
                {course}
              </span>
              {i === entry.coursework!.length - 1 ? "" : ", "}
            </span>
          ))}
        </p>
      )}
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36">
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
