'use client'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import FAQ from '../../components/sections/FAQ'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-brown-50 pt-24 lg:pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our virtual assistant services, processes, 
            and how we can help transform your business operations.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <FAQ />

      {/* Additional Help Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need More Information?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Our team is here to help answer any specific questions about your needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed answers via email</p>
              <a href="mailto:hrteam@pinesva.com" className="text-green-600 hover:text-green-700 font-medium">
                hrteam@pinesva.com
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-brown-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Quick answers during business hours</p>
              <a href="/connect" className="text-green-600 hover:text-green-700 font-medium">
                Start Chat
              </a>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">Detailed guides and processes</p>
              <a href="/guides" className="text-green-600 hover:text-green-700 font-medium">
                View Guides
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
