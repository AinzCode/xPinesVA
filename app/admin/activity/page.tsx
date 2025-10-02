import { createClient } from '@/lib/supabase/server';
import ActivityClient from './client';

async function getActivityData() {
  const supabase = await createClient();

  // Get all contact inquiries with pagination
  const { data: inquiries } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  return {
    inquiries: inquiries || [],
  };
}

export default async function ActivityPage() {
  const data = await getActivityData();

  return <ActivityClient initialData={data} />;
}
