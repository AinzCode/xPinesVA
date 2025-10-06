import dynamic from "next/dynamic";
import Navigation from "../../components/Navigation";
import Hero from "../../components/sections/Hero";
import Expertise from "../../components/sections/Expertise";

// Lazy load below-the-fold components to improve initial page load
const WhyChooseUs = dynamic(() => import("../../components/sections/WhyChooseUs"), {
  ssr: true,
});
const ClientResults = dynamic(() => import("../../components/sections/ClientResults"), {
  ssr: true,
});
const SecurityTrust = dynamic(() => import("../../components/sections/SecurityTrust"), {
  ssr: true,
});
const TestimonialsMarquee = dynamic(() => import("../../components/sections/TestimonialsMarquee"), {
  ssr: true,
});
const FAQ = dynamic(() => import("../../components/sections/FAQ"), {
  ssr: true,
});
const CTA = dynamic(() => import("../../components/sections/CTA"), {
  ssr: true,
});
const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: true,
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Expertise />
      <WhyChooseUs />
      <ClientResults />
      <SecurityTrust />
      <TestimonialsMarquee />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}