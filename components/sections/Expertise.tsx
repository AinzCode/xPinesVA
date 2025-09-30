'use client'

import { Building2, UserCheck, Phone, Stethoscope } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: UserCheck,
    title: 'GVA - General Virtual Assistant',
    description: 'Comprehensive administrative support for daily business operations, email management, scheduling, and general tasks.',
    features: ['Email Management', 'Calendar Scheduling', 'Data Entry', 'Customer Support', 'Document Management'],
    color: 'bg-blue-500'
  },
  {
    icon: Building2,
    title: 'EVA - Executive Virtual Assistant',
    description: 'High-level executive support for C-suite professionals and business leaders requiring sophisticated assistance.',
    features: ['Executive Calendar', 'Travel Planning', 'Meeting Coordination', 'Strategic Planning Support', 'Confidential Tasks'],
    color: 'bg-purple-500'
  },
  {
    icon: Phone,
    title: 'ISA - Inside Sales Agent',
    description: 'Dedicated sales professionals to drive your revenue growth through lead generation and customer acquisition.',
    features: ['Lead Generation', 'Cold Calling', 'CRM Management', 'Sales Pipeline', 'Follow-up Campaigns'],
    color: 'bg-green-500'
  },
  {
    icon: Stethoscope,
    title: 'VMA - Virtual Medical Assistant',
    description: 'Specialized healthcare support for medical practices, handling patient communications and administrative tasks.',
    features: ['Patient Scheduling', 'Medical Records', 'Insurance Verification', 'Appointment Reminders', 'HIPAA Compliant'],
    color: 'bg-red-500'
  }
]

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide specialized Virtual Assistant services across different industries, 
            each tailored to meet specific business needs and requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
              <div className="flex items-center mb-6">
                <div className={`${service.color} p-3 rounded-lg text-white mr-4`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Services:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link
                href="/connect"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/expertise"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}