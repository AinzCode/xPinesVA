# ✅ FIX YOUR LOGIN - Quick Steps

## Problem
Your table uses `name` column, not `full_name`.

---

## ✅ **Solution (Copy & Paste This)**

### Step 1: Get Your User's UUID

In **Supabase Dashboard** → **SQL Editor**, run:

```sql
SELECT id, email FROM auth.users;
```

**Copy the UUID** for the user you want to make an admin.

---

### Step 2: Add to admin_users Table

**Copy this SQL, replace the values, and run it:**

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

**Example:**
```sql
INSERT INTO admin_users (id, email, name, role, is_active)
VALUES (
  '12345678-abcd-1234-abcd-123456789012'::uuid,
  'admin@pinesva.com',
  'Admin User',
  'super_admin',
  true
);
```

---

### Step 3: Verify

```sql
SELECT * FROM admin_users WHERE email = 'your@email.com';
```

You should see your user listed!

---

### Step 4: Login

1. Go to `/admin/login`
2. Enter your email and password
3. Should work now! 🎉

---

## 🔄 **For Multiple Users**

```sql
INSERT INTO admin_users (id, email, name, role, is_active) VALUES
  ('uuid-1'::uuid, 'user1@email.com', 'User One', 'super_admin', true),
  ('uuid-2'::uuid, 'user2@email.com', 'User Two', 'admin', true);
```

---

## 🆘 **Still Having Issues?**

### Get Auto-Generated SQL

Run this - it creates the INSERT statements for you:

```sql
SELECT 
    'INSERT INTO admin_users (id, email, name, role, is_active) VALUES (''' ||
    u.id::text ||
    '''::uuid, ''' ||
    u.email ||
    ''', ''YOUR-NAME-HERE'', ''super_admin'', true);' as "Run this SQL"
FROM auth.users u
LEFT JOIN admin_users au ON u.id = au.id
WHERE au.id IS NULL;
```

Just replace `YOUR-NAME-HERE` with the actual name and run the generated SQL!

---

**That's it! The key is using `name` not `full_name` in the INSERT statement.**
