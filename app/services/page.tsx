import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Services from '../../components/sections/Services'

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#097969]/20 pt-24 lg:pt-32 pb-12 overflow-hidden">
        {/* Subtle Wavy Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern-services" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 Q25,10 50,25 T100,25" stroke="#059669" strokeWidth="0.5" fill="none" opacity="0.6"/>
                <path d="M0,35 Q25,20 50,35 T100,35" stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern-services)"/>
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover our comprehensive range of virtual assistant services designed to help your business thrive. 
            From real estate support to medical assistance, we provide tailored solutions for every industry.
          </p>
        </div>
      </section>

      {/* Services Component */}
      <Services />
      
      <Footer />
    </div>
  )
}
