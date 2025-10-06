# 🔴 FINAL FIX - Correct Column Names

## Your Database Structure

Based on the errors, your `admin_users` table likely has these columns:
- `id` or `user_id`
- `email`
- `name` (NOT `full_name`)
- `role`
- NO `is_active` column

---

## ✅ **Try These SQL Statements (In Order)**

### Option 1: If table uses `id` column

```sql
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin'
);
```

### Option 2: If table uses `user_id` column

```sql
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin'
);
```

---

## 🎯 **Step-by-Step (GUARANTEED TO WORK)**

### Step 1: Find Exact Column Names

Run this in Supabase SQL Editor:

```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;
```

You'll see output like:
```
column_name
-----------
id           (or user_id)
email
name
role
created_at
updated_at
```

### Step 2: Get Your UUID

```sql
SELECT id, email FROM auth.users;
```

Copy the UUID for your user.

### Step 3: Insert Using Exact Column Names

**Based on what you see in Step 1**, use the matching INSERT:

#### If you saw `id` in Step 1:
```sql
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'YOUR-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin'
);
```

#### If you saw `user_id` in Step 1:
```sql
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'YOUR-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin'
);
```

### Step 4: Verify

```sql
SELECT * FROM admin_users WHERE email = 'your@email.com';
```

---

## 🤖 **Auto-Generate the Correct SQL**

Run this query - it will tell you exactly what to run:

```sql
-- This generates the exact INSERT statement for YOUR table
WITH columns AS (
  SELECT array_agg(column_name ORDER BY ordinal_position) as cols
  FROM information_schema.columns 
  WHERE table_name = 'admin_users' 
    AND column_name IN ('id', 'user_id', 'email', 'name', 'role')
)
SELECT 
  'Your table columns: ' || array_to_string(cols, ', ') as info,
  'INSERT INTO admin_users (' || array_to_string(cols, ', ') || 
  ') VALUES (''UUID-HERE''::uuid, ''EMAIL-HERE'', ''NAME-HERE'', ''super_admin'');' as sql_to_use
FROM columns;
```

This will show you EXACTLY what INSERT statement to use!

---

## 📋 **Complete Example**

```sql
-- 1. Check table structure
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'admin_users' ORDER BY ordinal_position;

-- 2. Get UUID
SELECT id, email FROM auth.users WHERE email = 'admin@pinesva.com';

-- 3a. If table has 'id' column (try this first):
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'admin@pinesva.com',
  'Admin User',
  'super_admin'
);

-- 3b. If you get error "column id does not exist", try 'user_id':
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'admin@pinesva.com',
  'Admin User',
  'super_admin'
);

-- 4. Verify it worked
SELECT * FROM admin_users WHERE email = 'admin@pinesva.com';
```

---

## 🆘 **If STILL Getting Errors**

Show me the output of this query:

```sql
SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;
```

Then I can give you the EXACT INSERT statement that will work!

---

## 🎯 **Most Likely Solution**

Based on typical setups, try this:

```sql
-- Get your UUID
SELECT id, email FROM auth.users;

-- Insert (minimal columns, most likely to work)
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'PASTE-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin'
);
```

**OR**

```sql
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'PASTE-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin'
);
```

One of these two should work!

---

## 💡 **Quick Test**

Try both versions and see which works:

```sql
-- Version 1
INSERT INTO admin_users (id, email, name, role)
SELECT id, email, 'Admin User', 'super_admin'
FROM auth.users 
WHERE email = 'your@email.com';

-- If that fails, try Version 2
INSERT INTO admin_users (user_id, email, name, role)
SELECT id, email, 'Admin User', 'super_admin'
FROM auth.users 
WHERE email = 'your@email.com';
```

One of these will work and insert your user automatically!
