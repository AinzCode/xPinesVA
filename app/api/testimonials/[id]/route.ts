import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendTestimonialApprovalEmail } from '../../../../lib/email/send';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Use service role to bypass RLS for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { id } = await params;
    const body = await request.json();
    
    console.log('Updating testimonial:', { id, body });

    // Validate allowed fields
    const updates: Record<string, boolean | string> = {
      updated_at: new Date().toISOString(),
    };

    if ('is_approved' in body && typeof body.is_approved === 'boolean') {
      updates.is_approved = body.is_approved;
    }
    if ('is_featured' in body && typeof body.is_featured === 'boolean') {
      updates.is_featured = body.is_featured;
    }

    console.log('Updates to apply:', updates);

    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to update testimonial', details: error },
        { status: 500 }
      );
    }

    console.log('Update successful:', data);
    
    // If testimonial was approved, send thank you email to client
    if (updates.is_approved === true && data && 'client_email' in data) {
      const testimonialData = data as Record<string, string | boolean | number | null>;
      if (testimonialData.client_email && typeof testimonialData.client_email === 'string') {
        console.log('Sending approval email to:', testimonialData.client_email);
        await sendTestimonialApprovalEmail({
          clientName: String(testimonialData.client_name),
          clientEmail: testimonialData.client_email,
          testimonial: String(testimonialData.testimonial),
        });
      }
    }
    
    return NextResponse.json({ testimonial: data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Use service role to bypass RLS for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { id } = await params;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to delete testimonial' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
