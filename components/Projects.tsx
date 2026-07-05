"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, FolderGit2, ImageOff } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { projects } from "@/lib/data";

function StickyImage({ project }: { project: (typeof projects)[number] | undefined }) {
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.title}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative aspect-2/1 w-full overflow-hidden rounded-sm border border-ink/10 bg-paper"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-2 border border-dashed border-ink/15 bg-paper text-xs uppercase tracking-[0.2em] text-ink-dim/60">
            <ImageOff size={14} /> Image coming soon
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectEntry({
  project,
  index,
  onActivate,
}: {
  project: (typeof projects)[number];
  index: number;
  onActivate: (index: number) => void;
}) {
  return (
    <motion.div
      onViewportEnter={() => onActivate(index)}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex min-h-[60vh] flex-col justify-center py-12 md:min-h-[70vh]"
    >
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute -left-2 -top-10 -z-10 select-none font-display text-[7rem] leading-none text-red/5 md:-top-16 md:text-[11rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <span className="relative font-display text-sm text-red">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="relative mt-2 font-display text-3xl text-ink md:text-5xl">
        {project.title}
      </h3>

      <div className="mt-6 md:hidden">
        <StickyImage project={project} />
      </div>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-red/30 bg-red/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-red"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-6 flex gap-4 text-sm text-ink-dim">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-red"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-red"
            >
              <FolderGit2 size={14} /> Code
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          title="Projects"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="grid gap-x-12 md:grid-cols-[1.35fr_1fr]">
          <div className="hidden md:block">
            <div className="sticky top-32">
              <StickyImage project={projects[active]} />
            </div>
          </div>

          <div>
            {projects.map((project, index) => (
              <ProjectEntry
                key={project.title}
                project={project}
                index={index}
                onActivate={setActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
