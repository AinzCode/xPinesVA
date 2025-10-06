# Admin Email Reply System - Visual Guide

## Feature Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Activity & Inquiries          Testimonials                │
│  ├─ View inquiries             ├─ View testimonials        │
│  ├─ Filter by status           ├─ Approve/reject           │
│  ├─ View details               ├─ Feature/unfeature        │
│  └─ 🆕 SEND EMAIL REPLY        └─ 🆕 SEND EMAIL REPLY       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## User Flow - Inquiry Reply

```
┌──────────────┐
│ Admin visits │
│ Activity page│
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Selects an inquiry   │
│ from the list        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Views inquiry details        │
│ in right panel               │
│                              │
│ ┌──────────────────────────┐ │
│ │  Actions Section         │ │
│ │  ┌────────────────────┐  │ │
│ │  │ 📧 Send Email Reply│  │ │ ← New button
│ │  └────────────────────┘  │ │
│ │  Update Status           │ │
│ │  ▢ New                   │ │
│ │  ▢ In Progress           │ │
│ │  ▢ Completed             │ │
│ └──────────────────────────┘ │
└──────┬───────────────────────┘
       │ Clicks "Send Email Reply"
       ▼
┌──────────────────────────────┐
│ Reply Dialog Opens           │
│                              │
│ ┌──────────────────────────┐ │
│ │ Send Email Reply         │ │
│ │                          │ │
│ │ To: John Doe             │ │
│ │ john@example.com         │ │
│ │                          │ │
│ │ Subject:                 │ │
│ │ [Re: Your inquiry...]    │ │
│ │                          │ │
│ │ Message:                 │ │
│ │ ┌──────────────────────┐ │ │
│ │ │                      │ │ │
│ │ │ Type message here... │ │ │
│ │ │                      │ │ │
│ │ └──────────────────────┘ │ │
│ │                          │ │
│ │  [Cancel]  [Send Reply] │ │
│ └──────────────────────────┘ │
└──────┬───────────────────────┘
       │ Admin fills form and clicks "Send Reply"
       ▼
┌──────────────────────────────┐
│ Loading state...             │
│ ⏳ Sending...                │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│ Success! 🎉                              │
│ ┌──────────────────────────────────────┐ │
│ │ ✓ Reply sent successfully            │ │ ← Toast notification
│ └──────────────────────────────────────┘ │
│                                          │
│ • Email sent to john@example.com         │
│ • Reply recorded in database             │
│ • Inquiry status → "In Progress"         │
└──────────────────────────────────────────┘
```

## User Flow - Testimonial Reply

```
┌──────────────────┐
│ Admin visits     │
│ Testimonials page│
└──────┬───────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│ Testimonial Card                           │
│ ┌────────────────────────────────────────┐ │
│ │ 👤 Jane Smith                          │ │
│ │ ⭐⭐⭐⭐⭐                                 │ │
│ │                                        │ │
│ │ "Excellent service! Highly recommend!" │ │
│ │                                        │ │
│ │ Actions:                               │ │
│ │ ┌────────────────────────────┐         │ │
│ │ │ 📧 Send Email Reply        │         │ │ ← New button
│ │ └────────────────────────────┘         │ │
│ │ [✓ Approve]  [✗ Reject]                │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
       │ Clicks "Send Email Reply"
       ▼
┌──────────────────────────────────────┐
│ Reply Dialog Opens                   │
│ (Same as inquiry dialog)             │
│ • Pre-filled subject: "Thank you..." │
│ • Admin composes message             │
│ • Clicks "Send Reply"                │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ Email sent to testimonial submitter │
│ Reply recorded in database           │
│ Success notification shown           │
└──────────────────────────────────────┘
```

## Email Template Preview

```
┌─────────────────────────────────────────────────────────┐
│ From: Admin Name - Pines VA <admin@pines-va.com>       │
│ To: john@example.com                                    │
│ Subject: Re: Your inquiry about our services            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ╔═══════════════════════════════════════════════════╗  │
│ ║                                                   ║  │
│ ║        PINES VA                                   ║  │ ← Green gradient
│ ║        Professional Virtual Assistants            ║  │   header
│ ║                                                   ║  │
│ ╚═══════════════════════════════════════════════════╝  │
│                                                         │
│ ┌───────────────────────────────────────────────────┐  │
│ │                                                   │  │
│ │ Hi John,                                          │  │
│ │                                                   │  │
│ │ Thank you for reaching out to Pines VA.          │  │ ← Admin's
│ │ We appreciate your interest in our services.     │  │   message
│ │                                                   │  │
│ │ I'd be happy to discuss how we can help          │  │
│ │ your business grow with our virtual assistant    │  │
│ │ solutions...                                      │  │
│ │                                                   │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Best regards,                                     │  │
│ │                                                   │  │
│ │ Sarah Johnson                                     │  │ ← Admin
│ │ Pines VA Team                                     │  │   signature
│ │ 📧 sarah@pines-va.com                             │  │
│ │                                                   │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ You received this email because you submitted an       │
│ inquiry through our website.                            │
│                                                         │
│ © 2024 Pines VA | Privacy Policy | Unsubscribe         │ ← Footer
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Database Schema Visualization

```
┌─────────────────────────────────────────────────────────┐
│                    admin_replies                        │
├─────────────────────────────────────────────────────────┤
│ id               uuid PRIMARY KEY                       │
│ inquiry_id       uuid → contact_inquiries(id)           │
│ admin_id         uuid → admin_users(user_id)            │
│ admin_name       text                                   │
│ admin_email      text                                   │
│ recipient_email  text                                   │
│ recipient_name   text                                   │
│ subject          text                                   │
│ message          text                                   │
│ sent_at          timestamptz                            │
│ created_at       timestamptz                            │
└─────────────────────────────────────────────────────────┘
                        │
                        │ Foreign Key
                        ▼
┌─────────────────────────────────────────────────────────┐
│                 contact_inquiries                       │
├─────────────────────────────────────────────────────────┤
│ id               uuid PRIMARY KEY                       │
│ name             text                                   │
│ email            text                                   │
│ message          text                                   │
│ status           enum (new, in_progress, completed...)  │
│ ...                                                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                testimonial_replies                      │
├─────────────────────────────────────────────────────────┤
│ id               uuid PRIMARY KEY                       │
│ testimonial_id   uuid → testimonials(id)                │
│ admin_id         uuid → admin_users(user_id)            │
│ admin_name       text                                   │
│ admin_email      text                                   │
│ recipient_email  text                                   │
│ recipient_name   text                                   │
│ subject          text                                   │
│ message          text                                   │
│ sent_at          timestamptz                            │
│ created_at       timestamptz                            │
└─────────────────────────────────────────────────────────┘
                        │
                        │ Foreign Key
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    testimonials                         │
├─────────────────────────────────────────────────────────┤
│ id               uuid PRIMARY KEY                       │
│ client_name      text                                   │
│ client_email     text                                   │
│ testimonial      text                                   │
│ is_approved      boolean                                │
│ ...                                                     │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    App Layout (Root)                    │
│                  + Toaster Component                    │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌───────────────────┐          ┌───────────────────┐
│  Activity Page    │          │ Testimonials Page │
│                   │          │                   │
│  ┌──────────────┐ │          │  ┌──────────────┐ │
│  │ Inquiry List │ │          │  │ Testimonial  │ │
│  └──────────────┘ │          │  │ Cards        │ │
│                   │          │  └──────────────┘ │
│  ┌──────────────┐ │          │                   │
│  │ Detail Panel │ │          │  Each card has:   │
│  │              │ │          │  ┌──────────────┐ │
│  │ ┌──────────┐ │ │          │  │ ReplyDialog  │ │
│  │ │ReplyDialog│ │          │  └──────────────┘ │
│  │ └──────────┘ │ │          │                   │
│  └──────────────┘ │          │                   │
└───────────────────┘          └───────────────────┘
        │                               │
        └───────────────┬───────────────┘
                        │ Uses
                        ▼
            ┌───────────────────────┐
            │    ReplyDialog        │
            │                       │
            │  Uses:                │
            │  • Dialog (Radix UI)  │
            │  • Textarea           │
            │  • Label              │
            │  • useToast hook      │
            │                       │
            │  Calls API:           │
            │  • /api/inquiries/    │
            │    [id]/reply         │
            │  • /api/testimonials/ │
            │    [id]/reply         │
            └───────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │    Toast System       │
            │                       │
            │  • Toaster (container)│
            │  • Toast (component)  │
            │  • useToast (hook)    │
            │                       │
            │  Shows:               │
            │  ✓ Success messages   │
            │  ✗ Error messages     │
            └───────────────────────┘
```

## API Flow

```
┌──────────────┐
│ Client       │
│ (Browser)    │
└──────┬───────┘
       │ POST /api/inquiries/[id]/reply
       │ {
       │   inquiryId: "...",
       │   subject: "...",
       │   message: "...",
       │   recipientEmail: "...",
       │   recipientName: "..."
       │ }
       ▼
┌─────────────────────────────────────────┐
│ API Route                               │
│ /api/inquiries/[id]/reply/route.ts      │
├─────────────────────────────────────────┤
│                                         │
│ 1. Verify admin authentication          │
│    ├─ Get user session                  │
│    └─ Verify user is admin              │
│                                         │
│ 2. Validate request                     │
│    ├─ Check all required fields         │
│    └─ Verify inquiry exists             │
│                                         │
│ 3. Get admin details                    │
│    ├─ Fetch admin name                  │
│    └─ Fetch admin email                 │
│                                         │
│ 4. Send email via Resend                │
│    ├─ Build HTML template               │
│    ├─ Set from/to/reply-to              │
│    └─ Send via Resend API               │
│                                         │
│ 5. Record reply in database             │
│    ├─ Insert into admin_replies         │
│    └─ Update inquiry status             │
│                                         │
│ 6. Return success response              │
│    └─ { success: true, replyId: "..." }│
│                                         │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌──────────┐
│Supabase │  │ Resend  │  │ Browser  │
│Database │  │   API   │  │ (Client) │
└─────────┘  └─────────┘  └──────────┘
    │             │             │
    │ Reply       │ Email       │ Response
    │ stored      │ sent        │ received
    │             │             │
    ▼             ▼             ▼
✓ Record      ✓ Delivered   ✓ Toast shown
  in DB         to inbox      to admin
```

## Security Model

```
┌────────────────────────────────────────────────────────┐
│                    AUTHENTICATION                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. User must be logged in                            │
│     └─ Supabase Auth session required                 │
│                                                        │
│  2. User must be admin                                │
│     └─ Exists in admin_users table                    │
│                                                        │
└────────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│                     RLS POLICIES                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  admin_replies:                                        │
│  ├─ SELECT: Admin users only                          │
│  │   WHERE admin_id = auth.uid()                      │
│  ├─ INSERT: Admin users only                          │
│  │   WHERE EXISTS (SELECT 1 FROM admin_users...)      │
│  └─ Service role: Full access for API                 │
│                                                        │
│  testimonial_replies:                                  │
│  └─ Same policies as admin_replies                    │
│                                                        │
└────────────────────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│                   API VALIDATION                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  1. Validate all inputs                               │
│     ├─ Required fields present                        │
│     ├─ Email format valid                             │
│     └─ No SQL injection                               │
│                                                        │
│  2. Verify relationships                              │
│     ├─ Inquiry/testimonial exists                     │
│     └─ Admin exists                                   │
│                                                        │
│  3. Sanitize data                                     │
│     └─ Escape HTML in emails                          │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     USER ACTION                         │
│            Admin clicks "Send Email Reply"              │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                     │
│  • ReplyDialog opens                                   │
│  • Admin fills form                                    │
│  • Clicks "Send Reply"                                 │
└────────────────────────┬───────────────────────────────┘
                         │
                         │ POST Request
                         ▼
┌────────────────────────────────────────────────────────┐
│                  API ROUTE (Next.js)                   │
│  • Authenticate admin                                  │
│  • Validate data                                       │
│  • Get admin details                                   │
└────────────┬─────────────────┬─────────────────────────┘
             │                 │
             │                 │
    Send     │                 │ Record
    Email    │                 │ Reply
             ▼                 ▼
┌─────────────────┐   ┌─────────────────┐
│  RESEND API     │   │   SUPABASE DB   │
│  • Send email   │   │  • Insert reply │
│  • Track status │   │  • Update status│
└────────┬────────┘   └────────┬────────┘
         │                     │
         │ Email               │ Database
         │ delivered           │ updated
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│ RECIPIENT       │   │ AUDIT TRAIL     │
│ • Receives      │   │ • Who replied   │
│   email in      │   │ • When replied  │
│   inbox         │   │ • What was said │
└─────────────────┘   └─────────────────┘
         │                     │
         └──────────┬──────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   SUCCESS RESPONSE   │
         │   Back to frontend   │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   TOAST NOTIFICATION │
         │   "Reply sent!"      │
         └──────────────────────┘
```

## Feature Comparison

### Before (Manual Process)
```
1. Admin sees inquiry in dashboard
2. Copies email address
3. Opens email client (Gmail, Outlook, etc.)
4. Composes new email
5. Pastes recipient email
6. Writes message
7. Sends email
8. Returns to dashboard
9. Manually updates inquiry status
10. No record of reply in system

⏱️ Time: ~5-10 minutes per reply
📊 Tracking: None
🎨 Consistency: Varies by admin
```

### After (With This System)
```
1. Admin sees inquiry in dashboard
2. Clicks "Send Email Reply"
3. Writes message in dialog
4. Clicks "Send Reply"
5. Status auto-updated ✨
6. Reply auto-recorded ✨
7. Professional template used ✨
8. Done! ✅

⏱️ Time: ~1-2 minutes per reply
📊 Tracking: Full audit trail
🎨 Consistency: Professional branded emails
```

### Benefits
- ⚡ **70% faster** - No context switching
- 📊 **100% tracked** - All replies in database
- 🎨 **Professional** - Consistent branding
- 🔄 **Automated** - Status updates automatically
- 📧 **Better UX** - Recipients get nice emails
- 🔍 **Auditable** - Know who replied and when

---

## Quick Reference

### Setup Time
- Database: 2 minutes
- Resend: 10 minutes
- Testing: 5 minutes
- **Total: ~15-20 minutes**

### User Actions
- Select inquiry/testimonial
- Click "Send Email Reply"
- Fill form
- Click "Send Reply"
- Done!

### What Gets Created
- ✉️ Professional email sent
- 💾 Reply recorded in database
- 🔄 Status updated (inquiries)
- 🔔 Toast notification shown

### Support Documents
1. ADMIN_REPLY_QUICK_SETUP.md (Start here!)
2. ADMIN_EMAIL_REPLY_SYSTEM.md (Full docs)
3. ADMIN_REPLY_SUMMARY.md (Overview)
4. ADMIN_REPLY_VISUAL_GUIDE.md (This file)

---

**Ready to set up?** Open `ADMIN_REPLY_QUICK_SETUP.md` and follow the checklist!
