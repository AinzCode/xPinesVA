'use client'

import { MessageSquare, UserPlus, CheckCircle, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: '1. Initial Consultation',
    description: 'Tell us about your business needs, goals, and the type of virtual assistant you require.',
    color: 'bg-blue-500',
  },
  {
    icon: UserPlus,
    title: '2. Perfect Match',
    description: 'We carefully select and introduce you to the ideal VA based on your specific requirements.',
    color: 'bg-green-500',
  },
  {
    icon: CheckCircle,
    title: '3. Seamless Integration',
    description: 'Your VA integrates with your team and processes, ensuring smooth workflow from day one.',
    color: 'bg-purple-500',
  },
  {
    icon: Rocket,
    title: '4. Scale & Succeed',
    description: 'Watch your business grow as your VA handles tasks efficiently, freeing you to focus on strategy.',
    color: 'bg-orange-500',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Easy Guides - How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with Pines VA is simple and straightforward. 
            Follow these easy steps to transform your business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0" 
                     style={{ width: 'calc(100% - 2rem)', left: '2rem' }}>
                </div>
              )}
              
              <div className="relative bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 text-center">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white relative z-10`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The process takes less than 48 hours from consultation to having your dedicated VA ready to work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Schedule Free Consultation
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Learn More About Our Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}