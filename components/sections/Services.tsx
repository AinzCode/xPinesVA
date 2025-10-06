'use client'

import { Users, Briefcase, Stethoscope, Building2, ArrowRight, Eye, Sparkles } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'real-estate',
    icon: Building2,
    title: 'Real Estate Services',
    description: 'Success in real estate is all about speed, organization, and relationships. From managing listings and scheduling showings to handling client follow-ups and updating CRMs, we make sure you stay ahead of the competition. With us taking care of the details, you can focus on closing deals and building stronger client connections.',
    color: 'bg-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-600/80',
    borderColor: 'border-blue-600/20',
    hoverBorderColor: 'hover:border-blue-600',
    iconBgColor: 'bg-blue-100',
    iconHoverBgColor: 'group-hover:bg-blue-200',
    iconColor: 'text-blue-600',
    iconHoverColor: 'group-hover:text-white',
    textHoverColor: 'group-hover:text-white',
    href: '/services/real-estate'
  },
  {
    id: 'administrative',
    icon: Briefcase,
    title: 'Administrative Excellence',
    description: 'Every successful professional has a strong backbone of support. We streamline your daily operations by managing emails, calendars, reports, and communications bringing structure and balance to your day so you can work smarter, not harder.',
    color: 'bg-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-600/80',
    borderColor: 'border-green-600/20',
    hoverBorderColor: 'hover:border-green-600',
    iconBgColor: 'bg-green-100',
    iconHoverBgColor: 'group-hover:bg-green-200',
    iconColor: 'text-green-600',
    iconHoverColor: 'group-hover:text-white',
    textHoverColor: 'group-hover:text-white',
    href: '/services/administrative-excellence'
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare Services',
    description: 'In healthcare, every second matters. We provide reliable, detail-oriented support for healthcare professionals, clinics, and medical teams. Our services include appointment scheduling, patient follow-ups, billing assistance, and insurance coordination always carried out with accuracy, confidentiality, and genuine care.',
    color: 'bg-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-600/80',
    borderColor: 'border-red-600/20',
    hoverBorderColor: 'hover:border-red-600',
    iconBgColor: 'bg-red-100',
    iconHoverBgColor: 'group-hover:bg-red-200',
    iconColor: 'text-red-600',
    iconHoverColor: 'group-hover:text-white',
    textHoverColor: 'group-hover:text-white',
    href: '/services/medical-assistance'
  }
]

export default function Services() {
  return (
    <section className="py-16 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-4">Our Services</h2>
          <p className="text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto">
            From administrative excellence to specialized healthcare and real estate support, we provide comprehensive virtual assistant services tailored to your industry and business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 ${service.borderColor} hover:bg-gradient-to-br ${service.hoverColor} ${service.hoverBorderColor} transition-all duration-300 transform hover:scale-105 group flex flex-col h-full`}
            >
              <div className={`${service.iconBgColor} ${service.iconHoverBgColor} w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300`}>
                <service.icon className={`w-7 h-7 ${service.iconColor} ${service.iconHoverColor} transition-colors duration-300`} />
              </div>
              
              <h3 className="text-lg font-bold text-[#2D2D2D] group-hover:text-white mb-3 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className={`text-[#2D2D2D]/70 ${service.textHoverColor} leading-relaxed text-sm mb-4 flex-grow transition-colors duration-300`}>
                {service.description}
              </p>

              <Link
                href={service.href}
                className="inline-flex items-center text-[#2D2D2D]/80 group-hover:text-white font-semibold hover:underline transition-colors duration-300 mt-auto text-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/expertise"
            className="inline-flex items-center bg-[#4C8B4A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4C8B4A]/90 transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            View All Expertise
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
