# Vercel Deployment - Environment Variables Setup 🚀

## Build Error Fixed
**Error:** `RESEND_API_KEY is not set in environment variables`

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your **pines-va** project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Step 2: Add Required Environment Variables

Add these environment variables to Vercel (copy from your `.env.local` file):

#### 🔴 **CRITICAL - Required for Build**

```bash
# Resend Email API (REQUIRED FOR BUILD)
RESEND_API_KEY=re_Ln9oje4s_Hr1AMeTEg3Hotxrmxufxqv9U
RESEND_FROM_EMAIL=onboarding@resend.dev
```

#### 🟢 **Supabase - Database & Auth**

```bash
# Public Keys (can be exposed to client)
NEXT_PUBLIC_SUPABASE_URL=https://iswbqabqsbxrunisztqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzd2JxYWJxc2J4cnVuaXN6dHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDE1MjgsImV4cCI6MjA3NDgxNzUyOH0.wdaGbly2-KCiYKGWH4Z6Lks5ziiG2-9FrGNh8c89j4M

# Internal URL (for Supabase)
SUPABASE_URL=https://iswbqabqsbxrunisztqw.supabase.co

# Service Role Key (KEEP SECRET - Server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzd2JxYWJxc2J4cnVuaXN6dHF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI0MTUyOCwiZXhwIjoyMDc0ODE3NTI4fQ.3J8UwktbJhvb9U0wkeKUIjPKkCim48CICt3APcMjQuo

# JWT Secret (for auth)
SUPABASE_JWT_SECRET=Xs+wLkcPtO0sn5M0yh91MKrqthc8olybAg+/Bua2txuVxD2V6evvSN2ZoKe4waI1ObINA9SYLsKBdlSXEM1L/w==
```

#### 🗄️ **Postgres Database (Optional - only if using direct connections)**

```bash
POSTGRES_URL=postgres://postgres.iswbqabqsbxrunisztqw:cUQo6pfM4EXRsKwM@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x
POSTGRES_USER=postgres
POSTGRES_HOST=db.iswbqabqsbxrunisztqw.supabase.co
POSTGRES_PASSWORD=cUQo6pfM4EXRsKwM
POSTGRES_DATABASE=postgres
POSTGRES_PRISMA_URL=postgres://postgres.iswbqabqsbxrunisztqw:cUQo6pfM4EXRsKwM@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://postgres.iswbqabqsbxrunisztqw:cUQo6pfM4EXRsKwM@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require
```

### Step 3: Configure Each Variable in Vercel

For each variable:

1. **Variable Name:** Enter the key (e.g., `RESEND_API_KEY`)
2. **Value:** Paste the value from your `.env.local`
3. **Environment:** Select all three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. Click **Add** or **Save**

### Step 4: Redeploy

After adding all environment variables:

1. Go to **Deployments** tab
2. Click the **3 dots** on the failed deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Priority Order (Add in this order)

### 🔴 **MUST ADD FIRST** (Build will fail without these)
1. `RESEND_API_KEY`
2. `RESEND_FROM_EMAIL`
3. `NEXT_PUBLIC_SUPABASE_URL`
4. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. `SUPABASE_SERVICE_ROLE_KEY`

### 🟡 **SHOULD ADD** (App will work but with limited functionality)
6. `SUPABASE_URL`
7. `SUPABASE_JWT_SECRET`

### 🟢 **OPTIONAL** (Only if using direct Postgres connections)
8. All `POSTGRES_*` variables

## Quick Copy Template

Use this template to quickly add variables in Vercel:

```
RESEND_API_KEY → re_Ln9oje4s_Hr1AMeTEg3Hotxrmxufxqv9U
RESEND_FROM_EMAIL → onboarding@resend.dev
NEXT_PUBLIC_SUPABASE_URL → https://iswbqabqsbxrunisztqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY → eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzd2JxYWJxc2J4cnVuaXN6dHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDE1MjgsImV4cCI6MjA3NDgxNzUyOH0.wdaGbly2-KCiYKGWH4Z6Lks5ziiG2-9FrGNh8c89j4M
SUPABASE_SERVICE_ROLE_KEY → eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzd2JxYWJxc2J4cnVuaXN6dHF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI0MTUyOCwiZXhwIjoyMDc0ODE3NTI4fQ.3J8UwktbJhvb9U0wkeKUIjPKkCim48CICt3APcMjQuo
```

## Alternative: Using Vercel CLI

You can also add environment variables using the Vercel CLI:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add RESEND_API_KEY production preview development
# (Paste the value when prompted)

vercel env add RESEND_FROM_EMAIL production preview development
# (Paste: onboarding@resend.dev)

# Continue for each variable...
```

## Security Notes

### ⚠️ **NEVER COMMIT TO GIT:**
- ❌ `.env.local` file
- ❌ Any file containing these keys
- ❌ Push to public repositories

### ✅ **SAFE TO EXPOSE (Public Keys):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (These are designed to be public)

### 🔒 **KEEP SECRET (Server-only Keys):**
- `RESEND_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- All `POSTGRES_*` credentials

## Verification Steps

After adding variables and redeploying:

### 1. Check Build Logs
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### 2. Test Deployment
Visit your deployed site and test:
- ✅ Contact form submissions (uses Resend)
- ✅ Testimonial submissions (uses Supabase)
- ✅ Admin login (uses Supabase Auth)
- ✅ Admin dashboard (uses Supabase + Service Role)

### 3. Check Vercel Logs
Go to **Deployments → [Your Deployment] → Function Logs** to see if any errors occur.

## Common Issues

### Issue 1: Build Still Fails
**Solution:** Make sure you selected all three environments (Production, Preview, Development) for each variable.

### Issue 2: "Invalid API Key"
**Solution:** 
- Check for extra spaces in the value
- Make sure you copied the complete key
- Verify the key is still valid in Resend dashboard

### Issue 3: Database Connection Errors
**Solution:**
- Verify Supabase project is active
- Check if service role key is correct
- Ensure RLS policies are set up

### Issue 4: Environment Variables Not Taking Effect
**Solution:**
- Redeploy the project (don't just restart)
- Wait 2-3 minutes for Vercel to propagate changes
- Check if you selected the correct environments

## Next Steps After Successful Deployment

1. ✅ **Test all features:**
   - Contact form
   - Testimonial submission
   - Admin login
   - Admin dashboard
   - Email notifications

2. ✅ **Monitor logs:**
   - Check Vercel function logs
   - Monitor Resend dashboard for email delivery
   - Check Supabase logs for database queries

3. ✅ **Set up alerts:**
   - Vercel deployment notifications
   - Resend email delivery monitoring
   - Supabase usage alerts

4. ✅ **Update DNS (if needed):**
   - Add custom domain in Vercel
   - Configure DNS records
   - Wait for SSL certificate

## Summary

**Problem:** Build failed due to missing `RESEND_API_KEY`

**Solution:** Add all environment variables to Vercel project settings

**Priority Variables to Add:**
1. RESEND_API_KEY ⚠️ **CRITICAL**
2. RESEND_FROM_EMAIL ⚠️ **CRITICAL**
3. NEXT_PUBLIC_SUPABASE_URL ⚠️ **CRITICAL**
4. NEXT_PUBLIC_SUPABASE_ANON_KEY ⚠️ **CRITICAL**
5. SUPABASE_SERVICE_ROLE_KEY ⚠️ **CRITICAL**

**Time to Fix:** 5-10 minutes

**After Adding:** Redeploy from Vercel dashboard

---

**Status:** ⏳ **PENDING - Add environment variables to Vercel and redeploy**

**Quick Link:** https://vercel.com/dashboard → Your Project → Settings → Environment Variables
