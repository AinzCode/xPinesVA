-- ============================================================================
-- CREATE FIRST ADMIN USER - Complete Setup Guide
-- ============================================================================
-- This script helps you create your first admin user for the Pines VA dashboard
-- Follow the steps in order!

-- ============================================================================
-- STEP 1: Create Auth User via Supabase Dashboard (DO THIS FIRST!)
-- ============================================================================
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project
-- 3. Click "Authentication" in the left sidebar
-- 4. Click "Users" tab
-- 5. Click "Add user" (or "Invite user")
-- 6. Enter email and password
-- 7. Click "Create user"
-- 8. IMPORTANT: Copy the user's UUID (it will look like: 12345678-1234-1234-1234-123456789012)

-- ============================================================================
-- STEP 2: Add User to admin_users Table (RUN THIS IN SQL EDITOR)
-- ============================================================================
-- 1. Go to "SQL Editor" in your Supabase Dashboard
-- 2. Replace the values below with your information
-- 3. Run this query

INSERT INTO public.admin_users (
  id,                -- UUID from auth.users (the one you copied in Step 1)
  email,             -- Your email
  full_name,         -- Your full name
  role               -- 'admin' or 'super_admin'
) VALUES (
  'PASTE-UUID-HERE'::uuid,  -- ⚠️ REPLACE THIS with UUID from Step 1
  'your@email.com',          -- ⚠️ REPLACE with your email
  'Your Full Name',          -- ⚠️ REPLACE with your name
  'super_admin'              -- Keep as 'super_admin' for full access
);

-- ============================================================================
-- EXAMPLE (Don't copy this, use your own values!)
-- ============================================================================
-- INSERT INTO public.admin_users (id, email, full_name, role)
-- VALUES (
--   'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
--   'admin@pinesva.com',
--   'John Doe',
--   'super_admin'
-- );

-- ============================================================================
-- STEP 3: Verify the User Was Created
-- ============================================================================
-- Run this query to confirm everything worked:

SELECT 
  au.id,
  au.email,
  au.full_name,
  au.role,
  au.is_active,
  au.created_at,
  u.email as auth_email,
  u.created_at as auth_created_at
FROM public.admin_users au
LEFT JOIN auth.users u ON au.id = u.id
ORDER BY au.created_at DESC;

-- ============================================================================
-- STEP 4: Test Login
-- ============================================================================
-- 1. Go to your website: your-site.vercel.app/admin/login
-- 2. Enter the email and password you created in Step 1
-- 3. Click "Sign In"
-- 4. You should be redirected to the admin dashboard!

-- ============================================================================
-- TROUBLESHOOTING
-- ============================================================================

-- Problem: "Invalid login credentials" error
-- Solution: Make sure the auth user exists in Supabase Auth > Users
SELECT * FROM auth.users WHERE email = 'your@email.com';

-- Problem: User exists but can't access admin dashboard
-- Solution: Check if user is in admin_users table
SELECT * FROM public.admin_users WHERE email = 'your@email.com';

-- Problem: Need to reset password
-- Solution: Use Supabase Dashboard > Authentication > Users > Click user > Send reset password email

-- Problem: Need to delete and start over
-- Solution: Run these queries (replace email):
DELETE FROM public.admin_users WHERE email = 'your@email.com';
-- Then manually delete from Supabase Dashboard > Authentication > Users

-- ============================================================================
-- CREATING ADDITIONAL ADMIN USERS (After your first admin is set up)
-- ============================================================================
-- Repeat Steps 1 and 2 for each additional admin user you want to create
