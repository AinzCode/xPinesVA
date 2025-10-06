'use client'

import { MessageCircle, UserCheck, Briefcase, TrendingUp, Rocket, BookOpen, ArrowRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: MessageCircle,
    title: 'Consultation & Discovery',
    description: 'We begin with a detailed consultation to understand your business needs, goals, and specific requirements for virtual assistance.',
    color: 'bg-[#4C8B4A]',
    iconBg: 'bg-[#4C8B4A]/10',
    iconColor: 'text-[#4C8B4A]'
  },
  {
    id: 2,
    icon: UserCheck,
    title: 'Perfect Match Selection',
    description: 'Our team carefully selects and presents the ideal virtual assistant candidates based on your industry and specific skill requirements.',
    color: 'bg-[#C7A97B]',
    iconBg: 'bg-[#C7A97B]/10',
    iconColor: 'text-[#C7A97B]'
  },
  {
    id: 3,
    icon: Briefcase,
    title: 'Seamless Integration',
    description: 'We facilitate a smooth onboarding process, ensuring your new virtual assistant integrates perfectly with your existing workflow and systems.',
    color: 'bg-[#4C8B4A]',
    iconBg: 'bg-[#4C8B4A]/10',
    iconColor: 'text-[#4C8B4A]'
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Ongoing Success & Growth',
    description: 'We provide continuous support, performance monitoring, and optimization to ensure your business goals are consistently exceeded.',
    color: 'bg-[#C7A97B]',
    iconBg: 'bg-[#C7A97B]/10',
    iconColor: 'text-[#C7A97B]'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4">How It Works</h2>
          <p className="text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto">
            Our proven 4-step process ensures you get the perfect virtual assistant match for your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#4C8B4A]/30 to-[#C7A97B]/30 z-0" 
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}
              
              <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 z-10">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#2D2D2D] text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`${step.iconBg} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#2D2D2D]/70 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#4C8B4A]/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-[#2D2D2D]/70 mb-6">
              Take the first step towards transforming your business with expert virtual assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/connect"
                className="bg-[#4C8B4A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4C8B4A]/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/guides"
                className="bg-[#C7A97B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C7A97B]/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Learn More
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
