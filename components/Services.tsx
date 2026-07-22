import {
  ChecklistIcon,
  CompassArrowIcon,
  CompassIcon,
  GridIcon,
  LifebuoyIcon,
  MailIcon,
  MapIcon,
  PeopleIcon,
} from "./icons";

const featured = [
  {
    icon: CompassIcon,
    title: "Cyber Risk Review",
    description:
      "A clear, independent assessment of where your business stands today and the risks that matter most for your operation.",
  },
  {
    icon: GridIcon,
    title: "Microsoft 365 Security Basics Review",
    description:
      "A focused check of your Microsoft 365 environment against sensible, well-understood security fundamentals.",
  },
];

const clusters = [
  {
    label: "Strengthen",
    items: [
      {
        icon: MapIcon,
        title: "SME Security Uplift Plan",
        description:
          "A practical, prioritised plan to strengthen your defences without unnecessary cost or complexity.",
      },
      {
        icon: ChecklistIcon,
        title: "Security Policy and Checklist Starter Pack",
        description:
          "Straightforward policies and checklists tailored to how your business actually works day to day.",
      },
    ],
  },
  {
    label: "Prepare & respond",
    items: [
      {
        icon: LifebuoyIcon,
        title: "Incident Readiness Workshop",
        description:
          "A guided session to prepare your team with a clear, calm plan for how to respond if something goes wrong.",
      },
      {
        icon: MailIcon,
        title: "Email and Phishing Readiness",
        description:
          "Practical steps to reduce your exposure to the most common way New Zealand businesses are compromised.",
      },
    ],
  },
  {
    label: "Build the habit",
    items: [
      {
        icon: PeopleIcon,
        title: "Staff Cyber Awareness Sessions",
        description:
          "Plain-language training that builds safer everyday habits across your team, without jargon or scare tactics.",
      },
      {
        icon: CompassArrowIcon,
        title: "Ongoing Cyber Advisor Support",
        description:
          "Continued access to independent, practical advice as your business, tools, and risks evolve over time.",
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-6 bg-teal" />
            <span className="text-xs font-semibold uppercase tracking-wide text-navy">
              Services
            </span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Practical support, matched to how SMEs actually operate.
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
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl border border-charcoal/10 bg-white p-9 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_45px_-25px_rgba(7,26,45,0.35)] sm:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-200 group-hover:bg-teal/15 group-hover:text-teal">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/70">
            Also part of an engagement
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
