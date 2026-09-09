const credentials = [
  "26 years in IT, roughly 15 of them focused substantially on cyber security and security operations",
  "Most recently headed security operations at timbre Digital, across SIEM, EDR, endpoint, network, email, identity, and cloud platforms",
  "Technical training through SANS, Palo Alto Networks, and Splunk",
  "Volunteers with Trace Labs, contributing OSINT research to missing-persons search efforts",
];

export default function About() {
  return (
    <section id="about" className="bg-grain relative bg-midnight py-24 md:py-32">
      <div className="container-px relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A steady point of reference for New Zealand SMEs.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/65">
              <p>
                Pharos Security is a boutique cyber security advisory
                practice built specifically for New Zealand small and
                medium businesses, led by Jason Hill.
              </p>
              <p>
                Cyber incidents aren&apos;t theoretical to Jason. Years spent
                working around the systems, alerts, investigations, and
                real-world attempts that organisations face every day sit
                behind every recommendation Pharos makes, translated into
                clear, achievable action grounded in how your business
                actually runs, not theoretical best practice.
              </p>
              <p>
                Like a beacon guiding a course through unfamiliar water,
                our role is to bring clarity and steady direction to a
                subject that can otherwise feel uncertain.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-10 rounded-full bg-teal/10 blur-[100px]"
            />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-9 sm:p-10">
              <h3 className="font-heading text-lg font-semibold text-white">
                Jason Hill, founder
              </h3>
              <ul className="mt-7 space-y-5">
                {credentials.map((credential) => (
                  <li key={credential} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-teal"
                    />
                    <span className="text-base leading-relaxed text-white/75">
                      {credential}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
