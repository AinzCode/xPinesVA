# Fix Contact Form RLS Error

## Problem
The contact form is failing with error: `new row violates row-level security policy for table "contact_inquiries"`

## Solution Options

### Option 1: Update RLS Policies (Recommended)
Run this SQL in your Supabase SQL Editor:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_inquiries;

-- Create new policy that allows both anon and public roles
CREATE POLICY "Enable insert for anyone" ON contact_inquiries
  FOR INSERT TO anon, public, authenticated
  WITH CHECK (true);

-- Allow service role full access (for API routes)
CREATE POLICY "Enable all for service role" ON contact_inquiries
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
```

### Option 2: Temporarily Disable RLS (Quick Fix)
Run this SQL in Supabase to disable RLS temporarily:

```sql
ALTER TABLE contact_inquiries DISABLE ROW LEVEL SECURITY;
```

### Option 3: Check Environment Variables
Verify your `.env.local` has the correct keys:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`

### Option 4: Test Without Database
If you want to test the form without database setup, it will log submissions to the server console.

## Current Status
- ✅ Contact form UI works
- ✅ API route exists and handles errors
- ✅ Fallback logging to console works
- ❌ Database insertion blocked by RLS
- ✅ Services and testimonials load with fallback data

## After Fix
Once RLS is fixed, the contact form will:
1. Save submissions to database
2. Show success message
3. Allow you to view submissions in Supabase dashboard

## Testing
1. Try submitting the contact form at `/connect`
2. Check the server console for logs
3. If successful, check Supabase dashboard for the submission