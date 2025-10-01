import Navigation from "../components/Navigation";
import Hero from "../components/sections/Hero";
import Expertise from "../components/sections/Expertise";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import ClientResults from "../components/sections/ClientResults";
import SecurityTrust from "../components/sections/SecurityTrust";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Expertise />
      <WhyChooseUs />
      <ClientResults />
      <SecurityTrust />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
