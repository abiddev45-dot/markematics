"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
  itemClassName = "",
}) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;

    if (!el) return;

    let raf = 0;
    let x = reverse ? -el.scrollWidth / 2 : 0;
    let last = performance.now();
    let paused = false;

    const onEnter = () => {
      paused = true;
    };

    const onLeave = () => {
      paused = false;
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!paused) {
        x += (reverse ? speed : -speed) * dt;

        const half = el.scrollWidth / 2;

        if (x <= -half) {
          x += half;
        }

        if (x >= 0) {
          x -= half;
        }

        el.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);

      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [speed, reverse]);

  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max items-center">
        {doubled.map((item, i) => (
          <div key={`${item}-${i}`} className={`shrink-0 ${itemClassName}`}>
            <Image
              src={item}
              alt="Client logo"
              width={180}
              height={180}
              className="max-h-18 w-auto max-w-37.5 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
