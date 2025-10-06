import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredContact?: string;
  inquiryType?: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  message,
  preferredContact,
  inquiryType,
}: ContactFormEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#052814', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffffff', margin: 0 }}>New Contact Form Submission</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#052814', marginTop: 0 }}>Contact Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tr>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name:</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{name}</td>
        </tr>
        <tr>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Email:</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <a href={`mailto:${email}`}>{email}</a>
          </td>
        </tr>
        {phone && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Phone:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{phone}</td>
          </tr>
        )}
        {preferredContact && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Preferred Contact:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{preferredContact}</td>
          </tr>
        )}
        {inquiryType && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Inquiry Type:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{inquiryType}</td>
          </tr>
        )}
      </table>
      <h3 style={{ color: '#052814', marginTop: '30px' }}>Message:</h3>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px', border: '1px solid #ddd' }}>
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
      </div>
      <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        This inquiry has been automatically saved to your admin dashboard.
      </p>
    </div>
    <div style={{ backgroundColor: '#052814', padding: '15px', textAlign: 'center' }}>
      <p style={{ color: '#ffffff', margin: 0, fontSize: '12px' }}>
        © 2025 Pines VA. All rights reserved.
      </p>
    </div>
  </div>
);

interface TestimonialSubmissionEmailProps {
  clientName: string;
  clientCompany?: string;
  clientRole?: string;
  testimonial: string;
  rating?: number;
  serviceType?: string;
}

export const TestimonialSubmissionEmail = ({
  clientName,
  clientCompany,
  clientRole,
  testimonial,
  rating,
  serviceType,
}: TestimonialSubmissionEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#052814', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffffff', margin: 0 }}>New Testimonial Submission</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#052814', marginTop: 0 }}>Client Information</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tr>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Name:</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{clientName}</td>
        </tr>
        {clientCompany && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Company:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{clientCompany}</td>
          </tr>
        )}
        {clientRole && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Role:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{clientRole}</td>
          </tr>
        )}
        {serviceType && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Service Type:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{serviceType}</td>
          </tr>
        )}
        {rating && (
          <tr>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Rating:</td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              {'⭐'.repeat(rating)} ({rating}/5)
            </td>
          </tr>
        )}
      </table>
      <h3 style={{ color: '#052814', marginTop: '30px' }}>Testimonial:</h3>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px', border: '1px solid #ddd' }}>
        <p style={{ margin: 0, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>&ldquo;{testimonial}&rdquo;</p>
      </div>
      <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        This testimonial is pending approval in your admin dashboard.
      </p>
    </div>
    <div style={{ backgroundColor: '#052814', padding: '15px', textAlign: 'center' }}>
      <p style={{ color: '#ffffff', margin: 0, fontSize: '12px' }}>
        © 2025 Pines VA. All rights reserved.
      </p>
    </div>
  </div>
);

interface TestimonialApprovalEmailProps {
  clientName: string;
  testimonial: string;
}

export const TestimonialApprovalEmail = ({
  clientName,
  testimonial,
}: TestimonialApprovalEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#052814', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#ffffff', margin: 0 }}>Thank You for Your Testimonial! 🎉</h1>
    </div>
    <div style={{ padding: '30px', backgroundColor: '#f9f9f9' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
        Dear {clientName},
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
        Thank you so much for taking the time to share your experience with Pines VA! 
        Your testimonial has been approved and is now featured on our website.
      </p>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px', border: '1px solid #ddd', margin: '20px 0' }}>
        <p style={{ margin: 0, fontStyle: 'italic', color: '#666' }}>&ldquo;{testimonial}&rdquo;</p>
      </div>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
        Your feedback helps potential clients understand the value we provide and motivates 
        our team to continue delivering exceptional service.
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
        We truly appreciate your trust in Pines VA and look forward to continuing to support your business needs.
      </p>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginTop: '30px' }}>
        Warm regards,<br />
        <strong>The Pines VA Team</strong>
      </p>
    </div>
    <div style={{ backgroundColor: '#052814', padding: '15px', textAlign: 'center' }}>
      <p style={{ color: '#ffffff', margin: 0, fontSize: '12px' }}>
        © 2025 Pines VA. All rights reserved.
      </p>
    </div>
  </div>
);
