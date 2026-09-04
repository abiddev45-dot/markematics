"use client"
import { company } from "@/content/site";
import { RevealText } from "./reveal";
import Link from "next/link";
import { Wordmark } from "./wordmark";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Team", to: "/about" },
      { label: "Careers", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Customized Research", to: "/services" },
      { label: "Retail Research", to: "/services" },
      { label: "Technology Solutions", to: "/services" },
      { label: "Consultancy", to: "/services" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary-deep text-white">
      <div className="shell border-b border-white/12 py-20 md:py-28">
        <div className="eyebrow text-white/50">Let&apos;s work together</div>
        <RevealText
          text="Thank you."
          className="mt-8 block display-xl text-white"
        />
        <a
          href={`mailto:${company.email}`}
          className="link-underline mt-8 inline-block font-display text-xl font-bold tracking-[-0.02em] md:text-3xl"
        >
          {company.email}
        </a>
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-4">
        <div>
          <Wordmark className="text-white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            Full-service market research and consulting. Karachi since{" "}
            {company.since}, with 10+ offices nationwide.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow text-white/45">{col.title}</h4>
            <ul className="mt-6 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className="link-underline text-sm text-white/80"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="eyebrow text-white/45">Contact</h4>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li>
              <a href={`tel:${company.phone}`} className="link-underline">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`https://${company.website}`} className="link-underline">
                {company.website}
              </a>
            </li>
            <li className="max-w-[16rem] text-white/55">{company.address}</li>
          </ul>
          <div className="mt-6 flex gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-white/60">
            <a href="#" className="link-underline">
              LinkedIn
            </a>
            <a href="#" className="link-underline">
              Facebook
            </a>
            <a href="#" className="link-underline">
              X
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/12 py-7 text-[0.7rem] tracking-[0.14em] uppercase text-white/45 md:flex-row md:items-center md:justify-between">
        <span>
          © {new Date().getFullYear()} {company.name}
        </span>
        <div className="flex gap-6">
          <a href="#" className="link-underline">
            Privacy
          </a>
          <a href="#" className="link-underline">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
