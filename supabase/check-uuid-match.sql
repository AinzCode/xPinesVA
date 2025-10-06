-- DIAGNOSTIC: Check if your admin_users match auth.users

-- Step 1: See what's in auth.users
SELECT 
    id as auth_user_id,
    email as auth_email,
    created_at
FROM auth.users
ORDER BY created_at DESC;

-- Step 2: See what's in admin_users (check ALL possible column names)
SELECT * FROM admin_users ORDER BY created_at DESC;

-- Step 3: Try to match them up by email
SELECT 
    au.id as auth_id,
    au.email as auth_email,
    ad.uuid as admin_uuid,
    ad.user_id as admin_user_id,
    ad.id as admin_id,
    ad.email as admin_email,
    ad.name as admin_name,
    CASE 
        WHEN au.id = ad.uuid THEN '✅ UUIDs match via uuid column'
        WHEN au.id = ad.user_id THEN '✅ UUIDs match via user_id column'
        WHEN au.id = ad.id THEN '✅ UUIDs match via id column'
        WHEN au.email = ad.email THEN '⚠️ Emails match but UUIDs different'
        ELSE '❌ NO MATCH'
    END as match_status
FROM auth.users au
FULL OUTER JOIN admin_users ad ON au.email = ad.email
ORDER BY au.created_at DESC;

-- Step 4: Find the actual column name for the UUID in admin_users
SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
  AND data_type = 'uuid'
ORDER BY ordinal_position;
