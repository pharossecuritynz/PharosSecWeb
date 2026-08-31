const questions = [
  "Are we actually secure, or does it just feel that way?",
  "How do I know our IT support has everything covered?",
  "What should we improve first?",
  "A customer wants evidence of our security. What do we give them?",
  "Our insurer sent a cyber questionnaire we don't fully understand.",
  "Are our backups actually recoverable, not just running?",
];

export default function Problem() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Questions we hear from business owners every week.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            Most businesses don&apos;t need a security department. They need
            to know whether the important protections are really in place,
            where the meaningful gaps are, and what to fix first.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((question) => (
            <div
              key={question}
              className="group relative rounded-2xl border border-charcoal/10 bg-white p-8 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_45px_-25px_rgba(7,26,45,0.35)]"
            >
              <span
                aria-hidden="true"
                className="font-heading text-4xl font-bold leading-none text-teal/30 transition-colors duration-200 group-hover:text-teal/50"
              >
                &ldquo;
              </span>
              <p className="mt-3 font-heading text-lg font-semibold leading-snug text-navy">
                {question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
