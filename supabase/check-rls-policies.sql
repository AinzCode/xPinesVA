-- Check RLS policies on admin_users table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'admin_users';

-- Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'admin_users';

-- Try to select as if you were the authenticated user
-- This simulates what the app does
SELECT * FROM admin_users 
WHERE user_id = '972cf905-d768-44e5-9f16-639b01b0fae8'::uuid;
