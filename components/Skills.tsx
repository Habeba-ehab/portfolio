"use client";

import { motion, type Variants } from "framer-motion";
import { Cloud, Code2 } from "lucide-react";
import Image from "next/image";
import { FaAws } from "react-icons/fa6";
import {
  SiAnsible,
  SiCss,
  SiDocker,
  SiGithubactions,
  SiGrafana,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiNextdotjs,
  SiPrometheus,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTerraform,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { SectionHeading } from "./SectionHeading";
import { cloudSkills, frontendSkills } from "@/lib/data";

type ClusterCustom = { align: "left" | "right"; delay: number };

const skillIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Redux (Redux Toolkit)": SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Three.js": SiThreedotjs,
  AWS: FaAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  "GitHub Actions": SiGithubactions,
  Ansible: SiAnsible,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
};

// Jenkins uses its full-color mascot logo (public/icons/jenkins.svg) instead
// of the monochrome icon set, since the official mark is multi-color.
const skillImages: Record<string, string> = {
  Jenkins: "/icons/jenkins.svg",
};

// Official brand colors. Next.js and Three.js ship black logos, bumped to ink
// so they stay visible on the dark background.
const skillColors: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#663399",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  "React.js": "#61DAFB",
  "Next.js": "#dbc7b3",
  "Redux (Redux Toolkit)": "#764ABC",
  "Tailwind CSS": "#38BDF8",
  "Three.js": "#dbc7b3",
  AWS: "#FF9900",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  Terraform: "#844FBA",
  "GitHub Actions": "#2088FF",
  Ansible: "#EE0000",
  Prometheus: "#E6522C",
  Grafana: "#F46800",
};

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

const pillContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const pillVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SkillPill({ name }: { name: string }) {
  const Icon = skillIcons[name];
  const image = skillImages[name];
  return (
    <motion.span
      variants={pillVariant}
      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-red/40 hover:bg-red/10"
    >
      {image ? (
        <Image src={image} alt="" width={18} height={18} className="h-4.5 w-4.5 shrink-0" />
      ) : (
        Icon && <Icon className="h-4 w-4 shrink-0" style={{ color: skillColors[name] }} />
      )}
      {name}
    </motion.span>
  );
}

function PillList({ items }: { items: readonly string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={pillContainer}
      className="flex flex-wrap gap-3"
    >
      {items.map((item) => (
        <SkillPill key={item} name={item} />
      ))}
    </motion.div>
  );
}

function SkillCluster({
  icon,
  title,
  badge,
  align,
  delay,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  align: "left" | "right";
  delay: number;
  items: readonly string[];
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

      <PillList items={items} />
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-16 md:py-24">
      <div className="section-container relative z-10">
        <SectionHeading
          title="Skills"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="flex flex-col gap-20 md:gap-28">
          <SkillCluster icon={<Code2 size={22} />} title="Frontend" align="left" delay={0} items={frontendSkills} />

          <SkillCluster
            icon={<Cloud size={22} />}
            title="Cloud / DevOps"
            align="right"
            delay={0.15}
            items={cloudSkills}
          />
        </div>
      </div>
    </section>
  );
}
