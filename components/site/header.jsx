"use client"
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Wordmark } from "./wordmark";
import { Magnetic } from "./magnetic";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-background/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="shell flex h-20 items-center justify-between">
          <Link href="/" aria-label="Markematics home">
            <Wordmark className="text-ink" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`relative py-1 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                    active ? "text-primary" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-500 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Link
                href="/contact"
                className="hidden bg-primary px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-ink sm:inline-block"
              >
                Let&lsquo;s Talk
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="border border-ink/20 p-3 text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 bg-ink text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex h-20 items-center justify-between">
              <Wordmark className="text-white" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="border border-white/25 p-3"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <motion.nav
              className="shell mt-10 flex flex-col"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                },
              }}
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  variants={{
                    hidden: { y: 60, opacity: 0 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="border-b border-white/12"
                >
                  <Link
                    href={item.to}
                    className="flex items-baseline gap-5 py-6 font-display text-[2.5rem] leading-none font-extrabold tracking-[-0.04em]"
                  >
                    <span className="font-mono text-xs tracking-widest text-white/35">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
