"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "./loading-context";
import { Wordmark } from "./wordmark";

export function Loader() {
  const { isLoading, finish } = useLoading();
  const root = useRef(null);
  const bar = useRef(null);
  const logo = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!isLoading || !root.current) return;
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      logo.current,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out" },
    )
      .fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: "power3.inOut" },
        0.25,
      )
      .to(
        counter,
        {
          v: 100,
          duration: 1.6,
          ease: "power3.inOut",
          onUpdate: () => setPct(Math.round(counter.v)),
        },
        0.25,
      )
      .to(
        logo.current,
        { scale: 1.04, autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
        "+=0.15",
      )
      .to(
        root.current,
        { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
        "-=0.2",
      );

    return () => {
      tl.kill();
    };
  }, [isLoading, finish]);

  if (!isLoading) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white"
      aria-hidden
    >
      <div ref={logo} className="flex flex-col items-center gap-10">
        <Wordmark className="h-7 text-ink" />
        <div className="flex w-[min(60vw,22rem)] flex-col gap-3">
          <div className="h-px w-full bg-ink/15">
            <div ref={bar} className="h-px w-full origin-left bg-primary" />
          </div>
          <div className="flex justify-between font-mono text-[11px] tracking-[0.2em] text-ink/50">
            <span>LOADING</span>
            <span>{String(pct).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
