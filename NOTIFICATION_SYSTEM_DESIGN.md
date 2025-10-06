# Notification System Design

## Overview
Real-time notification system for Pines VA admin dashboard with in-app and email delivery.

## Architecture

### 1. Notification Types
```typescript
type NotificationType = 
  | 'contact_form'      // New contact form submission
  | 'testimonial'       // New testimonial submission
  | 'admin_action'      // Admin user created/updated
  | 'system_alert'      // System-level alerts
  | 'approval_needed';  // Content needs approval
```

### 2. Database Schema

```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('contact_form', 'testimonial', 'admin_action', 'system_alert', 'approval_needed')),
  title text NOT NULL,
  message text NOT NULL,
  recipient_id uuid REFERENCES admin_users(user_id) ON DELETE CASCADE,
  recipient_role text CHECK (recipient_role IN ('admin', 'super_admin')),
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_notifications_recipient ON notifications(recipient_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Admins can see their own notifications
CREATE POLICY "select_own_notifications" ON notifications
  FOR SELECT
  USING (recipient_id = auth.uid() OR recipient_role = (
    SELECT role FROM admin_users WHERE user_id = auth.uid()
  ));

-- Admins can update their own notifications (mark as read)
CREATE POLICY "update_own_notifications" ON notifications
  FOR UPDATE
  USING (recipient_id = auth.uid());

-- Service role can do everything
CREATE POLICY "service_role_all_notifications" ON notifications
  FOR ALL
  USING (true);
```

### 3. Notification Recipients

**Individual Recipients:**
- `recipient_id` is set to specific admin's user_id
- Only that admin sees the notification

**Role-Based Recipients:**
- `recipient_id` is NULL
- `recipient_role` is set to 'admin' or 'super_admin'
- All admins with that role see the notification

### 4. API Endpoints

#### Create Notification
```
POST /api/notifications/create
Body: {
  type: NotificationType,
  title: string,
  message: string,
  recipientId?: uuid,      // Individual recipient
  recipientRole?: string,  // Role-based broadcast
  metadata?: object,       // Additional context
  sendEmail?: boolean      // Whether to send email
}
```

#### Get Notifications
```
GET /api/notifications
Query: {
  unreadOnly?: boolean,
  limit?: number,
  offset?: number
}
Response: {
  notifications: Notification[],
  unreadCount: number
}
```

#### Mark as Read
```
PATCH /api/notifications/:id/read
Response: { success: boolean }
```

#### Mark All as Read
```
PATCH /api/notifications/read-all
Response: { success: boolean, count: number }
```

#### Delete Notification
```
DELETE /api/notifications/:id
Response: { success: boolean }
```

### 5. Real-Time Updates

Using Supabase Realtime:
```typescript
supabase
  .channel('notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `recipient_id=eq.${userId}` // or role-based filter
    },
    (payload) => {
      // Update UI with new notification
    }
  )
  .subscribe();
```

### 6. Email Notifications

Using Resend API for critical notifications:
- Contact form submissions → Email to all admins
- New testimonials → Email to super_admins
- Admin actions → Email to affected admin

Template structure:
```typescript
{
  from: 'notifications@pines-va.com',
  to: [admin emails],
  subject: notification.title,
  html: `
    <h2>${notification.title}</h2>
    <p>${notification.message}</p>
    <a href="${dashboardUrl}">View in Dashboard</a>
  `
}
```

### 7. UI Components

#### NotificationBell Component
- Bell icon in admin header (top-right)
- Badge showing unread count
- Dropdown panel with notification list
- "Mark all as read" button
- Individual notification cards

#### Notification Card
```
[Icon] Title
       Message
       Time ago
       [X] Delete
```

### 8. Metadata Examples

```typescript
// Contact form notification
{
  formId: 'uuid',
  senderName: 'John Doe',
  senderEmail: 'john@example.com'
}

// Testimonial notification
{
  testimonialId: 'uuid',
  authorName: 'Jane Smith',
  rating: 5
}

// Admin action notification
{
  actionType: 'created',
  targetAdminName: 'New Admin',
  performedBy: 'Super Admin Name'
}
```

### 9. Integration Points

**Contact Form Submission:**
```typescript
// In /api/contact/route.ts
await createNotification({
  type: 'contact_form',
  title: 'New Contact Form',
  message: `${name} submitted a contact form`,
  recipientRole: 'admin',
  metadata: { formId, senderName: name, senderEmail: email },
  sendEmail: true
});
```

**Testimonial Submission:**
```typescript
// In /api/testimonials/create/route.ts
await createNotification({
  type: 'testimonial',
  title: 'New Testimonial',
  message: `${name} submitted a ${rating}-star testimonial`,
  recipientRole: 'super_admin',
  metadata: { testimonialId, authorName: name, rating }
});
```

**Admin Created:**
```typescript
// In /api/admin/users/create/route.ts
await createNotification({
  type: 'admin_action',
  title: 'New Admin Created',
  message: `${fullName} was added as an admin`,
  recipientRole: 'super_admin',
  metadata: { actionType: 'created', targetAdminName: fullName }
});
```

## Implementation Order

1. ✅ Design architecture (this document)
2. Create database table and RLS policies
3. Build API endpoints
4. Create UI components
5. Add real-time subscriptions
6. Integrate email notifications
7. Add notification triggers to existing features

## Performance Considerations

- Pagination for notification list (default 20 per page)
- Index on (recipient_id, is_read) for fast queries
- Auto-delete old read notifications after 30 days (cron job)
- Real-time subscription only when notification panel is open

## Security

- RLS policies ensure admins only see their notifications
- Service role key for creating notifications (server-side)
- Email templates sanitized to prevent XSS
- Rate limiting on notification creation API
