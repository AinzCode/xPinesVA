import { resend, ADMIN_EMAIL, FROM_EMAIL } from './resend';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredContact?: string;
  inquiryType?: string;
}

export interface TestimonialData {
  clientName: string;
  clientEmail?: string;
  clientCompany?: string;
  clientRole?: string;
  testimonial: string;
  rating?: number;
  serviceType?: string;
}

function createContactFormEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background-color: #052814; padding: 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; }
          .content { padding: 30px; background-color: #f9f9f9; }
          .content h2 { color: #052814; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .label { font-weight: bold; }
          .message-box { background-color: #fff; padding: 15px; border-radius: 5px; margin-top: 20px; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <h2>Contact Details</h2>
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>${data.name}</td>
              </tr>
              <tr>
                <td class="label">Email:</td>
                <td><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              ${data.phone ? `
              <tr>
                <td class="label">Phone:</td>
                <td>${data.phone}</td>
              </tr>
              ` : ''}
              ${data.preferredContact ? `
              <tr>
                <td class="label">Preferred Contact:</td>
                <td>${data.preferredContact}</td>
              </tr>
              ` : ''}
              ${data.inquiryType ? `
              <tr>
                <td class="label">Inquiry Type:</td>
                <td>${data.inquiryType}</td>
              </tr>
              ` : ''}
            </table>
            <h2>Message</h2>
            <div class="message-box">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Pines VA contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendContactFormEmail(data: ContactFormData) {
  try {
    const html = createContactFormEmailHtml(data);
    
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      html,
    });

    if (error) {
      console.error('Error sending contact form email:', error);
      throw error;
    }

    console.log('Contact form email sent successfully:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return { success: false, error };
  }
}

function createTestimonialSubmissionEmailHtml(data: TestimonialData): string {
  const stars = data.rating ? '⭐'.repeat(data.rating) : '';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background-color: #052814; padding: 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; }
          .content { padding: 30px; background-color: #f9f9f9; }
          .content h2 { color: #052814; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .label { font-weight: bold; }
          .testimonial-box { background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #0a6e33; }
          .rating { font-size: 24px; margin: 10px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌟 New Testimonial Received</h1>
          </div>
          <div class="content">
            <h2>Client Information</h2>
            <table>
              <tr>
                <td class="label">Name:</td>
                <td>${data.clientName}</td>
              </tr>
              ${data.clientEmail ? `
              <tr>
                <td class="label">Email:</td>
                <td><a href="mailto:${data.clientEmail}">${data.clientEmail}</a></td>
              </tr>
              ` : ''}
              ${data.clientCompany ? `
              <tr>
                <td class="label">Company:</td>
                <td>${data.clientCompany}</td>
              </tr>
              ` : ''}
              ${data.clientRole ? `
              <tr>
                <td class="label">Role:</td>
                <td>${data.clientRole}</td>
              </tr>
              ` : ''}
              ${data.serviceType ? `
              <tr>
                <td class="label">Service Type:</td>
                <td>${data.serviceType}</td>
              </tr>
              ` : ''}
            </table>
            ${data.rating ? `<div class="rating">${stars} (${data.rating}/5)</div>` : ''}
            <h2>Testimonial</h2>
            <div class="testimonial-box">
              ${data.testimonial.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            <p>Review and approve this testimonial in your admin dashboard.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function createTestimonialApprovalEmailHtml(clientName: string, testimonial: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #052814 0%, #0a6e33 100%); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
          .content { padding: 30px; background-color: #ffffff; }
          .greeting { font-size: 18px; color: #052814; margin-bottom: 20px; }
          .message { line-height: 1.8; color: #333; margin: 20px 0; }
          .testimonial-box { background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #0a6e33; margin: 20px 0; font-style: italic; }
          .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌲 Thank You!</h1>
          </div>
          <div class="content">
            <div class="greeting">
              Hello ${clientName},
            </div>
            <div class="message">
              <p>Thank you so much for taking the time to share your experience with Pines Virtual Assistant Services!</p>
              <p>We're thrilled to hear about your positive experience and truly appreciate your feedback. Your testimonial helps us improve our services and helps others understand the value we provide.</p>
            </div>
            <div class="testimonial-box">
              "${testimonial}"
            </div>
            <div class="message">
              <p>Your testimonial has been received and will be reviewed by our team. Once approved, it may be featured on our website to help others learn about our services.</p>
              <p>If you have any questions or need any assistance, please don't hesitate to reach out.</p>
            </div>
            <div class="signature">
              <p style="font-weight: 600; color: #052814; margin: 5px 0;">The Pines VA Team</p>
              <p style="color: #0a6e33; margin: 5px 0;">Pines Virtual Assistant Services</p>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Pines Virtual Assistant Services. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendTestimonialSubmissionEmail(data: TestimonialData) {
  try {
    const html = createTestimonialSubmissionEmailHtml(data);
    
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Testimonial from ${data.clientName}`,
      html,
    });

    if (error) {
      console.error('Error sending testimonial submission email:', error);
      throw error;
    }

    console.log('Testimonial submission email sent successfully:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Failed to send testimonial submission email:', error);
    return { success: false, error };
  }
}

export async function sendTestimonialApprovalEmail(data: TestimonialData) {
  if (!data.clientEmail) {
    console.warn('No client email provided, skipping approval email');
    return { success: false, error: 'No client email' };
  }

  try {
    const html = createTestimonialApprovalEmailHtml(data.clientName, data.testimonial);
    
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.clientEmail,
      subject: 'Thank You for Your Testimonial! - Pines VA',
      html,
    });

    if (error) {
      console.error('Error sending testimonial approval email:', error);
      throw error;
    }

    console.log('Testimonial approval email sent successfully:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Failed to send testimonial approval email:', error);
    return { success: false, error };
  }
}
