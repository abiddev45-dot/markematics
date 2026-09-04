"use client";
import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { departmentHeads, leadership, sectors, whoWeAre } from "@/content/site";
import { Reveal, RevealText } from "@/components/site/reveal";
import { StatsHorizontal } from "@/components/site/stats";
import { ButtonLink, Eyebrow } from "@/components/site/ui";
import Image from "next/image";

const SAMPLE_BIO =
  "With deep experience across research design, field operations and insight delivery, they steer multidisciplinary teams through complex quantitative, qualitative and analytics programs. Their focus is turning raw data into clear, actionable strategy while maintaining rigorous quality standards and strong client partnerships.";

const RESPONSIBILITIES = [
  "Strategic research design & methodology oversight",
  "Cross-functional team leadership & operations",
  "Client advisory, insight reviews & quality assurance",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function PersonAvatar({ name, profileUrl, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-primary text-primary-foreground ${className}`}
    >
      {profileUrl ? (
        <Image
          src={profileUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      ) : (
        <div className="grid h-full w-full place-items-center font-display font-extrabold tracking-tighter">
          <span>{getInitials(name)}</span>
        </div>
      )}
    </div>
  );
}

function PersonCard({ p, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(p)}
      className="group relative block w-full overflow-hidden bg-secondary text-left"
      aria-label={`Open profile for ${p.name}`}
    >
      <div className="relative aspect-5/4 w-full overflow-hidden bg-ink/90">
        {p.profileUrl ? (
          <Image
            src={p.profileUrl}
            alt={p.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white">
            <span className="font-display text-6xl font-extrabold tracking-tighter opacity-40">
              {getInitials(p.name)}
            </span>
          </div>
        )}
      </div>
      <div className="relative overflow-hidden p-6">
        <h3 className="text-xl">{p.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.title}</p>
        <p className="mt-4 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-primary">
          {p.years}
        </p>
        <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
        <span className="mt-5 cursor-pointer inline-flex items-center gap-2 border border-ink/20 px-4 py-2 text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-ink transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          View details
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

function ProfileModal({ person, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-name"
    >
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-background shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 grid h-10 w-10 place-items-center bg-secondary text-ink transition-colors hover:bg-primary hover:text-primary-foreground"
          aria-label="Close profile"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col gap-4">
            <PersonAvatar
              name={person.name}
              profileUrl={person.profileUrl}
              className="h-24 w-24 text-3xl sm:h-28 sm:w-28 sm:text-4xl"
            />
            <div className="hidden md:block">
              <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-primary">
                {person.years} experience
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-primary">Leadership Profile</p>
            <h2
              id="profile-name"
              className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
            >
              {person.name}
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              {person.title}
            </p>
            <p className="mt-4 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-primary md:hidden">
              {person.years} experience
            </p>

            <div className="mt-8 h-px bg-border" />

            <p className="mt-8 text-base leading-relaxed text-ink/80">
              {person.bio || SAMPLE_BIO}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold tracking-[0.12em] uppercase text-ink">
                Core responsibilities
              </h3>
              <ul className="mt-4 space-y-3">
                {RESPONSIBILITIES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const [selected, setSelected] = useState(null);

  const team = [...leadership, ...departmentHeads].map((p) => ({
    ...p,
    bio: SAMPLE_BIO,
  }));

  return (
    <>
      <section className="shell pt-40 pb-20 md:pt-52 md:pb-28">
        <Eyebrow>Who we are</Eyebrow>
        <h1 className="mt-8 display-xl max-w-[13ch]">
          <RevealText text="A research house, not a" />{" "}
          <span className="text-primary">
            <RevealText text="vendor." delay={0.3} />
          </span>
        </h1>
      </section>

      <section className="shell border-t border-ink/10 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <p className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.15] font-bold tracking-[-0.03em]">
              {whoWeAre.lead}
            </p>
          </Reveal>
          <Reveal
            delay={0.12}
            className="space-y-6 text-base leading-relaxed text-muted-foreground"
          >
            <p>{whoWeAre.p1}</p>
            <p>{whoWeAre.p2}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16 flex flex-wrap gap-px bg-ink/10">
          {sectors.map((s) => (
            <span
              key={s}
              className="bg-background px-5 py-3 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-ink/70"
            >
              {s}
            </span>
          ))}
        </Reveal>
      </section>

      <StatsHorizontal />

      <section className="shell py-24 md:py-36">
        <Reveal>
          <Eyebrow>The people behind the insight</Eyebrow>
          <h2 className="mt-6 display-lg max-w-[14ch]">Our team</h2>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <PersonCard p={p} onClick={setSelected} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-28">
        <div className="flex flex-col items-start justify-between gap-8 bg-secondary p-10 md:flex-row md:items-center md:p-14">
          <h2 className="display-lg max-w-[16ch]">
            Want the full capability deck?
          </h2>
          <ButtonLink to="/contact">Request it</ButtonLink>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProfileModal person={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
