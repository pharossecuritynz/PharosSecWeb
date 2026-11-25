import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Evidence from "@/components/Evidence";
import Problem from "@/components/Problem";
import Weaknesses from "@/components/Weaknesses";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Methodology from "@/components/Methodology";
import BuiltForSMEs from "@/components/BuiltForSMEs";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, jsonLd } from "@/lib/site";

const organisationData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    "Independent cyber security reviews and practical guidance for New Zealand small and medium businesses, working alongside their existing IT provider.",
  areaServed: { "@type": "Country", name: "New Zealand" },
  founder: { "@type": "Person", name: "Jason Hill" },
  knowsAbout: [
    "Small business cyber security",
    "Security assessment",
    "Microsoft 365 security",
    "Cyber insurance security requirements",
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organisationData) }}
        />
        <Hero />
        <Evidence />
        <Problem />
        <Weaknesses />
        <Services />
        <Process />
        <Methodology />
        <BuiltForSMEs />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
