import { createClient } from '@supabase/supabase-js';
import TestimonialsClient from './client';

async function getTestimonialsData() {
  // Use service role to bypass RLS for admin pages
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all testimonials
  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
  }

  return {
    testimonials: testimonials || [],
  };
}

export default async function TestimonialsPage() {
  const data = await getTestimonialsData();

  return <TestimonialsClient initialData={data} />;
}
