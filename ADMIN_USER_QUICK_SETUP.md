# Admin User Setup Guide

## Quick Start - Create Your First Admin User

### ⚡ Method 1: Using Supabase Dashboard (Recommended - Easiest)

**Step 1: Create Auth User**
1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (pines-va)
3. Click **"Authentication"** → **"Users"**
4. Click **"Add user"** button (green button top right)
5. Enter:
   - Email: `your@email.com`
   - Password: `YourSecurePassword123`
   - ✅ Check "Auto Confirm User"
6. Click **"Create user"**
7. **IMPORTANT**: Copy the **UUID** shown in the user list (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

**Step 2: Add to admin_users Table**
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy and paste this (replace the values with yours):

```sql
INSERT INTO public.admin_users (user_id, email, name, role)
VALUES (
  'PASTE-YOUR-UUID-HERE'::uuid,  -- The UUID you copied
  'your@email.com',               -- Your email
  'Your Full Name',               -- Your name
  'super_admin'                   -- Keep as super_admin
);
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see: "Success. No rows returned"

**Step 3: Verify**
Run this to confirm:
```sql
SELECT * FROM public.admin_users;
```

You should see your admin user!

**Step 4: Log In**
1. Go to: `https://your-site.vercel.app/admin/login`
2. Enter your email and password
3. Click "Sign In"
4. You're in! 🎉

---

### 🔧 Method 2: Using the Script (Advanced)

If you prefer command line:

```bash
# Make sure you're in the project directory
cd /workspaces/pines-va

# Install dependencies if needed
npm install @supabase/supabase-js

# Run the script
node scripts/create-admin.js
```

Follow the prompts to create your admin user.

---

## ⚠️ Troubleshooting

### Error: "Invalid login credentials"

**Problem**: The auth user doesn't exist or wrong password

**Solutions**:
1. Check auth user exists:
   ```sql
   SELECT * FROM auth.users WHERE email = 'your@email.com';
   ```
2. Reset password in Supabase Dashboard:
   - Go to Authentication → Users
   - Click on the user
   - Click "Send password reset email"

---

### Error: Can't access admin dashboard after login

**Problem**: User exists in auth but not in admin_users table

**Solution**: Check admin_users:
```sql
SELECT * FROM public.admin_users WHERE email = 'your@email.com';
```

If no results, run the INSERT query from Method 1, Step 2.

---

### Error: "User already exists"

**Problem**: Trying to create duplicate user

**Solution**: 
1. Check if user exists:
   ```sql
   SELECT * FROM auth.users WHERE email = 'your@email.com';
   SELECT * FROM public.admin_users WHERE email = 'your@email.com';
   ```
2. If exists, just log in with that email
3. If you forgot password, use reset password option

---

## 🔐 Security Notes

1. **Use strong passwords**: Minimum 8 characters, mix of letters, numbers, symbols
2. **Keep service role key secret**: Never commit `.env.local` to git
3. **Limit super_admin users**: Only give to trusted people
4. **Regular admins** can manage content but not other admins

---

## 👥 Creating Additional Admins

Once you have your first admin set up, repeat Method 1 for each additional admin:

1. Create auth user in Supabase Dashboard
2. Get their UUID
3. Run INSERT query with their information
4. Give them their login credentials

---

## 📊 Admin Roles Explained

| Role | Permissions |
|------|-------------|
| **super_admin** | Full access to everything, can manage other admins |
| **admin** | Can manage content (testimonials, blog, services, inquiries) |

For now, use **super_admin** for your first user.

---

## 🆘 Still Having Issues?

Check these common problems:

1. **Environment variables not set**
   - Verify `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
   - Restart dev server after adding env variables

2. **Admin_users table doesn't exist**
   - Run the schema.sql file in Supabase SQL Editor

3. **RLS policies blocking access**
   - Service role key bypasses RLS, so this shouldn't be an issue
   - But check that your admin API routes use service role client

4. **CORS errors**
   - Make sure your Supabase URL matches exactly (no trailing slash)

---

## ✅ Quick Checklist

Before you try to log in, verify:

- [ ] Auth user exists in Supabase Dashboard → Authentication → Users
- [ ] Admin user exists: `SELECT * FROM admin_users;`
- [ ] Email matches in both tables
- [ ] Role is set to 'super_admin' or 'admin'
- [ ] User is active (no is_active = false)
- [ ] Environment variables are set correctly
- [ ] You're using the correct email and password

---

**Need more help?** Check the full documentation in `ADMIN_AUTH_SETUP_COMPLETE.md`
