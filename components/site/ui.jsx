"use client";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Magnetic } from "./magnetic";
import Link from "next/link";

const styles = {
  solid: "bg-primary text-primary-foreground hover:bg-primary-deep",
  outline: "border border-ink/25 text-ink hover:bg-ink hover:text-background",
  light: "bg-white text-ink hover:bg-primary hover:text-primary-foreground",
};

function inner(children, variant, arrow) {
  return (
    <span
      className={`group inline-flex items-center gap-3 px-7 py-4 text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-500 ${styles[variant]}`}
    >
      {children}
      {arrow === "right" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      )}
      {arrow === "down" && (
        <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1" />
      )}
    </span>
  );
}

export function ButtonLink({
  to,
  href,
  children,
  variant = "solid",
  arrow = "right",
}) {
  const content = inner(children, variant, arrow);
  return (
    <Magnetic>
      {to ? <Link href={to}>{content}</Link> : <a href={href}>{content}</a>}
    </Magnetic>
  );
}

export function Eyebrow({ children, tone = "ink" }) {
  return (
    <div
      className={`eyebrow flex items-center gap-3 ${tone === "light" ? "text-white/60" : "text-primary"}`}
    >
      <span
        className={`h-1.5 w-1.5 ${tone === "light" ? "bg-white/60" : "bg-primary"}`}
      />
      {children}
    </div>
  );
}
