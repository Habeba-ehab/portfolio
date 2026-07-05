"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { ProfilePhoto } from "./decor/ProfilePhoto";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

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
      className="relative py-28 md:py-36"
    >
      <div className="section-container">
        <SectionHeading
          title="About Me"
          showUnderline={false}
          titleClassName="text-5xl md:text-7xl text-red"
        />

        <div className="grid gap-12 md:grid-cols-5 md:gap-16 md:items-stretch">
          <motion.div style={{ y: textY }} className="md:col-span-3">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15% 0px" }}
              variants={fadeUp}
              className="space-y-5 text-ink-dim leading-relaxed text-lg"
            >
              <p>
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
              </p>
              <p>
                Alongside that, I&apos;ve been expanding into cloud and
                DevOps, getting hands-on with{" "}
                <span className="text-ink font-semibold">
                  AWS, Terraform, Docker, and Kubernetes
                </span>
                . It&apos;s a natural next step for me: understanding how what
                I build gets deployed and scaled only makes me better at
                building it in the first place.
              </p>
              <p>
                I like working across that range, from the interface a user
                sees to the infrastructure running behind it, and I&apos;m
                continuing to grow deeper into cloud and DevOps while staying
                sharp on the frontend.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: photoY }}
            className="md:col-span-2 md:h-full"
          >
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15% 0px" }}
              variants={fadeUp}
              className="relative h-full"
            >
              <div className="h-104 w-full -rotate-2 overflow-hidden shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)] md:h-full">
                <ProfilePhoto
                  src="/habeba.jpeg"
                  alt="Habeba Ehab"
                  initials="HE"
                  className="h-full w-full"
                />
              </div>

              <img
                src="/washi_tape_darkred_opaque.png"
                alt=""
                aria-hidden="true"
                width={324}
                height={94}
                className="pointer-events-none absolute -top-4 -right-5 z-20 h-auto w-20 rotate-18 select-none drop-shadow-md sm:-top-5 sm:-right-6 sm:w-24 md:w-28"
              />

              <img
                src="/washi_tape_beige_opaque.png"
                alt=""
                aria-hidden="true"
                width={324}
                height={94}
                className="pointer-events-none absolute -bottom-3 -left-5 z-20 h-auto w-20 rotate-18 select-none drop-shadow-md sm:-bottom-4 sm:-left-6 sm:w-24 md:w-28"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
