# Admin Dashboard - Quick Start Guide

## 🚀 Access Your Dashboard

1. **Start the development server:**
```bash
npm run dev
```

2. **Navigate to the dashboard:**
```
http://localhost:3000/admin/dashboard
```

## 📊 What You'll See

### Live Statistics (Top Row)
- **Contact Inquiries**: Shows total inquiries and pending count
- **Team Members**: Active team members out of total
- **Testimonials**: Approved testimonials out of total
- **Blog Posts**: Published posts out of total

### Additional Metrics
- **Active Services**: Number of live service offerings
- **Inquiry Trend**: Activity over the last 7 days

### Interactive Features
- **Search Bar**: Search functionality (header)
- **Refresh Button**: Manually update all stats
- **Auto-Refresh**: Updates every 5 minutes automatically
- **Recent Activity**: Last 10 contact form submissions

## 🔄 Real-Time Updates

The dashboard automatically:
1. Loads fresh data when you visit the page
2. Auto-refreshes every 5 minutes
3. Updates instantly when you click the refresh button

## 📝 Test with Sample Data

Add test data to your Supabase database:

```sql
-- Add a contact inquiry
INSERT INTO contact_inquiries (name, email, expertise, message, status)
VALUES 
  ('John Doe', 'john@example.com', 'GVA', 'Interested in VA services', 'new'),
  ('Jane Smith', 'jane@example.com', 'EVA', 'Need executive assistance', 'new');

-- Add team members
INSERT INTO team_members (name, email, role, is_active)
VALUES 
  ('Sarah Johnson', 'sarah@pinesva.com', 'Executive VA', true),
  ('Mike Williams', 'mike@pinesva.com', 'General VA', true);

-- Add testimonials
INSERT INTO testimonials (client_name, client_company, testimonial, rating, is_approved)
VALUES 
  ('Robert Brown', 'Tech Startup Inc', 'Excellent service, very professional!', 5, true),
  ('Lisa Anderson', 'Marketing Co', 'Great experience with Pines VA!', 5, true);

-- Add services
INSERT INTO services (name, slug, description, is_active)
VALUES 
  ('General Virtual Assistant', 'gva', 'General administrative support', true),
  ('Executive Virtual Assistant', 'eva', 'Executive-level assistance', true);

-- Add blog posts
INSERT INTO blog_posts (title, slug, content, is_published)
VALUES 
  ('Getting Started with VAs', 'getting-started', 'Content here...', true),
  ('Benefits of Virtual Assistants', 'benefits-vas', 'Content here...', true);
```

After adding this data, refresh your dashboard to see the counts update!

## 🎯 Key Features

### ✅ Currently Working
- Real-time data from Supabase
- Auto-refresh every 5 minutes
- Manual refresh button
- Recent activity feed
- Responsive design
- Pines VA branding

### 🚧 Ready to Add
- User authentication
- Detailed inquiry management
- Team member CRUD operations
- Testimonial approval workflow
- Blog post management
- Service configuration

## 🔐 Adding Authentication (Optional)

To enable authentication, uncomment these lines in `/app/admin/dashboard/page.tsx`:

```typescript
export default async function AdminDashboardPage() {
  // Uncomment these lines:
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  // ... rest of code
}
```

Then create a login page at `/app/login/page.tsx`.

## 📱 Navigation

Use the sidebar to navigate:
- **Dashboard** (current page)
- **Analytics** (coming soon)
- **Users** (coming soon)
- **Content** (coming soon)
- **Settings** (coming soon)

Click the hamburger icon (☰) to collapse/expand the sidebar.

## 🎨 Customization

### Change Colors
Edit `/app/admin/dashboard/client.tsx` to change stat card colors:

```typescript
const dashboardStats = [
  {
    title: 'Your Metric',
    color: 'text-[#YOUR_COLOR]',
    bgColor: 'bg-[#YOUR_COLOR]/10',
    // ...
  }
];
```

### Adjust Refresh Interval
Change auto-refresh timing (default: 5 minutes):

```typescript
// In client.tsx
useEffect(() => {
  const interval = setInterval(handleRefresh, 2 * 60 * 1000); // 2 minutes
  return () => clearInterval(interval);
}, []);
```

## 🐛 Troubleshooting

### No data showing?
1. Check Supabase connection in `.env.local`
2. Verify tables exist in Supabase
3. Check browser console for errors

### Refresh not working?
1. Check network tab for API calls
2. Verify `/api/admin/stats` endpoint
3. Check Supabase RLS policies

### Slow loading?
1. Check database indexes
2. Reduce number of parallel queries
3. Add caching to API route

## 📚 Documentation

- Full implementation details: `ADMIN_DASHBOARD_REALTIME.md`
- Logo implementation: `PINES_VA_LOGO_IMPLEMENTATION.md`
- Database schema: See database section in project root

## 🎉 You're Ready!

Your admin dashboard is fully functional and connected to real data. Start exploring and managing your Pines VA platform!

---

**Need Help?** Check the browser console for any errors, or review the full documentation in `ADMIN_DASHBOARD_REALTIME.md`.
