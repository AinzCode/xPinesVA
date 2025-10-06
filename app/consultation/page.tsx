'use client'

import { ArrowRight, Phone, Mail } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function ConsultationPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#097969]/20 pt-24 lg:pt-32 pb-12 overflow-hidden">
        {/* Subtle Wavy Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern-consultation" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 Q25,10 50,25 T100,25" stroke="#059669" strokeWidth="0.5" fill="none" opacity="0.6"/>
                <path d="M0,35 Q25,20 50,35 T100,35" stroke="#34d399" strokeWidth="0.3" fill="none" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern-consultation)"/>
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-6">Get Your Free Consultation</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to experience the difference a premium virtual assistant can make? 
            Get in touch with us today for a free consultation and discover how we can help scale your business.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Start Today?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-600" />
                    Free consultation with our experts
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-600" />
                    Custom solution tailored to your needs
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-600" />
                    Quick 48-hour setup process
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-600" />
                    No long-term contracts required
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+1234567890"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  +1 (234) 567-8900
                </a>
                <a
                  href="mailto:hrteam@pinesva.com"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  hrteam@pinesva.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Get Your Free Consultation
              </h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Age"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expertise Needed</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">Select a service</option>
                    <option value="gva">General Virtual Assistant</option>
                    <option value="eva">Executive Virtual Assistant</option>
                    <option value="isa">Inside Sales Agent</option>
                    <option value="mva">Medical Virtual Assistant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your company name"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4 text-center">
                We'll respond within 2 hours during business hours
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-3">Already a client?</p>
                <Link
                  href="/testimonials/submit"
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors text-sm"
                >
                  Share Your Experience →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}