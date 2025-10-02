'use client'

import { ArrowRight, Phone, Mail } from 'lucide-react'


export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-800 to-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Let&apos;s Connect and Transform Your Business
            </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Ready to experience the difference a premium virtual assistant can make? 
              Get in touch with us today for a free consultation and discover how we can help scale your business.
            </p>
          </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Why Start Today?</h3>
                <ul className="space-y-3 text-green-100">
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-300" />
                    Free consultation with our experts
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-300" />
                    Custom solution tailored to your needs
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-300" />
                    Quick 48-hour setup process
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-green-300" />
                    No long-term contracts required
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+1234567890"
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  +1 (234) 567-8900
                </a>
                <a
                  href="mailto:hrteam@pinesva.com"
                  className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
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
                  <option value="vma">Virtual Medical Assistant</option>
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
                We&apos;ll respond within 2 hours during business hours
              </p>
            </div>
          </div>
      </div>
    </section>
  )
}

