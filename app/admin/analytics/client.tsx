'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { TrendingUp, TrendingDown, Users, MessageSquare, CheckCircle, Clock, BarChart3, PieChart } from 'lucide-react';

interface AnalyticsData {
  inquiryTrend: Array<{ created_at: string; status: string }>;
  statusDistribution: Array<{ status: string }>;
  expertiseBreakdown: Array<{ expertise: string | null }>;
  teamMembers: Array<{ name: string; role: string; is_active: boolean }>;
  testimonialRatings: Array<{ rating: number; created_at: string }>;
  conversionRate: number;
  totalInquiries: number;
  completedInquiries: number;
}

interface AnalyticsClientProps {
  initialData: AnalyticsData;
}

export default function AnalyticsClient({ initialData }: AnalyticsClientProps) {
  const [data] = useState<AnalyticsData>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('30d');

  // Calculate status distribution
  const statusCounts = data.statusDistribution.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate expertise distribution
  const expertiseCounts = data.expertiseBreakdown.reduce((acc, item) => {
    const expertise = item.expertise || 'Unknown';
    acc[expertise] = (acc[expertise] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate average rating
  const avgRating = data.testimonialRatings.length > 0
    ? data.testimonialRatings.reduce((sum, t) => sum + t.rating, 0) / data.testimonialRatings.length
    : 0;

  // Group inquiries by day for trend chart
  const dailyInquiries = data.inquiryTrend.reduce((acc, item) => {
    const date = item.created_at.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={() => console.log('Export analytics')}
          isRefreshing={false}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Detailed insights and performance metrics
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Inquiries</p>
                      <p className="text-3xl font-bold mt-2">{data.totalInquiries}</p>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12.5% from last period
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <p className="text-3xl font-bold mt-2">{data.conversionRate.toFixed(1)}%</p>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +3.2% from last period
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                      <p className="text-3xl font-bold mt-2">2.4h</p>
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        +0.3h from last period
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Client Rating</p>
                      <p className="text-3xl font-bold mt-2">{avgRating.toFixed(1)}/5</p>
                      <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Based on {data.testimonialRatings.length} reviews
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                      <Users className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Inquiry Trend Chart */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Inquiry Trend</h3>
                      <p className="text-xs text-muted-foreground">Daily inquiries over time</p>
                    </div>
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {Object.entries(dailyInquiries).slice(-7).map(([date, count]) => (
                      <div key={date} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-24">{date}</span>
                        <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-[#052814] rounded-lg"
                            style={{ width: `${(count / Math.max(...Object.values(dailyInquiries))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Distribution */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Status Distribution</h3>
                      <p className="text-xs text-muted-foreground">Inquiry status breakdown</p>
                    </div>
                    <PieChart className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {Object.entries(statusCounts).map(([status, count]) => {
                      const percentage = ((count / data.statusDistribution.length) * 100).toFixed(1);
                      const colors = {
                        new: 'bg-blue-500',
                        in_progress: 'bg-yellow-500',
                        completed: 'bg-green-500',
                        archived: 'bg-gray-500',
                      };
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium capitalize">{status.replace('_', ' ')}</span>
                            <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-500'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expertise Breakdown */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Service Interest</h3>
                      <p className="text-xs text-muted-foreground">Most requested services</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(expertiseCounts)
                      .sort(([, a], [, b]) => b - a)
                      .map(([expertise, count]) => {
                        const percentage = ((count / data.expertiseBreakdown.length) * 100).toFixed(1);
                        return (
                          <div key={expertise} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{expertise}</span>
                                <span className="text-sm text-muted-foreground">{count}</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#052814] rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Team Performance */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Team Overview</h3>
                      <p className="text-xs text-muted-foreground">{data.teamMembers.length} active members</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {data.teamMembers.slice(0, 5).map((member) => (
                      <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                            Active
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold text-lg mb-4">Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Total Inquiries</p>
                    <p className="text-2xl font-bold">{data.totalInquiries}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{data.completedInquiries}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">{statusCounts.in_progress || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
