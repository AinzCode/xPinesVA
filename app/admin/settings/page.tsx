'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/ui/admin-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Settings, Bell, Mail, Shield, Database, Globe, Palette, Save } from 'lucide-react';

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Pines VA',
    siteUrl: 'https://pinesva.com',
    contactEmail: 'admin@pinesva.com',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    emailNotifications: true,
    inquiryAlerts: true,
    weeklyReports: false,
    maintenanceMode: false,
    allowRegistration: true,
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // TODO: Implement API call to save settings
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={() => window.location.reload()}
          onExport={() => console.log('Export settings')}
          isRefreshing={false}
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="mx-auto max-w-5xl space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage your admin dashboard configuration
                </p>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-4 overflow-x-auto">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === id
                          ? 'border-[#052814] text-[#052814]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold text-lg mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Name</label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Site URL</label>
                        <input
                          type="url"
                          value={settings.siteUrl}
                          onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Email</label>
                        <input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Timezone</label>
                          <select
                            value={settings.timezone}
                            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814]"
                          >
                            <option value="America/New_York">Eastern Time</option>
                            <option value="America/Chicago">Central Time</option>
                            <option value="America/Denver">Mountain Time</option>
                            <option value="America/Los_Angeles">Pacific Time</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Date Format</label>
                          <select
                            value={settings.dateFormat}
                            onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#052814]"
                          >
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold text-lg mb-4">Site Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Maintenance Mode</p>
                          <p className="text-sm text-muted-foreground">Temporarily disable the site</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.maintenanceMode}
                            onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#052814]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#052814]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Allow User Registration</p>
                          <p className="text-sm text-muted-foreground">Enable new user signups</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.allowRegistration}
                            onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#052814]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#052814]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold text-lg mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive email updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#052814]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#052814]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Inquiry Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified for new inquiries</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.inquiryAlerts}
                          onChange={(e) => setSettings({ ...settings, inquiryAlerts: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#052814]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#052814]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">Receive weekly summary emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.weeklyReports}
                          onChange={(e) => setSettings({ ...settings, weeklyReports: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#052814]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#052814]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder */}
              {['email', 'security', 'database', 'appearance'].includes(activeTab) && (
                <div className="rounded-lg border bg-card p-12 text-center">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
                  <p className="text-sm text-muted-foreground">Configuration options coming soon...</p>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-[#052814] text-white rounded-lg font-medium hover:bg-[#074d24] transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
