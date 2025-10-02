# Supabase Realtime Connection Issues - Comprehensive Fix

## Issue: WebSocket Connection Failing

Your console shows:
- ❌ Channel error occurred: undefined
- ❌ websocket-factory.ts:88 WebSocket connection to '...' failed
- ⚠️ Realtime channel closed

This is a **connection issue**, not a code or RLS issue.

---

## 🔧 Fixes to Try (In Order)

### Fix 1: Check Project Status (Most Common Issue)

**Supabase free tier projects pause after 7 days of inactivity**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Look for a **"Resume Project"** or **"Restore Project"** button
4. Click it and wait 2-3 minutes for the project to wake up
5. Refresh your app

---

### Fix 2: Enable Realtime in Project Settings

1. Go to Supabase Dashboard → Your Project
2. Click **Settings** (gear icon in sidebar)
3. Go to **API** section
4. Scroll to **Realtime** section
5. Make sure **"Enable Realtime"** is toggled ON
6. If it was off, turn it on and wait a minute

---

### Fix 3: Check Realtime API Configuration

1. Go to Supabase Dashboard → Your Project
2. Settings → API
3. Verify these values match your `.env.local`:
   ```
   Project URL: Should match NEXT_PUBLIC_SUPABASE_URL
   anon/public key: Should match NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

---

### Fix 4: Verify Environment Variables

Check your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Common mistakes:**
- ❌ Using `service_role` key instead of `anon` key
- ❌ Missing `https://` in URL
- ❌ Extra spaces or quotes
- ❌ Wrong project URL

---

### Fix 5: Check Realtime Quotas

Free tier has limits:
- **2 concurrent connections**
- **200 messages per second**

1. Go to Supabase Dashboard → Settings → Billing
2. Check if you've hit any limits
3. Close other tabs/windows that might be using realtime

---

### Fix 6: Network/Firewall Issues

1. **Check if WebSockets are blocked:**
   - Corporate firewall?
   - VPN blocking WebSockets?
   - Browser extension blocking connections?

2. **Test WebSocket connection:**
   Open browser console and run:
   ```javascript
   const ws = new WebSocket('wss://your-project.supabase.co/realtime/v1/websocket');
   ws.onopen = () => console.log('✅ WebSocket works');
   ws.onerror = (e) => console.error('❌ WebSocket error:', e);
   ```

---

### Fix 7: Try Disabling Realtime Temporarily

To verify the rest of your app works, you can temporarily disable realtime:

**In `/app/admin/testimonials/client.tsx`:**

```typescript
// Temporarily disable realtime for testing
useEffect(() => {
  console.log('⚠️ Realtime temporarily disabled for testing');
  return () => {};
}, []);

// Comment out the entire realtime useEffect
```

This will let you test if the data fetching works without realtime.

---

## 🧪 Quick Tests

### Test 1: Check if Supabase is responding

Run in browser console:
```javascript
const { createClient } = window.supabase;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Test basic query
const { data, error } = await supabase.from('testimonials').select('*').limit(1);
console.log('Query result:', data, error);
```

### Test 2: Check Realtime Status

Go to Supabase Dashboard → Database → Replication

Check if realtime is enabled for your tables.

---

## 🎯 Most Likely Solution

Based on your error, the **#1 most likely issue** is:

### **Your Supabase project is paused**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **"Restore"** or **"Resume"** if you see that option
4. Wait 2-3 minutes
5. Refresh your app

---

## 📞 Alternative: Check Project Health

Run this in Supabase SQL Editor:
```sql
-- Check if database is responsive
SELECT 
  'Database is responsive' as status,
  current_timestamp as time,
  current_database() as database;

-- Check realtime publication
SELECT tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';
```

If this query doesn't run or times out, your project is definitely paused.

---

## 🆘 Still Not Working?

If none of these work, the issue might be:
1. **Supabase service outage** - Check https://status.supabase.com
2. **Project configuration issue** - Contact Supabase support
3. **Regional issue** - Supabase servers might be down in your region

Let me know what you find!
