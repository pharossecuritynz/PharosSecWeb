import Link from "next/link";
import {
  ChecklistIcon,
  CompassArrowIcon,
  CompassIcon,
  GridIcon,
  LifebuoyIcon,
  MapIcon,
  PeopleIcon,
} from "./icons";

const featured = [
  {
    icon: CompassIcon,
    title: "Independent Security Review",
    description:
      "An independent review of the security controls protecting your business, followed by a clear, prioritised plan for improvement.",
    price: "From $1,800",
  },
  {
    icon: PeopleIcon,
    title: "IT Provider Security Assurance",
    description:
      "Independent verification that the important security outcomes are actually in place, without putting your IT provider on trial.",
    price: "From $1,500",
    href: "/it-provider-security-assurance",
  },
];

const clusters = [
  {
    label: "Start light",
    items: [
      {
        icon: ChecklistIcon,
        title: "Free Security Health Check",
        description:
          "A free, ten-minute self-check on the basics, with an honest read on where you stand and no obligation.",
        price: "Free",
      },
      {
        icon: GridIcon,
        title: "Exposure Snapshot",
        description:
          "A fast, independent look at what your business looks like from the outside, without touching anything internal.",
        price: "From $400",
      },
    ],
  },
  {
    label: "Act on findings",
    items: [
      {
        icon: MapIcon,
        title: "Secure Foundations",
        description:
          "A coordinated period where we help you and your IT support work through the highest-priority fixes, and check they actually happen.",
        price: "From $2,000",
      },
      {
        icon: LifebuoyIcon,
        title: "Incident Readiness",
        description:
          "A clear, calm plan for what to do if something goes wrong, worked out before it happens, not during.",
        price: "From $900",
      },
    ],
  },
  {
    label: "Stay ahead",
    items: [
      {
        icon: CompassArrowIcon,
        title: "Security Adviser",
        description:
          "Independent security guidance without employing a security team, as your business, tools, and risks change.",
        price: "From $500/month",
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Independent assurance, not a list of scans.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            Every engagement is scoped to your size, budget, and risk,
            not a one-size-fits-all enterprise framework. Most businesses
            start with one of these two.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((service) => {
            const Icon = service.icon;
            const cardClass =
              "group relative rounded-2xl border border-charcoal/10 bg-white p-9 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_45px_-25px_rgba(7,26,45,0.35)] sm:p-10";
            const content = (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-200 group-hover:bg-teal/15 group-hover:text-teal">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  {service.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-teal">
                  {service.price}
                </p>
              </>
            );
            return service.href ? (
              <Link key={service.title} href={service.href} className={cardClass}>
                {content}
              </Link>
            ) : (
              <div key={service.title} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/70">
            The rest of the journey
          </span>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {clusters.map((cluster) => (
              <div key={cluster.label}>
                <h4 className="font-heading text-sm font-semibold text-navy">
                  {cluster.label}
                </h4>
                <div className="mt-4 space-y-5">
                  {cluster.items.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div key={service.title} className="flex items-start gap-3.5">
                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-mist text-navy">
                          <Icon className="h-[18px] w-[18px]" />
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-navy">
                            {service.title}
                          </h5>
                          <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                            {service.description}
                          </p>
                          <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
                            {service.price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-sm text-charcoal/55">
          Prices are indicative, excl. GST, and scaled to your business size
          and complexity. A fixed quote is confirmed after a short
          conversation, not on the spot.
        </p>
      </div>
    </section>
  );
}
