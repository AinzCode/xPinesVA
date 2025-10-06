'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star, Quote, Building2, Briefcase, ChevronRight } from 'lucide-react';
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
    testimonial: 'Our MVA seamlessly integrated into our practice. Patient scheduling, insurance verification, and medical records management became so much more efficient. Highly recommend Pines VA!',
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
  },
  {
    id: '7',
    client_name: 'Amanda Foster',
    client_company: 'Horizon Healthcare',
    client_role: 'Practice Manager',
    testimonial: 'The medical virtual assistant from Pines VA has streamlined our patient intake process. Their knowledge of healthcare protocols and HIPAA compliance is impressive. A trusted partner in our practice.',
    rating: 5,
    service_type: 'MVA',
    is_featured: false,
    is_approved: true
  },
  {
    id: '8',
    client_name: 'David Park',
    client_company: 'Summit Real Estate',
    client_role: 'Team Lead',
    testimonial: 'Our ISA from Pines VA is like having a top-tier sales rep on the team. They qualify leads expertly and keep our pipeline full. The ROI has been exceptional.',
    rating: 5,
    service_type: 'ISA',
    is_featured: false,
    is_approved: true
  },
  {
    id: '9',
    client_name: 'Rachel Green',
    client_company: 'GreenTech Innovations',
    client_role: 'Founder',
    testimonial: 'As a startup founder, having Pines VA\'s executive assistant has been invaluable. They anticipate my needs and keep everything running smoothly. I couldn\'t imagine working without them now.',
    rating: 5,
    service_type: 'EVA',
    is_featured: false,
    is_approved: true
  }
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

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials');
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

  // Distribute testimonials into columns
  const columns = 4;
  const testimonialsPerColumn = Math.ceil(testimonials.length / columns);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="relative container py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 -left-20 z-0 h-64 w-64 rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute -right-20 bottom-20 z-0 h-64 w-64 rounded-full bg-green-500/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h1 className="text-gray-900 mb-4 text-center text-5xl leading-[1.2] font-bold tracking-tight md:text-6xl">
            What Our Clients Are Saying
          </h1>
          <p className="text-gray-600 mx-auto mb-8 max-w-2xl text-center text-lg font-medium leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent font-semibold">
              real businesses
            </span>{' '}
            are saying about{' '}
            <span className="font-semibold text-green-700">Pines Virtual Assistant</span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Testimonials Section */}
      <section className="relative pb-20">
        <div className="relative max-h-[800px] overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
            {Array(columns)
              .fill(0)
              .map((_, columnIndex) => {
                const startIdx = columnIndex * testimonialsPerColumn;
                const endIdx = startIdx + testimonialsPerColumn;
                const columnTestimonials = testimonials.slice(startIdx, endIdx);

                // Different speeds for each column
                const speeds = ['[--duration:60s]', '[--duration:45s]', '[--duration:70s]', '[--duration:55s]'];

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
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Experience the same level of excellence that our clients rave about. 
            Let us help transform your business with our professional virtual assistant services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-gray-50 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started Today
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/testimonials/submit"
              className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-500 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white/20"
            >
              Share Your Experience
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Service Types Legend */}
      <section className="container pb-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Our Virtual Assistant Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-green-700 font-bold text-lg mb-2">GVA</div>
              <div className="text-gray-600 text-sm">General Virtual Assistant</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="text-blue-700 font-bold text-lg mb-2">ISA</div>
              <div className="text-gray-600 text-sm">Inside Sales Assistant</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-purple-700 font-bold text-lg mb-2">MVA</div>
              <div className="text-gray-600 text-sm">Medical Virtual Assistant</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
              <div className="text-orange-700 font-bold text-lg mb-2">EVA</div>
              <div className="text-gray-600 text-sm">Executive Virtual Assistant</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
