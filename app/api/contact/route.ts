import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '../../../lib/supabase/server'
import { sendContactFormEmail } from '../../../lib/email/send'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Contact form submission:', body)
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if database is set up by testing connection
    try {
      const supabase = await createServiceClient()
      console.log('Supabase service client created successfully')

      // Test if the table exists by trying to select from it
      const { error: testError } = await supabase
        .from('contact_inquiries')
        .select('count')
        .limit(1)

      if (testError) {
        console.log('Database table not found, logging to console instead:', testError.message)
        
        // Log the form submission to console for now
        console.log('📧 NEW CONTACT FORM SUBMISSION:')
        console.log('Name:', body.name)
        console.log('Email:', body.email)
        console.log('Phone:', body.phone || 'Not provided')
        console.log('Age:', body.age || 'Not provided')
        console.log('Expertise:', body.expertise || 'Not specified')
        console.log('Company:', body.company_name || 'Not provided')
        console.log('Message:', body.message || 'No message')
        console.log('Timestamp:', new Date().toISOString())
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Contact form submitted successfully (logged to console)',
            note: 'Database tables not set up yet - check console for submission details'
          },
          { status: 201 }
        )
      }

      // If we reach here, the table exists, so insert the data
      console.log('Attempting to insert contact form data...')
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('contact_inquiries')
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          age: body.age ? parseInt(body.age) : null,
          expertise: body.expertise || null,
          company_name: body.company_name || null,
          message: body.message || null,
          status: 'new'
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase insertion error:', error)
        throw error
      }

      console.log('✅ Contact form saved to database:', data)
      
      // Send email notification to admin
      await sendContactFormEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message || '',
        preferredContact: body.expertise,
        inquiryType: body.company_name ? 'Business' : 'Personal',
      })
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully',
          data 
        },
        { status: 201 }
      )

    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Fallback: log to console if database fails
      console.log('📧 CONTACT FORM SUBMISSION (DB FAILED):')
      console.log('Name:', body.name)
      console.log('Email:', body.email)
      console.log('Phone:', body.phone || 'Not provided')
      console.log('Age:', body.age || 'Not provided')
      console.log('Expertise:', body.expertise || 'Not specified')
      console.log('Company:', body.company_name || 'Not provided')
      console.log('Message:', body.message || 'No message')
      console.log('Timestamp:', new Date().toISOString())
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully (fallback mode)',
          note: 'Saved to logs - database connection issue'
        },
        { status: 201 }
      )
    }

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}