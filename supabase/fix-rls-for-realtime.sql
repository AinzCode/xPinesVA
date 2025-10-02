-- Fix RLS Policies for Realtime
-- Run this in Supabase SQL Editor

-- Drop any conflicting policies
DROP POLICY IF EXISTS "testimonials_select_all_auth" ON testimonials;
DROP POLICY IF EXISTS "contact_inquiries_select_auth" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON contact_inquiries;

-- Create policies that allow authenticated users to read everything
-- (This is what the admin dashboard needs)

-- Testimonials: Allow authenticated users to read ALL testimonials
CREATE POLICY "testimonials_select_all_auth" ON testimonials
  FOR SELECT 
  TO authenticated
  USING (true);

-- Contact Inquiries: Allow authenticated users to read ALL inquiries  
CREATE POLICY "contact_inquiries_select_auth" ON contact_inquiries
  FOR SELECT 
  TO authenticated
  USING (true);

-- Verify policies were created
SELECT 
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('testimonials', 'contact_inquiries')
  AND 'authenticated' = ANY(roles::text[])
ORDER BY tablename, policyname;
