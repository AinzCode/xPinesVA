# Admin Dashboard Customization Guide

## Quick Start

Your admin dashboard is now set up at `/admin`. Here's how to customize it for Pines VA:

## 1. Update the Company Branding

### Update Sidebar Logo and Name

Edit `/components/ui/admin-sidebar.tsx`:

```tsx
// Find this section (around line 57-67):
<Link prefetch={false} href="#dashboard">
  <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
    <LayoutDashboard className="h-5 w-5" />
  </div>
  <div className="grid flex-1 text-left text-sm leading-tight">
    <span className="truncate font-semibold">Pines VA</span>
    <span className="truncate text-xs">Admin Panel</span>
  </div>
</Link>
```

Or replace the icon with your Pines VA logo SVG.

## 2. Customize Dashboard Stats

Edit `/app/admin/page.tsx` and update the `statsData` array with your metrics:

```tsx
const statsData = [
  {
    title: 'Active VAs',
    value: '42',
    change: '+8.5%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
  {
    title: 'Monthly Revenue',
    value: '$12,450',
    change: '+12.3%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
  {
    title: 'Active Clients',
    value: '156',
    change: '+5.2%',
    changeType: 'positive' as const,
    icon: Briefcase,
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
  },
  {
    title: 'Tasks Completed',
    value: '2,847',
    change: '+18.7%',
    changeType: 'positive' as const,
    icon: CheckCircle,
    color: 'text-purple-700',
    bgColor: 'bg-purple-700/10',
  },
  {
    title: 'Client Satisfaction',
    value: '98%',
    change: '+2.1%',
    changeType: 'positive' as const,
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-600/10',
  },
  {
    title: 'Active Projects',
    value: '89',
    change: '+6.8%',
    changeType: 'positive' as const,
    icon: Folder,
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-700/10',
  },
];
```

## 3. Update Navigation Menu

Edit `/components/ui/admin-sidebar.tsx` and update `menuItems`:

```tsx
const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { title: 'Virtual Assistants', icon: Users, href: '/admin/vas' },
  { title: 'Clients', icon: Briefcase, href: '/admin/clients' },
  { title: 'Projects', icon: Folder, href: '/admin/projects' },
  { title: 'Services', icon: FileText, href: '/admin/services' },
  { title: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { title: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials' },
  { title: 'Inquiries', icon: Mail, href: '/admin/inquiries' },
  { title: 'Billing', icon: CreditCard, href: '/admin/billing' },
  { title: 'Settings', icon: Settings, href: '/admin/settings' },
];
```

## 4. Connect to Supabase

Update the dashboard to fetch real data from your Supabase database:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      // Fetch virtual assistants count
      const { count: vasCount } = await supabase
        .from('virtual_assistants')
        .select('*', { count: 'exact', head: true });

      // Fetch clients count
      const { count: clientsCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      // Fetch active projects
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      setStats({
        vas: vasCount,
        clients: clientsCount,
        projects: projectsCount,
      });
    }

    fetchStats();
  }, []);

  // ... rest of your component
}
```

## 5. Color Scheme

The dashboard uses your existing Pines VA green theme. To ensure consistency:

- Primary green: `text-green-700`, `bg-green-700`
- Accent colors are already configured in your `tailwind.config.js`
- All components respect light/dark mode

## 6. Add Authentication

Protect your admin routes by adding authentication:

```tsx
// app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  return <>{children}</>;
}
```

## 7. Customize Quick Actions

Edit `/components/ui/quick-actions.tsx`:

```tsx
const actions = [
  {
    icon: UserPlus,
    label: 'Add New VA',
    color: 'green',
    shortcut: 'Ctrl+N',
    action: 'addVA',
  },
  {
    icon: UserCheck,
    label: 'Add Client',
    color: 'blue',
    shortcut: 'Ctrl+C',
    action: 'addClient',
  },
  {
    icon: FolderPlus,
    label: 'New Project',
    color: 'purple',
    shortcut: 'Ctrl+P',
    action: 'newProject',
  },
  {
    icon: Download,
    label: 'Export Reports',
    color: 'orange',
    shortcut: 'Ctrl+E',
    action: 'export',
  },
];
```

## 8. Update Recent Activity

Edit `/components/ui/recent-activity.tsx` to fetch from your database:

```tsx
const [activities, setActivities] = useState([]);

useEffect(() => {
  async function fetchActivities() {
    const { data } = await supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    setActivities(data);
  }

  fetchActivities();
}, []);
```

## 9. Users Table Integration

Update `/components/ui/users-table.tsx` to show your Virtual Assistants or Clients:

```tsx
const [users, setUsers] = useState([]);

useEffect(() => {
  async function fetchUsers() {
    const { data } = await supabase
      .from('virtual_assistants')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    setUsers(data);
  }

  fetchUsers();
}, []);
```

## 10. Test the Dashboard

Run your development server:

```bash
npm run dev
```

Then navigate to:
```
http://localhost:3000/admin
```

## Tips

- Use the Poppins font (already configured) for headers and paragraphs
- Keep the green (#095028) as your primary brand color
- Test both light and dark modes using the sidebar toggle
- Ensure all data fetching includes proper error handling
- Add loading states for better UX

## Next Steps

1. Create additional admin pages (VA management, client management, etc.)
2. Add form components for data entry
3. Implement role-based permissions
4. Add export functionality for reports
5. Set up email notifications for important events
6. Add data filtering and sorting
7. Create detailed analytics pages

For more details, see `ADMIN_DASHBOARD.md`.
