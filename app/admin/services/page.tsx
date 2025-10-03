import { createClient } from '@supabase/supabase-js';
import ServicesClient from './client';

async function getServicesData() {
  // Use service role to bypass RLS for admin pages
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all services
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  return {
    services: services || [],
  };
}

export default async function ServicesPage() {
  const data = await getServicesData();

  return <ServicesClient initialData={data} />;
}
