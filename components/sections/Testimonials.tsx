'use client'

import { Star, Quote } from 'lucide-react'

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
  // Static testimonials data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      client_name: 'Sarah Johnson',
      client_company: 'TechStart Solutions',
      client_role: 'CEO',
      testimonial: 'Pines VA transformed our operations completely. Our GVA handles all our administrative tasks flawlessly, allowing me to focus on strategic growth. The professionalism and attention to detail is outstanding.',
      rating: 5,
      service_type: 'GVA',
      is_featured: true,
      is_approved: true
    },
    {
      id: '2',
      client_name: 'Michael Chen',
      client_company: 'Prime Properties',
      client_role: 'Real Estate Broker',
      testimonial: 'The ISA from Pines VA increased our lead conversion by 40% in just 3 months. Their sales expertise and dedication to our success is remarkable. Best investment we\'ve made for our business.',
      rating: 5,
      service_type: 'ISA',
      is_featured: true,
      is_approved: true
    },
    {
      id: '3',
      client_name: 'Dr. Emily Rodriguez',
      client_company: 'Wellness Medical Center',
      client_role: 'Medical Director',
      testimonial: 'Our VMA seamlessly integrated into our practice. Patient scheduling, insurance verification, and medical records management became so much more efficient. Highly recommend Pines VA!',
      rating: 5,
      service_type: 'VMA',
      is_featured: true,
      is_approved: true
    },
    {
      id: '4',
      client_name: 'James Thompson',
      client_company: 'Digital Marketing Pro',
      client_role: 'Entrepreneur',
      testimonial: 'Working with Pines VA\'s EVA has been game-changing. They handle my calendar, emails, and projects with incredible precision. It\'s like having a highly skilled executive assistant at a fraction of the cost.',
      rating: 5,
      service_type: 'EVA',
      is_featured: true,
      is_approved: true
    },
    {
      id: '5',
      client_name: 'Lisa Martinez',
      client_company: 'Creative Designs Co.',
      client_role: 'Business Owner',
      testimonial: 'The level of service and expertise from Pines VA exceeded all expectations. Our virtual assistant became an integral part of our team within days. Communication and work quality are exceptional.',
      rating: 5,
      service_type: 'GVA',
      is_featured: true,
      is_approved: true
    },
    {
      id: '6',
      client_name: 'Robert Kim',
      client_company: 'LogiFlow Systems',
      client_role: 'Operations Manager',
      testimonial: 'Pines VA helped us scale our operations without the overhead of hiring full-time staff. The flexibility and skill level of their virtual assistants is unmatched. Truly a strategic partnership.',
      rating: 5,
      service_type: 'GVA',
      is_featured: true,
      is_approved: true
    }
  ]

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



  if (testimonials.length === 0) {
    return null // Don't render if no testimonials
  }

  return (
    <section className="py-12 bg-gray-50">
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
                <Quote className="w-8 h-8 text-green-600 mr-3" />
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
                  <div className="text-green-600 text-sm font-medium mt-1">
                    {testimonial.service_type.toUpperCase()} Client
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > 6 && (
          <div className="text-center mt-12">
            <button className="text-green-600 font-semibold hover:text-green-700 transition-colors">
              View More Reviews →
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Had a great experience with Pines VA?</p>
          <a
            href="/testimonials/submit"
            className="inline-block bg-green-700 text-white hover:bg-green-800 px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  )
}