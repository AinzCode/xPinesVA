import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
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

async function getCurrentUserRole() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  // Find Supabase auth token
  const authCookie = allCookies.find(cookie => 
    cookie.name.includes('auth-token') || cookie.name.includes('sb-')
  );

  if (!authCookie) {
    return null;
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get user from auth token
    const { data: { user } } = await supabase.auth.getUser(authCookie.value);
    
    if (!user) {
      return null;
    }

    // Get admin role
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single();

    return adminData?.role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}

export default async function UsersPage() {
  const [data, currentUserRole] = await Promise.all([
    getUsersData(),
    getCurrentUserRole()
  ]);

  return <UsersClient initialData={data} currentUserRole={currentUserRole} />;
}
