'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Activity, Mail, Phone, User, Calendar, MessageSquare, CheckCircle, Clock, Archive } from 'lucide-react';

// Utility functions to format dates consistently (avoids hydration mismatch)
const formatDate = (dateString: string) => {
  // Use ISO date format to avoid hydration mismatch
  return dateString.split('T')[0];
};

const formatTime = (dateString: string) => {
  // Extract time from ISO string (HH:MM)
  const timePart = dateString.split('T')[1];
  return timePart ? timePart.substring(0, 5) : '';
};

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  age: number | null;
  expertise: string | null;
  company_name: string | null;
  message: string | null;
  status: 'new' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

interface ActivityClientProps {
  initialData: {
    inquiries: ContactInquiry[];
  };
}

export default function ActivityClient({ initialData }: ActivityClientProps) {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleStatusChange = async (id: string, newStatus: ContactInquiry['status']) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setData(prev => ({
          inquiries: prev.inquiries.map(inquiry =>
            inquiry.id === id
              ? { ...inquiry, status: newStatus, updated_at: new Date().toISOString() }
              : inquiry
          )
        }));
      } else {
        console.error('Failed to update inquiry status');
        alert('Failed to update inquiry status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      alert('Failed to update inquiry status. Please try again.');
    }
  };

  const filteredInquiries = data.inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: data.inquiries.length,
    new: data.inquiries.filter(i => i.status === 'new').length,
    in_progress: data.inquiries.filter(i => i.status === 'in_progress').length,
    completed: data.inquiries.filter(i => i.status === 'completed').length,
    archived: data.inquiries.filter(i => i.status === 'archived').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <MessageSquare className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'archived': return <Archive className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={() => console.log('Export activity')}
          isRefreshing={false}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Activity & Inquiries</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage contact inquiries and track activity
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { key: 'all', label: 'All Inquiries', icon: Activity },
                  { key: 'new', label: 'New', icon: MessageSquare },
                  { key: 'in_progress', label: 'In Progress', icon: Clock },
                  { key: 'completed', label: 'Completed', icon: CheckCircle },
                  { key: 'archived', label: 'Archived', icon: Archive },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      statusFilter === key
                        ? 'bg-[#052814] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      statusFilter === key
                        ? 'bg-white/20'
                        : 'bg-gray-200'
                    }`}>
                      {statusCounts[key as keyof typeof statusCounts]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Inquiries Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inquiries List */}
                <div className="lg:col-span-2 space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      onClick={() => setSelectedInquiry(inquiry)}
                      className={`rounded-lg border bg-card p-6 cursor-pointer transition-all hover:shadow-md ${
                        selectedInquiry?.id === inquiry.id ? 'ring-2 ring-[#052814]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 rounded-full bg-[#052814]/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-[#052814]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Mail className="h-3 w-3" />
                              {inquiry.email}
                            </div>
                            {inquiry.phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Phone className="h-3 w-3" />
                                {inquiry.phone}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                          {getStatusIcon(inquiry.status)}
                          {inquiry.status.replace('_', ' ')}
                        </span>
                      </div>

                      {inquiry.expertise && (
                        <div className="mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                            Interest: {inquiry.expertise}
                          </span>
                        </div>
                      )}

                      {inquiry.message && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {inquiry.message}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(inquiry.created_at)} at {formatTime(inquiry.created_at)}
                        </div>
                        {inquiry.company_name && (
                          <span>Company: {inquiry.company_name}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredInquiries.length === 0 && (
                    <div className="text-center py-12 rounded-lg border bg-card">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">No inquiries found</p>
                    </div>
                  )}
                </div>

                {/* Detail Panel */}
                <div className="lg:col-span-1">
                  <div className="rounded-lg border bg-card p-6 sticky top-4">
                    {selectedInquiry ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-4">Inquiry Details</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground uppercase">Name</label>
                              <p className="mt-1 font-medium">{selectedInquiry.name}</p>
                            </div>

                            <div>
                              <label className="text-xs font-medium text-muted-foreground uppercase">Email</label>
                              <p className="mt-1 text-sm">{selectedInquiry.email}</p>
                            </div>

                            {selectedInquiry.phone && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase">Phone</label>
                                <p className="mt-1 text-sm">{selectedInquiry.phone}</p>
                              </div>
                            )}

                            {selectedInquiry.age && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase">Age</label>
                                <p className="mt-1 text-sm">{selectedInquiry.age}</p>
                              </div>
                            )}

                            {selectedInquiry.expertise && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase">Service Interest</label>
                                <p className="mt-1 text-sm font-medium">{selectedInquiry.expertise}</p>
                              </div>
                            )}

                            {selectedInquiry.company_name && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase">Company</label>
                                <p className="mt-1 text-sm">{selectedInquiry.company_name}</p>
                              </div>
                            )}

                            {selectedInquiry.message && (
                              <div>
                                <label className="text-xs font-medium text-muted-foreground uppercase">Message</label>
                                <p className="mt-1 text-sm text-gray-600">{selectedInquiry.message}</p>
                              </div>
                            )}

                            <div>
                              <label className="text-xs font-medium text-muted-foreground uppercase">Created</label>
                              <p className="mt-1 text-sm">
                                {formatDate(selectedInquiry.created_at)} {formatTime(selectedInquiry.created_at)}
                              </p>
                            </div>

                            <div>
                              <label className="text-xs font-medium text-muted-foreground uppercase">Last Updated</label>
                              <p className="mt-1 text-sm">
                                {formatDate(selectedInquiry.updated_at)} {formatTime(selectedInquiry.updated_at)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-muted-foreground uppercase mb-2 block">
                            Update Status
                          </label>
                          <div className="space-y-2">
                            {['new', 'in_progress', 'completed', 'archived'].map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(selectedInquiry.id, status as ContactInquiry['status'])}
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selectedInquiry.status === status
                                    ? 'bg-[#052814] text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                              >
                                {getStatusIcon(status)}
                                {status.replace('_', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <button className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                            Delete Inquiry
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-500">Select an inquiry to view details</p>
                      </div>
                    )}
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
