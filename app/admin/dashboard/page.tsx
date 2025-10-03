import { createClient } from '@supabase/supabase-js';
import DashboardClient from './client';

// Dashboard stats calculation
async function getDashboardStats() {
  // Use service role to bypass RLS for admin pages
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch all necessary data in parallel
  const [
    { count: totalInquiries },
    { count: pendingInquiries },
    { count: totalTeamMembers },
    { count: activeTeamMembers },
    { count: totalTestimonials },
    { count: approvedTestimonials },
    { count: totalBlogPosts },
    { count: publishedBlogPosts },
    { count: totalServices },
    { count: activeServices },
  ] = await Promise.all([
    supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_approved', true),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ]);

  // Get recent inquiries for activity
  const { data: recentInquiries } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // Get inquiry trend data (last 7 days)
  const { data: rawInquiryTrend } = await supabase
    .from('contact_inquiries')
    .select('created_at')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: true });

  // Transform inquiry trend data to match expected format
  const inquiryTrend = (rawInquiryTrend || []).reduce((acc: { date: string; count: number }[], item: { created_at: string }) => {
    const date = item.created_at.split('T')[0]; // Get YYYY-MM-DD
    const existing = acc.find(entry => entry.date === date);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  return {
    totalInquiries: totalInquiries || 0,
    pendingInquiries: pendingInquiries || 0,
    totalTeamMembers: totalTeamMembers || 0,
    activeTeamMembers: activeTeamMembers || 0,
    totalTestimonials: totalTestimonials || 0,
    approvedTestimonials: approvedTestimonials || 0,
    totalBlogPosts: totalBlogPosts || 0,
    publishedBlogPosts: publishedBlogPosts || 0,
    totalServices: totalServices || 0,
    activeServices: activeServices || 0,
    recentInquiries: recentInquiries || [],
    inquiryTrend: inquiryTrend,
  };
}

export default async function AdminDashboardPage() {
  // Check if user is authenticated (optional - add authentication later)
  // const supabase = await createClient();
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session) {
  //   redirect('/login');
  // }

  // Get dashboard data
  const stats = await getDashboardStats();

  return <DashboardClient initialStats={stats} />;
}
