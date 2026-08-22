"use client";

import { useState } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy">
      <div className="container-px mx-auto flex h-18 max-w-6xl items-center justify-between py-4">
        <Link href="#top" className="flex items-center gap-2.5 text-white">
          <LogoMark className="h-8 w-auto" />
          <span className="font-heading text-lg font-semibold tracking-tight">
            Pharos Security
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-cyan md:inline-block"
        >
          Book a 15-minute conversation
        </a>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-cyan"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy md:hidden">
          <nav className="container-px mx-auto flex max-w-6xl flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
