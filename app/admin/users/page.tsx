import { createClient } from '@/lib/supabase/server';
import UsersClient from './client';

async function getUsersData() {
  const supabase = await createClient();

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
