# Admin Login Fix - Column Name Correction

## Problem Fixed ✅

The admin login was failing because there was a mismatch between:
- **Database schema**: Uses `id` column (references `auth.users.id`)
- **Login code**: Was using `user_id` column (which doesn't exist)

## Changes Made

### 1. Fixed Login Page (`app/admin/login/page.tsx`)
- Changed `.eq('user_id', data.user.id)` → `.eq('id', data.user.id)`
- Changed `.single()` → `.maybeSingle()` for better error handling
- Fixed update query to use `last_login` field instead of `updated_at`

### 2. Fixed Middleware (`middleware.ts`)
- Changed `.eq('user_id', user.id)` → `.eq('id', user.id)`
- Changed `.single()` → `.maybeSingle()`
- Added check for `is_active` status

### 3. Fixed SQL Script (`supabase/create-admin-user.sql`)
- Corrected INSERT statement to use `id` instead of `user_id`
- Corrected column name from `name` to `full_name`
- Updated verification query to match correct schema

## How to Create Your First Admin User

### Step 1: Create Auth User in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **pines-va**
3. Navigate to **Authentication** → **Users**
4. Click **"Add user"**
5. Enter:
   - **Email**: `admin@pinesva.com` (or your email)
   - **Password**: Your secure password
   - **Auto Confirm User**: ✅ Enable this
6. Click **"Create user"**
7. **Copy the UUID** (e.g., `12345678-abcd-1234-abcd-123456789012`)

### Step 2: Add to admin_users Table

In Supabase **SQL Editor**, run:

```sql
INSERT INTO admin_users (
  id,
  email,
  full_name,
  role,
  is_active
) VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,  -- The UUID from Step 1
  'admin@pinesva.com',            -- Same email as Step 1
  'Your Full Name',               -- Your name
  'super_admin',                  -- or 'admin'
  true                            -- Active user
);
```

### Step 3: Verify It Worked

```sql
-- Check if admin user exists
SELECT 
  au.id,
  au.email,
  au.full_name,
  au.role,
  au.is_active,
  au.created_at,
  u.email as auth_email
FROM admin_users au
LEFT JOIN auth.users u ON au.id = u.id
ORDER BY au.created_at DESC;
```

You should see your admin user with matching `id` and `auth_email`.

### Step 4: Test Login

1. Go to: `http://localhost:3000/admin/login` (or your deployed URL)
2. Enter your email and password from Step 1
3. Click **"Sign In"**
4. You should be redirected to `/admin/dashboard` 🎉

## Troubleshooting

### Error: "Admin check failed"
**Cause**: User exists in `auth.users` but not in `admin_users` table

**Solution**: 
1. Get your user ID:
```sql
SELECT id, email FROM auth.users WHERE email = 'your@email.com';
```

2. Add to admin_users:
```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES ('YOUR-UUID-HERE'::uuid, 'your@email.com', 'Your Name', 'admin', true);
```

### Error: "Invalid login credentials"
**Cause**: No auth user exists with that email/password

**Solution**: Create the auth user first (Step 1 above)

### Error: Still can't login after following steps
**Check**:
1. User exists in auth.users: 
   ```sql
   SELECT * FROM auth.users WHERE email = 'your@email.com';
   ```

2. User exists in admin_users:
   ```sql
   SELECT * FROM admin_users WHERE email = 'your@email.com';
   ```

3. IDs match:
   ```sql
   SELECT 
     u.id as auth_id,
     au.id as admin_id,
     u.email
   FROM auth.users u
   LEFT JOIN admin_users au ON u.id = au.id
   WHERE u.email = 'your@email.com';
   ```

4. User is active:
   ```sql
   SELECT is_active FROM admin_users WHERE email = 'your@email.com';
   ```

## Database Schema Reference

### admin_users Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | References `auth.users.id` |
| `email` | VARCHAR(255) | User's email (unique) |
| `full_name` | VARCHAR(255) | Full name |
| `role` | VARCHAR(50) | 'admin' or 'super_admin' |
| `is_active` | BOOLEAN | Whether user can login |
| `last_login` | TIMESTAMP | Last login time |
| `created_at` | TIMESTAMP | Account creation time |
| `updated_at` | TIMESTAMP | Last update time |

## What Changed Technically

### Before (Broken)
```typescript
// Login was looking for 'user_id' column (doesn't exist)
.eq('user_id', data.user.id)
.single() // Throws error if not found
```

### After (Fixed)
```typescript
// Now correctly uses 'id' column (exists in schema)
.eq('id', data.user.id)
.maybeSingle() // Returns null if not found (safer)
```

## RLS Policies

The table has these security policies:
1. **SELECT**: Any authenticated user can read (to check admin status)
2. **UPDATE**: Users can only update their own record

These are correctly configured and don't need changes.

---

## Quick Command Reference

```sql
-- List all admin users
SELECT id, email, full_name, role, is_active FROM admin_users;

-- Deactivate a user (don't delete!)
UPDATE admin_users SET is_active = false WHERE email = 'user@example.com';

-- Reactivate a user
UPDATE admin_users SET is_active = true WHERE email = 'user@example.com';

-- Change user role
UPDATE admin_users SET role = 'super_admin' WHERE email = 'user@example.com';

-- Delete a user (use carefully!)
DELETE FROM admin_users WHERE email = 'user@example.com';
-- Don't forget to also delete from auth.users in Supabase Dashboard
```

---

**The admin login should now work correctly!** 🎉
