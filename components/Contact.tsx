"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { LinkedInIcon } from "./icons/LinkedInIcon";

interface FormState {
  name: string; 
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactLinks = [
  {
    icon: Mail,
    label: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Phone,
    label: contactInfo.phone,
    href: `tel:${contactInfo.phoneHref}`,
  },
  {
    icon: LinkedInIcon,
    label: contactInfo.linkedinLabel,
    href: contactInfo.linkedin,
  },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailPattern.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError?: string) =>
    `w-full rounded-sm border-2 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-dim/50 outline-none transition-colors focus:border-red ${
      hasError ? "border-red" : "border-ink/15"
    }`;

  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="section-container">
        <div className="relative z-30 mb-24 flex flex-col items-center text-center md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-dashed border-red text-red md:h-28 md:w-28"
          >
            <span className="font-script text-xl md:text-2xl">say hi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-6 font-display text-4xl text-ink md:text-6xl"
          >
            Let&apos;s Talk
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-4xl" style={{ perspective: 1400 }}>
          <motion.div
            aria-hidden="true"
            initial={{ rotateX: 0 }}
            whileInView={{ rotateX: -158 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 md:h-28"
          >
            <div
              className="h-full w-full bg-red-dark"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </motion.div>

          <div className="h-3 w-full rounded-t-sm bg-paper-card" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="grid gap-12 border border-t-0 border-ink/10 bg-paper-card/40 p-6 md:grid-cols-2 md:gap-16 md:p-10"
          >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <p className="text-lg leading-relaxed text-ink-dim">
              Whether it&apos;s a frontend role, a cloud/DevOps opportunity,
              or just a conversation about tech, I&apos;d love to hear
              from you.
            </p>
            {contactLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 text-sm text-ink-dim transition-colors hover:text-ink"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red/15 text-red">
                  <Icon size={16} />
                </span>
                {label}
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClasses(errors.name)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClasses(errors.email)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Your message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClasses(errors.message)} resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? undefined : { scale: 1.03, rotate: -1 }}
              whileTap={isSubmitting ? undefined : { scale: 0.97 }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-ink shadow-[0_10px_25px_-8px_rgba(151,22,22,0.5)] transition-colors hover:bg-red-dark disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-sm border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-ink"
                >
                  <CheckCircle2 size={16} className="text-green-500" />
                  Thanks! Your message has been sent. I&apos;ll get back to
                  you soon.
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-sm border border-red/40 bg-red/10 px-4 py-3 text-sm text-ink"
                >
                  <AlertCircle size={16} className="text-red" />
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
