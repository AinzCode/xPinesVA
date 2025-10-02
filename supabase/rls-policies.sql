-- Row Level Security (RLS) Policies for Pines VA
-- Run this after schema.sql and seed-data.sql

-- Enable RLS on all tables
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Contact Inquiries Policies
-- Allow anyone to insert (submit contact form)
CREATE POLICY "Allow anonymous contact form submissions" ON contact_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all inquiries (admin access)
CREATE POLICY "Allow authenticated users to view inquiries" ON contact_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update inquiries (admin access)
CREATE POLICY "Allow authenticated users to update inquiries" ON contact_inquiries
  FOR UPDATE TO authenticated
  USING (true);

-- Services Policies
-- Allow everyone to read active services
CREATE POLICY "Allow everyone to read active services" ON services
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Allow authenticated users full access (admin)
CREATE POLICY "Allow authenticated users full service access" ON services
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Team Members Policies  
-- Allow everyone to read active team members
CREATE POLICY "Allow everyone to read active team members" ON team_members
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Allow authenticated users full access (admin)
CREATE POLICY "Allow authenticated users full team access" ON team_members
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog Posts Policies
-- Allow everyone to read published posts
CREATE POLICY "Allow everyone to read published posts" ON blog_posts
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

-- Allow authenticated users full access (admin)
CREATE POLICY "Allow authenticated users full blog access" ON blog_posts
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Testimonials Policies
-- Allow everyone to read approved testimonials
CREATE POLICY "Allow everyone to read approved testimonials" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (is_approved = true);

-- Allow anonymous users to submit testimonials (public form)
CREATE POLICY "Allow anonymous testimonial submissions" ON testimonials
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users full access (admin)
CREATE POLICY "Allow authenticated users full testimonial access" ON testimonials
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a function to check if user is admin (for future use)
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, return true for authenticated users
  -- You can modify this logic based on your admin system
  RETURN user_id IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;