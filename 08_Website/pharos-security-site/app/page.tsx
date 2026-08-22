import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Methodology from "@/components/Methodology";
import BuiltForSMEs from "@/components/BuiltForSMEs";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
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
