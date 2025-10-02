import { createClient } from '@/lib/supabase/server';
import TestimonialsClient from './client';

async function getTestimonialsData() {
  const supabase = await createClient();

  // Get all testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    testimonials: testimonials || [],
  };
}

export default async function TestimonialsPage() {
  const data = await getTestimonialsData();

  return <TestimonialsClient initialData={data} />;
}
