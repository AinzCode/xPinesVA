# Fix Existing Users - Add to admin_users Table

## Problem

You have users in Supabase Auth (`auth.users`) but they're not in the `admin_users` table, so they can't login to the admin dashboard.

**Error**: "Admin check failed" → "You do not have admin access"

---

## Quick Fix (3 Steps)

### Step 1: Find Your Auth Users

Go to **Supabase Dashboard** → Your Project → **SQL Editor** → Run this:

```sql
-- Find all auth users that need to be added to admin_users
SELECT 
    u.id,
    u.email,
    u.created_at
FROM auth.users u
LEFT JOIN admin_users au ON u.id = au.id
WHERE au.id IS NULL
ORDER BY u.created_at DESC;
```

This shows all users that exist in `auth.users` but NOT in `admin_users`.

**Copy the UUID(s) from the results** - you'll need them in Step 2.

---

### Step 2: Add Users to admin_users Table

For **each user** you want to give admin access, run this SQL:

```sql
-- Replace these values with your actual data:
-- 1. PASTE-UUID-HERE = The UUID from Step 1
-- 2. user@example.com = The email from Step 1
-- 3. User Name = The person's full name
-- 4. super_admin = Role (use 'super_admin' or 'admin')

INSERT INTO admin_users (
  id,
  email,
  full_name,
  role,
  is_active
) VALUES (
  'PASTE-UUID-HERE'::uuid,      -- ⚠️ Replace with UUID from Step 1
  'user@example.com',            -- ⚠️ Replace with email from Step 1
  'User Name',                   -- ⚠️ Replace with user's full name
  'super_admin',                 -- Keep as 'super_admin' for full access
  true                           -- User is active
);
```

**Example** (Don't copy this - use your own values!):
```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'admin@pinesva.com',
  'John Doe',
  'super_admin',
  true
);
```

**If you have multiple users**, repeat this for each one, OR use this multi-insert:

```sql
INSERT INTO admin_users (id, email, full_name, role, is_active) VALUES
  ('UUID-1'::uuid, 'user1@example.com', 'User One', 'super_admin', true),
  ('UUID-2'::uuid, 'user2@example.com', 'User Two', 'admin', true),
  ('UUID-3'::uuid, 'user3@example.com', 'User Three', 'admin', true);
```

---

### Step 3: Verify It Worked

Run this query to confirm:

```sql
-- Check all admin users now
SELECT 
    au.id,
    au.email,
    au.full_name,
    au.role,
    au.is_active,
    u.email as auth_email,
    u.last_sign_in_at
FROM admin_users au
LEFT JOIN auth.users u ON au.id = u.id
ORDER BY au.created_at DESC;
```

You should see:
- ✅ Your email listed
- ✅ `role` as 'super_admin' or 'admin'
- ✅ `is_active` as `true`
- ✅ `auth_email` matches your email

---

### Step 4: Test Login

1. Go to `/admin/login`
2. Enter your email and password (from Supabase Auth)
3. Click "Sign In"
4. You should now be redirected to the dashboard! 🎉

---

## Full Diagnostic Script

If you want to see everything, run this complete diagnostic:

```sql
-- 1. Check if admin_users table exists
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;

-- 2. List all auth users
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- 3. List all admin_users
SELECT 
    id,
    email,
    full_name,
    role,
    is_active,
    created_at
FROM admin_users
ORDER BY created_at DESC;

-- 4. Find auth users NOT in admin_users (⚠️ THESE NEED TO BE ADDED!)
SELECT 
    u.id,
    u.email,
    u.created_at,
    'NOT IN ADMIN_USERS - ADD THESE!' as status
FROM auth.users u
LEFT JOIN admin_users au ON u.id = au.id
WHERE au.id IS NULL
ORDER BY u.created_at DESC;

-- 5. Find mismatched users (should be empty)
SELECT 
    au.id,
    au.email,
    'IN ADMIN_USERS BUT NOT AUTH' as warning
FROM admin_users au
LEFT JOIN auth.users u ON au.id = u.id
WHERE u.id IS NULL;
```

---

## Common Scenarios

### Scenario 1: I Have 1 Existing User

```sql
-- 1. Find your user
SELECT id, email FROM auth.users WHERE email = 'your@email.com';

-- 2. Copy the UUID, then insert
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'YOUR-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin',
  true
);

-- 3. Test login!
```

---

### Scenario 2: I Have Multiple Existing Users

```sql
-- 1. See all users that need to be added
SELECT id, email FROM auth.users u
LEFT JOIN admin_users au ON u.id = au.id
WHERE au.id IS NULL;

-- 2. Add them all at once
INSERT INTO admin_users (id, email, full_name, role, is_active) VALUES
  ('uuid-1'::uuid, 'user1@example.com', 'User One', 'super_admin', true),
  ('uuid-2'::uuid, 'user2@example.com', 'User Two', 'admin', true),
  ('uuid-3'::uuid, 'user3@example.com', 'User Three', 'admin', true);
```

---

### Scenario 3: I Don't Know My User's UUID

```sql
-- Method 1: Search by email
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'your@email.com';

-- Method 2: List all users
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- Method 3: Or go to Supabase Dashboard > Authentication > Users
-- The UUID is shown in the table
```

---

## Troubleshooting

### "Invalid login credentials"

**Cause**: Wrong email or password

**Solution**:
1. Check email spelling
2. Reset password in Supabase Dashboard:
   - Go to **Authentication** → **Users**
   - Find the user
   - Click the 3 dots → **Reset Password**
   - Copy the new password or send reset email

---

### "Admin check failed" (even after adding to admin_users)

**Cause**: Mismatch in the `id` field

**Solution**: Verify the IDs match:
```sql
SELECT 
    u.id as auth_id,
    u.email as auth_email,
    au.id as admin_id,
    au.email as admin_email
FROM auth.users u
FULL OUTER JOIN admin_users au ON u.id = au.id
WHERE u.email = 'your@email.com';
```

Both `auth_id` and `admin_id` should be the same UUID.

---

### "User is not active"

**Cause**: `is_active = false` in admin_users table

**Solution**:
```sql
UPDATE admin_users 
SET is_active = true 
WHERE email = 'your@email.com';
```

---

### Still Can't Login?

Run this comprehensive check:

```sql
-- Check everything for a specific user
WITH user_check AS (
  SELECT 
    u.id as auth_id,
    u.email as auth_email,
    u.email_confirmed_at,
    au.id as admin_id,
    au.email as admin_email,
    au.role,
    au.is_active
  FROM auth.users u
  LEFT JOIN admin_users au ON u.id = au.id
  WHERE u.email = 'YOUR-EMAIL-HERE'
)
SELECT 
  *,
  CASE 
    WHEN auth_id IS NULL THEN '❌ User does not exist in auth.users'
    WHEN email_confirmed_at IS NULL THEN '❌ Email not confirmed'
    WHEN admin_id IS NULL THEN '❌ User not in admin_users table'
    WHEN is_active = false THEN '❌ User is inactive'
    WHEN role NOT IN ('admin', 'super_admin') THEN '❌ Invalid role'
    ELSE '✅ User should be able to login'
  END as diagnosis
FROM user_check;
```

---

## Prevention: Create Users Correctly Next Time

### Option 1: Manual Creation (Most Secure)

Always create users in TWO steps:

**Step 1**: Create in Supabase Auth
- Dashboard → Authentication → Users → Add User

**Step 2**: Add to admin_users table
```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES ('UUID-FROM-STEP-1'::uuid, 'email', 'name', 'super_admin', true);
```

### Option 2: Use the Dashboard Feature

Once you have a super_admin, use the built-in feature:
1. Login to `/admin/login`
2. Go to `/admin/users`
3. Click "Create Admin"
4. Fill the form → automatically creates both auth and admin_users entries!

---

## Quick Copy-Paste Template

Replace `YOUR-UUID-HERE`, `your@email.com`, and `Your Name`:

```sql
-- Add existing auth user to admin_users table
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'YOUR-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin',
  true
);

-- Verify it worked
SELECT * FROM admin_users WHERE email = 'your@email.com';
```

---

## Need Help Finding Your Info?

Run this to see everything you need:

```sql
-- Get UUID and email for all auth users not yet in admin_users
SELECT 
    '-- Add this user:' as instruction,
    CONCAT(
        'INSERT INTO admin_users (id, email, full_name, role, is_active) VALUES (''',
        u.id,
        '''::uuid, ''',
        u.email,
        ''', ''ENTER-FULL-NAME-HERE'', ''super_admin'', true);'
    ) as sql_to_run
FROM auth.users u
LEFT JOIN admin_users au ON u.id = au.id
WHERE au.id IS NULL;
```

This generates the exact SQL you need to run! Just replace `ENTER-FULL-NAME-HERE` with the person's name.

---

**After running these steps, try logging in again. It should work!** 🎉

If you still have issues, share the output of the diagnostic queries and I'll help debug further.
