import { createClient } from '@/lib/supabase/server';
import ServicesClient from './client';

async function getServicesData() {
  const supabase = await createClient();

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
