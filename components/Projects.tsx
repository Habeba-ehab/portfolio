"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, FolderGit2, ImageOff } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { projects } from "@/lib/data";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-video items-center justify-center gap-2 rounded-sm border border-dashed border-ink/15 bg-paper text-xs uppercase tracking-[0.2em] text-ink-dim/60">
        <ImageOff size={14} /> Image coming soon
      </div>
    );
  }

  return (
    <div className="relative aspect-2/1 overflow-hidden rounded-sm border border-ink/10 bg-paper">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const rotate = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4, rotate }}
      className="flex flex-col rounded-sm border border-ink/10 bg-paper-card p-6 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.5)] transition-transform md:p-8"
    >
      {project.image && <ProjectImage src={project.image} alt={project.title} />}

      <h3 className="mt-4 font-display text-2xl text-ink md:text-3xl">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
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
        <div className="mt-5 flex gap-4 text-sm text-ink-dim">
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
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          title="Projects"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
