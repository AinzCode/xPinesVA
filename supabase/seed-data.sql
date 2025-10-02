-- Insert sample data for Pines VA website
-- Run this after running schema.sql

-- Insert Services
INSERT INTO services (name, slug, description, short_description, pricing_min, pricing_max, pricing_type, features) VALUES
(
  'General Virtual Assistant (GVA)',
  'gva',
  'Comprehensive administrative support to streamline your business operations and increase productivity.',
  'Professional administrative support for day-to-day business tasks',
  6.00,
  12.00,
  'hourly',
  ARRAY[
    'Administrative Support',
    'Email Management',
    'Calendar Scheduling',
    'Data Entry & Research',
    'Customer Service',
    'Document Preparation',
    'Travel Arrangements',
    'Social Media Management'
  ]
),
(
  'Executive Virtual Assistant (EVA)',
  'eva',
  'Elite virtual assistant services designed for executives and senior leadership with high standards and confidentiality requirements.',
  'Premium support for business leaders and executives',
  12.00,
  20.00,
  'hourly',
  ARRAY[
    'Calendar & Schedule Management',
    'Email & Communication Management',
    'Travel Planning & Coordination',
    'Meeting Preparation & Documentation',
    'Project & Task Management',
    'Research & Data Gathering',
    'Document & File Management',
    'Confidential Support'
  ]
),
(
  'Inside Sales Agent (ISA)',
  'isa',
  'Professional lead generation, qualification, and conversion specialists to boost your sales performance.',
  'Sales specialists focused on lead generation and conversion',
  10.00,
  15.00,
  'hourly',
  ARRAY[
    'Lead Qualification & Nurturing',
    'Cold Calling & Outreach',
    'CRM Management',
    'Sales Pipeline Development',
    'Appointment Setting',
    'Follow-up Campaigns',
    'Sales Reporting & Analytics',
    'Customer Relationship Building',
    'Market Research',
    'Competitor Analysis'
  ]
),
(
  'Medical Virtual Assistant (MVA)',
  'mva',
  'HIPAA-compliant healthcare support services for medical practices and healthcare providers.',
  'Healthcare specialists with HIPAA compliance training',
  10.00,
  16.00,
  'hourly',
  ARRAY[
    'Patient Records Management',
    'Medical Transcription',
    'Billing & Insurance Support',
    'Medical Documentation ',
    'Prescription & Referral Coordination ',
    'Lab & Test Coordination ',
    'Compliance & Confidentiality',
    'Research & Medical Data Support',
    'Administrative Support '
  ]
);

-- Insert Sample Team Members
INSERT INTO team_members (name, email, role, specialization, bio, skills, experience_years, is_active) VALUES
(
  'Sarah Johnson',
  'hrteam@pinesva.com',
  'Senior Executive Assistant',
  'EVA',
  'Experienced executive assistant with over 8 years supporting C-level executives in Fortune 500 companies.',
  ARRAY['Executive Support', 'Project Management', 'Confidential Handling', 'Strategic Planning'],
  8,
  true
),
(
  'Michael Chen',
  'hrteam@pinesva.com',
  'Sales Specialist',
  'ISA',
  'Results-driven sales professional with expertise in lead generation and conversion optimization.',
  ARRAY['Lead Generation', 'CRM Management', 'Cold Calling', 'Sales Analytics'],
  5,
  true
),
(
  'Emily Rodriguez',
  'hrteam@pinesva.com',
  'Medical Assistant',
  'MVA',
  'HIPAA-certified medical assistant with extensive experience in healthcare administration.',
  ARRAY['Medical Administration', 'HIPAA Compliance', 'Patient Care', 'Medical Billing'],
  6,
  true
),
(
  'David Thompson',
  'hrteam@pinesva.com',
  'General Assistant',
  'GVA',
  'Versatile virtual assistant skilled in various administrative tasks and customer service.',
  ARRAY['Administrative Support', 'Customer Service', 'Data Entry', 'Email Management'],
  4,
  true
);

-- Insert Sample Testimonials
INSERT INTO testimonials (client_name, client_company, client_role, testimonial, rating, service_type, is_featured, is_approved) VALUES
(
  'John Smith',
  'TechCorp Solutions',
  'CEO',
  'The executive assistant from Pines VA has been instrumental in managing my busy schedule and confidential communications. Highly professional and reliable.',
  5,
  'EVA',
  true,
  true
),
(
  'Maria Garcia',
  'HealthFirst Clinic',
  'Practice Manager',
  'Our medical virtual assistant has streamlined our patient scheduling and billing processes. HIPAA compliance was seamless and professional.',
  5,
  'MVA',
  true,
  true
),
(
  'Robert Wilson',
  'SalesPro Inc',
  'Sales Director',
  'The inside sales agent helped us increase our lead conversion rate by 40%. Excellent communication skills and sales expertise.',
  5,
  'ISA',
  false,
  true
),
(
  'Lisa Chen',
  'StartupXYZ',
  'Founder',
  'Perfect general virtual assistant for our growing startup. Handles everything from email management to customer support efficiently.',
  4,
  'GVA',
  false,
  true
);

-- Update the services sort order
UPDATE services SET sort_order = 1 WHERE slug = 'gva';
UPDATE services SET sort_order = 2 WHERE slug = 'eva';
UPDATE services SET sort_order = 3 WHERE slug = 'isa';
UPDATE services SET sort_order = 4 WHERE slug = 'mva';