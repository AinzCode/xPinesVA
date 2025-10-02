import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Services from '../../components/sections/Services'

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Our Services</h1>
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