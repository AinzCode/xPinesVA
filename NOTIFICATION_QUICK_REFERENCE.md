# Notification System - Quick Reference

## 🚀 Quick Start

### 1. Setup (One-Time)
```bash
# 1. Run database migration
psql $DATABASE_URL < supabase/create-notifications-table.sql

# 2. Enable Realtime in Supabase Dashboard
Database → Replication → notifications table → Enable INSERT/UPDATE

# 3. Add to .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Create Notification (From Code)
```typescript
await fetch('/api/notifications/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'contact_form',              // Required: notification type
    title: 'New Contact Form',         // Required: notification title
    message: 'John Doe submitted...',  // Required: notification message
    recipientRole: 'admin',            // Either recipientId OR recipientRole
    // recipientId: 'user-uuid',       // Individual recipient
    metadata: { formId: '123' },       // Optional: extra data
    sendEmail: true,                   // Optional: send email too
  }),
});
```

---

## 📋 Notification Types

| Type | When to Use | Default Recipients |
|------|-------------|-------------------|
| `contact_form` | Contact form submitted | All admins |
| `testimonial` | Testimonial submitted | Super admins |
| `admin_action` | Admin created/updated | Super admins |
| `system_alert` | System errors/warnings | All admins |
| `approval_needed` | Content needs review | Role-based |

---

## 🎯 Common Use Cases

### Contact Form Submission
```typescript
await fetch('/api/notifications/create', {
  method: 'POST',
  body: JSON.stringify({
    type: 'contact_form',
    title: 'New Contact Form',
    message: `${name} (${email}) submitted a contact form`,
    recipientRole: 'admin',
    sendEmail: true,
  }),
});
```

### Testimonial Submission
```typescript
await fetch('/api/notifications/create', {
  method: 'POST',
  body: JSON.stringify({
    type: 'testimonial',
    title: 'New Testimonial',
    message: `${name} gave a ${rating}-star review`,
    recipientRole: 'super_admin',
    metadata: { testimonialId, rating },
    sendEmail: true,
  }),
});
```

### System Alert
```typescript
await fetch('/api/notifications/create', {
  method: 'POST',
  body: JSON.stringify({
    type: 'system_alert',
    title: 'Database Backup Complete',
    message: 'Daily backup completed successfully',
    recipientRole: 'super_admin',
    sendEmail: false,
  }),
});
```

---

## 📡 API Endpoints

### GET /api/notifications
Fetch notifications for current admin
```typescript
// Get all notifications (paginated)
GET /api/notifications?limit=20&offset=0

// Get unread only
GET /api/notifications?unreadOnly=true

// Response
{
  "notifications": [...],
  "unreadCount": 5,
  "total": 23,
  "limit": 20,
  "offset": 0
}
```

### POST /api/notifications/create
Create a new notification (admin only)
```typescript
{
  "type": "contact_form",
  "title": "Title",
  "message": "Message",
  "recipientRole": "admin",  // or recipientId
  "metadata": {},            // optional
  "sendEmail": false         // optional
}
```

### PATCH /api/notifications/:id/read
Mark single notification as read
```typescript
PATCH /api/notifications/abc123/read
```

### PATCH /api/notifications/read-all
Mark all notifications as read
```typescript
PATCH /api/notifications/read-all
```

### DELETE /api/notifications/:id
Delete a notification
```typescript
DELETE /api/notifications/abc123
```

---

## 🎨 UI Component

The NotificationBell is already integrated in the admin dashboard header.

**Features:**
- Bell icon with unread badge
- Dropdown with scrollable list
- Mark as read/delete actions
- Real-time updates
- Empty state

**Location:** Top-right of admin dashboard

---

## ⚡ Real-Time Updates

Notifications appear instantly using Supabase Realtime. No polling needed!

**How it works:**
- WebSocket connection to Supabase
- Listens for INSERT/UPDATE on notifications table
- Auto-refreshes notification list
- Updates unread badge in real-time

---

## 📧 Email Notifications

### Send to Role
```typescript
import { notifyAdmins } from '@/lib/email/notifications';

await notifyAdmins({
  subject: 'New Contact Form',
  title: 'New Contact Form Submission',
  message: 'John Doe submitted a contact form',
  role: 'admin',  // or 'super_admin' or undefined for all
  actionUrl: 'https://app.com/admin/contacts',
  actionText: 'View Contact'
});
```

### Send to Specific Emails
```typescript
import { sendNotificationEmail } from '@/lib/email/notifications';

await sendNotificationEmail({
  to: ['admin@example.com'],
  subject: 'Alert',
  title: 'System Alert',
  message: 'Something happened',
  actionUrl: 'https://app.com/admin',
  actionText: 'View Dashboard'
});
```

---

## 🔐 Security

- ✅ RLS policies enforce admin-only access
- ✅ Admins only see their own notifications
- ✅ API requires admin authentication
- ✅ Service role required for creation
- ✅ Email templates sanitized

---

## 🐛 Troubleshooting

**Notifications not showing?**
- Check admin is logged in
- Verify RLS policies enabled
- Check browser console for errors

**Real-time not working?**
- Enable Realtime in Supabase Dashboard
- Check WebSocket connection in Network tab

**Emails not sending?**
- Verify RESEND_API_KEY in .env.local
- Check sender domain is verified in Resend
- Look for errors in server logs

---

## 📂 Important Files

```
app/api/notifications/
  ├── create/route.ts         # Create notification
  ├── route.ts                # Get notifications
  ├── read-all/route.ts       # Mark all read
  └── [id]/
      ├── read/route.ts       # Mark single read
      └── route.ts            # Delete notification

components/ui/
  └── notification-bell.tsx   # Bell component

lib/
  ├── supabase/types.ts       # Type definitions
  └── email/
      └── notifications.ts    # Email helpers

supabase/
  ├── create-notifications-table.sql   # Migration
  └── verify-notifications-table.sql   # Verification
```

---

## 📚 Full Documentation

See `NOTIFICATION_SYSTEM_COMPLETE.md` for:
- Complete architecture
- Detailed API docs
- Database schema
- Testing guide
- Customization options

---

**Status:** ✅ Production Ready  
**Last Updated:** ${new Date().toLocaleDateString()}
