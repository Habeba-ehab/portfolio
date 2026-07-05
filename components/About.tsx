"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ProfilePhoto } from "./decor/ProfilePhoto";

function RevealLine({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.p
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="text-ink-dim leading-relaxed text-lg"
      >
        {children}
      </motion.p>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const textY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative py-16 md:py-24"
    >
      <div className="section-container">
        <SectionHeading
          title="About Me"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="grid gap-12 md:grid-cols-5 md:gap-16 md:items-start">
          <motion.div style={{ y: textY }} className="md:col-span-3">
            <div className="space-y-5">
              <RevealLine delay={0}>
                I&apos;m Habeba, a frontend developer with a Computer Science
                degree from{" "}
                <span className="text-ink font-semibold">
                  Alexandria University
                </span>
                . I build interfaces with{" "}
                <span className="text-ink font-semibold">
                  React and Next.js
                </span>
                , and I&apos;ve worked hands-on with{" "}
                <span className="text-ink font-semibold">Three.js</span> on 3D
                web experiences. I care about the details that make an
                interface feel fast, smooth, and well put together.
              </RevealLine>
              <RevealLine delay={0.12}>
                Alongside that, I&apos;ve been expanding into cloud and
                DevOps, getting hands-on with{" "}
                <span className="text-ink font-semibold">
                  AWS, Terraform, Docker, and Kubernetes
                </span>
                . It&apos;s a natural next step for me: understanding how what
                I build gets deployed and scaled only makes me better at
                building it in the first place.
              </RevealLine>
              <RevealLine delay={0.24}>
                I like working across that range, from the interface a user
                sees to the infrastructure running behind it, and I&apos;m
                continuing to grow deeper into cloud and DevOps while staying
                sharp on the frontend.
              </RevealLine>
            </div>
          </motion.div>

          <motion.div
            style={{ y: photoY }}
            className="md:col-span-2 md:h-full"
          >
            <div className="relative h-full">
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                className="h-104 w-full -rotate-2 overflow-hidden shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)] md:h-full"
              >
                <ProfilePhoto
                  src="/habeba.jpeg"
                  alt="Habeba Ehab"
                  initials="HE"
                  className="h-full w-full"
                />
              </motion.div>

              <motion.img
                initial={{ opacity: 0, rotate: 40, scale: 0.6 }}
                whileInView={{ opacity: 1, rotate: 18, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                src="/washi_tape_darkred_opaque.png"
                alt=""
                aria-hidden="true"
                width={324}
                height={94}
                className="pointer-events-none absolute -top-4 -right-5 z-20 h-auto w-20 select-none drop-shadow-md sm:-top-5 sm:-right-6 sm:w-24 md:w-28"
              />

              <motion.img
                initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
                whileInView={{ opacity: 1, rotate: 18, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
                src="/washi_tape_beige_opaque.png"
                alt=""
                aria-hidden="true"
                width={324}
                height={94}
                className="pointer-events-none absolute -bottom-3 -left-5 z-20 h-auto w-20 select-none drop-shadow-md sm:-bottom-4 sm:-left-6 sm:w-24 md:w-28"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
