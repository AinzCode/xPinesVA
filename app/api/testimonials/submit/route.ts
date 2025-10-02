import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client_name, client_company, client_role, testimonial, rating, service_type, email } = body;

    // Validate required fields
    if (!client_name || !testimonial || !rating || !service_type || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Use service role to bypass RLS for testimonial submissions
    // This is safe because testimonials require admin approval (is_approved: false by default)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert testimonial (will be pending approval by default)
    const testimonialData = {
      client_name,
      client_company: client_company || null,
      client_role: client_role || null,
      testimonial,
      rating: Number(rating),
      service_type,
      is_approved: false, // Requires admin approval
      is_featured: false,
      // Note: Email is not stored in testimonials table per schema
      // You might want to add an email field or store in a separate table
    };

    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonialData as unknown as never)
      .select()
      .single();

    if (error) {
      console.error('Error inserting testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to submit testimonial' },
        { status: 500 }
      );
    }

    // Optional: Send notification email to admin
    // TODO: Implement email notification

    return NextResponse.json(
      { 
        message: 'Testimonial submitted successfully',
        data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing testimonial submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
