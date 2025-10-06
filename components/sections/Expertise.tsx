'use client'

import { Building2, UserCheck, Phone, Stethoscope, ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'


// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gva: UserCheck,
  eva: Building2,
  mva: Stethoscope,
  isa: Phone
}

// Color mapping for services - Green and Brown theme
const colorMap: Record<string, string> = {
  gva: 'bg-green-600',
  eva: 'bg-amber-600',
  mva: 'bg-green-700',
  isa: 'bg-amber-700'
}

interface Service {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  features: string[] | null
  is_active: boolean
  sort_order: number
}

export default function Expertise() {
  // Static services data - 4 main categories
  const services: Service[] = [
    {
      id: '1',
      name: 'General Virtual Assistants',
      slug: 'gva',
      description: 'Comprehensive administrative support for daily business operations, email management, scheduling, and customer service.',
      short_description: 'Comprehensive administrative support for daily business operations, email management, scheduling, and customer service.',
      features: null,
      is_active: true,
      sort_order: 1
    },
    {
      id: '2',
      name: 'Executive Virtual Assistants',
      slug: 'eva',
      description: 'High-level executive support including strategic planning, meeting coordination, travel arrangements, and confidential tasks.',
      short_description: 'High-level executive support including strategic planning, meeting coordination, travel arrangements, and confidential tasks.',
      features: null,
      is_active: true,
      sort_order: 2
    },
    {
      id: '3',
      name: 'Medical Virtual Assistants',
      slug: 'mva',
      description: 'Specialized healthcare support including patient scheduling, medical billing, insurance coordination, and HIPAA-compliant services.',
      short_description: 'Specialized healthcare support including patient scheduling, medical billing, insurance coordination, and HIPAA-compliant services.',
      features: null,
      is_active: true,
      sort_order: 3
    },
    {
      id: '4',
      name: 'Industry-Specific Assistants',
      slug: 'isa',
      description: 'Tailored support for specialized industries including real estate, legal, e-commerce, and professional services.',
      short_description: 'Tailored support for specialized industries including real estate, legal, e-commerce, and professional services.',
      features: null,
      is_active: true,
      sort_order: 4
    }
  ]

  return (
    <section id="expertise" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide specialized Virtual Assistant services across different industries, 
              each tailored to meet specific business needs and requirements.
            </p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
              const IconComponent = iconMap[service.slug] || UserCheck
              const colorClass = colorMap[service.slug] || 'bg-green-600'
              
              return (
                <div key={index} className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className={`${colorClass} p-3 rounded-lg text-white mr-4`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.short_description || service.description}
                  </p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Services:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.slice(0, 5).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                
                    <Link
                      href={`/expertise/${service.slug}`}
                      className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Learn More
                    </Link>
                  </div>
                )
          })}
        </div>

        <div className="text-center mt-12">
            <Link
              href="/expertise"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
    </section>
  )
}
