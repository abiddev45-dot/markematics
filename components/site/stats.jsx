"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/content/site";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-15% 0px",
  });

  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const obj = { v: 0 };

    const animation = gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => {
        setN(Math.round(obj.v));
      },
    });

    return () => {
      animation.kill();
    };
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* Compact strip used on the home page. */
export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 rule-grid">
      {stats.map((s) => (
        <div key={s.label} className="px-6 py-10">
          <div className="font-display text-4xl leading-none font-extrabold tracking-[-0.04em] text-primary lg:text-5xl">
            <Counter value={s.value} suffix={s.suffix} />
          </div>

          <div className="mt-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase text-muted-foreground">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Pinned horizontal-scroll stat sequence used on the About page. */
export function StatsHorizontal() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 768
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        return Math.max(0, track.scrollWidth - section.clientWidth);
      };

      const animation = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: () => `+=${getDistance()}`,

          pin: true,

          scrub: 1,

          invalidateOnRefresh: true,

          anticipatePin: 1,
        },
      });

      const refresh = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
        animation.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink text-white"
    >
      <div className="flex min-h-[70vh] items-center md:h-screen">
        <div ref={trackRef} className="flex w-max items-stretch">
          <div className="flex w-[86vw] shrink-0 flex-col justify-center px-6 md:w-[46vw] md:px-20">
            <div className="eyebrow text-white/50">Markematics in numbers</div>

            <h2 className="mt-6 display-lg text-white">
              Scale you can
              <br />
              audit.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Fourteen years of continuous fieldwork, a permanent research bench
              and a field force built to cover Pakistan end to end.
            </p>
          </div>

          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex w-[76vw] shrink-0 flex-col justify-between border-l border-white/12 px-6 py-16 md:w-[34vw] md:px-14"
            >
              <span className="font-mono text-xs tracking-[0.2em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="font-display text-[clamp(4rem,9vw,9rem)] leading-[0.85] font-extrabold tracking-tighter">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>

                <div className="mt-6 text-[0.72rem] font-medium tracking-[0.22em] uppercase text-white/55">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
