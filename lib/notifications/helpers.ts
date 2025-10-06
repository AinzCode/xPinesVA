/**
 * Helper functions to create notifications from anywhere in the application
 * Use these instead of directly calling the API endpoints
 */

type NotificationType = 'contact_form' | 'testimonial' | 'admin_action' | 'system_alert' | 'approval_needed';

interface CreateNotificationOptions {
  type: NotificationType;
  title: string;
  message: string;
  recipientId?: string;
  recipientRole?: 'admin' | 'super_admin';
  metadata?: Record<string, unknown>;
  sendEmail?: boolean;
}

/**
 * Create a notification for admins
 * @example
 * await createNotification({
 *   type: 'contact_form',
 *   title: 'New Contact Form',
 *   message: 'John Doe submitted a contact form',
 *   recipientRole: 'admin',
 *   sendEmail: true
 * });
 */
export async function createNotification(options: CreateNotificationOptions): Promise<boolean> {
  try {
    const response = await fetch('/api/notifications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      console.error('Failed to create notification:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
}

/**
 * Notify admins about a new contact form submission
 */
export async function notifyContactForm(data: {
  name: string;
  email: string;
  formId?: string;
  sendEmail?: boolean;
}) {
  return createNotification({
    type: 'contact_form',
    title: 'New Contact Form Submission',
    message: `${data.name} (${data.email}) submitted a contact form`,
    recipientRole: 'admin',
    metadata: {
      formId: data.formId,
      senderName: data.name,
      senderEmail: data.email,
    },
    sendEmail: data.sendEmail ?? true,
  });
}

/**
 * Notify admins about a new testimonial submission
 */
export async function notifyTestimonial(data: {
  clientName: string;
  rating: number;
  testimonialId?: string;
  sendEmail?: boolean;
}) {
  return createNotification({
    type: 'testimonial',
    title: 'New Testimonial Submitted',
    message: `${data.clientName} submitted a ${data.rating}-star testimonial`,
    recipientRole: 'super_admin',
    metadata: {
      testimonialId: data.testimonialId,
      authorName: data.clientName,
      rating: data.rating,
    },
    sendEmail: data.sendEmail ?? true,
  });
}

/**
 * Notify super admins about admin user actions
 */
export async function notifyAdminAction(data: {
  action: 'created' | 'updated' | 'deleted';
  adminName: string;
  performedBy?: string;
  sendEmail?: boolean;
}) {
  const actionText = {
    created: 'was added as an admin',
    updated: 'was updated',
    deleted: 'was removed',
  }[data.action];

  return createNotification({
    type: 'admin_action',
    title: `Admin User ${data.action.charAt(0).toUpperCase() + data.action.slice(1)}`,
    message: `${data.adminName} ${actionText}${data.performedBy ? ` by ${data.performedBy}` : ''}`,
    recipientRole: 'super_admin',
    metadata: {
      actionType: data.action,
      targetAdminName: data.adminName,
      performedBy: data.performedBy,
    },
    sendEmail: data.sendEmail ?? false,
  });
}

/**
 * Send a system alert to admins
 */
export async function notifySystemAlert(data: {
  title: string;
  message: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  recipientRole?: 'admin' | 'super_admin';
  sendEmail?: boolean;
}) {
  return createNotification({
    type: 'system_alert',
    title: data.title,
    message: data.message,
    recipientRole: data.recipientRole ?? 'super_admin',
    metadata: {
      severity: data.severity ?? 'medium',
    },
    sendEmail: data.sendEmail ?? (data.severity === 'high' || data.severity === 'critical'),
  });
}

/**
 * Notify admins that content needs approval
 */
export async function notifyApprovalNeeded(data: {
  contentType: string;
  contentTitle: string;
  contentId?: string;
  submittedBy?: string;
  sendEmail?: boolean;
}) {
  return createNotification({
    type: 'approval_needed',
    title: `${data.contentType} Needs Approval`,
    message: `"${data.contentTitle}"${data.submittedBy ? ` submitted by ${data.submittedBy}` : ''} is awaiting approval`,
    recipientRole: 'super_admin',
    metadata: {
      contentType: data.contentType,
      contentTitle: data.contentTitle,
      contentId: data.contentId,
      submittedBy: data.submittedBy,
    },
    sendEmail: data.sendEmail ?? true,
  });
}

/**
 * Send a notification to a specific admin user
 */
export async function notifySpecificAdmin(
  userId: string,
  data: {
    type: NotificationType;
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
    sendEmail?: boolean;
  }
) {
  return createNotification({
    type: data.type,
    title: data.title,
    message: data.message,
    recipientId: userId,
    metadata: data.metadata,
    sendEmail: data.sendEmail ?? false,
  });
}
