'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star, Quote, Building2, Briefcase } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_role: string | null;
  testimonial: string;
  rating: number | null;
  service_type: string | null;
  is_featured: boolean;
  is_approved: boolean;
}

// Fallback testimonials for initial render and if API fails
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Sarah Johnson',
    client_company: 'TechStart Solutions',
    client_role: 'CEO',
    testimonial: 'Pines VA transformed our operations completely. Our GVA handles all our administrative tasks flawlessly, allowing me to focus on strategic growth.',
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
    testimonial: 'The ISA from Pines VA increased our lead conversion by 40% in just 3 months. Their sales expertise and dedication to our success is remarkable.',
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
    testimonial: 'Our MVA seamlessly integrated into our practice. Patient scheduling and insurance verification became so much more efficient. Highly recommend!',
    rating: 5,
    service_type: 'MVA',
    is_featured: true,
    is_approved: true
  },
  {
    id: '4',
    client_name: 'James Thompson',
    client_company: 'Digital Marketing Pro',
    client_role: 'Entrepreneur',
    testimonial: 'Working with Pines VA\'s EVA has been game-changing. They handle my calendar, emails, and projects with incredible precision.',
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
    testimonial: 'The level of service and expertise from Pines VA exceeded all expectations. Our virtual assistant became an integral part of our team within days.',
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
    testimonial: 'Pines VA helped us scale our operations without the overhead of hiring full-time staff. The flexibility and skill level is unmatched.',
    rating: 5,
    service_type: 'GVA',
    is_featured: true,
    is_approved: true
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          'size-4',
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        )}
      />
    ));
  };

  // Service type colors
  const serviceColors: Record<string, string> = {
    'GVA': 'bg-green-100 text-green-800 border-green-200',
    'ISA': 'bg-blue-100 text-blue-800 border-blue-200',
    'MVA': 'bg-purple-100 text-purple-800 border-purple-200',
    'EVA': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <div
      className={cn(
        'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col gap-4 rounded-xl p-6',
        'border border-gray-200 bg-white shadow-sm',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        'min-h-[280px]'
      )}
    >
      {/* Quote Icon */}
      <div className="flex items-start justify-between">
        <Quote className="w-8 h-8 text-green-600 opacity-50" />
        {testimonial.service_type && (
          <span className={cn(
            'text-xs font-semibold px-3 py-1 rounded-full border',
            serviceColors[testimonial.service_type] || 'bg-gray-100 text-gray-800 border-gray-200'
          )}>
            {testimonial.service_type}
          </span>
        )}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 text-sm font-normal leading-relaxed flex-grow">
        &quot;{testimonial.testimonial}&quot;
      </blockquote>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex flex-row gap-1">
          {renderStars(testimonial.rating)}
        </div>
      )}

      {/* Client Info */}
      <div className="flex flex-col gap-1 pt-3 border-t border-gray-100">
        <p className="text-gray-900 font-semibold text-sm">
          {testimonial.client_name}
        </p>
        {testimonial.client_role && (
          <p className="text-gray-600 text-xs flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {testimonial.client_role}
          </p>
        )}
        {testimonial.client_company && (
          <p className="text-gray-600 text-xs flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {testimonial.client_company}
          </p>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials?featured=true');
        const data = await response.json();
        
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep fallback data
      }
    }

    fetchTestimonials();
  }, []);

  // Distribute testimonials into columns (3 columns for homepage)
  const columns = 3;
  const testimonialsPerColumn = Math.ceil(testimonials.length / columns);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent font-semibold">
              real businesses
            </span>{' '}
            are saying about{' '}
            <span className="font-semibold text-green-700">Pines VA</span>
          </p>
        </motion.div>

        {/* Marquee Section */}
        <div className="relative max-h-[600px] overflow-hidden mb-12">
          <div className="gap-4 md:columns-2 xl:columns-3">
            {Array(columns)
              .fill(0)
              .map((_, columnIndex) => {
                const startIdx = columnIndex * testimonialsPerColumn;
                const endIdx = startIdx + testimonialsPerColumn;
                const columnTestimonials = testimonials.slice(startIdx, endIdx);

                // Different speeds for each column
                const speeds = ['[--duration:50s]', '[--duration:40s]', '[--duration:60s]'];

                return (
                  <Marquee
                    vertical
                    key={columnIndex}
                    className={cn(speeds[columnIndex % speeds.length])}
                  >
                    {columnTestimonials.map((testimonial) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: Math.random() * 0.8,
                          duration: 1.2,
                        }}
                      >
                        <TestimonialCard testimonial={testimonial} />
                      </motion.div>
                    ))}
                  </Marquee>
                );
              })}
          </div>

          {/* Gradient overlays */}
          <div className="from-white pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-20%"></div>
          <div className="from-gray-50 pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-20%"></div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-4 text-lg">
            Had a great experience with Pines VA?
          </p>
          <Link
            href="/testimonials/submit"
            className="inline-block bg-green-700 text-white hover:bg-green-800 px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Share Your Experience
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
