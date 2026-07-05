"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
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
    <section id="contact" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          title="Contact"
          showUnderline={false}
          titleClassName="text-4xl md:text-6xl text-red"
        />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
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
              className="flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-ink shadow-[0_10px_25px_-8px_rgba(151,22,22,0.5)] transition-colors hover:bg-red-dark disabled:opacity-60"
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
        </div>
      </div>
    </section>
  );
}
