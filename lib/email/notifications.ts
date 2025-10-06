import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendNotificationEmailParams {
  to: string[];
  subject: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}

export async function sendNotificationEmail({
  to,
  subject,
  title,
  message,
  actionUrl,
  actionText = 'View in Dashboard',
}: SendNotificationEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Pines VA Notifications <notifications@pines-va.com>',
      to,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #052814 0%, #0a6e33 100%);
                color: white;
                padding: 20px;
                border-radius: 6px 6px 0 0;
                margin: -30px -30px 30px -30px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                margin-bottom: 30px;
              }
              .content h2 {
                color: #052814;
                font-size: 20px;
                margin-bottom: 15px;
              }
              .content p {
                margin-bottom: 15px;
                color: #555;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background-color: #0a6e33;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 20px;
              }
              .button:hover {
                background-color: #095028;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #888;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 Pines VA</h1>
              </div>
              <div class="content">
                <h2>${title}</h2>
                <p>${message}</p>
                ${
                  actionUrl
                    ? `<a href="${actionUrl}" class="button">${actionText}</a>`
                    : ''
                }
              </div>
              <div class="footer">
                <p>This is an automated notification from Pines Virtual Assistant Services.</p>
                <p>© ${new Date().getFullYear()} Pines VA. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending notification email:', error);
      return { success: false, error };
    }

    console.log('Notification email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, error };
  }
}

// Get admin emails for notifications
export async function getAdminEmails(role?: 'admin' | 'super_admin'): Promise<string[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient({ useServiceRole: true });

    let query = supabase
      .from('admin_users')
      .select('email');

    // Filter by role if specified
    if (role) {
      query = query.eq('role', role);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching admin emails:', error);
      return [];
    }

    return data?.map((admin: { email: string }) => admin.email) || [];
  } catch (error) {
    console.error('Failed to get admin emails:', error);
    return [];
  }
}

// Helper to send notification to all admins or specific role
export async function notifyAdmins({
  subject,
  title,
  message,
  role,
  actionUrl,
  actionText,
}: {
  subject: string;
  title: string;
  message: string;
  role?: 'admin' | 'super_admin';
  actionUrl?: string;
  actionText?: string;
}) {
  const emails = await getAdminEmails(role);
  
  if (emails.length === 0) {
    console.warn('No admin emails found to send notification');
    return { success: false, error: 'No recipients' };
  }

  return sendNotificationEmail({
    to: emails,
    subject,
    title,
    message,
    actionUrl,
    actionText,
  });
}
