'use client'

import { Home, Stethoscope, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'real-estate',
    icon: Home,
    title: 'Real Estate Services',
    description: 'Comprehensive virtual assistant support for real estate professionals including GVA, EVA, and ISA services to help maximize efficiency and close more deals.',
    color: 'bg-blue-500',
    hoverColor: 'hover:from-blue-500 hover:to-blue-600',
    borderColor: 'border-blue-200',
    hoverBorderColor: 'hover:border-blue-600',
    iconBgColor: 'bg-blue-100',
    iconHoverBgColor: 'group-hover:bg-blue-200',
    iconColor: 'text-blue-600',
    iconHoverColor: 'group-hover:text-blue-800',
    textHoverColor: 'group-hover:text-blue-50'
  },
  {
    id: 'medical-assistance',
    icon: Stethoscope,
    title: 'Healthcare Services',
    description: 'Specialized Virtual Medical Assistant (VMA) services for clinics, healthcare providers, and medical businesses. Our trained assistants handle administrative tasks, patient coordination, and back-office support with professionalism and compassion.',
    color: 'bg-red-500',
    hoverColor: 'hover:from-red-500 hover:to-red-600',
    borderColor: 'border-red-200',
    hoverBorderColor: 'hover:border-red-600',
    iconBgColor: 'bg-red-100',
    iconHoverBgColor: 'group-hover:bg-red-200',
    iconColor: 'text-red-600',
    iconHoverColor: 'group-hover:text-red-800',
    textHoverColor: 'group-hover:text-red-50'
  }
]

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that every business has unique needs, and that&apos;s why our services are designed to be flexible, professional, and impactful.
            </p>
          </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {services.map((service, index) => (
            <div 
                key={index}
                className={`bg-white rounded-xl p-8 shadow-sm border-2 ${service.borderColor} hover:bg-gradient-to-br ${service.hoverColor} ${service.hoverBorderColor} transition-all duration-300 transform hover:scale-105 group`}
              >
              <div className={`${service.iconBgColor} ${service.iconHoverBgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300`}>
                <service.icon className={`w-8 h-8 ${service.iconColor} ${service.iconHoverColor} transition-colors duration-300`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className={`text-gray-600 ${service.textHoverColor} leading-relaxed text-lg mb-6 transition-colors duration-300`}>
                {service.description}
              </p>

                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center text-gray-700 group-hover:text-white font-semibold hover:underline transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
            <Link
              href="/expertise"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
      </div>
    </section>
  )
}
