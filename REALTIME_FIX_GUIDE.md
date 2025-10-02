# Realtime Subscription Fix Guide

## Problem
The Supabase realtime subscriptions for `testimonials` and `contact_inquiries` tables are timing out, causing errors in the admin dashboard.

## Root Causes
1. ❌ **Realtime not enabled** - Tables aren't added to the `supabase_realtime` publication
2. ❌ **RLS policies blocking access** - Row Level Security policies prevent realtime from reading changes
3. ❌ **Missing permissions** - Roles don't have proper grants

## Quick Fix (Recommended)

### Step 1: Run the Complete Configuration Script

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** (left sidebar)
4. Copy and paste the **entire contents** of `/workspaces/pines-va/supabase/configure-realtime-complete.sql`
5. Click **Run** to execute the SQL
6. Review the output:
   - ✅ Should see both `testimonials` and `contact_inquiries` in the realtime publication
   - ✅ Should see multiple RLS policies listed for each table
   - ✅ Should see success message at the end

### Alternative: Manual Setup

If you prefer to run commands individually:

```sql
-- Enable realtime for testimonials table
ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;

-- Enable realtime for contact_inquiries table
ALTER PUBLICATION supabase_realtime ADD TABLE contact_inquiries;

-- Verify realtime is enabled
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';
```

**Important**: You must also configure RLS policies! See `configure-realtime-complete.sql` for the complete policy setup.

### Step 2: Verify Configuration (Recommended)

Run the diagnostic script to verify everything is set up correctly:

1. In Supabase SQL Editor, copy and paste the contents of `/workspaces/pines-va/supabase/diagnose-realtime.sql`
2. Click **Run**
3. Review the diagnostic summary at the bottom
4. If all checks pass (✅), proceed to Step 3
5. If any checks fail (❌), the script will tell you exactly what to fix

**Files Reference:**
- 📋 **diagnose-realtime.sql** - Check current configuration status
- 🔧 **configure-realtime-complete.sql** - Fix all issues in one script
- 📖 **This guide** - Instructions and troubleshooting

### Step 3: Check Environment Variables

Ensure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

You can find these values in:
- Supabase Dashboard → Settings → API
- Copy the **Project URL** and **anon public** key

### Step 4: Restart Development Server

After making changes, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## What Was Fixed in the Code

### Improved Error Handling
- Changed `console.error` to `console.warn` and `console.info` for non-critical messages
- Added automatic retry logic (3 attempts with 2-second delays)
- Better status messages to distinguish between retries and failures

### Retry Logic
The code now automatically retries the connection up to 3 times if it fails or times out, which handles temporary network issues gracefully.

### Channel Configuration
Added proper channel configuration with:
```typescript
{
  config: {
    broadcast: { self: false },
    presence: { key: '' },
  }
}
```

## Testing

After applying the fix:

1. Open the admin dashboard at `/admin/testimonials` or `/admin/activity`
2. Open the browser console (F12)
3. Look for these messages:
   - ✅ `Successfully subscribed to [table] real-time updates` - Success!
   - 🔄 `Retrying connection (X/3)...` - Temporary issue, will retry
   - ⚠️ `Channel error occurred` - Check Supabase configuration

4. Test real-time updates:
   - Open `/testimonials/submit` in another tab
   - Submit a test testimonial
   - The admin dashboard should show a notification instantly

## Troubleshooting

### Still Seeing Timeouts After Running SQL?

1. **Restart Development Server**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Check Supabase Status**: Visit https://status.supabase.com

3. **Verify API Keys**: Make sure `.env.local` has correct credentials
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Verify Realtime Publication**
   Run this in Supabase SQL Editor:
   ```sql
   SELECT schemaname, tablename 
   FROM pg_publication_tables 
   WHERE pubname = 'supabase_realtime';
   ```
   You should see both `testimonials` and `contact_inquiries` in the results.

5. **Check RLS Policies**
   Run this in Supabase SQL Editor:
   ```sql
   SELECT tablename, policyname, roles, cmd
   FROM pg_policies 
   WHERE tablename IN ('testimonials', 'contact_inquiries')
   ORDER BY tablename, policyname;
   ```
   You should see multiple policies for each table including ones for `authenticated` role.

6. **Network Issues**: Check if you're behind a firewall that blocks WebSocket connections

7. **Project Paused**: Ensure your Supabase project isn't paused (free tier projects pause after 7 days of inactivity)

### Realtime Not Working But No Errors?

This usually means realtime is enabled but RLS is blocking access:

1. **Check Authentication**: Make sure you're logged in as an admin user
2. **Verify RLS Policies**: Run the complete configuration script again
3. **Check Browser Console**: Look for SUBSCRIBED status messages

### ⚠️ Common Mistakes

- **Running only ALTER PUBLICATION** - You need both realtime enablement AND RLS policies
- **Not restarting the dev server** - Changes won't take effect until restart
- **Wrong Supabase project** - Make sure you're in the correct project
- **Missing environment variables** - Check that `.env.local` exists and has values

### Need to Disable Realtime Temporarily?

Comment out the `useEffect` hook in:
- `/app/admin/testimonials/client.tsx`
- `/app/admin/activity/client.tsx`

### Debug Mode

Enable detailed logging by checking the browser console (F12):
- 🔄 Connection attempts and retries
- ✅ Successful subscription
- ⚠️ Warnings and retry attempts
- ❌ Final errors after all retries

## Additional Notes

- The retry logic helps with temporary connection issues
- Browser notifications require user permission
- Realtime subscriptions use WebSocket connections
- Each admin page establishes its own channel subscription
