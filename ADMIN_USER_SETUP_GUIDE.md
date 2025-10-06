# Admin User Setup Guide

You're getting "Invalid login credentials" because you need to create your first admin user! Follow these steps:

## Quick Setup (Recommended)

### Step 1: Create Auth User in Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **pines-va**
3. Navigate to **Authentication** → **Users**
4. Click **"Invite User"** or **"Add User"**
5. Enter:
   - **Email**: `admin@pinesva.com` (or your preferred email)
   - **Password**: Create a strong password (or let Supabase auto-generate)
   - **Auto Confirm User**: ✅ Check this box (so you don't need to verify email)
6. Click **"Send Invite"** or **"Create User"**
7. **Copy the UUID** of the newly created user (you'll see it in the Users table)

### Step 2: Add User to admin_users Table

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this SQL (replace the values with your actual data):

```sql
INSERT INTO admin_users (
  id,
  email,
  full_name,
  role,
  is_active
) VALUES (
  'PASTE-THE-UUID-HERE'::uuid,  -- The UUID from Step 1
  'admin@pinesva.com',           -- Same email as Step 1
  'Your Name',                    -- Your full name
  'admin',                        -- Role: 'super_admin' or 'admin'
  true                            -- Active user
);
```

4. Click **"Run"** to execute
5. Verify it worked:
```sql
SELECT * FROM admin_users;
```

### Step 3: Login to Admin Dashboard

1. Go to: `https://your-site.com/admin/login`
2. Enter the **same email and password** from Step 1
3. Click **"Sign In"**
4. You should now be logged in! 🎉

---

## Alternative: Use Supabase CLI (Advanced)

If you prefer using the CLI:

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run the SQL script
supabase db push
```

Then create a user programmatically:

```javascript
// create-admin.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key!
);

async function createAdmin() {
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@pinesva.com',
    password: 'your-secure-password',
    email_confirm: true
  });

  if (authError) {
    console.error('Error creating auth user:', authError);
    return;
  }

  console.log('Auth user created:', authData.user.id);

  // Create admin_users entry
  const { data: adminData, error: adminError } = await supabase
    .from('admin_users')
    .insert({
      id: authData.user.id,
      email: 'admin@pinesva.com',
      full_name: 'Admin User',
      role: 'admin',
      is_active: true
    });

  if (adminError) {
    console.error('Error creating admin user:', adminError);
    return;
  }

  console.log('✅ Admin user created successfully!');
}

createAdmin();
```

Run it:
```bash
node create-admin.js
```

---

## Troubleshooting

### "Invalid login credentials"
- **Cause**: No user exists with that email/password in Supabase Auth
- **Solution**: Follow Step 1 to create the auth user first

### "User not found in admin_users table"
- **Cause**: Auth user exists, but not in admin_users table
- **Solution**: Follow Step 2 to add them to admin_users

### "Password doesn't work"
- **Cause**: Wrong password or user not confirmed
- **Solution**: In Supabase Dashboard → Authentication → Users, click the user and "Reset Password"

### "Already logged in but can't access admin"
- **Cause**: Session exists but user not in admin_users
- **Solution**: Logout, then follow Step 2 to add to admin_users, then login again

### "Infinite redirect loop"
- **Cause**: Middleware checking admin status incorrectly
- **Solution**: Check browser console for errors, verify NEXT_PUBLIC_SUPABASE_URL is set

---

## Security Notes

1. **Use strong passwords** - Minimum 12 characters with mixed case, numbers, and symbols
2. **Enable 2FA** - In Supabase Dashboard → Authentication → Settings → Enable MFA
3. **Limit admin users** - Only create admin accounts for trusted team members
4. **Regular audits** - Check `admin_users` table regularly for unauthorized access
5. **Monitor login attempts** - Check Supabase logs for failed login attempts

---

## Admin Roles

Your system supports two roles:

- **`super_admin`**: Full access to everything
- **`admin`**: Standard admin access (can be restricted in future)

To change a user's role:
```sql
UPDATE admin_users 
SET role = 'super_admin' 
WHERE email = 'admin@pinesva.com';
```

---

## Next Steps

Once logged in as admin:

1. ✅ Test testimonial approval workflow
2. ✅ Test contact form submission and email notification
3. ✅ Review analytics and dashboard metrics
4. ✅ Configure email notifications in Resend
5. ✅ Update admin profile settings

---

## Quick Reference

| What | Where |
|------|-------|
| Create user | Supabase Dashboard → Authentication → Users |
| SQL Editor | Supabase Dashboard → SQL Editor |
| Login page | `/admin/login` |
| Admin dashboard | `/admin` (protected route) |
| Logout | Click user menu in admin header → "Sign Out" |
| Reset password | Supabase Dashboard → Authentication → Users → [User] → Reset Password |

---

Need help? Check the main `AUTHENTICATION_AND_EMAIL_SETUP.md` guide for more details!
