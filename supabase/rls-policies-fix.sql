-- Updated RLS policies to fix contact form submission issue
-- Run this in Supabase SQL Editor to replace the existing policies

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update inquiries" ON contact_inquiries;

-- Contact Inquiries Policies
-- Allow anyone (including anonymous users) to insert contact forms
CREATE POLICY "Enable insert for anon users" ON contact_inquiries
  FOR INSERT TO anon, public
  WITH CHECK (true);

-- Allow service role to do everything (for API routes)
CREATE POLICY "Enable all for service role" ON contact_inquiries
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to view all inquiries (admin access)
CREATE POLICY "Enable select for authenticated users" ON contact_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update inquiries (admin access)  
CREATE POLICY "Enable update for authenticated users" ON contact_inquiries
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);