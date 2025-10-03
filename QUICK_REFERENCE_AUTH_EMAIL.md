# Quick Reference: Email & Authentication

## 🚀 Quick Setup (5 Minutes)

### 1. Add Environment Variables

```env
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=admin@pinesva.com
FROM_EMAIL=noreply@pinesva.com
```

### 2. Run SQL Migrations

In Supabase SQL Editor:

```sql
-- Run: supabase/create-admin-users-table.sql
-- Run: supabase/add-client-email-to-testimonials.sql
```

### 3. Create Admin User

```sql
-- First, create user in Supabase Auth dashboard
-- Then insert into admin_users:
INSERT INTO admin_users (id, email, full_name, is_active)
VALUES ('user-id-from-auth', 'admin@pinesva.com', 'Your Name', true);
```

### 4. Test

- Login: `https://your-domain.com/admin/login`
- Submit form: `https://your-domain.com/connect`
- Check emails in Resend dashboard

## 📧 Email Functions

```typescript
// Send contact form email
import { sendContactFormEmail } from '@/lib/email/send';
await sendContactFormEmail({ name, email, message, ... });

// Send testimonial submission email
import { sendTestimonialSubmissionEmail } from '@/lib/email/send';
await sendTestimonialSubmissionEmail({ clientName, testimonial, ... });

// Send testimonial approval email
import { sendTestimonialApprovalEmail } from '@/lib/email/send';
await sendTestimonialApprovalEmail({ clientName, clientEmail, testimonial });
```

## 🔐 Auth Functions

```typescript
// Check if user is admin
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
const { data: { user } } = await supabase.auth.getUser();
const { data: adminUser } = await supabase
  .from('admin_users')
  .select('*')
  .eq('id', user.id)
  .eq('is_active', true)
  .single();

// Logout
await supabase.auth.signOut();
```

## 🛣️ Routes

| Route | Purpose | Protected |
|-------|---------|-----------|
| `/admin/login` | Admin login page | ❌ No |
| `/admin/dashboard` | Main dashboard | ✅ Yes |
| `/admin/testimonials` | Manage testimonials | ✅ Yes |
| `/admin/activity` | View inquiries | ✅ Yes |
| `/admin/*` | All admin pages | ✅ Yes |

## 📊 Database Tables

### `admin_users`
- `id` - UUID (references auth.users)
- `email` - VARCHAR(255)
- `full_name` - VARCHAR(255)
- `role` - VARCHAR(50)
- `is_active` - BOOLEAN
- `last_login` - TIMESTAMP

### `testimonials` (updated)
- Added: `client_email` - VARCHAR(255)

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Email not sending | Check RESEND_API_KEY and Resend dashboard logs |
| Can't login | Verify user in both auth.users and admin_users tables |
| Admin button not visible | Check user is logged in and is_active=true |
| Redirect loop | Clear cookies and check middleware.ts |

## 📦 Files Added/Modified

### New Files
- `/lib/email/resend.ts`
- `/lib/email/templates.tsx`
- `/lib/email/send.ts`
- `/app/admin/login/page.tsx`
- `/middleware.ts`
- `/supabase/create-admin-users-table.sql`
- `/supabase/add-client-email-to-testimonials.sql`

### Modified Files
- `/app/api/contact/route.ts`
- `/app/api/testimonials/submit/route.ts`
- `/app/api/testimonials/[id]/route.ts`
- `/components/Navigation.tsx`
- `/components/ui/dashboard-header.tsx`
- `/package.json` (added resend)

## ✅ Testing Checklist

- [ ] Environment variables set
- [ ] SQL migrations run
- [ ] Admin user created
- [ ] Can login at /admin/login
- [ ] Contact form sends email
- [ ] Testimonial submission sends email
- [ ] Testimonial approval sends email
- [ ] Admin button visible when logged in
- [ ] Logout works correctly
- [ ] Featured testimonials on homepage

---

For detailed documentation, see: `EMAIL_AND_AUTH_IMPLEMENTATION.md`
