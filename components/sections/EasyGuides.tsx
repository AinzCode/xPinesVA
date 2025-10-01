'use client'

import { MessageSquare, UserCheck, Settings, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: 'Share What You Need',
    description: 'Tell us about your business, your goals, and the tasks you&apos;d love to take off your plate. Whether it&apos;s real estate, medical, executive, or general support - we listen first.',
    color: 'bg-green-500',
  },
  {
    icon: UserCheck,
    title: 'Meet Your Perfect Match',
    description: 'We&apos;ll connect you with a skilled VA who fits your industry and working style. Think of it as finding your right-hand partner, not just an assistant.',
    color: 'bg-brown-500',
  },
  {
    icon: Settings,
    title: 'Smooth & Simple Onboarding',
    description: 'No complicated setup. We walk you through the process, set up the right tools, and make sure your VA is ready to jump in quickly.',
    color: 'bg-green-600',
  },
  {
    icon: CheckCircle,
    title: 'Start Delegating, Breathe Easier',
    description: 'Your VA gets to work managing emails, organizing documents, handling admin, or supporting your clients while you focus on what matters most.',
    color: 'bg-brown-600',
  },
  {
    icon: TrendingUp,
    title: 'Ongoing Support That Grows With You',
    description: 'Your needs may change, and that\'s okay. We stay with you every step of the way, making adjustments and giving you the flexibility to scale support as your business grows.',
    color: 'bg-green-700',
  },
]

export default function EasyGuides() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Easy Guides: How It Works</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Getting started with PinesVA is simple. Just share your needs, meet your matched Virtual Assistant, 
            and start delegating tasks. We'll handle the details so you can focus on what matters most - 
            growing your business with ease and confidence.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
              {/* Step Number and Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-50 to-brown-50 rounded-2xl p-8 lg:p-12 border border-green-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step towards a more efficient business. Let's discuss your needs and find the perfect VA for you.
            </p>
            <div className="flex justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}