"use client"
import { useRef } from "react";

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  return (
    <span
      ref={ref}
      className="inline-block will-change-transform"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || window.matchMedia("(pointer: coarse)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transition = "transform 0.15s ease-out";
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
        el.style.transform = "translate(0px, 0px)";
      }}
    >
      {children}
    </span>
  );
}
