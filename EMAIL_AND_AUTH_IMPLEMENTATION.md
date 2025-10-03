# Email Notifications & Admin Authentication Implementation Guide

## 📋 Overview

This guide covers the complete implementation of:
1. **Email Notifications** using Resend
2. **Admin Authentication** using Supabase Auth
3. **Protected Admin Routes** with middleware

## 📧 Email Notifications

### Features Implemented

1. **Contact Form Submissions** → Email to admin
2. **Testimonial Submissions** → Email to admin
3. **Testimonial Approvals** → Thank you email to client

### Setup Instructions

#### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up
2. Create a new API key in your dashboard
3. Copy the API key (starts with `re_`)

#### Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here

# Email Addresses
ADMIN_EMAIL=your-admin@pinesva.com
FROM_EMAIL=noreply@pinesva.com
```

**Note:** For production, you'll need to verify your domain in Resend to send from a custom email address.

#### Step 3: Verify Domain (Production Only)

1. In Resend dashboard, go to "Domains"
2. Add your domain (e.g., `pinesva.com`)
3. Add the provided DNS records (TXT, MX, CNAME)
4. Wait for verification (usually 5-15 minutes)
5. Update `FROM_EMAIL` to use your verified domain

### Email Templates

Three email templates are included:

1. **Contact Form Email** (`ContactFormEmail`)
   - Sent to admin when contact form is submitted
   - Includes: name, email, phone, message, inquiry type
   
2. **Testimonial Submission Email** (`TestimonialSubmissionEmail`)
   - Sent to admin when new testimonial is submitted
   - Includes: client name, company, role, testimonial, rating
   
3. **Testimonial Approval Email** (`TestimonialApprovalEmail`)
   - Sent to client when their testimonial is approved
   - Professional thank you message

### Testing Emails

**Development Testing:**
```bash
# Resend allows 100 free emails per day
# Test by submitting a contact form or testimonial
```

**Check Email Logs:**
- Go to Resend dashboard → "Emails"
- See delivery status, opens, clicks

## 🔐 Admin Authentication

### Features Implemented

1. **Login Page** at `/admin/login`
2. **Protected Admin Routes** via middleware
3. **Admin Users Table** in Supabase
4. **Logout Functionality** in dashboard
5. **Admin Button** in navigation (visible only when logged in)

### Setup Instructions

#### Step 1: Run Database Migrations

Run these SQL scripts in your Supabase SQL Editor:

```sql
-- 1. Create admin_users table
-- File: supabase/create-admin-users-table.sql
```

```sql
-- 2. Add client_email to testimonials
-- File: supabase/add-client-email-to-testimonials.sql
```

#### Step 2: Create Your First Admin User

**Option A: Via Supabase Dashboard (Recommended)**

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User" → "Create new user"
3. Enter email and password
4. Copy the User ID from the Users table
5. Go to SQL Editor and run:

```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'paste-user-id-here',
  'your-admin@pinesva.com',
  'Your Name',
  'admin',
  true
);
```

**Option B: Via API (Programmatic)**

Create a temporary script or API endpoint:

```typescript
// Create admin user programmatically
const { data, error } = await supabase.auth.admin.createUser({
  email: 'admin@pinesva.com',
  password: 'secure-password-here',
  email_confirm: true
});

if (data.user) {
  await supabase.from('admin_users').insert({
    id: data.user.id,
    email: 'admin@pinesva.com',
    full_name: 'Admin User',
    role: 'admin',
    is_active: true
  });
}
```

#### Step 3: Test Login

1. Go to `https://your-domain.com/admin/login`
2. Enter your admin email and password
3. Click "Sign In"
4. You should be redirected to `/admin/dashboard`

### Security Features

✅ **Protected Routes**: All `/admin/*` routes except `/admin/login` require authentication  
✅ **Admin Verification**: User must exist in `admin_users` table with `is_active = true`  
✅ **Session Management**: Uses Supabase Auth sessions with secure cookies  
✅ **Automatic Logout**: Session expires after inactivity (default: 1 hour)  
✅ **Login Tracking**: `last_login` timestamp updated on each login  

### User Experience

**For Non-Admins:**
- `/admin/*` routes redirect to `/admin/login`
- After login attempt, shows "You do not have admin access" if not in admin_users table

**For Admins:**
- "Admin" button appears in navigation bar (shield icon)
- Can access all admin dashboard pages
- Logout button in dashboard header (user icon menu)

## 🔄 Complete Workflow

### Contact Form Submission Flow

```
1. User fills out contact form on /connect
2. Form submits to /api/contact POST
3. Data saved to contact_inquiries table
4. Email sent to admin with inquiry details
5. Admin receives email notification
6. Admin views inquiry in dashboard → Activity
7. Admin can update status (new → in-progress → resolved)
```

### Testimonial Submission & Approval Flow

```
1. User submits testimonial on /testimonials/submit
2. Form submits to /api/testimonials/submit POST
3. Testimonial saved with is_approved=false
4. Email sent to admin with testimonial details
5. Admin receives email notification
6. Admin views testimonial in dashboard → Testimonials
7. Admin clicks "Approve" button
8. PATCH request to /api/testimonials/[id]
9. Testimonial updated with is_approved=true
10. Thank you email sent to client
11. If "Feature" clicked, is_featured=true
12. Featured testimonials appear on homepage
```

### Admin Login Flow

```
1. User navigates to /admin/dashboard (or any admin route)
2. Middleware checks authentication
3. If not logged in → redirect to /admin/login
4. User enters email and password
5. Supabase Auth validates credentials
6. Check if user exists in admin_users table
7. If valid → redirect to /admin/dashboard
8. If invalid → show error message
9. Session stored in secure cookie
10. Admin button appears in navigation
```

## 📝 Environment Variables Checklist

Required environment variables:

```env
# Supabase (Already configured)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# New: Resend Email
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=your-admin@pinesva.com
FROM_EMAIL=noreply@pinesva.com
```

## 🚀 Deployment Checklist

### Vercel Deployment

1. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - Apply to Production, Preview, and Development

2. **Verify Domain (Optional but Recommended)**
   - Set up custom domain in Vercel
   - Update `FROM_EMAIL` to use your domain
   - Verify domain in Resend

3. **Test Email Sending**
   - Submit a test contact form
   - Check Resend dashboard for delivery
   - Check admin email inbox

4. **Create Admin User**
   - Follow "Create Your First Admin User" steps above
   - Test login at `your-domain.com/admin/login`

5. **Test Complete Flow**
   - Submit contact form → check email
   - Submit testimonial → check email
   - Login to admin → approve testimonial
   - Check client receives thank you email
   - Verify featured testimonial appears on homepage

## 🛠️ Troubleshooting

### Email Not Sending

**Check:**
1. ✅ `RESEND_API_KEY` is set correctly
2. ✅ API key is active in Resend dashboard
3. ✅ `ADMIN_EMAIL` is a valid email
4. ✅ Check Resend dashboard → "Emails" for logs
5. ✅ Check server logs for error messages

**Common Issues:**
- **"Invalid API Key"**: Double-check the API key value
- **"Domain not verified"**: Use Resend's test domain initially, or verify your domain
- **"Rate limit exceeded"**: Free plan has 100 emails/day limit

### Cannot Login to Admin

**Check:**
1. ✅ User exists in Supabase Auth → Users table
2. ✅ User exists in `admin_users` table with matching ID
3. ✅ `is_active = true` in admin_users table
4. ✅ Correct email and password
5. ✅ No typos in email address

**Common Issues:**
- **"You do not have admin access"**: User not in admin_users table
- **"Invalid email or password"**: Check credentials in Supabase Auth
- **Redirects to login infinitely**: Check middleware.ts is not blocking login page

### Admin Button Not Showing

**Check:**
1. ✅ User is logged in (check browser cookies)
2. ✅ User exists in admin_users table
3. ✅ `is_active = true`
4. ✅ Browser has loaded the latest JavaScript
5. ✅ No console errors in browser dev tools

**Fix:**
- Clear browser cache and reload
- Check browser console for errors
- Verify auth state with `supabase.auth.getUser()`

## 📊 Database Schema Updates

### New Table: `admin_users`

```sql
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Updated Table: `testimonials`

New column added:
```sql
ALTER TABLE testimonials 
ADD COLUMN client_email VARCHAR(255);
```

## 🔧 Code Structure

### Email System Files

- `/lib/email/resend.ts` - Resend client configuration
- `/lib/email/templates.tsx` - Email HTML templates
- `/lib/email/send.ts` - Email sending functions

### Authentication Files

- `/app/admin/login/page.tsx` - Login page component
- `/middleware.ts` - Route protection middleware
- `/supabase/create-admin-users-table.sql` - Database migration

### Updated Files

- `/app/api/contact/route.ts` - Added email notification
- `/app/api/testimonials/submit/route.ts` - Added email notification
- `/app/api/testimonials/[id]/route.ts` - Added approval email
- `/components/Navigation.tsx` - Added admin button
- `/components/ui/dashboard-header.tsx` - Added logout button

## 🎯 Next Steps

1. **Test everything thoroughly**
2. **Create additional admin users** as needed
3. **Customize email templates** with your branding
4. **Set up email monitoring** in Resend dashboard
5. **Configure email alerts** for critical events
6. **Add role-based permissions** (future enhancement)
7. **Implement password reset** (future enhancement)
8. **Add 2FA authentication** (future enhancement)

## 🙋 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review Supabase logs in dashboard
3. Check Resend email logs
4. Check browser console for errors
5. Check Next.js server logs

---

**Implementation Date:** October 3, 2025  
**Version:** 1.0  
**Status:** ✅ Complete and Ready for Production
