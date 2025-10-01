'use client'

import { Building2, UserCheck, Phone, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import LoadingSpinner from '../ui/LoadingSpinner'

// Icon mapping for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gva: UserCheck,
  eva: Building2,
  isa: Phone,
  vma: Stethoscope
}

// Color mapping for services
const colorMap: Record<string, string> = {
  gva: 'bg-blue-500',
  eva: 'bg-purple-500',
  isa: 'bg-green-500',
  vma: 'bg-red-500'
}

interface Service {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  pricing_min: number | null
  pricing_max: number | null
  pricing_type: string
  features: string[] | null
  is_active: boolean
  sort_order: number
}

export default function Expertise() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data.services || [])
        } else {
          console.error('Failed to fetch services')
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])
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

        {loading ? (
          <LoadingSpinner message="Loading services..." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.slug] || UserCheck
              const colorClass = colorMap[service.slug] || 'bg-blue-500'
              
              return (
                <div key={service.id} className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
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
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {service.pricing_min && service.pricing_max && (
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">Starting from </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${service.pricing_min}-${service.pricing_max}
                      </span>
                      <span className="text-sm text-gray-500">/{service.pricing_type}</span>
                    </div>
                  )}
                
                  <Link
                    href={`/expertise/${service.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              )
            })}
          </div>
        )}

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