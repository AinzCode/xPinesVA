# Admin Dashboard

A modern, feature-rich admin dashboard built with Next.js 15, React 19, and Framer Motion.

## Features

### 📊 Dashboard Components

1. **Dashboard Cards** - Animated stat cards with trend indicators
   - Total Users, Revenue, Active Sessions, Growth Rate, Total Orders, Documents
   - Real-time percentage changes
   - Color-coded indicators
   - Progress bars

2. **Revenue Chart** - Interactive revenue analytics
   - Monthly revenue visualization
   - Growth indicators
   - Hover tooltips with detailed stats
   - Summary statistics

3. **System Status** - Real-time system health monitoring
   - Server status
   - Database health
   - API response times
   - Storage usage

4. **Quick Actions** - Fast access to common tasks
   - Add New User
   - View Analytics
   - Export Data
   - System Settings
   - Keyboard shortcuts displayed

5. **Recent Activity** - Activity feed
   - User logins
   - Data exports
   - Settings updates
   - New registrations

6. **Users Table** - User management
   - User profiles with avatars
   - Role badges (Admin, Moderator, User)
   - Status indicators (active/inactive)
   - Location and join date info
   - Responsive design

7. **Admin Sidebar** - Navigation sidebar
   - Collapsible design
   - Icon-only collapsed state
   - Theme switcher (Light/Dark mode)
   - Quick navigation links

8. **Dashboard Header** - Top navigation bar
   - Search functionality
   - Filter, Export, and Refresh actions
   - Notifications
   - Breadcrumb navigation
   - Responsive mobile menu

## Usage

### Accessing the Dashboard

Navigate to `/admin` to view the admin dashboard:

```
http://localhost:3000/admin
```

### Key Interactions

- **Sidebar Toggle**: Click the hamburger menu to collapse/expand the sidebar
- **Theme Toggle**: Click the theme icon in the sidebar footer to switch between light/dark mode
- **Search**: Use the search bar in the header to filter data
- **Refresh**: Click the refresh button to reload dashboard data
- **Export**: Click export to download data (placeholder functionality)
- **Add User**: Click the "Add User" button to open the user creation flow (placeholder)

## Customization

### Updating Stats Data

Edit the `statsData` array in `/app/admin/page.tsx`:

```typescript
const statsData = [
  {
    title: 'Your Stat Title',
    value: '12,345',
    change: '+10%',
    changeType: 'positive', // or 'negative'
    icon: YourIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  // ... more stats
];
```

### Customizing the Sidebar

Edit `/components/ui/admin-sidebar.tsx` to add/remove menu items:

```typescript
const menuItems = [
  { title: 'Your Menu Item', icon: YourIcon, href: '#your-route' },
  // ... more items
];
```

### Modifying the Company Name

In `/components/ui/admin-sidebar.tsx`, update the header:

```typescript
<span className="truncate font-semibold">Your Company</span>
<span className="truncate text-xs">Admin Panel</span>
```

## Component Props

### DashboardHeader

```typescript
interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onExport: () => void;
  isRefreshing: boolean;
}
```

### UsersTable

```typescript
interface UsersTableProps {
  onAddUser: () => void;
}
```

### QuickActions

```typescript
interface QuickActionsProps {
  onAddUser: () => void;
  onExport: () => void;
}
```

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Poppins Font** - Typography (for headers and paragraphs)

## Animations

The dashboard features smooth animations powered by Framer Motion:

- **Stagger animations** on dashboard cards
- **Hover effects** on interactive elements
- **Slide animations** for mobile menu and dropdowns
- **Progress bar animations** on load
- **Scale animations** on button interactions

## Responsive Design

The dashboard is fully responsive:

- **Mobile**: Stacked layout with hamburger menu
- **Tablet**: 2-column grid layouts
- **Desktop**: 3-column grid with expanded sidebar

## Next Steps

1. **Connect to API**: Replace placeholder data with real API calls
2. **Add Authentication**: Implement login/logout and role-based access
3. **Database Integration**: Connect to your Supabase backend
4. **Real-time Updates**: Add WebSocket support for live data
5. **Add More Pages**: Create detailed views for Analytics, Users, Settings, etc.

## File Structure

```
app/
  admin/
    layout.tsx          # Admin layout with metadata
    page.tsx            # Main admin dashboard page

components/
  ui/
    admin-sidebar.tsx   # Collapsible navigation sidebar
    dashboard-card.tsx  # Stat cards with animations
    dashboard-header.tsx # Top navigation header
    quick-actions.tsx   # Quick action buttons
    recent-activity.tsx # Activity feed
    revenue-chart.tsx   # Revenue visualization
    system-status.tsx   # System health monitoring
    users-table.tsx     # User management table
```

## Support

For issues or questions, please refer to the main project documentation or contact the development team.
