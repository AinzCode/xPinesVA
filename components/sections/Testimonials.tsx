'use client'

import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import LoadingSpinner from '../ui/LoadingSpinner'

interface Testimonial {
  id: string
  client_name: string
  client_company: string | null
  client_role: string | null
  testimonial: string
  rating: number | null
  service_type: string | null
  is_featured: boolean
  is_approved: boolean
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials?featured=true')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data.testimonials || [])
        } else {
          console.error('Failed to fetch testimonials')
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner message="Loading testimonials..." />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null // Don't render if no testimonials
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-blue-600 mr-3" />
                {testimonial.rating && (
                  <div className="flex items-center">
                    {renderStars(testimonial.rating)}
                  </div>
                )}
              </div>

              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.testimonial}&quot;
              </blockquote>

              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.client_name}</div>
                {testimonial.client_role && testimonial.client_company && (
                  <div className="text-gray-600 text-sm">
                    {testimonial.client_role} at {testimonial.client_company}
                  </div>
                )}
                {testimonial.service_type && (
                  <div className="text-blue-600 text-sm font-medium mt-1">
                    {testimonial.service_type.toUpperCase()} Client
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > 6 && (
          <div className="text-center mt-12">
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View More Reviews →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}