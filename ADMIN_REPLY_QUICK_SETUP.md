# Quick Setup Guide - Admin Email Reply System

## Prerequisites
- ✅ All dependencies installed
- ✅ UI components created
- ✅ API routes configured
- ✅ Admin pages updated

## Setup Checklist (Complete in Order)

### 1. Database Migration (REQUIRED)
Run the SQL migration in your Supabase dashboard:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **SQL Editor** (left sidebar)
4. Click: **New Query**
5. Copy and paste contents from: `supabase/create-admin-replies-table.sql`
6. Click: **Run** (or press Cmd/Ctrl + Enter)
7. Verify success: Should see "Success. No rows returned"

**Expected Result:**
- `admin_replies` table created
- `testimonial_replies` table created
- RLS policies applied
- Indexes created

---

### 2. Configure Resend API (REQUIRED)

#### Step 1: Get Resend API Key
1. Go to: https://resend.com
2. Sign up or log in
3. Navigate to: **API Keys**
4. Click: **Create API Key**
5. Name: "Pines VA Admin Replies"
6. Copy the API key (starts with `re_`)

#### Step 2: Verify Your Domain (REQUIRED for production)
1. In Resend dashboard, go to: **Domains**
2. Click: **Add Domain**
3. Enter your domain (e.g., `pines-va.com`)
4. Follow DNS verification steps
5. Wait for verification (can take a few minutes)

**Note:** For testing, you can skip domain verification and use the default Resend domain, but emails will have "via resend.dev" in the from address.

#### Step 3: Add Environment Variables
Edit your `.env.local` file:

```bash
# Add these lines to your .env.local file
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=admin@pines-va.com
```

**Important Notes:**
- Replace `re_xxxx` with your actual API key
- If domain not verified, use: `onboarding@resend.dev`
- Keep these values secret - never commit to git

#### Step 4: Restart Development Server
```bash
# Stop the server (Ctrl + C)
# Start it again
npm run dev
```

---

### 3. Test the System

#### Test Inquiry Reply
1. Navigate to: `http://localhost:3000/admin/activity`
2. Select any inquiry from the list
3. Click: **"Send Email Reply"** button
4. Fill in:
   - Subject: "Re: Your inquiry"
   - Message: "Thank you for reaching out. We'll be in touch soon!"
5. Click: **"Send Reply"**
6. Expected: Success toast → Email sent → Status updated to "In Progress"

#### Test Testimonial Reply
1. Navigate to: `http://localhost:3000/admin/testimonials`
2. Find a testimonial with email address
3. Click: **"Send Email Reply"** button
4. Fill in:
   - Subject: "Thank you for your testimonial"
   - Message: "We appreciate your kind words!"
5. Click: **"Send Reply"**
6. Expected: Success toast → Email sent → Reply recorded

---

### 4. Verify Email Delivery

#### Check in Resend Dashboard
1. Go to: https://resend.com/emails
2. You should see your test emails listed
3. Click on an email to see:
   - Status (delivered, opened, clicked)
   - Delivery time
   - Recipient
   - Full email content

#### Check Your Inbox
1. Check the recipient's email inbox
2. Verify email received with:
   - Professional Pines VA header (green gradient)
   - Your message content
   - Admin signature
   - Footer with links

---

### 5. Verify Database Records

#### Check Admin Replies
1. Go to Supabase Dashboard → **Table Editor**
2. Select: `admin_replies` table
3. You should see your test replies with:
   - inquiry_id
   - admin details
   - recipient details
   - subject and message
   - sent_at timestamp

#### Check Testimonial Replies
1. Go to Supabase Dashboard → **Table Editor**
2. Select: `testimonial_replies` table
3. You should see your test replies

---

## Troubleshooting

### ❌ "Cannot find module '@/hooks/use-toast'"
**Fix:** Restart TypeScript server in VS Code:
- Press: `Cmd/Ctrl + Shift + P`
- Type: "TypeScript: Restart TS Server"
- Select and press Enter

### ❌ Email not sending
**Possible causes:**
1. **Invalid API key**
   - Check `.env.local` has correct `RESEND_API_KEY`
   - Verify key starts with `re_`
   
2. **Unverified domain**
   - For testing: Use `onboarding@resend.dev` as `RESEND_FROM_EMAIL`
   - For production: Verify your domain in Resend dashboard

3. **Server not restarted**
   - Restart dev server after adding env variables

4. **Invalid recipient email**
   - Ensure inquiry/testimonial has valid email

### ❌ "Unauthorized" or "RLS policy violation"
**Fix:** 
1. Ensure you're logged in as admin
2. Check `admin_users` table has your user
3. Verify RLS policies were created (check SQL migration ran successfully)

### ❌ Inquiry status not updating
**Check:**
1. API response in Network tab (browser DevTools)
2. Supabase logs for errors
3. Inquiry ID is valid

### ❌ Toast notifications not showing
**Fix:**
1. Verify `<Toaster />` is in `app/layout.tsx`
2. Check no other elements have `z-index` above toasts
3. Restart dev server

---

## Quick Commands

### Install Dependencies (if not done)
```bash
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-toast
```

### Restart Dev Server
```bash
npm run dev
```

### Check Build Errors
```bash
npx tsc --noEmit
```

### View Logs
```bash
# Terminal where dev server is running
# Look for API errors, email sending logs
```

---

## Environment Variables Checklist

Check your `.env.local` file has all required variables:

```bash
# Supabase (should already exist)
✅ NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
✅ SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Resend (NEW - add these)
✅ RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
✅ RESEND_FROM_EMAIL=admin@pines-va.com
```

---

## Test Email Template

**Subject:** Test Reply - Admin Email System

**Message:**
```
Hi [Name],

Thank you for reaching out to Pines VA. This is a test of our new admin reply system.

We've received your message and will get back to you shortly.

Best regards,
The Pines VA Team
```

---

## Success Indicators

You'll know everything is working when:

1. ✅ SQL migration runs without errors
2. ✅ Reply dialog opens smoothly
3. ✅ Success toast appears after sending
4. ✅ Email appears in Resend dashboard
5. ✅ Email received in inbox with proper formatting
6. ✅ Reply record appears in Supabase database
7. ✅ Inquiry status updates automatically (for inquiries)

---

## Next Steps After Setup

Once everything is working:

1. **Test with real data**
   - Send replies to actual inquiries
   - Verify email delivery to real addresses

2. **Customize email templates** (optional)
   - Edit: `app/api/inquiries/[id]/reply/route.ts`
   - Edit: `app/api/testimonials/[id]/reply/route.ts`
   - Update HTML email template

3. **Train admin users**
   - Show them how to send replies
   - Explain when to use the feature
   - Share best practices

4. **Monitor usage**
   - Check Resend dashboard regularly
   - Review sent emails
   - Monitor delivery rates

---

## Support Resources

- **Resend Docs:** https://resend.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Full Documentation:** See `ADMIN_EMAIL_REPLY_SYSTEM.md`

---

## Estimated Setup Time

- **Database Migration:** 2 minutes
- **Resend Setup:** 5-10 minutes
- **Testing:** 5 minutes
- **Total:** ~15-20 minutes

---

## Ready to Go! 🚀

After completing these steps, your admin team can start sending professional email replies to inquirers and testimonial submitters directly from the dashboard!
