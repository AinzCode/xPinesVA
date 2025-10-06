# Admin User Creation Feature

## Overview

Super admins can now create new admin accounts directly from the dashboard without needing to access the Supabase database manually. This streamlines the onboarding process while maintaining strict security controls.

## Features

✅ **Role-based access** - Only super_admins can create new admin users  
✅ **Auto-generated passwords** - Secure random passwords created automatically  
✅ **Email invitations** - New admins receive welcome emails with credentials  
✅ **Role selection** - Choose between 'admin' or 'super_admin' roles  
✅ **Instant activation** - New accounts are active immediately  
✅ **Error handling** - Clear feedback on validation and creation errors  

---

## How to Use

### Prerequisites

1. You must be logged in as a **super_admin**
2. Your account must be active (`is_active = true`)

### Step-by-Step Guide

#### 1. Access the Creation Page

1. Log in to the admin dashboard at `/admin/login`
2. Navigate to **User Management** (`/admin/users`)
3. Click the **"Create Admin"** button in the top-right corner

> **Note**: If you don't see the "Create Admin" button, you are not logged in as a super_admin.

#### 2. Fill Out the Form

The form has three required fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Email** | Admin's email address (must be unique) | `john@pinesva.com` |
| **Full Name** | Admin's full name | `John Doe` |
| **Role** | Access level: `admin` or `super_admin` | `admin` |

**Password**: Auto-generated securely (16 characters)

#### 3. Submit and Confirm

1. Review the information
2. Click **"Create Admin User"**
3. Wait for confirmation (usually 2-3 seconds)
4. On success:
   - You'll see the generated password
   - An email is sent to the new admin
   - You're redirected to the Users page

#### 4. Share Credentials

The system will display:
- ✅ Admin created successfully
- 📧 Email address
- 🔑 Temporary password

**Important**: Copy the password immediately! It won't be shown again.

---

## Role Differences

### Admin
- Access to dashboard
- View testimonials
- View contact inquiries
- View analytics
- **Cannot** create other admin users
- **Cannot** access sensitive settings

### Super Admin
- All admin permissions
- **Can** create new admin users
- **Can** manage other admins
- **Can** access all system settings
- Full database access

---

## Security Features

### 1. **Route Protection**
- `/admin/users/create` is protected by middleware
- Only super_admins can access this route
- Non-super_admins are redirected to dashboard

### 2. **API Security**
```typescript
// API checks current user role before creating
const { data: { user } } = await supabase.auth.getUser();
const { data: currentAdmin } = await supabase
  .from('admin_users')
  .select('role')
  .eq('id', user.id)
  .single();

if (currentAdmin.role !== 'super_admin') {
  return Response.json({ error: 'Unauthorized' }, { status: 403 });
}
```

### 3. **Password Generation**
- 16 characters long
- Includes uppercase, lowercase, numbers, and symbols
- Cryptographically secure random generation
- Unique for each admin

### 4. **Email Validation**
- Checks for valid email format
- Prevents duplicate emails
- Validates against existing auth users

### 5. **Error Handling**
- Duplicate email detection
- Invalid role validation
- Database transaction safety
- Clear error messages to user

---

## Email Notifications

New admins receive an email with:
- Welcome message
- Login credentials (email + temporary password)
- Link to admin login page
- Instructions to change password on first login

**Email Template Location**: `/lib/email/templates/admin-invite.ts`

---

## Troubleshooting

### "Create Admin" Button Not Visible
**Cause**: You're not logged in as a super_admin  
**Solution**: 
```sql
-- Check your role
SELECT role FROM admin_users WHERE email = 'your@email.com';

-- Upgrade to super_admin (run in Supabase SQL Editor)
UPDATE admin_users 
SET role = 'super_admin' 
WHERE email = 'your@email.com';
```

### "Unauthorized" Error
**Cause**: Session expired or insufficient permissions  
**Solution**: 
1. Log out and log back in
2. Verify your role is `super_admin`
3. Check browser console for detailed errors

### "Email already exists"
**Cause**: An admin with that email already exists  
**Solution**: 
1. Use a different email address
2. Or delete the existing admin first:
```sql
-- Check if email exists
SELECT * FROM admin_users WHERE email = 'admin@example.com';

-- Delete if necessary (careful!)
DELETE FROM admin_users WHERE email = 'admin@example.com';
-- Also delete from Supabase Dashboard > Authentication > Users
```

### "Failed to create admin user"
**Cause**: Database error or validation failure  
**Solution**: 
1. Check browser console for error details
2. Verify Supabase connection is working
3. Check `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
4. Ensure admin_users table exists

### Email Not Sent
**Cause**: Resend API not configured or service down  
**Solution**: 
1. Verify `RESEND_API_KEY` is set in `.env.local`
2. Check Resend dashboard for delivery status
3. Verify email template is correct
4. Check spam folder
5. Share password manually as a backup

---

## Best Practices

### 1. **Limit Super Admins**
- Only promote trusted team members
- Review super_admin list regularly
- Audit admin actions periodically

### 2. **Password Management**
- Send passwords via secure channel (not plain email)
- Encourage password change on first login
- Consider implementing forced password reset

### 3. **Regular Audits**
```sql
-- List all admins
SELECT email, full_name, role, is_active, created_at 
FROM admin_users 
ORDER BY created_at DESC;

-- Count by role
SELECT role, COUNT(*) 
FROM admin_users 
WHERE is_active = true 
GROUP BY role;
```

### 4. **Deactivate Instead of Delete**
```sql
-- Deactivate admin (preserves records)
UPDATE admin_users 
SET is_active = false 
WHERE email = 'former@employee.com';
```

### 5. **Monitor Creation Activity**
- Review who created which admins
- Set up alerts for new admin creation
- Log all admin user changes

---

## Technical Implementation

### Files Involved

| File | Purpose |
|------|---------|
| `/app/api/admin/users/create/route.ts` | API endpoint for user creation |
| `/app/admin/users/create/page.tsx` | Admin creation form UI |
| `/app/admin/users/page.tsx` | User management page (shows button) |
| `/app/admin/users/client.tsx` | Client component with Create button |
| `/middleware.ts` | Route protection logic |
| `/lib/email/templates/admin-invite.ts` | Email template (if exists) |

### Database Tables

**admin_users** table structure:
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

### API Endpoint

**POST** `/api/admin/users/create`

**Request Body**:
```json
{
  "email": "newadmin@pinesva.com",
  "fullName": "New Admin",
  "role": "admin"
}
```

**Response** (Success):
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "email": "newadmin@pinesva.com",
    "role": "admin"
  },
  "temporaryPassword": "generated-password-here"
}
```

**Response** (Error):
```json
{
  "error": "Email already exists"
}
```

---

## Security Checklist

Before using this feature in production:

- [ ] Verify `SUPABASE_SERVICE_ROLE_KEY` is kept secret
- [ ] Ensure middleware protects `/admin/users/create` route
- [ ] Test that non-super_admins cannot access the page
- [ ] Confirm emails are sent successfully
- [ ] Test duplicate email handling
- [ ] Verify password strength requirements
- [ ] Set up admin activity logging
- [ ] Enable 2FA for super_admins (in Supabase settings)
- [ ] Document admin offboarding process
- [ ] Create backup of admin_users table regularly

---

## Future Enhancements

Potential improvements:

1. **Password Requirements** - Force password change on first login
2. **2FA Enforcement** - Require 2FA for all admins
3. **Audit Logs** - Track who created whom and when
4. **Bulk Import** - Upload CSV to create multiple admins
5. **Permissions Granularity** - Fine-grained role permissions
6. **Admin Activity Dashboard** - View login history and actions
7. **Email Templates** - Customize invitation emails
8. **Expiring Invites** - Time-limited invitation links

---

## Quick Reference Commands

```sql
-- Create your first super_admin manually (one-time setup)
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'AUTH-USER-UUID'::uuid,
  'admin@pinesva.com',
  'Your Name',
  'super_admin',
  true
);

-- List all admins
SELECT email, full_name, role, is_active FROM admin_users;

-- Promote admin to super_admin
UPDATE admin_users SET role = 'super_admin' WHERE email = 'user@example.com';

-- Deactivate admin
UPDATE admin_users SET is_active = false WHERE email = 'user@example.com';

-- Reactivate admin
UPDATE admin_users SET is_active = true WHERE email = 'user@example.com';

-- Delete admin (use carefully!)
DELETE FROM admin_users WHERE email = 'user@example.com';
-- Don't forget to delete from auth.users too!
```

---

## Support

If you encounter issues:

1. Check browser console for errors
2. Review Supabase logs in dashboard
3. Verify all environment variables are set
4. Ensure you're logged in as super_admin
5. Check database connection and RLS policies

For critical issues, contact your system administrator or refer to the main admin setup guide: `ADMIN_USER_SETUP_GUIDE.md`

---

**Last Updated**: October 4, 2025  
**Feature Status**: ✅ Production Ready
