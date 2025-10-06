# Resend.com - Complete Setup Guide

## What is Resend?

**Resend** is a modern email API service designed for developers. It makes it easy to send transactional emails from your application with a simple API.

### Key Features
- ✅ Simple, developer-friendly API
- ✅ Email analytics and tracking
- ✅ Domain verification
- ✅ Email templates
- ✅ Excellent deliverability
- ✅ React Email support
- ✅ Real-time email logs

---

## Is Resend Free?

### YES! Resend has a generous free tier:

**Free Tier (Forever Free):**
- 📧 **100 emails per day**
- 📧 **3,000 emails per month**
- ✅ Full API access
- ✅ Email analytics
- ✅ Domain verification
- ✅ Email logs
- ✅ No credit card required to start

**Perfect for:**
- Small businesses
- Startups
- Side projects
- Testing and development
- Low-volume email needs (5-20 replies/day)

### Paid Plans (If You Need More)

**Pro Plan - $20/month:**
- 📧 50,000 emails per month
- Everything in Free tier
- Priority support

**Business Plan - Custom pricing:**
- 📧 Custom volume
- Dedicated IP
- Advanced features
- SLA guarantees

---

## Quick Start Guide (5-10 minutes)

### Step 1: Sign Up (2 minutes)

1. **Go to:** https://resend.com
2. **Click:** "Get Started" or "Sign Up"
3. **Choose signup method:**
   - GitHub (recommended - fastest)
   - Google
   - Email

4. **Complete signup:**
   - No credit card required!
   - Verify email if using email signup

✅ **You now have a Resend account!**

---

### Step 2: Get Your API Key (1 minute)

After signing up:

1. **You'll land on the Dashboard**
2. **Navigate to:** "API Keys" (left sidebar)
3. **Click:** "Create API Key"
4. **Fill in:**
   - **Name:** `Pines VA Admin Replies`
   - **Permission:** `Full Access` (or `Sending access` if you prefer)
5. **Click:** "Create"

6. **Copy the API key:**
   ```
   re_abc123def456ghi789jkl012mno345pqr
   ```
   
   ⚠️ **IMPORTANT:** 
   - Save this key immediately!
   - You won't be able to see it again
   - Keep it secret (don't commit to git)

---

### Step 3: Add Domain (Optional but Recommended)

#### Why verify your domain?
- ✅ Emails sent from your domain (e.g., `admin@pines-va.com`)
- ✅ Better deliverability
- ✅ Professional appearance
- ✅ No "via resend.dev" text

#### How to verify:

1. **Go to:** "Domains" in Resend dashboard
2. **Click:** "Add Domain"
3. **Enter your domain:**
   ```
   pines-va.com
   ```
   (Don't include `www` or `http://`)

4. **Resend will give you DNS records to add:**
   ```
   Type: TXT
   Name: _resend
   Value: resend-verify-xxx-yyy-zzz
   
   Type: MX
   Name: @
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10
   
   Type: TXT
   Name: @
   Value: v=spf1 include:amazonses.com ~all
   ```

5. **Add these records to your DNS provider:**
   - GoDaddy: DNS Management
   - Cloudflare: DNS settings
   - Namecheap: Advanced DNS
   - Vercel: Domains → DNS Records
   - etc.

6. **Wait 5-10 minutes** for DNS propagation

7. **Click "Verify" in Resend dashboard**

✅ **Domain verified!** You can now send from `admin@pines-va.com`

#### Can't verify domain right now?

**No problem!** Use the default Resend domain for testing:
- From: `onboarding@resend.dev`
- Emails will say "via resend.dev"
- Works fine for development/testing
- Upgrade to custom domain later

---

### Step 4: Configure Pines VA (2 minutes)

1. **Open your `.env.local` file:**
   ```bash
   code .env.local
   ```

2. **Add these lines:**
   ```env
   # Resend Email Configuration
   RESEND_API_KEY=re_abc123def456ghi789jkl012mno345pqr
   RESEND_FROM_EMAIL=admin@pines-va.com
   ```

   **Replace:**
   - `re_abc...` with your actual API key
   - `admin@pines-va.com` with your verified domain email

   **If domain not verified yet:**
   ```env
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

3. **Save the file**

4. **Restart your dev server:**
   ```bash
   # Stop current server (Ctrl + C)
   npm run dev
   ```

✅ **Configuration complete!**

---

## Testing Your Setup (5 minutes)

### Send a Test Email

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to:**
   ```
   http://localhost:3000/admin/activity
   ```

3. **Select any inquiry**

4. **Click "Send Email Reply"**

5. **Fill in the form:**
   - Subject: "Test Reply"
   - Message: "This is a test email from Pines VA admin reply system"

6. **Click "Send Reply"**

7. **Check for success:**
   - ✅ Success toast appears
   - ✅ Dialog closes

### Verify Email Delivery

1. **Go to Resend Dashboard:**
   https://resend.com/emails

2. **You should see your email:**
   ```
   ✓ admin@pines-va.com → john@example.com
   Status: delivered
   Subject: Test Reply
   ```

3. **Click on the email to see:**
   - Delivery status
   - Open tracking
   - Full email content
   - Delivery time
   - Any errors

4. **Check recipient's inbox:**
   - Email should be there!
   - Professional Pines VA branding
   - No spam folder (usually)

✅ **If you see this, everything works!**

---

## Common Issues & Solutions

### ❌ "Invalid API key"

**Problem:** API key is wrong or not set

**Fix:**
1. Check `.env.local` has correct `RESEND_API_KEY`
2. Key should start with `re_`
3. No spaces or quotes around the key
4. Restart dev server after changing

---

### ❌ Email not received

**Problem:** Email might be in spam or not sent

**Check:**
1. **Resend Dashboard** → Emails
   - Is the email listed?
   - Status: delivered or failed?

2. **Spam folder**
   - Check recipient's spam
   - Mark as "Not Spam"

3. **Email address**
   - Verify it's correct
   - No typos

4. **Domain verification**
   - Unverified domains may have lower deliverability
   - Verify your domain for best results

---

### ❌ "CORS error"

**Problem:** API call blocked by CORS

**Fix:**
- This shouldn't happen (Next.js API routes handle CORS)
- If it does: Make sure you're using `/api/` routes, not direct Resend calls from frontend

---

### ❌ "Rate limit exceeded"

**Problem:** Sent too many emails (free tier: 100/day)

**Fix:**
1. Wait until tomorrow
2. Upgrade to Pro plan ($20/month)
3. Reduce test emails

---

### ❌ "Domain not verified"

**Problem:** Using unverified domain

**Options:**
1. Use `onboarding@resend.dev` for testing
2. Verify your domain (see Step 3 above)
3. Wait for DNS propagation (can take 24 hours)

---

## Resend Dashboard Features

### Email Logs
- See all sent emails
- Status (delivered, opened, clicked, bounced)
- Delivery time
- Error messages if failed

### Analytics
- Open rates
- Click rates
- Bounce rates
- Delivery rates

### API Keys
- Create multiple keys
- Revoke compromised keys
- Set permissions

### Domains
- Add multiple domains
- Verify status
- DNS records

### Team (Pro/Business)
- Invite team members
- Manage permissions

---

## Best Practices

### Security
✅ **DO:**
- Keep API key in `.env.local`
- Add `.env.local` to `.gitignore`
- Use environment variables
- Rotate keys if compromised

❌ **DON'T:**
- Commit API keys to git
- Share keys publicly
- Use same key for dev and production
- Hardcode keys in code

### Deliverability
✅ **DO:**
- Verify your domain
- Use professional from addresses
- Keep email content professional
- Monitor bounce rates
- Handle unsubscribes

❌ **DON'T:**
- Send spam
- Use misleading subjects
- Ignore bounces
- Send to purchased lists

### Development
✅ **DO:**
- Test with real email addresses
- Check Resend dashboard after sending
- Monitor error logs
- Use different keys for dev/prod

---

## Cost Estimation

### For Pines VA (Typical Usage)

**Estimate:** 5-20 admin replies per day

**Monthly volume:** 150-600 emails

**Cost:** **FREE** (well within 3,000/month limit)

### When to Upgrade?

Upgrade to Pro ($20/month) if:
- Sending 100+ emails per day
- Need dedicated support
- Want advanced analytics
- Growing business

### Break-even Analysis

Free tier = 3,000 emails/month
Pro tier = 50,000 emails/month for $20

**Cost per email:**
- Free: $0
- Pro: $0.0004 per email (very cheap!)

---

## Alternative Comparison

| Feature | Resend | SendGrid | Mailgun | AWS SES |
|---------|--------|----------|---------|---------|
| **Free tier** | 3K/month | 100/day | 5K/month | 62K/month |
| **Ease of use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Developer UX** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Pricing** | $20/50K | $20/40K | $35/50K | $0.10/1K |
| **Setup time** | 5 min | 20 min | 15 min | 30 min |
| **Documentation** | Excellent | Good | Good | Complex |

**Why Resend for Pines VA:**
- ✅ Simplest API
- ✅ Best developer experience
- ✅ Perfect for your use case
- ✅ Generous free tier
- ✅ No credit card to start

---

## Full Integration Example

### Your `.env.local` should look like:

```env
# Supabase (already exists)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Resend (NEW - add these)
RESEND_API_KEY=re_abc123def456ghi789jkl012mno345pqr
RESEND_FROM_EMAIL=admin@pines-va.com

# Or for testing without verified domain:
# RESEND_FROM_EMAIL=onboarding@resend.dev
```

---

## Quick Commands

### Create test inquiry (for testing emails)

You can test by submitting a contact form on your website, or manually insert into database:

```sql
INSERT INTO contact_inquiries (name, email, message)
VALUES ('Test User', 'your-email@gmail.com', 'Test inquiry');
```

Replace `your-email@gmail.com` with your actual email to receive test emails.

---

## Support & Resources

### Resend Resources
- **Dashboard:** https://resend.com/home
- **Docs:** https://resend.com/docs
- **API Reference:** https://resend.com/docs/api-reference
- **Support:** support@resend.com
- **Discord:** https://resend.com/discord

### Pines VA Docs
- **Quick Setup:** `ADMIN_REPLY_QUICK_SETUP.md`
- **Full Docs:** `ADMIN_EMAIL_REPLY_SYSTEM.md`
- **Visual Guide:** `ADMIN_REPLY_VISUAL_GUIDE.md`

---

## Summary: Resend.com in 3 Sentences

1. **Resend is FREE** for up to 3,000 emails/month (100/day) - perfect for Pines VA
2. **Setup takes 5-10 minutes** - sign up, get API key, add to `.env.local`
3. **It just works** - best developer experience for sending emails

---

## Action Plan (Right Now!)

### ✅ Step-by-Step Checklist:

- [ ] Go to https://resend.com
- [ ] Sign up (no credit card needed)
- [ ] Get API key
- [ ] Add to `.env.local`:
  ```env
  RESEND_API_KEY=your_key_here
  RESEND_FROM_EMAIL=onboarding@resend.dev
  ```
- [ ] Restart dev server: `npm run dev`
- [ ] Test by sending a reply from admin dashboard
- [ ] Check Resend dashboard for confirmation
- [ ] ✨ It works!

**Total time:** 10 minutes
**Total cost:** $0 (free forever for your volume)

---

## Questions?

### "Do I need a credit card?"
**No!** Free tier requires no payment info.

### "Can I use my own domain?"
**Yes!** But not required. Use `onboarding@resend.dev` to start.

### "Will I hit the free limit?"
**Unlikely!** 3,000/month = 100/day. You'd need to send 100+ replies daily.

### "What happens if I exceed the limit?"
**Emails will queue until next day.** Or upgrade to Pro for $20/month.

### "Is it production-ready?"
**Absolutely!** Many companies use Resend in production. Very reliable.

---

## Ready to Start? 🚀

1. **Open:** https://resend.com
2. **Sign up** (2 minutes)
3. **Get API key** (1 minute)
4. **Add to .env.local** (1 minute)
5. **Test!** (2 minutes)

**You'll be sending emails in 5 minutes!** 📧✨
