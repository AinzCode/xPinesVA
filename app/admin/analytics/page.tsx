import { createClient } from '@/lib/supabase/server';
import AnalyticsClient from './client';

async function getAnalyticsData() {
  const supabase = await createClient();

  // Get inquiry trends (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: inquiryTrend } = await supabase
    .from('contact_inquiries')
    .select('created_at, status')
    .gte('created_at', thirtyDaysAgo)
    .order('created_at', { ascending: true });

  // Get status distribution
  const { data: statusDistribution } = await supabase
    .from('contact_inquiries')
    .select('status');

  // Get expertise breakdown
  const { data: expertiseBreakdown } = await supabase
    .from('contact_inquiries')
    .select('expertise');

  // Get team performance (active members)
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true);

  // Get testimonial ratings
  const { data: testimonialRatings } = await supabase
    .from('testimonials')
    .select('rating, created_at')
    .eq('is_approved', true);

  // Calculate conversion rate (inquiries to completed)
  const { count: totalInquiries } = await supabase
    .from('contact_inquiries')
    .select('*', { count: 'exact', head: true });

  const { count: completedInquiries } = await supabase
    .from('contact_inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  return {
    inquiryTrend: inquiryTrend || [],
    statusDistribution: statusDistribution || [],
    expertiseBreakdown: expertiseBreakdown || [],
    teamMembers: teamMembers || [],
    testimonialRatings: testimonialRatings || [],
    conversionRate: totalInquiries ? ((completedInquiries || 0) / totalInquiries) * 100 : 0,
    totalInquiries: totalInquiries || 0,
    completedInquiries: completedInquiries || 0,
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return <AnalyticsClient initialData={data} />;
}
