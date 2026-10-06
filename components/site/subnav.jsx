"use client";

import { useEffect, useState } from "react";

const subnav = [
  { id: "customized-research", label: "Customized Research" },
  { id: "methodologies", label: "research methodologies" },
  { id: "analytics", label: "advance analytics" },
  { id: "eyeball-tracking", label: "OUR CREATIVE SOLUTIONS" },
  { id: "retail-research", label: "Retail Research" },
  { id: "technology", label: "Technology Solutions" },
];

export default function SubNav() {
  const [active, setActive] = useState("customized-research");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -55% 0px" },
    );
    subnav.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = document.querySelector(`[data-subnav="${active}"]`);
    const container = element?.parentElement;
    if (element && container)
      container.scrollTo({
        left:
          element.offsetLeft -
          container.clientWidth / 2 +
          element.offsetWidth / 2,
        behavior: "smooth",
      });
  }, [active]);

  return (
    <nav
      aria-label="Services sections"
      className="sticky top-20 z-40 border-y border-border bg-background/95 backdrop-blur-md"
    >
      <div className="flex gap-6 overflow-x-auto px-5 py-4 md:px-10 lg:px-16 scrollbar-thin">
        {subnav.map((item) => (
          <a
            key={item.id}
            data-subnav={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={`shrink-0 whitespace-nowrap border-b-2 pb-1 text-xs font-semibold transition-colors ${
              active === item.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
