const questions = [
  "Are we actually secure, or does it just feel that way?",
  "How do I know our IT provider has everything covered?",
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
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Questions we hear from business owners every week.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
            Most businesses don&apos;t need a security department. They need
            to know whether the important protections are really in place,
            where the meaningful gaps are, and what to fix first.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((question) => (
            <div key={question} className="bg-mist p-8">
              <p className="font-heading text-lg font-semibold leading-snug text-navy">
                {question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
