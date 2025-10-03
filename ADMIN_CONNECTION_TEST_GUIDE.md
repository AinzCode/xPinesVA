# Testing Admin-Database Connection

## Quick Test Guide

### 1. Test Testimonial Submission Flow

**Step 1: Submit a test testimonial**
```
1. Go to: http://localhost:3000/testimonials/submit
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Role: Tester
   - Service: GVA
   - Rating: 5 stars
   - Testimonial: "This is a test testimonial"
3. Click "Submit Testimonial"
4. Should see success message ✅
```

**Step 2: Check admin dashboard**
```
1. Go to: http://localhost:3000/admin/testimonials
2. Should see your test testimonial with "Pending" badge
3. Click "Approve" button
4. Badge should change to "Approved" ✅
```

**Step 3: Verify on public page**
```
1. Go to: http://localhost:3000/testimonials
2. Your approved testimonial should appear ✅
```

### 2. Test Featured Toggle

**If you get "Failed to toggle featured status" error:**

1. **Open Browser Console** (F12 → Console tab)
2. Click the "Feature" button on a testimonial
3. Look for error message in console - it will show:
   - HTTP status code (e.g., 500, 404, 403)
   - Error details from API

**Common Issues:**

**Issue 1: 404 Not Found**
- API route not found
- Check: `/app/api/testimonials/[id]/route.ts` exists
- Solution: Route was just created, restart dev server

**Issue 2: 500 Server Error**
- Database connection issue
- Check: `.env.local` has correct Supabase credentials
- Check: Table exists in Supabase

**Issue 3: 403 Forbidden**
- Row Level Security (RLS) blocking update
- Check: RLS policies allow updates
- Solution: See below

**Issue 4: Type Error**
- Supabase TypeScript strict typing
- Check: Using `as never` type assertion
- Solution: Already implemented in route

### 3. Check Supabase Connection

**Verify environment variables:**
```bash
cat .env.local | grep SUPABASE
```

Should show:
```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[...]
SUPABASE_SERVICE_ROLE_KEY=eyJ[...]
```

### 4. Check RLS Policies

**If updates are failing, might need to adjust RLS:**

1. Go to Supabase Dashboard
2. Navigate to: Authentication → Policies
3. Check `testimonials` table policies
4. Ensure policy allows UPDATE for service role

**Quick fix SQL (run in Supabase SQL Editor):**
```sql
-- Allow service role to update testimonials
CREATE POLICY "Allow service role to update testimonials"
ON testimonials
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Allow service role to delete testimonials
CREATE POLICY "Allow service role to delete testimonials"
ON testimonials
FOR DELETE
TO service_role
USING (true);
```

### 5. Debug API Endpoint

**Test API directly with curl:**

```bash
# Get a testimonial ID from admin page, then test:
curl -X PATCH http://localhost:3000/api/testimonials/[YOUR-ID-HERE] \
  -H "Content-Type: application/json" \
  -d '{"is_featured": true}'
```

**Expected response:**
```json
{
  "testimonial": {
    "id": "...",
    "is_featured": true,
    "updated_at": "2025-10-03T..."
  }
}
```

**Error response:**
```json
{
  "error": "Failed to update testimonial"
}
```

### 6. Restart Development Server

Sometimes Next.js needs a restart after creating new API routes:

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev
```

### 7. Check Server Logs

Look in your terminal running `npm run dev` for errors like:
- `Error updating testimonial: ...`
- `Supabase client error: ...`
- `TypeError: ...`

### 8. Test Each Admin Action

**Contact Inquiries:**
```
1. Submit contact form: /connect
2. Check admin: /admin/activity
3. Change status to "In Progress"
4. Should persist ✅
```

**Blog Posts:**
```
1. Create blog post in database
2. Check admin: /admin/blog
3. Click "Publish" button
4. Should change to published ✅
```

**Services:**
```
1. Check admin: /admin/services
2. Should display all services from DB ✅
```

## Common Solutions

### Solution 1: Restart Dev Server
```bash
# Terminal where dev server is running
Ctrl + C
npm run dev
```

### Solution 2: Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Solution 3: Check Database Tables Exist
```sql
-- Run in Supabase SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

Should see:
- testimonials ✅
- contact_inquiries ✅
- blog_posts ✅
- services ✅
- team_members ✅
- admin_users ✅

### Solution 4: Verify Data Exists
```sql
-- Check if you have any testimonials
SELECT id, client_name, is_approved, is_featured 
FROM testimonials 
LIMIT 5;
```

## Expected Behavior

✅ **Submit Form** → Data saved to DB → Appears in admin → Admin approves → Shows on public page

✅ **All admin actions** (approve, reject, feature, publish, etc.) → API call → Database update → UI updates

✅ **Dashboard stats** → Auto-refresh → Real counts from database

## Still Having Issues?

1. **Share browser console errors** - Full error message with status code
2. **Share server logs** - Error messages from terminal
3. **Share SQL queries** - Results from Supabase SQL Editor
4. **Check network tab** - Response from API calls (F12 → Network → Filter by Fetch/XHR)

---

**Date:** October 3, 2025
**Status:** Troubleshooting Guide
