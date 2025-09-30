'use client'

import { Clock, Shield, DollarSign, Users, Award, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Our team works around the clock to ensure your business never stops running.',
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Enterprise-grade security protocols protect your sensitive business information.',
  },
  {
    icon: DollarSign,
    title: 'Cost Effective',
    description: 'Save up to 70% on operational costs compared to hiring full-time employees.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Highly trained professionals with years of experience in their respective fields.',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Rigorous quality control processes ensure consistent, high-quality deliverables.',
  },
  {
    icon: Zap,
    title: 'Quick Scaling',
    description: 'Rapidly scale your team up or down based on your business needs.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Pines VA?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re not just another VA service. We&apos;re your strategic partner committed to 
            helping your business thrive with premium virtual assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have already experienced the power of premium virtual assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}