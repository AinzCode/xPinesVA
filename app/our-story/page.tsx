import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Users, Target, Heart, Award } from 'lucide-react'

export default function OurStory() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#F9F9F7] pt-24 lg:pt-32 pb-12 overflow-hidden">
        {/* Subtle Wavy Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern-story" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 Q25,10 50,25 T100,25" stroke="#4C8B4A" strokeWidth="0.5" fill="none" opacity="0.6"/>
                <path d="M0,35 Q25,20 50,35 T100,35" stroke="#C7A97B" strokeWidth="0.3" fill="none" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern-story)"/>
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-[#2D2D2D] mb-6">Our Story</h1>
          <p className="text-xl text-[#2D2D2D]/70 leading-relaxed">
            Discover the journey behind PinesVA and how we've grown to become a trusted partner for businesses worldwide. 
            Learn about our mission, values, and commitment to providing exceptional virtual assistant services.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Story Text */}
            <div className="prose prose-lg">
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">How We Started</h2>
              <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
                At PinesVA, we believe in more than just assistance, we believe in partnership. Founded during the pandemic by Erwin Olivas,
                Ejay Licuanan, and Jim Patrick Ipak in the Philippines, our journey began with providing essential support to the real estate 
                and property management industries. Over time, our commitment to excellence and the trust of our clients led us to expand into 
                medical assistance, where we've been proudly serving for the past two years.
              </p>
              
              <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
                What sets us apart is our dedication to delivering high-value support that feels personal. We don't just match you with a virtual assistant, 
                we equip you with a skilled, experienced partner who cares about your success as much as you do. At PinesVA, we thrive on building meaningful, 
                lasting relationships rooted in trust, reliability, and results.
              </p>
            </div>

            {/* Story Stats */}
            <div className="bg-gradient-to-br from-[#F9F9F7] to-[#F4EFE7] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6 text-center">Our Journey in Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#4C8B4A] mb-2">500+</div>
                  <div className="text-sm text-[#2D2D2D]/70">Clients Served</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#C7A97B] mb-2">2+</div>
                  <div className="text-sm text-[#2D2D2D]/70">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#4C8B4A] mb-2">24/7</div>
                  <div className="text-sm text-[#2D2D2D]/70">Support</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#C7A97B] mb-2">100%</div>
                  <div className="text-sm text-[#2D2D2D]/70">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Today Section */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">Our Evolution</h2>
            <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
              As our client base grew, so did our understanding of what businesses truly needed. We evolved from a simple staffing solution 
              to a comprehensive virtual assistance platform. Our expansion into healthcare marked a pivotal moment - we developed specialized 
              HIPAA-compliant processes, medical billing expertise, and patient care protocols that set new industry standards.
              Ejay Licuanan, and Jim Patrick Ipak in the Philippines, our journey began with providing essential support to the real estate 
              and property management industries. Over time, our commitment to excellence and the trust of our clients led us to expand into 
              medical assistance, where we’ve been proudly serving for the past two years. What sets us apart is our dedication to delivering 
              high-value support that feels personal. We don’t just match you with a virtual assistant, we equip you with a skilled, 
              experienced partner who cares about your success as much as you do. At PinesVA, we thrive on building meaningful, lasting 
              relationships rooted in trust, reliability, and results.
            </p>
            
            <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
              Innovation became our driving force. We invested in advanced training programs, implemented cutting-edge project management systems, 
              and created proprietary matching algorithms to ensure perfect client-VA partnerships. Our commitment to continuous improvement 
              means we're constantly adapting to emerging technologies and evolving business needs.
            </p>
            
            <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
              What started as emergency pandemic support transformed into a sustainable business model that prioritizes long-term relationships 
              over short-term gains. Today, our evolution continues as we explore AI integration, expand our service offerings, and maintain 
              our position as industry leaders in virtual assistance excellence.
            </p>
            
              <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">Our Growth & Impact</h2>
              <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
                Today, PinesVA serves over 500 businesses across various industries, from startups 
                to established enterprises. Our team of specialized virtual assistants has helped 
                our clients save millions of hours and countless resources while scaling their operations efficiently.
              </p>
              
              <p className="text-[#2D2D2D]/80 text-justify leading-relaxed mb-8">
                Our growth trajectory reflects the trust businesses place in our services. From handling basic administrative tasks 
                to managing complex healthcare operations, we've proven that virtual assistance can be both personal and professional. 
                Every success story drives us to reach new heights of excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Culture Section */}
      <section className="py-16 bg-gradient-to-br from-[#F9F9F7] to-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4">Our Culture & Approach</h2>
            <p className="text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto">
              What makes PinesVA different is our commitment to excellence and personal touch in everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-[#4C8B4A]/20">
              <div className="bg-[#4C8B4A]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#4C8B4A]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">People First</h3>
              <p className="text-[#2D2D2D]/70 leading-relaxed">
                We prioritize building genuine relationships with both our clients and virtual assistants, ensuring everyone feels valued and supported.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-[#C7A97B]/20">
              <div className="bg-[#C7A97B]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-[#C7A97B]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Quality Driven</h3>
              <p className="text-[#2D2D2D]/70 leading-relaxed">
                Every process, every interaction, and every outcome is measured against our high standards for quality and excellence.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-[#4C8B4A]/20">
              <div className="bg-[#4C8B4A]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#4C8B4A]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Results Focused</h3>
              <p className="text-[#2D2D2D]/70 leading-relaxed">
                We measure our success by your success, focusing on delivering measurable results that drive your business forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-12 bg-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4">Mission & Vision</h2>
            <p className="text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto">
              Our guiding principles that drive everything we do at PinesVA.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:bg-gradient-to-br hover:from-[#4C8B4A] hover:to-[#4C8B4A]/80 hover:text-white transition-all duration-300 transform hover:scale-105 group border border-[#4C8B4A]/20">
              <div className="bg-[#4C8B4A]/10 group-hover:bg-[#4C8B4A]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <Target className="w-8 h-8 text-[#4C8B4A] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2D2D] group-hover:text-white mb-4 transition-colors duration-300">Our Mission</h3>
              <p className="text-[#2D2D2D]/80 group-hover:text-white leading-relaxed text-lg transition-colors duration-300">
                To provide exceptional, reliable, and human-centered virtual assistance that empowers our clients to 
                focus on what matters most growing their business and achieving their goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:bg-gradient-to-br hover:from-[#C7A97B] hover:to-[#C7A97B]/80 hover:text-white transition-all duration-300 transform hover:scale-105 group border border-[#C7A97B]/20">
              <div className="bg-[#C7A97B]/10 group-hover:bg-[#C7A97B]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <Heart className="w-8 h-8 text-[#C7A97B] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2D2D] group-hover:text-white mb-4 transition-colors duration-300">Our Vision</h3>
              <p className="text-[#2D2D2D]/80 group-hover:text-white leading-relaxed text-lg transition-colors duration-300">
                To be a trusted global partner in virtual assistance, recognized for our quality support, genuine care,
                and long-lasting client relationships, helping businesses thrive while we grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Quote Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#4C8B4A]/5 to-[#C7A97B]/5 rounded-2xl p-12 border border-[#4C8B4A]/20">
            <div className="mb-8">
              <svg className="w-12 h-12 text-[#4C8B4A] mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            <blockquote className="text-2xl font-medium text-[#2D2D2D] mb-6 italic leading-relaxed">
              "Our vision has always been simple: to build a company where excellence meets genuine care. 
              Every client relationship we nurture and every virtual assistant we train reflects our commitment 
              to creating meaningful partnerships that drive real business growth."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-[#4C8B4A] rounded-full flex items-center justify-center text-white font-bold">
                E
              </div>
              <div className="text-left">
                <div className="font-bold text-[#2D2D2D]">Erwin Olivas</div>
                <div className="text-[#2D2D2D]/70 text-sm">Co-Founder & CEO, PinesVA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F9F9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4">Our Core Values</h2>
            <p className="text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto">
              The principles that guide our team and define our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border-2 border-[#4C8B4A]/20 rounded-xl hover:bg-gradient-to-br hover:from-[#4C8B4A] hover:to-[#4C8B4A]/80 hover:border-[#4C8B4A] transition-all duration-300 transform hover:scale-105 group bg-white">
              <div className="bg-[#4C8B4A]/10 group-hover:bg-[#4C8B4A]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Award className="w-8 h-8 text-[#4C8B4A] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] group-hover:text-white mb-3 transition-colors duration-300">Excellence</h3>
              <p className="text-[#2D2D2D]/70 group-hover:text-white transition-colors duration-300">We strive for excellence in every task, every interaction, and every outcome.</p>
            </div>

            <div className="text-center p-6 border-2 border-[#C7A97B]/20 rounded-xl hover:bg-gradient-to-br hover:from-[#C7A97B] hover:to-[#C7A97B]/80 hover:border-[#C7A97B] transition-all duration-300 transform hover:scale-105 group bg-white">
              <div className="bg-[#C7A97B]/10 group-hover:bg-[#C7A97B]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Users className="w-8 h-8 text-[#C7A97B] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] group-hover:text-white mb-3 transition-colors duration-300">Collaboration</h3>
              <p className="text-[#2D2D2D]/70 group-hover:text-white transition-colors duration-300">We work as true partners with our clients, understanding their unique needs.</p>
            </div>

            <div className="text-center p-6 border-2 border-[#4C8B4A]/20 rounded-xl hover:bg-gradient-to-br hover:from-[#4C8B4A] hover:to-[#4C8B4A]/80 hover:border-[#4C8B4A] transition-all duration-300 transform hover:scale-105 group bg-white">
              <div className="bg-[#4C8B4A]/10 group-hover:bg-[#4C8B4A]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Heart className="w-8 h-8 text-[#4C8B4A] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] group-hover:text-white mb-3 transition-colors duration-300">Integrity</h3>
              <p className="text-[#2D2D2D]/70 group-hover:text-white transition-colors duration-300">Honest communication and transparent practices form the foundation of our relationships.</p>
            </div>

            <div className="text-center p-6 border-2 border-[#C7A97B]/20 rounded-xl hover:bg-gradient-to-br hover:from-[#C7A97B] hover:to-[#C7A97B]/80 hover:border-[#C7A97B] transition-all duration-300 transform hover:scale-105 group bg-white">
              <div className="bg-[#C7A97B]/10 group-hover:bg-[#C7A97B]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Target className="w-8 h-8 text-[#C7A97B] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D] group-hover:text-white mb-3 transition-colors duration-300">Results</h3>
              <p className="text-[#2D2D2D]/70 group-hover:text-white transition-colors duration-300">We are committed to delivering measurable results that drive business growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-[#4C8B4A] to-[#4C8B4A]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join the hundreds of businesses that have transformed their operations with PinesVA. 
            Let's build a partnership that grows with your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/connect"
              className="bg-white text-[#4C8B4A] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Your Journey
              <Target className="w-5 h-5" />
            </a>
            <a
              href="/guides"
              className="bg-[#C7A97B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C7A97B]/90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Learn How It Works
              <Award className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
