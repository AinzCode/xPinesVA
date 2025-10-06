-- Find out exactly what columns exist in your admin_users table
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;

-- Also show a sample row to see the structure
SELECT * FROM admin_users LIMIT 1;
