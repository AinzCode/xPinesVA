'use client'

import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import EasyGuides from '../../components/sections/EasyGuides'

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Easy Guides</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your step-by-step roadmap to working with virtual assistants. 
            We&apos;ve made the process simple, transparent, and designed around your success.
          </p>
        </div>
      </section>

      {/* Easy Guides Content */}
      <EasyGuides />

      {/* Additional Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Process Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;ve refined our approach based on years of experience and client feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Method</h3>
              <p className="text-gray-600 leading-relaxed">
                Our 5-step process has helped hundreds of businesses successfully integrate virtual assistants into their operations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-brown-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Setup</h3>
              <p className="text-gray-600 leading-relaxed">
                Most clients are up and running with their VA within 48-72 hours of initial consultation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Support</h3>
              <p className="text-gray-600 leading-relaxed">
                We don&apos;t just match you and disappear. Our team provides continuous support to ensure long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-xl text-gray-600">
              Here are answers to the most frequently asked questions about our process.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How long does it take to get started?</h3>
              <p className="text-gray-600">
                From initial consultation to having your VA start work, the process typically takes 48-72 hours. 
                We prioritize quality matching over speed, but we understand urgency.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What if my VA isn&apos;t the right fit?</h3>
              <p className="text-gray-600">
                We offer a satisfaction guarantee. If within the first two weeks you feel the match isn&apos;t right, 
                we&apos;ll work with you to find a better fit at no additional cost.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I scale up or down as needed?</h3>
              <p className="text-gray-600">
                Absolutely! Our flexible approach allows you to increase hours, add team members, 
                or reduce support as your business needs change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}