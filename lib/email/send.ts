import { renderToStaticMarkup } from 'react-dom/server';
import { resend, ADMIN_EMAIL, FROM_EMAIL } from './resend';
import { ContactFormEmail, TestimonialSubmissionEmail, TestimonialApprovalEmail } from './templates';

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

export async function sendContactFormEmail(data: ContactFormData) {
  try {
    const html = renderToStaticMarkup(ContactFormEmail(data));
    
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

export async function sendTestimonialSubmissionEmail(data: TestimonialData) {
  try {
    const html = renderToStaticMarkup(TestimonialSubmissionEmail(data));
    
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
    const html = renderToStaticMarkup(
      TestimonialApprovalEmail({
        clientName: data.clientName,
        testimonial: data.testimonial,
      })
    );
    
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
