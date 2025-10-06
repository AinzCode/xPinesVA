import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { NotificationInsert } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

type NotificationType = 'contact_form' | 'testimonial' | 'admin_action' | 'system_alert' | 'approval_needed';

interface CreateNotificationRequest {
  type: NotificationType;
  title: string;
  message: string;
  recipientId?: string;      // Individual recipient user_id
  recipientRole?: 'admin' | 'super_admin';  // Role-based broadcast
  metadata?: Record<string, unknown>;
  sendEmail?: boolean;       // Future: trigger email notification
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Verify admin authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is an admin
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body: CreateNotificationRequest = await request.json();
    const { type, title, message, recipientId, recipientRole, metadata, sendEmail } = body;

    // Validate required fields
    if (!type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: type, title, message' },
        { status: 400 }
      );
    }

    // Validate that either recipientId OR recipientRole is provided (not both)
    if ((!recipientId && !recipientRole) || (recipientId && recipientRole)) {
      return NextResponse.json(
        { error: 'Must provide either recipientId OR recipientRole (not both)' },
        { status: 400 }
      );
    }

    // Validate notification type
    const validTypes: NotificationType[] = ['contact_form', 'testimonial', 'admin_action', 'system_alert', 'approval_needed'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid notification type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Use service role for creating notifications (bypasses RLS)
    const supabaseAdmin = await createClient({ useServiceRole: true });

    // Insert notification(s)
    const notificationData: NotificationInsert = {
      type,
      title,
      message,
      recipient_id: recipientId || null,
      recipient_role: recipientRole || null,
      metadata: metadata || {},
    };

    const { data: notification, error: insertError } = await supabaseAdmin
      .from('notifications')
      // @ts-expect-error - Supabase type inference issue
      .insert(notificationData)
      .select()
      .single();

    if (insertError) {
      console.error('Error creating notification:', insertError);
      return NextResponse.json(
        { error: 'Failed to create notification', details: insertError.message },
        { status: 500 }
      );
    }

    // Send email notification if requested
    if (sendEmail) {
      try {
        const { notifyAdmins, sendNotificationEmail } = await import('@/lib/email/notifications');
        
        if (recipientRole) {
          // Send to all admins with specific role
          await notifyAdmins({
            subject: title,
            title,
            message,
            role: recipientRole as 'admin' | 'super_admin',
            actionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard`,
            actionText: 'View Dashboard',
          });
        } else if (recipientId) {
          // Send to specific admin (fetch their email)
          const { data: recipient } = await supabaseAdmin
            .from('admin_users')
            .select('email')
            .eq('user_id', recipientId)
            .single();
          
          if (recipient) {
            const recipientEmail = (recipient as { email: string }).email;
            await sendNotificationEmail({
              to: [recipientEmail],
              subject: title,
              title,
              message,
              actionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard`,
              actionText: 'View Dashboard',
            });
          }
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      notification,
    });

  } catch (error) {
    console.error('Error in create notification API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
