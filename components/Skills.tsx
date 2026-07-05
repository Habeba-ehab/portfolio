"use client";

import { motion, type Variants } from "framer-motion";
import { Cloud, Code2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { cloudSkills, frontendSkills } from "@/lib/data";

type ClusterCustom = { align: "left" | "right"; delay: number };

const clusterSlide: Variants = {
  hidden: ({ align }: ClusterCustom) => ({
    opacity: 0,
    x: align === "right" ? 60 : -60,
  }),
  show: ({ delay }: ClusterCustom) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SkillWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={wordVariant}
      className="font-semibold text-ink transition-colors hover:text-red cursor-default"
    >
      {children}
    </motion.span>
  );
}

function ProseList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isSecondLast = i === items.length - 2;
        let trailer = ", ";
        if (isLast) trailer = "";
        else if (isSecondLast) trailer = items.length > 2 ? ", and " : " and ";

        return (
          <span key={item}>
            <SkillWord>{item}</SkillWord>
            {trailer}
          </span>
        );
      })}
    </>
  );
}

function SkillCluster({
  icon,
  title,
  badge,
  align,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  align: "left" | "right";
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      custom={{ align, delay }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={clusterSlide}
      className={align === "right" ? "md:text-right md:ml-auto" : ""}
    >
      <div
        className={`mb-6 flex items-center gap-4 ${
          align === "right" ? "md:flex-row-reverse md:justify-end" : ""
        }`}
      >
        <motion.span
          initial={{ rotate: -25, scale: 0.7, opacity: 0 }}
          whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: "backOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-red text-red md:h-16 md:w-16"
        >
          {icon}
        </motion.span>
        <h3 className="font-display leading-none text-ink text-[clamp(2.5rem,6vw,4.5rem)]">
          {title}
        </h3>
        {badge && (
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-red/30 bg-red/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
            {badge}
          </span>
        )}
      </div>

      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={wordContainer}
        className={`max-w-xl text-lg leading-relaxed text-ink-dim ${
          align === "right" ? "md:ml-auto" : ""
        }`}
      >
        <ProseList items={children as unknown as string[]} />
      </motion.p>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="section-container relative z-10">
        <SectionHeading
          title="Skills"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="flex flex-col gap-20 md:gap-28">
          <SkillCluster icon={<Code2 size={22} />} title="Frontend" align="left" delay={0}>
            {frontendSkills as unknown as React.ReactNode}
          </SkillCluster>

          <SkillCluster
            icon={<Cloud size={22} />}
            title="Cloud / DevOps"
            align="right"
            delay={0.15}
          >
            {cloudSkills as unknown as React.ReactNode}
          </SkillCluster>
        </div>
      </div>
    </section>
  );
}