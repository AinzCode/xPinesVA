'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Award, Star, Check, X, User, Building2, Briefcase, ThumbsUp, Clock } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string | null;
  client_role: string | null;
  testimonial: string;
  rating: number | null;
  service_type: string | null;
  is_featured: boolean;
  is_approved: boolean;
  client_image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface TestimonialsClientProps {
  initialData: {
    testimonials: Testimonial[];
  };
}

export default function TestimonialsClient({ initialData }: TestimonialsClientProps) {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'featured'>('all');

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_approved: true }),
      });

      if (response.ok) {
        setData(prev => ({
          testimonials: prev.testimonials.map(t =>
            t.id === id ? { ...t, is_approved: true, updated_at: new Date().toISOString() } : t
          )
        }));
      } else {
        console.error('Failed to approve testimonial');
        alert('Failed to approve testimonial. Please try again.');
      }
    } catch (error) {
      console.error('Error approving testimonial:', error);
      alert('Failed to approve testimonial. Please try again.');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_approved: false }),
      });

      if (response.ok) {
        setData(prev => ({
          testimonials: prev.testimonials.map(t =>
            t.id === id ? { ...t, is_approved: false, updated_at: new Date().toISOString() } : t
          )
        }));
      } else {
        console.error('Failed to reject testimonial');
        alert('Failed to reject testimonial. Please try again.');
      }
    } catch (error) {
      console.error('Error rejecting testimonial:', error);
      alert('Failed to reject testimonial. Please try again.');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const testimonial = data.testimonials.find(t => t.id === id);
    if (!testimonial) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !testimonial.is_featured }),
      });

      if (response.ok) {
        setData(prev => ({
          testimonials: prev.testimonials.map(t =>
            t.id === id ? { ...t, is_featured: !t.is_featured, updated_at: new Date().toISOString() } : t
          )
        }));
      } else {
        console.error('Failed to toggle featured status');
        alert('Failed to toggle featured status. Please try again.');
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      alert('Failed to toggle featured status. Please try again.');
    }
  };

  const filteredTestimonials = data.testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.testimonial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.client_company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'pending' && !testimonial.is_approved) ||
      (statusFilter === 'approved' && testimonial.is_approved && !testimonial.is_featured) ||
      (statusFilter === 'featured' && testimonial.is_featured);
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: data.testimonials.length,
    pending: data.testimonials.filter(t => !t.is_approved).length,
    approved: data.testimonials.filter(t => t.is_approved && !t.is_featured).length,
    featured: data.testimonials.filter(t => t.is_featured).length,
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={() => console.log('Export testimonials')}
          isRefreshing={false}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Approve and manage client testimonials
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total</p>
                      <p className="text-3xl font-bold mt-2">{stats.total}</p>
                    </div>
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Approved</p>
                      <p className="text-3xl font-bold mt-2">{stats.approved}</p>
                    </div>
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Featured</p>
                      <p className="text-3xl font-bold mt-2">{stats.featured}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { key: 'all', label: 'All', count: stats.total },
                  { key: 'pending', label: 'Pending Approval', count: stats.pending },
                  { key: 'approved', label: 'Approved', count: stats.approved },
                  { key: 'featured', label: 'Featured', count: stats.featured },
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key as typeof statusFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      statusFilter === key
                        ? 'bg-[#052814] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      statusFilter === key ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="rounded-lg border bg-card p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 rounded-full bg-[#052814]/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-[#052814]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg">{testimonial.client_name}</h3>
                          {testimonial.client_role && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Briefcase className="h-3 w-3" />
                              {testimonial.client_role}
                            </div>
                          )}
                          {testimonial.client_company && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Building2 className="h-3 w-3" />
                              {testimonial.client_company}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {testimonial.rating && renderStars(testimonial.rating)}
                        <div className="flex gap-2">
                          {testimonial.is_featured && (
                            <span className="inline-flex px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
                              Featured
                            </span>
                          )}
                          {testimonial.is_approved ? (
                            <span className="inline-flex px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">
                              Approved
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {testimonial.service_type && (
                      <div className="mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                          Service: {testimonial.service_type}
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 mb-4 italic">&quot;{testimonial.testimonial}&quot;</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>Submitted: {new Date(testimonial.created_at).toLocaleDateString()}</span>
                      <span>Updated: {new Date(testimonial.updated_at).toLocaleDateString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      {!testimonial.is_approved ? (
                        <>
                          <button
                            onClick={() => handleApprove(testimonial.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 text-sm font-medium transition-colors"
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(testimonial.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors"
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleToggleFeatured(testimonial.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              testimonial.is_featured
                                ? 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            {testimonial.is_featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button
                            onClick={() => handleReject(testimonial.id)}
                            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors"
                          >
                            <X className="h-4 w-4" />
                            Unapprove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredTestimonials.length === 0 && (
                <div className="text-center py-12 rounded-lg border bg-card">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">No testimonials found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
