-- Diagnostic Script: Check Admin Users Setup
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Check if admin_users table exists and its structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;

-- 2. List all users in auth.users (your Supabase Auth users)
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- 3. List all users in admin_users table
SELECT 
    id,
    email,
    full_name,
    role,
    is_active,
    created_at
FROM admin_users
ORDER BY created_at DESC;

-- 4. Find auth users that are NOT in admin_users (these need to be added!)
SELECT 
    u.id,
    u.email,
    u.created_at,
    'NOT IN ADMIN_USERS TABLE' as status
FROM auth.users u
LEFT JOIN admin_users au ON u.id = au.id
WHERE au.id IS NULL
ORDER BY u.created_at DESC;

-- 5. Find mismatched users (in admin_users but not in auth.users)
SELECT 
    au.id,
    au.email,
    'IN ADMIN_USERS BUT NOT AUTH' as status
FROM admin_users au
LEFT JOIN auth.users u ON au.id = u.id
WHERE u.id IS NULL;
