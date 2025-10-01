import Navigation from "../components/Navigation";
import Hero from "../components/sections/Hero";
import Expertise from "../components/sections/Expertise";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import HowItWorks from "../components/sections/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import SocialSpaces from "../components/sections/SocialSpaces";
import CTA from "../components/sections/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Expertise />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <SocialSpaces />
      <CTA />
      <Footer />
    </div>
  );
}
