# Notification System - Integration Examples

## Example 1: Contact Form Integration

### File: `app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyContactForm } from '@/lib/notifications/helpers';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, message } = formData;

    // Save to database
    const supabase = await createClient({ useServiceRole: true });
    const { data: inquiry, error } = await supabase
      .from('contact_inquiries')
      .insert({
        name,
        email,
        phone,
        message,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    // 🔔 Send notification to admins
    await notifyContactForm({
      name,
      email,
      formId: inquiry.id,
      sendEmail: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## Example 2: Testimonial Integration

### File: `app/api/testimonials/create/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyTestimonial } from '@/lib/notifications/helpers';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { client_name, testimonial, rating, client_company } = data;

    // Save to database
    const supabase = await createClient({ useServiceRole: true });
    const { data: newTestimonial, error } = await supabase
      .from('testimonials')
      .insert({
        client_name,
        testimonial,
        rating,
        client_company,
        is_approved: false, // Requires approval
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }

    // 🔔 Notify super admins about new testimonial
    await notifyTestimonial({
      clientName: client_name,
      rating,
      testimonialId: newTestimonial.id,
      sendEmail: true,
    });

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Testimonial error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## Example 3: Admin User Creation (Already Implemented)

### File: `app/api/admin/users/create/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyAdminAction } from '@/lib/notifications/helpers';

export async function POST(request: Request) {
  try {
    // ... admin creation logic ...

    // 🔔 Notify super admins
    await notifyAdminAction({
      action: 'created',
      adminName: fullName,
      performedBy: currentAdmin.name,
      sendEmail: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // ... error handling ...
  }
}
```

---

## Example 4: Blog Post Approval

### File: `app/api/blog/publish/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { notifyApprovalNeeded } from '@/lib/notifications/helpers';

export async function POST(request: Request) {
  try {
    const { postId, title } = await request.json();

    const supabase = await createClient({ useServiceRole: true });
    const { error } = await supabase
      .from('blog_posts')
      .update({ is_published: false })
      .eq('id', postId);

    if (error) throw error;

    // 🔔 Notify admins that post needs approval
    await notifyApprovalNeeded({
      contentType: 'Blog Post',
      contentTitle: title,
      contentId: postId,
      submittedBy: 'Content Team',
      sendEmail: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

---

## Example 5: System Monitoring

### File: `app/api/cron/backup/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { notifySystemAlert } from '@/lib/notifications/helpers';

export async function POST(request: Request) {
  try {
    // Perform backup
    const success = await performDatabaseBackup();

    if (!success) {
      // 🔔 Alert admins of failure
      await notifySystemAlert({
        title: 'Database Backup Failed',
        message: 'The scheduled database backup failed. Please check logs.',
        severity: 'critical',
        recipientRole: 'super_admin',
        sendEmail: true,
      });
    } else {
      // 🔔 Notify success (no email)
      await notifySystemAlert({
        title: 'Database Backup Complete',
        message: 'Daily database backup completed successfully.',
        severity: 'low',
        recipientRole: 'super_admin',
        sendEmail: false,
      });
    }

    return NextResponse.json({ success });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

---

## Example 6: Custom Notification

### File: Any server component or API route

```typescript
import { createNotification } from '@/lib/notifications/helpers';

// Send custom notification
await createNotification({
  type: 'system_alert',
  title: 'Custom Event',
  message: 'Something important happened',
  recipientRole: 'admin',
  metadata: {
    eventType: 'custom',
    timestamp: new Date().toISOString(),
  },
  sendEmail: false,
});
```

---

## Example 7: Notify Specific Admin

### File: `app/api/admin/assign-task/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { notifySpecificAdmin } from '@/lib/notifications/helpers';

export async function POST(request: Request) {
  try {
    const { adminUserId, taskTitle } = await request.json();

    // Create task in database
    // ...

    // 🔔 Notify the assigned admin
    await notifySpecificAdmin(adminUserId, {
      type: 'admin_action',
      title: 'Task Assigned to You',
      message: `You have been assigned: "${taskTitle}"`,
      metadata: { taskTitle },
      sendEmail: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Task assignment error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

---

## Integration Checklist

### For Each Integration:

- [ ] Import the appropriate helper function
- [ ] Call the notification function after successful operation
- [ ] Decide whether to send email (`sendEmail: true/false`)
- [ ] Include relevant metadata for context
- [ ] Handle notification errors gracefully (don't fail main operation)
- [ ] Test notification appears in admin dashboard
- [ ] Test email is sent (if enabled)

---

## Best Practices

### ✅ DO:
- Call notification after successful database operations
- Use helper functions instead of direct API calls
- Include meaningful metadata
- Use appropriate notification types
- Send emails for critical notifications only
- Handle notification errors gracefully

### ❌ DON'T:
- Send notification before database operation succeeds
- Send too many notifications (causes fatigue)
- Include sensitive data in messages
- Fail the main operation if notification fails
- Send emails for every notification
- Use generic messages without context

---

## Testing Integration

### 1. Test Notification Creation
```bash
# Trigger your integrated feature
# Example: Submit contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test"}'
```

### 2. Check Admin Dashboard
1. Login as admin
2. Look for notification in bell icon
3. Verify badge shows correct count
4. Click to see notification details

### 3. Verify Real-Time
1. Open dashboard in two tabs
2. Trigger notification
3. Both tabs should update instantly

### 4. Check Email (if enabled)
1. Check recipient inbox
2. Verify email received
3. Test action button link

---

## Troubleshooting Integration

**Notification not created?**
- Check server logs for errors
- Verify notification helper was called
- Check notification API response

**Email not sent?**
- Verify `sendEmail: true` was passed
- Check RESEND_API_KEY is set
- Look for email errors in logs

**Wrong recipients?**
- Verify `recipientRole` or `recipientId` is correct
- Check admin_users table has correct data
- Review RLS policies

---

## Next Steps

1. Identify features that need notifications
2. Add notification calls to those features
3. Test each integration
4. Monitor notification volume
5. Adjust email settings based on feedback

---

**Last Updated:** ${new Date().toLocaleDateString()}
