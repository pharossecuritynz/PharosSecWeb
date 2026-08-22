import Link from "next/link";
import LogoMark from "./LogoMark";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const serviceLinks = [
  "Independent Security Review",
  "IT Provider Security Assurance",
  "Secure Foundations",
  "Security Adviser",
];

export default function Footer() {
  return (
    <footer className="relative bg-midnight">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container-px mx-auto max-w-6xl py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <LogoMark className="h-7 w-auto" />
              <span className="font-heading text-base font-semibold tracking-tight">
                Pharos Security
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Independent cyber security advisory for New Zealand small and
              medium businesses.
            </p>
            <p className="mt-4 text-sm text-white/55">
              Clear guidance. Safer business.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              We don&apos;t sell software or managed IT services, and we
              don&apos;t earn commissions from what we recommend.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Navigate
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Services
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm leading-relaxed text-white/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Get in touch
            </p>
            <a
              href="mailto:pharos.security.nz@gmail.com?subject=Cyber%20security%20enquiry"
              className="mt-4 block transition-colors hover:text-white"
            >
              pharos.security.nz@gmail.com
            </a>
            <p className="mt-2">New Zealand</p>
            <Link
              href="/book-a-conversation"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Book a 15-minute conversation
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Pharos Security. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <span>Boutique cyber security advisory, based in New Zealand.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
