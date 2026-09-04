"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  clientele,
  clients,
  company,
  proprietaryTools,
  verticals,
  whoWeAre,
} from "@/content/site";
import { Reveal, RevealText } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";
import { StatsStrip } from "@/components/site/stats";
import { ButtonLink, Eyebrow } from "@/components/site/ui";
import { useLoading } from "@/components/site/loading-context";
import Link from "next/link";

const flagship = [
  {
    tag: "Creative Solutions",
    name: "AI Eyeball Tracking",
    blurb:
      "Pakistan's first locally-designed AI eyeball-tracking solution, converting eye movement into cognitive business KPIs.",
    id: "eyeball-tracking",
  },
  {
    tag: "Technology",
    name: "BICrux",
    blurb:
      "End-to-end survey platform: builder, project management, MIL-STD QA protocol and drag-and-drop analysis.",
    id: "technology",
  },
  {
    tag: "Retail Research",
    name: "metrea",
    blurb:
      "Precision retail audit panel — max 5 categories per panel, 8,000 stores a month, 2.5M+ audits completed.",
    id: "retail-research",
  },
];

const heroSlides = [
  {
    type: "image",
    src: null,
    label: "Fieldwork · CAPI · GPS tracked",
    alt: "Markematics field researcher interviewing a shopkeeper in a traditional trade store in Karachi",
    headline: ["Turning markets into", "measurable", "intelligence."],
    body: "A full-service market research and consulting agency with a decade-plus track record, 10+ offices across Pakistan and a regional footprint spanning the Middle East and South Asia.",
  },
  {
    type: "video",
    src: null,
    poster: null,
    label: "In the field · Live capture",
    alt: "Field interviewer walking a retail aisle with a tablet",
    headline: ["Insight captured", "where it", "happens."],
    body: "Trained enumerators, GPS-verified visits and live quality control — every data point traced back to a real store, a real shopper, a real moment.",
  },
  {
    type: "image",
    src: null,
    label: "Retail audit · 8,000 stores / month",
    alt: "Retail audit researcher scanning shelves of consumer packaged goods in a supermarket aisle",
    headline: ["8,000 stores.", "One precision", "retail panel."],
    body: "metrea audits a maximum of five categories per panel so share, distribution and pricing read clean — 2.5M+ audits completed to date.",
  },
  {
    type: "image",
    src: null,
    label: "Consumer interviews · Face to face",
    alt: "Field interviewer conducting a face-to-face consumer survey on a tablet in a busy market",
    headline: ["Consumers heard,", "not just", "counted."],
    body: "CAPI, CATI and qualitative depth across urban and rural Pakistan — brand health, usage and attitude, shopper and concept testing at national scale.",
  },
  {
    type: "image",
    src: null,
    label: "Analytics · Dashboards · AI",
    alt: "Analyst reviewing market research dashboards on large screens in a Karachi office",
    headline: ["Dashboards that", "answer the", "next question."],
    body: "AI eyeball tracking, BICrux survey technology and advanced analytics turn raw fieldwork into decisions your commercial teams can act on.",
  },
];

const SLIDE_MS = 5500;

function HeroSlider({ index, setIndex, setPaused }) {
  const { isLoading } = useLoading();
  const media = useRef(null);
  const ready = !isLoading;

  useEffect(() => {
    if (typeof window === "undefined" || !media.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(media.current.querySelector("[data-hero-stage]"), {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: media.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, media);
    return () => ctx.revert();
  }, []);

  const slide = heroSlides[index] ?? heroSlides?.[0];

  return (
    <div
      ref={media}
      className="relative overflow-hidden bg-ink lg:min-h-screen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={
          ready
            ? { clipPath: "inset(0 0 0% 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div data-hero-stage className="relative h-[60vh] w-full lg:h-full">
          <AnimatePresence initial={false}>
            {slide.type === "video" ? (
              <motion.video
                key={slide.src}
                src={slide.src}
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={slide.alt}
                className="absolute inset-0 h-full w-full scale-105 object-cover"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.9 },
                  scale: { duration: 5, ease: "linear" },
                }}
              />
            ) : (
              <motion.img
                key={slide.src}
                src={slide.src}
                width={1024}
                height={1536}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full scale-105 object-cover"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.9 },
                  scale: { duration: 5, ease: "linear" },
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-4">
        <span className="bg-primary px-6 py-4 text-[0.65rem] font-semibold tracking-[0.18em] text-primary-foreground uppercase">
          {slide.label}
        </span>
        <div className="flex items-center gap-2 px-6 py-4">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="group h-6 w-10 p-0"
            >
              <span
                className={`block h-0.75 w-full transition-colors duration-500 ${
                  i === index
                    ? "bg-white"
                    : "bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { isLoading } = useLoading();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ready = !isLoading;

  useEffect(() => {
    if (paused || !ready) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, ready]);

  const slide = heroSlides[index] ?? heroSlides?.[0];

  return (
    <section className="relative border-b border-ink/10 pt-28 lg:pt-20">
      <div className="grid lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <div className="shell flex flex-col justify-center py-16 lg:py-0">
          <Eyebrow>Since {company.since} · Karachi, Pakistan</Eyebrow>
          <h1
            key={`h-${index}`}
            className="mt-7 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.035em]"
          >
            <RevealText text={slide.headline?.[0]} delay={0.05} />{" "}
            <span className="text-primary">
              <RevealText text={slide.headline?.[1]} delay={0.2} />
            </span>{" "}
            <RevealText text={slide.headline?.[2]} delay={0.32} />
          </h1>
          <Reveal key={`p-${index}`} delay={0.35} className="mt-7 max-w-lg">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
              {slide.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.5}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <ButtonLink to="/services">Explore our work</ButtonLink>
            <a
              href="#numbers"
              className="link-underline text-[0.72rem] font-semibold tracking-[0.16em] uppercase"
            >
              See our numbers ↓
            </a>
          </Reveal>
        </div>

        <HeroSlider index={index} setIndex={setIndex} setPaused={setPaused} />
      </div>

      <div className="pointer-events-none absolute bottom-8 left-5 hidden items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground lg:flex xl:left-16">
        <span className="block h-10 w-px animate-pulse bg-ink/30" />
        Scroll
      </div>
    </section>
  );
}

export default function Home() {
  const clients = Object.values(clientele).flat();
  return (
    <>
      <Hero />

      {/* Who we are teaser */}
      <section className="shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-[0.35fr_1fr]">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <div>
            <RevealText
              text={whoWeAre.lead}
              className="block font-display text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.08] font-bold tracking-[-0.03em]"
            />
            <Reveal
              delay={0.15}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              <Link
                href="/about"
                className="link-underline text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-primary"
              >
                Learn more about us →
              </Link>
            </Reveal>
          </div>
        </div>

        {/* <div className="mt-20 border-y border-ink/10 py-6">
          <Marquee
            items={proprietaryTools}
            speed={55}
            itemClassName="px-10 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-extrabold tracking-[-0.03em] text-ink/25 hover:text-primary transition-colors duration-500"
          />
        </div> */}
      </section>

      {/* Numbers */}
      <section id="numbers" className="shell pb-24 md:pb-36">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Markematics in numbers</Eyebrow>
            <h2 className="mt-6 display-lg max-w-[12ch]">
              Built at national scale.
            </h2>
          </div>
          <Link
            href="/about"
            className="link-underline text-[0.78rem] font-semibold tracking-[0.16em] uppercase"
          >
            Full story →
          </Link>
        </Reveal>
        <StatsStrip />
      </section>

      {/* Clients */}
      <section className="border-y border-ink/10 bg-secondary py-24 md:py-32">
        <div className="shell">
          <Eyebrow>Clients entrusting us</Eyebrow>

          <h2 className="mt-6 display-lg max-w-[18ch]">
            Trusted by 130+ brands across Pakistan and beyond.
          </h2>
        </div>

        <div className="mt-16 space-y-4">
          {[0, 1, 2].map((row) => (
            <Marquee
              key={row}
              reverse={row % 2 === 1}
              speed={30 + row * 8}
              items={clients.filter((_, i) => i % 3 === row)}
              itemClassName="mx-3 flex h-24 w-56 items-center justify-center border border-ink/12 bg-background px-6 transition-all duration-500 hover:border-primary hover:grayscale-0"
            />
          ))}
        </div>
      </section>

      {/* Service verticals */}
      <section className="shell py-24 md:py-36">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-6 display-lg max-w-[14ch]">
            Four practices, one evidence base.
          </h2>
        </Reveal>
        <div className="mt-16 grid rule-grid md:grid-cols-2">
          {verticals.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <Link
                href="/services"
                hash={v.anchor}
                className="group flex h-full flex-col justify-between gap-16 p-8 transition-colors duration-500 hover:bg-ink md:p-12"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-primary">
                  {v.index}
                </span>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] transition-colors duration-500 group-hover:text-white">
                    {v.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/60">
                    {v.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Flagship */}
      <section className="bg-ink py-24 text-white md:py-36">
        <div className="shell">
          <Eyebrow tone="light">Flagship solutions</Eyebrow>
          <h2 className="mt-6 display-lg max-w-[16ch] text-white">
            Products we built because nobody else had.
          </h2>
          <div className="mt-16 grid gap-px bg-white/12 md:grid-cols-3">
            {flagship.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1} className="bg-ink">
                <Link
                  href="/services"
                  hash={f.id}
                  className="group flex h-full flex-col justify-between gap-20 p-8 transition-colors duration-500 hover:bg-primary-deep md:p-10"
                >
                  <span className="eyebrow text-white/40">{f.tag}</span>
                  <div>
                    <h3 className="text-3xl text-white">{f.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/55">
                      {f.blurb}
                    </p>
                    <span className="mt-8 inline-block text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-white/70 transition-transform duration-500 group-hover:translate-x-1">
                      View →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="shell py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-10 border border-ink/12 p-10 md:flex-row md:items-center md:p-16">
          <div>
            <Eyebrow>Let&apos;s work together</Eyebrow>
            <h2 className="mt-6 display-lg max-w-[14ch]">
              Start with a question.
            </h2>
          </div>
          <ButtonLink to="/contact">Get in touch</ButtonLink>
        </div>
      </section>
    </>
  );
}
