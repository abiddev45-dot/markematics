"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  advancedAnalytics,
  analyticsNote,
  bicrux,
  creativeSolutions,
  customizedResearch,
  dataEngineering,
  methodologies,
  retailResearch,
  shopTrack,
  techProducts,
  verticals,
  winAtShelf,
} from "@/content/site";
import { Reveal, RevealText } from "@/components/site/reveal";
import { ButtonLink, Eyebrow } from "@/components/site/ui";

const subnav = [
  { id: "customized-research", label: "Customized Research" },
  { id: "methodologies", label: "Methodologies" },
  { id: "analytics", label: "Analytics" },
  { id: "creative-solutions", label: "Creative Solutions" },
  { id: "retail-research", label: "Retail Research" },
  { id: "technology", label: "Technology" },
];

function SubNav() {
  const [active, setActive] = useState(subnav?.[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    subnav.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.querySelector(`[data-subnav="${active}"]`);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  return (
    <div className="sticky top-20 z-40 border-y border-ink/10 bg-background/95 backdrop-blur-md">
      <div className="relative">
        <div className="flex snap-x gap-6 overflow-x-auto px-6 py-4 md:gap-7 md:px-10 lg:px-16 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {subnav.map((s) => (
            <a
              key={s.id}
              data-subnav={s.id}
              href={`#${s.id}`}
              className={`shrink-0 snap-center border-b-2 pb-1 text-[0.7rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                active === s.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background to-transparent md:hidden" />
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, intro, tone = "ink" }) {
  return (
    <Reveal className="max-w-4xl">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-6 display-lg max-w-[16ch] ${tone === "light" ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-8 max-w-2xl text-base leading-relaxed ${tone === "light" ? "text-white/60" : "text-muted-foreground"}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

function ListBlock({ title, items, tone = "ink" }) {
  return (
    <div className="p-8 md:p-10">
      <h3 className={`text-xl ${tone === "light" ? "text-white" : ""}`}>
        {title}
      </h3>
      <ul className="mt-6 space-y-2.5">
        {items.map((i) => (
          <li
            key={i}
            className={`flex gap-3 text-sm leading-relaxed ${tone === "light" ? "text-white/60" : "text-muted-foreground"}`}
          >
            <span
              className={`mt-2 h-1 w-1 shrink-0 ${tone === "light" ? "bg-white/40" : "bg-primary"}`}
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SolutionBlock({ s, index }) {
  return (
    <div
      id={s.id}
      className="scroll-mt-40 border-t border-white/12 py-16 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-[0.4fr_1fr]">
        <Reveal>
          <span className="font-mono text-xs tracking-[0.2em] text-white/35">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-white">
            {s.name}
          </h3>
          <p className="mt-4 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-primary">
            {s.kicker}
          </p>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-relaxed text-white/65">
              {s.summary}
            </p>
          </Reveal>

          {s.callout && (
            <Reveal delay={0.15} className="mt-10 bg-primary p-8 md:p-10">
              <p className="font-display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-primary-foreground">
                {s.callout}
              </p>
            </Reveal>
          )}

          {s.stats && (
            <div className="mt-10 grid grid-cols-3 gap-px bg-white/12">
              {s.stats.map((st) => (
                <div key={st.label} className="bg-ink p-6">
                  <div className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white">
                    {st.value}
                  </div>
                  <div className="mt-2 text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-px bg-white/12 md:grid-cols-2">
            {s.blocks.map((b) => (
              <div key={b.title} className="bg-ink">
                <ListBlock title={b.title} items={b.items} tone="light" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <section className="shell pt-40 pb-16 md:pt-52 md:pb-24">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-8 display-xl max-w-[13ch]">
          <RevealText text="Evidence, engineered end" />{" "}
          <span className="text-primary">
            <RevealText text="to end." delay={0.3} />
          </span>
        </h1>
        <div className="mt-14 grid rule-grid md:grid-cols-4">
          {verticals.map((v) => (
            <a key={v.title} href={`#${v.anchor}`} className="group p-8">
              <span className="font-mono text-xs tracking-[0.2em] text-primary">
                {v.index}
              </span>
              <h2 className="mt-10 text-xl transition-colors group-hover:text-primary">
                {v.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.blurb}
              </p>
            </a>
          ))}
        </div>
      </section>

      <SubNav />

      {/* Customized research */}
      <section
        id="customized-research"
        className="shell scroll-mt-40 py-24 md:py-32"
      >
        <SectionHead
          eyebrow="Customized Research"
          title="Our most experienced practice."
          intro="From research design to field management, analysis and insight generation — the full chain, run in-house."
        />
        <div className="mt-14 border-t border-ink/12">
          {customizedResearch.map((c, i) => {
            const open = openIdx === i;
            return (
              <div key={c.title} className="border-b border-ink/12">
                <button
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="flex items-baseline gap-6">
                    <span className="font-mono text-xs tracking-[0.2em] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.3rem,2.4vw,2rem)] font-bold tracking-[-0.03em]">
                      {c.title}
                    </span>
                  </span>
                  <span className="text-2xl leading-none text-primary">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <motion.div
                  key={c.title}
                  initial={false}
                  animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-3 pb-10 md:grid-cols-3 md:pl-16">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="border-l-2 border-primary/30 pl-4 text-sm text-muted-foreground"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodologies */}
      <section
        id="methodologies"
        className="scroll-mt-40 border-y border-ink/10 bg-secondary py-24 md:py-32"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Research methodologies"
            title="Two disciplines, one field force."
          />
          <div className="mt-14 grid gap-px bg-ink/12 md:grid-cols-2">
            <div className="bg-secondary">
              <ListBlock
                title="Quantitative Research"
                items={methodologies.quantitative}
              />
            </div>
            <div className="bg-secondary">
              <ListBlock
                title="Qualitative Research"
                items={methodologies.qualitative}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="shell scroll-mt-40 py-24 md:py-32">
        <SectionHead
          eyebrow="Advanced analytics"
          title="Modeling that survives contact with the market."
        />
        <div className="mt-14 grid rule-grid md:grid-cols-2 lg:grid-cols-3">
          {advancedAnalytics.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <ListBlock title={a.title} items={a.items} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <p>{analyticsNote}</p>
        </Reveal>
      </section>

      {/* Creative solutions */}
      <section
        id="creative-solutions"
        className="scroll-mt-40 bg-ink py-24 text-white md:py-32"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Creative & analytical solutions"
            title="Products built for problems off-the-shelf research can't solve."
            tone="light"
          />
          <div className="mt-10">
            {creativeSolutions.map((s, i) => (
              <SolutionBlock key={s.id} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Retail research */}
      <section
        id="retail-research"
        className="shell scroll-mt-40 py-24 md:py-32"
      >
        <SectionHead
          eyebrow="Retail research"
          title="Census-grade coverage of Pakistani trade."
          intro={retailResearch.intro}
        />
        <Reveal className="mt-14 flex flex-wrap gap-px bg-ink/10">
          {retailResearch.services.map((s) => (
            <span
              key={s}
              className="bg-background px-5 py-3 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-ink/70"
            >
              {s}
            </span>
          ))}
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-2">
          <Reveal>
            <h3 className="text-2xl">Retailer&apos;s e-Census</h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {retailResearch.census.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-2.5">
              {retailResearch.census.coverage.map((c) => (
                <li
                  key={c}
                  className="border-b border-ink/10 py-3 text-sm text-muted-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-24 bg-primary-deep p-8 text-white md:p-14">
          <Eyebrow tone="light">Retail audit solution</Eyebrow>
          <h3 className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] leading-none font-extrabold tracking-tighter text-white">
            metrea
          </h3>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/65">
            {retailResearch.metrea.summary}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
            {retailResearch.metrea.stats.map((s) => (
              <div key={s.label} className="bg-primary-deep p-6">
                <div className="font-display text-4xl font-extrabold tracking-[-0.04em]">
                  {s.value}
                </div>
                <div className="mt-2 text-[0.65rem] tracking-[0.16em] uppercase text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {retailResearch.metrea.track.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-sm leading-relaxed text-white/60"
              >
                <span className="mt-2 h-1 w-1 shrink-0 bg-white/40" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technology */}
      <section
        id="technology"
        className="scroll-mt-40 border-t border-ink/10 bg-secondary py-24 md:py-32"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Technology solutions"
            title="An in-house engineering team inside a research agency."
            intro="From our proprietary survey and project management platform to AI-powered research tools — with customized dashboards, GIS mapping and Power BI now standard in data delivery."
          />
          <div className="mt-14 grid rule-grid sm:grid-cols-2 lg:grid-cols-4">
            {techProducts.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05} className="p-8">
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
              </Reveal>
            ))}
          </div>

          {/* BICrux */}
          <div className="mt-24">
            <Reveal>
              <h3 className="font-display text-[clamp(2rem,5vw,4rem)] leading-none font-extrabold tracking-tighter">
                BICrux
              </h3>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {bicrux.summary}
              </p>
            </Reveal>
            <div className="mt-12 grid rule-grid md:grid-cols-2">
              {bicrux.quadrants.map((q, i) => (
                <Reveal key={q.title} delay={i * 0.06}>
                  <ListBlock title={q.title} items={q.items} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Win@Shelf */}
          <div className="mt-24 grid gap-12 md:grid-cols-2">
            <Reveal>
              <h3 className="font-display text-[clamp(2rem,5vw,4rem)] leading-none font-extrabold tracking-tighter">
                Win@Shelf
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {winAtShelf.summary}
              </p>
            </Reveal>
            <Reveal
              delay={0.12}
              className="relative overflow-hidden bg-ink p-8 md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px animate-pulse bg-primary" />
              <div className="eyebrow text-white/40">Scan output</div>
              <ul className="mt-8 space-y-4">
                {winAtShelf.output.map((o) => (
                  <li
                    key={o}
                    className="border border-white/15 px-5 py-4 font-mono text-sm tracking-[0.06em] text-white"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ShopTrack */}
          <div className="mt-24 grid gap-12 md:grid-cols-2">
            <Reveal>
              <h3 className="font-display text-[clamp(2rem,5vw,4rem)] leading-none font-extrabold tracking-tighter">
                ShopTrack
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {shopTrack.summary}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="bg-background p-8 md:p-10">
              <div className="eyebrow text-primary">Outlet record</div>
              <dl className="mt-8 divide-y divide-ink/10">
                {shopTrack.fields.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center justify-between gap-6 py-4"
                  >
                    <dt className="text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="font-display font-bold tracking-[-0.02em]">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Data engineering */}
          <div className="mt-24 grid gap-12 md:grid-cols-[0.4fr_1fr]">
            <Reveal>
              <Eyebrow>Data engineering & dashboards</Eyebrow>
            </Reveal>
            <Reveal
              delay={0.1}
              className="space-y-6 text-base leading-relaxed text-muted-foreground"
            >
              <p>{dataEngineering.p1}</p>
              <p>{dataEngineering.p2}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-8 border border-ink/12 p-10 md:flex-row md:items-center md:p-16">
          <h2 className="display-lg max-w-[16ch]">
            Which of these fits your question?
          </h2>
          <ButtonLink to="/contact">Talk to us</ButtonLink>
        </div>
      </section>
    </>
  );
}
