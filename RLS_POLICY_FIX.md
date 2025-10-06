# 🔴 FINAL DEBUG - RLS Policy Issue

## The Problem

Your UUIDs are now correct (✅ FIXED), but login still fails. This is likely because:

**Row Level Security (RLS) policies are blocking the SELECT query!**

---

## ✅ FIX: Update RLS Policies

Run this in **Supabase SQL Editor**:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "admin_users_select_auth" ON admin_users;
DROP POLICY IF EXISTS "admin_users_update_own" ON admin_users;

-- Create new policies that work with user_id
CREATE POLICY "admin_users_select_by_user_id" ON admin_users
  FOR SELECT
  USING (user_id = auth.uid() OR auth.uid() IS NOT NULL);

CREATE POLICY "admin_users_update_own" ON admin_users
  FOR UPDATE
  USING (user_id = auth.uid());

-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'admin_users';

-- Test the query that the login uses
SELECT * FROM admin_users WHERE user_id = auth.uid();
```

---

## 🧪 Alternative: Temporarily Disable RLS for Testing

If you want to test without RLS:

```sql
-- TEMPORARY: Disable RLS to test
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Try logging in now
-- If it works, the problem was RLS policies

-- IMPORTANT: Re-enable RLS after testing!
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

---

## 🔍 Check Current RLS Policies

```sql
-- See what policies exist
SELECT 
    policyname,
    cmd as command,
    qual as using_expression,
    with_check
FROM pg_policies 
WHERE tablename = 'admin_users';
```

---

## ✅ Recommended RLS Setup

For production, use these policies:

```sql
-- Clean start
DROP POLICY IF EXISTS "admin_users_select_auth" ON admin_users;
DROP POLICY IF EXISTS "admin_users_select_by_user_id" ON admin_users;
DROP POLICY IF EXISTS "admin_users_update_own" ON admin_users;
DROP POLICY IF EXISTS "admin_users_insert_policy" ON admin_users;

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow authenticated users to read their own admin record
CREATE POLICY "Allow user to read own admin record"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy 2: Allow service role to do everything (for API)
CREATE POLICY "Service role has full access"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy 3: Allow users to update their own record
CREATE POLICY "Allow user to update own record"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Test the policies
SET request.jwt.claims.sub = '972cf905-d768-44e5-9f16-639b01b0fae8';
SELECT * FROM admin_users WHERE user_id = '972cf905-d768-44e5-9f16-639b01b0fae8'::uuid;
```

---

## 🎯 Quick Test

Run this to see if RLS is the problem:

```sql
-- Check if RLS is blocking you
SELECT 
    'RLS Status' as info,
    rowsecurity as enabled
FROM pg_tables 
WHERE tablename = 'admin_users'
UNION ALL
SELECT 
    'Row Count Without RLS',
    COUNT(*)::text
FROM admin_users
UNION ALL
SELECT 
    'Policies Count',
    COUNT(*)::text
FROM pg_policies 
WHERE tablename = 'admin_users';
```

---

## 🚨 Most Likely Fix

The old RLS policy probably used `id = auth.uid()` but should use `user_id = auth.uid()`:

```sql
-- FIX THE RLS POLICY
DROP POLICY IF EXISTS "admin_users_select_auth" ON admin_users;

CREATE POLICY "admin_users_select_auth" ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());  -- Changed from 'id' to 'user_id'

-- Test it
SELECT * FROM admin_users WHERE user_id = auth.uid();
```

**Run this and try logging in again!**

---

## 🔧 If Still Failing

Add more detailed logging to see exactly what's happening:

```sql
-- See what auth.uid() returns
SELECT 
    auth.uid() as current_user_id,
    ad.*
FROM admin_users ad
WHERE ad.user_id = auth.uid();
```

Then try login again and check the browser console for the exact error.
