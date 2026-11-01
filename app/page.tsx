import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { Process } from "@/components/Process";
import { Trust } from "@/components/Trust";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { CaseStudies } from "@/components/CaseStudies";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Pillars />
        <Process />
        <WhatWeBuild />
        <CaseStudies />
        <Trust />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
