import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, getArticle, type Block } from "@/lib/resources/articles";
import { SITE_NAME, SITE_URL, jsonLd } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Pharos Security`,
    description: article.description,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.published,
      locale: "en_NZ",
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function renderBlock(block: Block, key: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={key} className="text-lg leading-relaxed text-charcoal/80">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={key} className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-charcoal/80">
              <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-teal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "qa":
      return (
        <ol key={key} className="space-y-6">
          {block.items.map((item, index) => (
            <li key={item.q} className="border-t border-charcoal/10 pt-5">
              <p className="flex gap-3 font-heading text-lg font-semibold leading-snug text-navy">
                <span className="flex-none text-teal">{index + 1}.</span>
                <span>{item.q}</span>
              </p>
              <p className="mt-2 pl-7 text-base leading-relaxed text-charcoal/70">{item.a}</p>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <p
          key={key}
          className="rounded-2xl border border-teal/30 bg-mist px-6 py-5 text-base leading-relaxed text-charcoal/80"
        >
          {block.text}
        </p>
      );
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    inLanguage: "en-NZ",
    mainEntityOfPage: `${SITE_URL}/resources/${article.slug}`,
    author: { "@type": "Person", name: "Jason Hill" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    citation: article.sources.map((source) => source.url),
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        />
        <article>
          <header className="bg-grain relative bg-navy pt-16 pb-16 md:pt-20 md:pb-20">
            <div className="container-px relative z-10 mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="text-sm text-white/60">
                <Link href="/resources" className="transition-colors hover:text-white">
                  Guides
                </Link>
              </nav>
              <h1 className="mt-4 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/70">{article.description}</p>
              <p className="mt-6 text-sm text-white/55">
                Jason Hill &middot; <time dateTime={article.published}>{formatDate(article.published)}</time>{" "}
                &middot; {article.readingMinutes} minute read
              </p>
            </div>
          </header>

          <div className="bg-white py-16 md:py-20">
            <div className="container-px mx-auto max-w-3xl space-y-12">
              {article.sections.map((section, sectionIndex) => (
                <section key={section.heading ?? sectionIndex} className="space-y-5">
                  {section.heading && (
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-navy">
                      {section.heading}
                    </h2>
                  )}
                  {section.blocks.map(renderBlock)}
                </section>
              ))}

              <aside className="rounded-2xl border border-charcoal/10 bg-white p-7 shadow-[0_2px_14px_-6px_rgba(7,26,45,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal">Next step</p>
                <Link
                  href={article.next.href}
                  className="mt-2 inline-block font-heading text-lg font-semibold text-navy hover:text-teal"
                >
                  {article.next.label} <span aria-hidden="true">&rarr;</span>
                </Link>
                <p className="mt-2 text-base leading-relaxed text-charcoal/70">{article.next.text}</p>
              </aside>

              <section aria-labelledby="sources-heading" className="border-t border-charcoal/10 pt-8">
                <h2 id="sources-heading" className="font-heading text-base font-semibold text-navy">
                  Sources
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {article.sources.map((source) => (
                    <li key={source.url} className="text-sm leading-relaxed text-charcoal/70">
                      <a
                        href={source.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="underline decoration-charcoal/25 underline-offset-2 hover:text-navy hover:decoration-teal"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-charcoal/55">
                  General guidance only, not advice about your specific
                  systems. No single step, or set of steps, removes all
                  risk.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
