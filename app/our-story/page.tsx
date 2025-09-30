import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Users, Target, Heart, Award } from 'lucide-react'

export default function OurStory() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Born from the vision to revolutionize business operations through premium virtual assistance, 
            Pines VA has grown into a trusted partner for businesses worldwide.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Started</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              In 2020, our founders recognized a critical gap in the virtual assistance industry. 
              While many companies offered basic VA services, few provided the premium, specialized 
              support that growing businesses truly needed. We set out to change that.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              Starting with just three dedicated professionals, we focused on quality over quantity. 
              Every virtual assistant we onboard goes through rigorous screening, training, and 
              continuous development to ensure they meet our high standards.
            </p>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Where We Are Today</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Today, Pines VA serves over 500 businesses across various industries, from startups 
              to established enterprises. Our team of specialized virtual assistants has helped 
              our clients save millions of hours and countless resources while scaling their operations efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our guiding principles that drive everything we do at Pines VA.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower businesses worldwide by providing exceptional virtual assistant services 
                that drive growth, efficiency, and success. We believe every business deserves access 
                to premium support that helps them focus on what matters most - their core objectives.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To be the global leader in premium virtual assistant services, known for our 
                unwavering commitment to quality, innovation, and client success. We envision 
                a world where businesses can achieve unlimited growth with the right support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our team and define our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every task, every interaction, and every outcome.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">We work as true partners with our clients, understanding their unique needs.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">Honest communication and transparent practices form the foundation of our relationships.</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Results</h3>
              <p className="text-gray-600">We are committed to delivering measurable results that drive business growth.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}