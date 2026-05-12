import { PrefillProvider } from "@/lib/prefill-context";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatWeDo } from "@/components/WhatWeDo";
import { ForWho } from "@/components/ForWho";
import { QuienesSomos } from "@/components/QuienesSomos";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <PrefillProvider>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <ForWho />
        <QuienesSomos />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </PrefillProvider>
  );
}
