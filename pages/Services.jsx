"use client";
import { sections } from "@/content/services-data";
import { ButtonLink } from "@/components/site/ui";
import SubNav from "@/components/site/subnav";

const verticalTargets = [
  "retail-research",
  "eyeball-tracking",
  "customized-research",
  "technology",
];

function DocumentBlock({ block }) {
  const [first = "", ...remaining] = block.lines;
  const heading =
    first.length < 100 &&
    !first.startsWith("-") &&
    !first.startsWith("(") &&
    !/^\d+\./.test(first);
  const lines = heading ? remaining : block.lines;
  return (
    <div
      className={`min-w-0 border-t border-border pt-7 ${
        !heading || block.lines.some((line) => line.length > 220)
          ? "md:col-span-2"
          : ""
      }`}
    >
      {heading && (
        <h3 className="mb-5 text-xl leading-snug tracking-normal md:text-2xl">
          {first}
        </h3>
      )}
      <div className="space-y-3">
        {lines.map((line, index) => (
          <p
            key={index}
            className={`max-w-4xl wrap-break-word text-sm leading-relaxed md:text-base ${
              line.startsWith("-") || /^\d+\./.test(line)
                ? "pl-4 -indent-4"
                : ""
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const verticals = sections[0];
  return (
    <>
      <section className="shell pb-16 pt-36 md:pb-20 md:pt-48">
        <p className="eyebrow text-primary">Services</p>
        <h1 className="mt-6 text-4xl leading-tight tracking-normal md:text-6xl">
          {verticals?.title}
        </h1>
        <div className="mt-12 grid rule-grid sm:grid-cols-2 lg:grid-cols-4">
          {verticals?.blocks
            .flatMap((block) => block.lines)
            .map((title, index) => (
              <a
                key={title}
                href={`#${verticalTargets[index] ?? "customized-research"}`}
                className="group min-w-0 p-6 md:p-8"
              >
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-8 text-xl leading-snug tracking-normal transition-colors group-hover:text-primary">
                  {title}
                </h2>
              </a>
            ))}
        </div>
      </section>

      <SubNav />

      {sections.slice(1).map((section, index) => {
        const dark = index >= 3 && index <= 8;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-36 border-b border-border py-16 md:py-24 ${
              dark
                ? "dark bg-background text-foreground"
                : index % 2
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-background text-foreground"
            }`}
          >
            <div className="shell">
              {section.id === "eyeball-tracking" && (
                <span id="creative-solutions" className="block scroll-mt-36" />
              )}
              <div className="grid gap-6 lg:grid-cols-[0.3fr_1fr] lg:gap-14">
                <div className="flex items-baseline gap-4 lg:block">
                  <span className="font-mono text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="min-w-0">
                  <h2 className="max-w-3xl wrap-break-word text-3xl leading-tight tracking-normal md:text-4xl lg:text-5xl">
                    {section.title}
                  </h2>
                  <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2">
                    {section.blocks.map((block, blockIndex) => (
                      <DocumentBlock key={blockIndex} block={block} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="shell py-16 md:py-24">
        <ButtonLink href="/contact">Contact Us</ButtonLink>
      </section>
    </>
  );
}
