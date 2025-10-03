'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Briefcase, Plus, Edit, Trash2, DollarSign, Check, X, Tag } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  pricing_min: number | null;
  pricing_max: number | null;
  pricing_type: 'hourly' | 'monthly' | 'project' | 'commission';
  features: string[] | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface ServicesClientProps {
  initialData: {
    services: Service[];
  };
}

export default function ServicesClient({ initialData }: ServicesClientProps) {
  const [data] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleRefresh = () => {
    window.location.reload();
  };

  const filteredServices = data.services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeServices = data.services.filter(s => s.is_active).length;

  const getPricingDisplay = (service: Service) => {
    if (!service.pricing_min && !service.pricing_max) return 'Contact for pricing';
    
    const formatPrice = (price: number) => `$${price.toLocaleString()}`;
    
    if (service.pricing_min && service.pricing_max) {
      return `${formatPrice(service.pricing_min)} - ${formatPrice(service.pricing_max)}/${service.pricing_type}`;
    } else if (service.pricing_min) {
      return `From ${formatPrice(service.pricing_min)}/${service.pricing_type}`;
    } else if (service.pricing_max) {
      return `Up to ${formatPrice(service.pricing_max)}/${service.pricing_type}`;
    }
    return 'Contact for pricing';
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={() => console.log('Export services')}
          isRefreshing={false}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Manage your service offerings
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-[#052814] px-4 py-2 text-sm font-medium text-white hover:bg-[#074d24]">
                  <Plus className="h-4 w-4" />
                  Add Service
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                      <p className="text-3xl font-bold mt-2">{data.services.length}</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-[#052814]" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                      <p className="text-3xl font-bold mt-2">{activeServices}</p>
                    </div>
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Inactive Services</p>
                      <p className="text-3xl font-bold mt-2">{data.services.length - activeServices}</p>
                    </div>
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className={`rounded-lg border bg-card p-6 transition-all hover:shadow-md cursor-pointer ${
                      selectedService?.id === service.id ? 'ring-2 ring-[#052814]' : ''
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-[#052814]/10 flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-[#052814]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{service.name}</h3>
                            <p className="text-xs text-muted-foreground">/{service.slug}</p>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        service.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {service.short_description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {service.short_description}
                      </p>
                    )}

                    {/* Pricing */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {getPricingDisplay(service)}
                      </span>
                    </div>

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs"
                            >
                              <Tag className="h-3 w-3" />
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors">
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12 rounded-lg border bg-card">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">No services found</p>
                  <button className="mt-4 flex items-center gap-2 mx-auto rounded-lg bg-[#052814] px-4 py-2 text-sm font-medium text-white hover:bg-[#074d24]">
                    <Plus className="h-4 w-4" />
                    Add Your First Service
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
