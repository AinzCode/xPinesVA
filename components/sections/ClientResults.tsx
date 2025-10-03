'use client'

import { TrendingUp, Clock, Target, ArrowRight } from 'lucide-react'

const results = [
  {
    icon: Clock,
    metric: '25 Hours',
    description: 'Average time saved per week',
    details: 'Real estate agents report saving 25+ hours weekly on administrative tasks, allowing them to focus on client relationships and closing deals.',
    industry: 'Real Estate',
    color: 'bg-green-500'
  },
  {
    icon: TrendingUp,
    metric: '40%',
    description: 'Increase in productivity',
    details: 'Healthcare practices experienced a 40% boost in operational efficiency by delegating appointment scheduling and patient follow-ups.',
    industry: 'Healthcare',
    color: 'bg-brown-500'
  },
  {
    icon: Target,
    metric: '3x',
    description: 'Faster lead response time',
    details: 'Sales teams achieved 3x faster lead response rates with dedicated inside sales agents managing initial prospect outreach.',
    industry: 'Sales & Marketing',
    color: 'bg-green-600'
  }
]

const successMetrics = [
  { number: '500+', label: 'Successful Projects' },
  { number: '98%', label: 'Client Retention' },
  { number: '4.9/5', label: 'Average Rating' },
  { number: '72hrs', label: 'Average Setup Time' }
]

const industries = [
  'Real Estate',
  'Healthcare',
  'Legal Services',
  'E-commerce',
  'Financial Services',
  'Digital Marketing',
  'Consulting',
  'Technology'
]

export default function ClientResults() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real businesses. See how our virtual assistants have helped 
            companies across industries achieve their goals and scale efficiently.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {successMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {metric.number}
              </div>
              <div className="text-gray-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-4 mb-8">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`${result.color} w-16 h-16 rounded-full flex items-center justify-center text-white`}>
                    <result.icon className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {result.metric}
                      </div>
                      <div className="text-lg font-medium text-gray-600 mb-2">
                        {result.description}
                      </div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {result.industry}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {result.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industries We Serve */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Industries We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                <span className="text-gray-700 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-600 to-brown-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to See Similar Results?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have transformed their operations with Pines VA.
            </p>
            <a
              href="/connect"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Your Success Story
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
