import { createClient } from '@supabase/supabase-js';
import UsersClient from './client';

async function getUsersData() {
  // Use service role to bypass RLS for admin pages
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all team members
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .order('created_at', { ascending: false });

  // Get admin users
  const { data: adminUsers } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    teamMembers: teamMembers || [],
    adminUsers: adminUsers || [],
  };
}

export default async function UsersPage() {
  const data = await getUsersData();

  return <UsersClient initialData={data} />;
}
