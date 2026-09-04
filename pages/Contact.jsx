"use client";
import { useState } from "react";
import { toast } from "sonner";
import { company } from "@/content/site";
import { Reveal, RevealText } from "@/components/site/reveal";
import { Eyebrow } from "@/components/site/ui";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "company", label: "Company", type: "text" },
];

export default function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      e.target.reset();
      toast.success("Thanks - we'll be in touch shortly.");
    }, 700);
  };

  return (
    <>
      <section className="bg-ink pt-40 pb-24 text-white md:pt-52 md:pb-32">
        <div className="shell">
          <Eyebrow tone="light">Let&apos;s work together</Eyebrow>
          <h1 className="mt-8 display-xl text-white">
            <RevealText text="Let's work" />
            <br />
            <span className="text-primary">
              <RevealText text="together." delay={0.25} />
            </span>
          </h1>
          <div className="mt-16 grid gap-10 border-t border-white/12 pt-10 md:grid-cols-3">
            <Reveal>
              <div className="eyebrow text-white/40">Phone</div>
              <a
                href={`tel:${company.phone}`}
                className="link-underline mt-4 block text-xl"
              >
                {company.phone}
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="eyebrow text-white/40">Website</div>
              <a
                href={`https://${company.website}`}
                className="link-underline mt-4 block text-xl"
              >
                {company.website}
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="eyebrow text-white/40">Address</div>
              <p className="mt-4 max-w-xs text-xl leading-snug text-white/80">
                {company.address}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-[0.4fr_1fr]">
          <Reveal>
            <Eyebrow>Brief us</Eyebrow>
            <h2 className="mt-6 display-lg max-w-[10ch]">Start here.</h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Tell us the decision you&apos;re trying to make. We&apos;ll come
              back with the methodology, the cost and the timeline.
            </p>
          </Reveal>

          <form onSubmit={onSubmit} className="grid gap-8">
            <div className="grid gap-8 md:grid-cols-3">
              {fields.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.08}>
                  <label
                    htmlFor={f.name}
                    className="eyebrow block text-muted-foreground"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.name !== "company"}
                    className="mt-3 w-full border-0 border-b border-ink/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-primary"
                  />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.24}>
              <label
                htmlFor="message"
                className="eyebrow block text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-3 w-full resize-none border-0 border-b border-ink/20 bg-transparent py-3 text-base outline-none transition-colors focus:border-primary"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <button
                type="submit"
                disabled={sending}
                className="bg-primary px-9 py-4 text-[0.78rem] font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-ink disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send enquiry"}
              </button>
            </Reveal>
          </form>
        </div>
      </section>
    </>
  );
}
