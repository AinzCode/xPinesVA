# Admin Dashboard Data Flow Documentation

## Overview

The Pines VA admin dashboard is now fully connected to your Supabase database. All data you see in the admin panels is **real data** from your database, and all actions (approve, reject, publish, etc.) **persist changes** to the database.

## 🔄 How Data Flows

### 1. **Client-Side Forms → Database**

When clients or visitors interact with your website:

```
Client Form (e.g., Contact Form)
    ↓
    Submit
    ↓
API Route (/api/contact/submit)
    ↓
    Insert into Supabase Database
    ↓
Data stored in 'contact_inquiries' table
```

**Example Files:**
- `/app/connect/page.tsx` - Contact form UI
- `/app/api/contact/route.ts` - API endpoint that saves to database
- Database table: `contact_inquiries`

### 2. **Database → Admin Dashboard**

When you open the admin dashboard:

```
Admin Page Loads (/admin/activity)
    ↓
Server Component fetches data (page.tsx)
    ↓
    SELECT * FROM contact_inquiries
    ↓
Pass data to Client Component
    ↓
Display in Admin UI with real-time stats
```

**Example Files:**
- `/app/admin/activity/page.tsx` - Server component (fetches data)
- `/app/admin/activity/client.tsx` - Client component (displays data)
- Database table: `contact_inquiries`

### 3. **Admin Actions → Database Updates**

When you perform actions in the admin (approve, publish, change status):

```
Admin clicks "Approve" button
    ↓
Client Component sends PATCH request
    ↓
API Route (/api/testimonials/[id])
    ↓
    UPDATE testimonials SET is_approved = true
    ↓
Database updated ✅
    ↓
UI updates to reflect change
```

## 📊 Admin Pages Connected to Database

### ✅ 1. Dashboard (`/admin/dashboard`)

**Data Sources:**
- `contact_inquiries` - Total inquiries, pending count
- `team_members` - Team member stats
- `testimonials` - Testimonial counts
- `blog_posts` - Blog post counts
- `services` - Service stats

**Features:**
- Real-time statistics
- Recent activity feed
- Inquiry trend charts
- Auto-refresh every 5 minutes

**API Endpoint:**
- `GET /api/admin/stats` - Refresh dashboard statistics

### ✅ 2. Contact Inquiries (`/admin/activity`)

**Data Source:** `contact_inquiries` table

**Connected Fields:**
- `id` - Unique identifier
- `name` - Client name
- `email` - Contact email
- `phone` - Phone number
- `expertise` - Service interest (EVA, GVA, ISA, VMA)
- `company_name` - Company name
- `message` - Inquiry message
- `status` - Current status (new, in_progress, completed, archived)
- `created_at` - Submission timestamp

**Admin Actions:**
- ✅ **Change Status** - Update inquiry status (persists to DB)
  - API: `PATCH /api/admin/inquiries/[id]`
  - Updates: `status`, `updated_at`

**Data Flow:**
```
Client submits contact form
    ↓
Saved to contact_inquiries table
    ↓
Appears in Admin Activity page
    ↓
Admin changes status to "in_progress"
    ↓
Status updated in database
    ↓
Stats update automatically
```

### ✅ 3. Testimonials (`/admin/testimonials`)

**Data Source:** `testimonials` table

**Connected Fields:**
- `id` - Unique identifier
- `client_name` - Client name
- `client_company` - Company name
- `client_role` - Job title
- `testimonial` - Testimonial text
- `rating` - Star rating (1-5)
- `service_type` - Service used
- `is_approved` - Approval status
- `is_featured` - Featured status
- `created_at` - Submission date

**Admin Actions:**
- ✅ **Approve** - Mark testimonial as approved (persists to DB)
  - API: `PATCH /api/testimonials/[id]`
  - Updates: `is_approved = true`
  
- ✅ **Reject** - Mark testimonial as not approved (persists to DB)
  - API: `PATCH /api/testimonials/[id]`
  - Updates: `is_approved = false`
  
- ✅ **Toggle Featured** - Mark as featured (persists to DB)
  - API: `PATCH /api/testimonials/[id]`
  - Updates: `is_featured = !is_featured`

**Data Flow:**
```
Client submits testimonial
    ↓
Saved to testimonials table (is_approved = false)
    ↓
Appears in Admin Testimonials page as "Pending"
    ↓
Admin clicks "Approve" button
    ↓
Database updated (is_approved = true)
    ↓
Testimonial appears on public testimonials page
    ↓
Admin clicks "Feature" button
    ↓
Database updated (is_featured = true)
    ↓
Testimonial appears in featured carousel
```

### ✅ 4. Blog Posts (`/admin/blog`)

**Data Source:** `blog_posts` table

**Connected Fields:**
- `id` - Unique identifier
- `title` - Post title
- `slug` - URL slug
- `content` - Post content (markdown/HTML)
- `excerpt` - Short description
- `author_id` - Author reference
- `category` - Post category
- `tags` - Post tags (array)
- `featured_image_url` - Featured image
- `is_published` - Published status
- `is_featured` - Featured status
- `published_at` - Publication date

**Admin Actions:**
- ✅ **Publish/Unpublish** - Toggle publish status (persists to DB)
  - API: `PATCH /api/admin/blog/[id]`
  - Updates: `is_published`, `published_at`
  
- ✅ **Toggle Featured** - Mark as featured (persists to DB)
  - API: `PATCH /api/admin/blog/[id]`
  - Updates: `is_featured`
  
- ✅ **Delete** - Remove blog post (persists to DB)
  - API: `DELETE /api/admin/blog/[id]`
  - Deletes the entire row

**Data Flow:**
```
Admin creates blog post (Draft)
    ↓
Saved to blog_posts table (is_published = false)
    ↓
Appears in Admin Blog page as "Draft"
    ↓
Admin clicks "Publish" button
    ↓
Database updated (is_published = true, published_at = NOW())
    ↓
Blog post appears on public blog page
    ↓
Admin clicks "Feature" button
    ↓
Database updated (is_featured = true)
    ↓
Blog post appears in featured section
```

### ✅ 5. Services (`/admin/services`)

**Data Source:** `services` table

**Connected Fields:**
- `id` - Unique identifier
- `name` - Service name
- `slug` - URL slug
- `description` - Full description
- `short_description` - Brief description
- `pricing_min` - Minimum price
- `pricing_max` - Maximum price
- `pricing_type` - Pricing model (hourly, monthly, project, commission)
- `features` - Feature list (array)
- `is_active` - Active status
- `sort_order` - Display order

**Admin Actions:**
- ✅ **Update Service** - Edit service details (persists to DB)
  - API: `PATCH /api/admin/services/[id]`
  - Updates: Any field (name, description, pricing, etc.)
  
- ✅ **Delete Service** - Remove service (persists to DB)
  - API: `DELETE /api/admin/services/[id]`
  - Deletes the entire row

**Data Flow:**
```
Admin creates or edits service
    ↓
Saved to services table
    ↓
Appears in Admin Services page
    ↓
If is_active = true
    ↓
Service appears on public services page
    ↓
Clients can see and inquire about service
```

### ✅ 6. Users (`/admin/users`)

**Data Sources:**
- `team_members` table - Team members
- `admin_users` table - Admin accounts

**Connected Fields (Team Members):**
- `id` - Unique identifier
- `name` - Full name
- `email` - Email address
- `role` - Job role
- `specialization` - Area of expertise
- `bio` - Biography
- `skills` - Skill list (array)
- `experience_years` - Years of experience
- `is_active` - Active status
- `profile_image_url` - Profile photo

**Connected Fields (Admin Users):**
- `id` - Unique identifier
- `user_id` - Auth user reference
- `name` - Full name
- `email` - Email address
- `role` - Admin role (admin, super_admin)

**Current Status:** View only (edit functionality to be added)

### ✅ 7. Analytics (`/admin/analytics`)

**Data Sources:**
- `contact_inquiries` - Inquiry trends, status distribution
- `testimonials` - Average ratings
- `team_members` - Team performance

**Features:**
- Inquiry trend charts (last 30 days)
- Status distribution pie charts
- Service interest breakdown
- Conversion rate calculations
- Team performance overview

**Current Status:** View only (real-time data from database)

## 🔌 API Endpoints Reference

### Dashboard Stats
```
GET /api/admin/stats
Response: {
  totalInquiries, pendingInquiries,
  totalTeamMembers, activeTeamMembers,
  totalTestimonials, approvedTestimonials,
  totalBlogPosts, publishedBlogPosts,
  totalServices, activeServices,
  recentInquiries[], inquiryTrend[]
}
```

### Testimonials
```
PATCH /api/testimonials/[id]
Body: { is_approved: boolean, is_featured: boolean }
Response: { testimonial: {...} }

DELETE /api/testimonials/[id]
Response: { message: "Testimonial deleted successfully" }
```

### Contact Inquiries
```
PATCH /api/admin/inquiries/[id]
Body: { status: 'new' | 'in_progress' | 'completed' | 'archived' }
Response: { inquiry: {...} }

DELETE /api/admin/inquiries/[id]
Response: { message: "Inquiry deleted successfully" }
```

### Blog Posts
```
PATCH /api/admin/blog/[id]
Body: { is_published: boolean, is_featured: boolean, published_at: string }
Response: { post: {...} }

DELETE /api/admin/blog/[id]
Response: { message: "Blog post deleted successfully" }
```

### Services
```
PATCH /api/admin/services/[id]
Body: { name, description, pricing_min, pricing_max, is_active, etc. }
Response: { service: {...} }

DELETE /api/admin/services/[id]
Response: { message: "Service deleted successfully" }
```

## 🎯 Complete Data Flow Example

### Example: Client Submits Testimonial → Admin Approves → Public Display

1. **Client Submission**
   ```
   Client fills out testimonial form on website
   → POST /api/testimonials/submit
   → INSERT INTO testimonials (client_name, testimonial, is_approved=false)
   → Success message shown to client
   ```

2. **Admin Review**
   ```
   Admin opens /admin/testimonials
   → Server fetches: SELECT * FROM testimonials
   → Testimonials displayed with status badges
   → Admin sees new testimonial marked as "Pending"
   ```

3. **Admin Approval**
   ```
   Admin clicks "Approve" button
   → PATCH /api/testimonials/[id] { is_approved: true }
   → UPDATE testimonials SET is_approved=true WHERE id=[id]
   → UI updates, badge changes to "Approved"
   → Stats counter increments
   ```

4. **Public Display**
   ```
   Client visits /testimonials
   → Server fetches: SELECT * FROM testimonials WHERE is_approved=true
   → Approved testimonial appears on public page
   → If featured, appears in carousel
   ```

## 🔐 Database Security (RLS)

All tables have Row Level Security (RLS) policies:

- **Public Read**: Approved/published content only
  - Testimonials: `WHERE is_approved = true`
  - Blog Posts: `WHERE is_published = true`
  - Services: `WHERE is_active = true`

- **Admin Access**: Full read/write (when authenticated)
  - Contact inquiries: All access
  - Testimonials: All access
  - Blog posts: All access
  - Services: All access

## 🚀 Next Steps

### To Add Authentication:

1. **Install Supabase Auth**
   ```bash
   # Already installed with Supabase
   ```

2. **Create Admin Login Page**
   ```tsx
   // /app/admin/login/page.tsx
   // Add Supabase auth.signInWithPassword()
   ```

3. **Protect Admin Routes**
   ```tsx
   // /app/admin/layout.tsx
   // Add authentication check
   // Redirect to /admin/login if not authenticated
   ```

4. **Enable RLS for Admin Tables**
   ```sql
   -- Enable RLS on admin-specific tables
   ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
   -- Create policies for authenticated admin users only
   ```

## 📝 Summary

✅ **All admin pages display real database data**
✅ **All admin actions persist to the database**
✅ **Client submissions flow to admin dashboard**
✅ **Approved content appears on public pages**
✅ **Dashboard shows real-time statistics**
✅ **API endpoints handle all CRUD operations**

Your admin dashboard is now a **fully functional content management system** connected to your Supabase database!

## 🆘 Troubleshooting

### No data showing in admin?
- Check Supabase connection in `.env.local`
- Verify tables exist in Supabase dashboard
- Check RLS policies allow reading
- Look for errors in browser console

### Actions not persisting?
- Check network tab for API errors
- Verify API routes are returning 200 status
- Check Supabase logs for database errors
- Ensure RLS policies allow updates

### Need help?
- Check browser console for errors
- Review Supabase logs
- Verify environment variables
- Test API endpoints with curl/Postman

---

**Last Updated:** October 3, 2025
**Version:** 1.0.0
