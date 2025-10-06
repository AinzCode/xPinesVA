# ✅ CORRECTED: Fix Existing Users SQL

## The Issue

Your `admin_users` table uses **`name`** column, not `full_name`.

---

## ✅ **CORRECT SQL - Use This!**

### Step 1: Check What Columns Your Table Actually Has

Run this in **Supabase SQL Editor**:

```sql
-- See actual column names
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;
```

---

### Step 2: Add User to admin_users (CORRECTED)

#### **If your table has `name` column and uses `id`:**

```sql
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,     -- ⚠️ UUID from Authentication > Users
  'admin@pinesva.com',               -- ⚠️ Your email
  'Your Name',                       -- ⚠️ Your name
  'super_admin'                      -- Keep this
);
```

#### **If your table has `name` column and uses `user_id`:**

```sql
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,     -- ⚠️ UUID from Authentication > Users
  'admin@pinesva.com',               -- ⚠️ Your email
  'Your Name',                       -- ⚠️ Your name
  'super_admin'                      -- Keep this
);
```

#### **If your table has `full_name` column:**

```sql
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,
  'admin@pinesva.com',
  'Your Name',
  'super_admin',
  true
);
```

---

## 🎯 **Even Better: Let The Database Tell You**

Run this query - it will generate the exact INSERT statement you need:

```sql
-- This auto-generates the correct INSERT statement for your table structure
SELECT 
    'INSERT INTO admin_users (' ||
    string_agg(column_name, ', ' ORDER BY ordinal_position) ||
    ') VALUES (...)' as suggested_insert_format
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
  AND column_name IN ('id', 'user_id', 'email', 'name', 'full_name', 'role', 'is_active');
```

---

## 🚀 **Quick Fix Based on Your Error**

Since you got error about `full_name`, your table uses `name`. Try this:

```sql
-- Get your UUID first
SELECT id, email FROM auth.users WHERE email = 'YOUR-EMAIL@example.com';

-- Then insert with the UUID (using 'name' not 'full_name')
-- Try version with 'id' first:
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'PASTE-UUID-FROM-ABOVE'::uuid,
  'YOUR-EMAIL@example.com',
  'Your Actual Name',
  'super_admin'
);

-- If that fails with "column id does not exist", try 'user_id':
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'PASTE-UUID-FROM-ABOVE'::uuid,
  'YOUR-EMAIL@example.com',
  'Your Actual Name',
  'super_admin'
);
```

---

## 📋 **Complete Example**

```sql
-- Example: Adding admin@pinesva.com

-- 1. Get the UUID
SELECT id, email FROM auth.users WHERE email = 'admin@pinesva.com';
-- Result: id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

-- 2. Insert into admin_users (try with 'id' first)
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'admin@pinesva.com',
  'Admin User',
  'super_admin'
);

-- If above fails, try with 'user_id' instead:
INSERT INTO admin_users (user_id, email, name, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  'admin@pinesva.com',
  'Admin User',
  'super_admin'
);

-- 3. Verify
SELECT * FROM admin_users WHERE email = 'admin@pinesva.com';
```

---

## 🔧 **Handle Both Scenarios**

If you're not sure which column exists, run this safe query:

```sql
-- This works regardless of column name
DO $$
DECLARE
    has_full_name boolean;
    user_uuid uuid;
    user_email text := 'YOUR-EMAIL@example.com';  -- Change this
    user_name text := 'Your Name';                -- Change this
BEGIN
    -- Get UUID
    SELECT id INTO user_uuid FROM auth.users WHERE email = user_email;
    
    -- Check if full_name column exists
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' AND column_name = 'full_name'
    ) INTO has_full_name;
    
    -- Insert with correct column name
    IF has_full_name THEN
        INSERT INTO admin_users (id, email, full_name, role, is_active)
        VALUES (user_uuid, user_email, user_name, 'super_admin', true);
    ELSE
        INSERT INTO admin_users (id, email, name, role, is_active)
        VALUES (user_uuid, user_email, user_name, 'super_admin', true);
    END IF;
    
    RAISE NOTICE 'User added successfully!';
END $$;
```

---

## ✅ **Recommended: Simple 3-Step Process**

### 1️⃣ Get Your User ID

```sql
SELECT id, email FROM auth.users;
```

Copy the UUID you see.

### 2️⃣ Insert Using `name` Column

```sql
INSERT INTO admin_users (id, email, name, role, is_active)
VALUES (
  'PASTE-UUID-HERE'::uuid,
  'your@email.com',
  'Your Name',
  'super_admin',
  true
);
```

### 3️⃣ Verify

```sql
SELECT * FROM admin_users WHERE email = 'your@email.com';
```

---

## 🎯 **Try Login Again**

After running the correct INSERT statement:

1. Go to `/admin/login`
2. Enter your email and password
3. Should work now! 🎉

---

## 🆘 **Still Getting Errors?**

### Error: "column X does not exist"

**Run this to see ALL columns:**
```sql
SELECT column_name, data_type
FROM information_schema.columns 
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;
```

Then use the exact column names you see in your INSERT statement.

### Error: "duplicate key value"

User already exists! Check:
```sql
SELECT * FROM admin_users WHERE email = 'your@email.com';
```

If found, just update instead:
```sql
UPDATE admin_users 
SET role = 'super_admin', is_active = true
WHERE email = 'your@email.com';
```

---

**The key difference: Use `name` not `full_name` in your INSERT statement!**
