'use client';

import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Users, MessageSquare, FileText, Award, Briefcase, TrendingUp } from 'lucide-react';
import { DashboardCard } from '@/components/ui/dashboard-card';
import { RevenueChart } from '@/components/ui/revenue-chart';
import { UsersTable } from '@/components/ui/users-table';
import { QuickActions } from '@/components/ui/quick-actions';
import { SystemStatus } from '@/components/ui/system-status';
import { RecentActivity } from '@/components/ui/recent-activity';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { ContactInquiry } from '@/lib/supabase/types';

interface DashboardStats {
  totalInquiries: number;
  pendingInquiries: number;
  totalTeamMembers: number;
  activeTeamMembers: number;
  totalTestimonials: number;
  approvedTestimonials: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalServices: number;
  activeServices: number;
  recentInquiries: ContactInquiry[];
  inquiryTrend: { created_at: string }[];
}

interface AdminDashboardClientProps {
  initialStats: DashboardStats;
}

export function AdminDashboardClient({ initialStats }: AdminDashboardClientProps) {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate percentage changes (mock for now - you can add historical data later)
  const calculateChange = () => {
    const change = Math.floor(Math.random() * 30) - 10; // Random between -10 and +20
    return change > 0 ? `+${change}%` : `${change}%`;
  };

  const dashboardStats = [
    {
      title: 'Contact Inquiries',
      value: stats.totalInquiries.toString(),
      subtitle: `${stats.pendingInquiries} pending`,
      change: calculateChange(),
      changeType: stats.pendingInquiries > 5 ? ('positive' as const) : ('negative' as const),
      icon: MessageSquare,
      color: 'text-[#052814]',
      bgColor: 'bg-[#052814]/10',
    },
    {
      title: 'Team Members',
      value: stats.activeTeamMembers.toString(),
      subtitle: `${stats.totalTeamMembers} total`,
      change: calculateChange(),
      changeType: 'positive' as const,
      icon: Users,
      color: 'text-[#095028]',
      bgColor: 'bg-[#095028]/10',
    },
    {
      title: 'Testimonials',
      value: stats.approvedTestimonials.toString(),
      subtitle: `${stats.totalTestimonials} total`,
      change: calculateChange(),
      changeType: 'positive' as const,
      icon: Award,
      color: 'text-[#0a6e33]',
      bgColor: 'bg-[#0a6e33]/10',
    },
    {
      title: 'Blog Posts',
      value: stats.publishedBlogPosts.toString(),
      subtitle: `${stats.totalBlogPosts} total`,
      change: calculateChange(),
      changeType: stats.publishedBlogPosts > 0 ? ('positive' as const) : ('negative' as const),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const newStats = await response.json();
        setStats(newStats);
      }
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // TODO: Implement export functionality
  };

  const handleAddUser = () => {
    console.log('Adding new user...');
    // TODO: Implement add user modal/form
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(handleRefresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={handleExport}
          isRefreshing={isRefreshing}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Welcome Section */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Pines VA Dashboard
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Real-time overview of your virtual assistant platform.
                </p>
              </div>

              {/* Stats Cards - 4 cards in a row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, index) => (
                  <DashboardCard key={stat.title} stat={stat} index={index} />
                ))}
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                      <p className="text-2xl font-bold">{stats.activeServices}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stats.totalServices} total services</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                      <Briefcase className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Inquiry Trend</p>
                      <p className="text-2xl font-bold">{stats.inquiryTrend.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Chart - Full Width */}
              <div className="w-full">
                <RevenueChart />
              </div>

              {/* Bottom Grid - Table and Sidebar Widgets */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Users Table - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <UsersTable onAddUser={handleAddUser} />
                </div>

                {/* Right Column - Actions and Status */}
                <div className="space-y-6">
                  <QuickActions
                    onAddUser={handleAddUser}
                    onExport={handleExport}
                  />
                  <SystemStatus />
                  <RecentActivity activities={stats.recentInquiries} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
