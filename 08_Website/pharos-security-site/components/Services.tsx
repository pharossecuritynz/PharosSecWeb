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

const services = [
  {
    icon: CompassIcon,
    title: "Cyber Risk Review",
    description:
      "A clear, independent assessment of where your business stands today and the risks that matter most for your operation.",
  },
  {
    icon: MapIcon,
    title: "SME Security Uplift Plan",
    description:
      "A practical, prioritised plan to strengthen your defences without unnecessary cost or complexity.",
  },
  {
    icon: GridIcon,
    title: "Microsoft 365 Security Basics Review",
    description:
      "A focused check of your Microsoft 365 environment against sensible, well-understood security fundamentals.",
  },
  {
    icon: MailIcon,
    title: "Email and Phishing Readiness",
    description:
      "Practical steps to reduce your exposure to the most common way New Zealand businesses are compromised.",
  },
  {
    icon: LifebuoyIcon,
    title: "Incident Readiness Workshop",
    description:
      "A guided session to prepare your team with a clear, calm plan for how to respond if something goes wrong.",
  },
  {
    icon: PeopleIcon,
    title: "Staff Cyber Awareness Sessions",
    description:
      "Plain-language training that builds safer everyday habits across your team, without jargon or scare tactics.",
  },
  {
    icon: ChecklistIcon,
    title: "Security Policy and Checklist Starter Pack",
    description:
      "Straightforward policies and checklists tailored to how your business actually works day to day.",
  },
  {
    icon: CompassArrowIcon,
    title: "Ongoing Cyber Advisor Support",
    description:
      "Continued access to independent, practical advice as your business, tools, and risks evolve over time.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-teal">
            Services
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Practical support, matched to how SMEs actually operate.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            Every engagement is scoped to your size, budget, and risk,
            not a one-size-fits-all enterprise framework.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_45px_-25px_rgba(7,26,45,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-navy transition-colors duration-200 group-hover:bg-teal/15 group-hover:text-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-xs font-semibold text-charcoal/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-charcoal/65">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
