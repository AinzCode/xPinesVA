import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendReplyRequest {
  inquiryId: string;
  subject: string;
  message: string;
  recipientEmail: string;
  recipientName: string;
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
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('name, email, role')
      .eq('user_id', user.id)
      .single();

    if (adminError || !adminData) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const adminName = (adminData as { name: string }).name;
    const adminEmail = (adminData as { email: string }).email;

    // Parse request body
    const body: SendReplyRequest = await request.json();
    const { inquiryId, subject, message, recipientEmail, recipientName } = body;

    // Validate required fields
    if (!inquiryId || !subject || !message || !recipientEmail || !recipientName) {
      return NextResponse.json(
        { error: 'Missing required fields: inquiryId, subject, message, recipientEmail, recipientName' },
        { status: 400 }
      );
    }

    // Verify the inquiry exists
    const { data: inquiry, error: inquiryError } = await supabase
      .from('contact_inquiries')
      .select('id, email')
      .eq('id', inquiryId)
      .single();

    if (inquiryError || !inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `${adminName} - Pines VA <${process.env.RESEND_FROM_EMAIL || 'admin@pines-va.com'}>`,
      to: [recipientEmail],
      replyTo: adminEmail,
      subject: subject,
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
              .greeting {
                font-size: 16px;
                margin-bottom: 20px;
                color: #052814;
                font-weight: 500;
              }
              .message {
                white-space: pre-wrap;
                line-height: 1.8;
                margin-bottom: 30px;
                color: #333;
              }
              .signature {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
              }
              .signature p {
                margin: 5px 0;
              }
              .admin-name {
                font-weight: 600;
                color: #052814;
                font-size: 16px;
              }
              .company-name {
                color: #0a6e33;
                font-weight: 500;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #888;
                text-align: center;
              }
              .reply-info {
                background: #f8f9fa;
                border-left: 4px solid #0a6e33;
                padding: 12px 15px;
                margin-bottom: 20px;
                border-radius: 4px;
              }
              .reply-info p {
                margin: 0;
                font-size: 13px;
                color: #555;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🌲 Pines Virtual Assistant</h1>
              </div>
              
              <div class="greeting">
                Hello ${recipientName},
              </div>
              
              <div class="reply-info">
                <p>📧 This is a response to your inquiry with Pines VA</p>
              </div>
              
              <div class="message">${message}</div>
              
              <div class="signature">
                <p class="admin-name">${adminName}</p>
                <p class="company-name">Pines Virtual Assistant Services</p>
                <p style="color: #666; font-size: 14px;">
                  📧 <a href="mailto:${adminEmail}" style="color: #0a6e33; text-decoration: none;">${adminEmail}</a>
                </p>
              </div>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} Pines Virtual Assistant Services. All rights reserved.</p>
                <p style="margin-top: 10px;">
                  You received this email because you submitted an inquiry through our website.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email', details: emailError.message },
        { status: 500 }
      );
    }

    // Store reply in database using service role
    const supabaseAdmin = await createClient({ useServiceRole: true });
    const { error: insertError } = await supabaseAdmin
      .from('admin_replies')
      // @ts-expect-error - Supabase type inference issue
      .insert({
        inquiry_id: inquiryId,
        admin_id: user.id,
        admin_name: adminName,
        admin_email: adminEmail,
        recipient_email: recipientEmail,
        recipient_name: recipientName,
        subject,
        message,
      });

    if (insertError) {
      console.error('Error storing reply:', insertError);
      // Don't fail the request if storage fails
    }

    // Update inquiry status to 'in_progress' if it was 'new'
    const { data: currentInquiry } = await supabase
      .from('contact_inquiries')
      .select('status')
      .eq('id', inquiryId)
      .single();

    if (currentInquiry && (currentInquiry as { status: string }).status === 'new') {
      await supabaseAdmin
        .from('contact_inquiries')
        // @ts-expect-error - Supabase type inference issue
        .update({ status: 'in_progress' })
        .eq('id', inquiryId);
    }

    return NextResponse.json({
      success: true,
      emailId: emailData?.id,
      message: 'Reply sent successfully',
    });

  } catch (error) {
    console.error('Error in send reply API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
