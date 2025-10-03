import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching services:', error)
      
      // Return fallback services data if database isn't set up
      const fallbackServices = [
        {
          id: '1',
          name: 'General Virtual Assistant (GVA)',
          slug: 'gva',
          description: 'Comprehensive administrative support to streamline your business operations and increase productivity.',
          short_description: 'Professional administrative support for day-to-day business tasks',
          pricing_min: 6.00,
          pricing_max: 12.00,
          pricing_type: 'hourly',
          features: [
            'Administrative Support',
            'Email Management',
            'Calendar Scheduling',
            'Data Entry & Research',
            'Customer Service'
          ],
          is_active: true,
          sort_order: 1
        },
        {
          id: '2',
          name: 'Executive Virtual Assistant (EVA)',
          slug: 'eva',
          description: 'Elite virtual assistant services designed for executives and senior leadership with high standards and confidentiality requirements.',
          short_description: 'Premium support for business leaders and executives',
          pricing_min: 12.00,
          pricing_max: 20.00,
          pricing_type: 'hourly',
          features: [
            'Executive Calendar Management',
            'C-Level Communications',
            'Board Meeting Preparation',
            'Strategic Research & Analysis',
            'Confidential Document Handling'
          ],
          is_active: true,
          sort_order: 2
        },
        {
          id: '3',
          name: 'Inside Sales Agent (ISA)',
          slug: 'isa',
          description: 'Professional lead generation, qualification, and conversion specialists to boost your sales performance.',
          short_description: 'Sales specialists focused on lead generation and conversion',
          pricing_min: 10.00,
          pricing_max: 15.00,
          pricing_type: 'hourly',
          features: [
            'Lead Qualification & Nurturing',
            'Cold Calling & Outreach',
            'CRM Management',
            'Sales Pipeline Development',
            'Appointment Setting'
          ],
          is_active: true,
          sort_order: 3
        },
        {
          id: '4',
          name: 'Medical Virtual Assistant (MVA)',
          slug: 'mva',
          description: 'HIPAA-compliant healthcare support services for medical practices and healthcare providers.',
          short_description: 'Healthcare specialists with HIPAA compliance training',
          pricing_min: 10.00,
          pricing_max: 16.00,
          pricing_type: 'hourly',
          features: [
            'Patient Appointment Scheduling',
            'Medical Records Management',
            'Insurance Verification',
            'Medical Billing Support',
            'Patient Communication'
          ],
          is_active: true,
          sort_order: 4
        }
      ]
      
      console.log('Using fallback services data')
      return NextResponse.json({ services: fallbackServices }, { status: 200 })
    }

    return NextResponse.json({ services }, { status: 200 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}