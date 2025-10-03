import { createClient } from '@supabase/supabase-js';
import ActivityClient from './client';

async function getActivityData() {
  // Use service role to bypass RLS for admin pages
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

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
