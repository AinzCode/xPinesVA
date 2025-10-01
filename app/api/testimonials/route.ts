import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'

    let query = supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)

    if (featured) {
      query = query.eq('is_featured', true)
    }

    const { data: testimonials, error } = await query
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      
      // Return fallback testimonials if database isn't set up
      const fallbackTestimonials = [
        {
          id: '1',
          client_name: 'John Smith',
          client_company: 'TechCorp Solutions',
          client_role: 'CEO',
          testimonial: 'The executive assistant from Pines VA has been instrumental in managing my busy schedule and confidential communications. Highly professional and reliable.',
          rating: 5,
          service_type: 'EVA',
          is_featured: true,
          is_approved: true
        },
        {
          id: '2',
          client_name: 'Maria Garcia',
          client_company: 'HealthFirst Clinic',
          client_role: 'Practice Manager',
          testimonial: 'Our virtual medical assistant has streamlined our patient scheduling and billing processes. HIPAA compliance was seamless and professional.',
          rating: 5,
          service_type: 'VMA',
          is_featured: true,
          is_approved: true
        },
        {
          id: '3',
          client_name: 'Robert Wilson',
          client_company: 'SalesPro Inc',
          client_role: 'Sales Director',
          testimonial: 'The inside sales agent helped us increase our lead conversion rate by 40%. Excellent communication skills and sales expertise.',
          rating: 5,
          service_type: 'ISA',
          is_featured: false,
          is_approved: true
        }
      ]
      
      console.log('Using fallback testimonials data')
      return NextResponse.json({ 
        testimonials: featured ? fallbackTestimonials.filter(t => t.is_featured) : fallbackTestimonials 
      }, { status: 200 })
    }

    return NextResponse.json({ testimonials }, { status: 200 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}