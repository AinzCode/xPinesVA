import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Users, Target, Heart, Award } from 'lucide-react'

export default function OurStory() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 pt-24 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover the journey behind Pines VA and how we've grown to become a trusted partner for businesses worldwide. 
            Learn about our mission, values, and commitment to providing exceptional virtual assistant services.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Started</h2>
            <p className="text-gray-600 text-justify leading-relaxed mb-8">
              At PinesVA, we believe in more than just assistance, we believe in partnership. Founded during the pandemic by Erwin Olivas,
              Ejay Licuanan, and Jim Patrick Ipak in the Philippines, our journey began with providing essential support to the real estate 
              and property management industries. Over time, our commitment to excellence and the trust of our clients led us to expand into 
              medical assistance, where we’ve been proudly serving for the past two years. What sets us apart is our dedication to delivering 
              high-value support that feels personal. We don’t just match you with a virtual assistant, we equip you with a skilled, 
              experienced partner who cares about your success as much as you do. At PinesVA, we thrive on building meaningful, lasting 
              relationships rooted in trust, reliability, and results.
            </p>
            
            <p className="text-gray-600 text-justify  leading-relaxed mb-8">
              Starting with just three dedicated professionals, we focused on quality over quantity. 
              Every virtual assistant we onboard goes through rigorous screening, training, and 
              continuous development to ensure they meet our high standards.
            </p>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Where We Are Today</h2>
            <p className="text-gray-600 text-justify leading-relaxed mb-8">
              Today, Pines VA serves over 500 businesses across various industries, from startups 
              to established enterprises. Our team of specialized virtual assistants has helped 
              our clients save millions of hours and countless resources while scaling their operations efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our guiding principles that drive everything we do at Pines VA.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-blue-100 group-hover:bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <Target className="w-8 h-8 text-blue-600 group-hover:text-blue-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">Our Mission</h3>
              <p className="text-gray-600 group-hover:text-blue-50 leading-relaxed text-lg transition-colors duration-300">
                To provide exceptional, reliable, and human-centered virtual assistance that empowers our clients to 
                focus on what matters most growing their business and achieving their goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-purple-100 group-hover:bg-pink-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <Heart className="w-8 h-8 text-purple-600 group-hover:text-pink-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">Our Vision</h3>
              <p className="text-gray-600 group-hover:text-pink-50 leading-relaxed text-lg transition-colors duration-300">
                To be a trusted global partner in virtual assistance, recognized for our quality support, genuine care,
                and long-lasting client relationships, helping businesses thrive while we grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our team and define our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border-2 border-blue-200 rounded-xl hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-blue-600 transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-blue-100 group-hover:bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Award className="w-8 h-8 text-blue-600 group-hover:text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">Excellence</h3>
              <p className="text-gray-600 group-hover:text-blue-50 transition-colors duration-300">We strive for excellence in every task, every interaction, and every outcome.</p>
            </div>

            <div className="text-center p-6 border-2 border-green-200 rounded-xl hover:bg-gradient-to-br hover:from-green-500 hover:to-green-600 hover:border-green-600 transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-green-100 group-hover:bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Users className="w-8 h-8 text-green-600 group-hover:text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">Collaboration</h3>
              <p className="text-gray-600 group-hover:text-green-50 transition-colors duration-300">We work as true partners with our clients, understanding their unique needs.</p>
            </div>

            <div className="text-center p-6 border-2 border-purple-200 rounded-xl hover:bg-gradient-to-br hover:from-purple-500 hover:to-purple-600 hover:border-purple-600 transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-purple-100 group-hover:bg-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Heart className="w-8 h-8 text-purple-600 group-hover:text-purple-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">Integrity</h3>
              <p className="text-gray-600 group-hover:text-purple-50 transition-colors duration-300">Honest communication and transparent practices form the foundation of our relationships.</p>
            </div>

            <div className="text-center p-6 border-2 border-orange-200 rounded-xl hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 hover:border-orange-600 transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-orange-100 group-hover:bg-orange-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Target className="w-8 h-8 text-orange-600 group-hover:text-orange-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-300">Results</h3>
              <p className="text-gray-600 group-hover:text-orange-50 transition-colors duration-300">We are committed to delivering measurable results that drive business growth.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
