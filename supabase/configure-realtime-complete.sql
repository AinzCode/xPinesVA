-- Complete Realtime Configuration for Pines VA
-- Run this SQL in your Supabase SQL Editor to fix all realtime issues
-- This script enables realtime and ensures proper RLS policies

-- ============================================
-- STEP 1: Enable Realtime for Tables
-- ============================================

-- Enable realtime for testimonials table
ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;

-- Enable realtime for contact_inquiries table
ALTER PUBLICATION supabase_realtime ADD TABLE contact_inquiries;

-- ============================================
-- STEP 2: Verify Realtime Configuration
-- ============================================

-- This should show both tables in the results
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;

-- ============================================
-- STEP 3: Ensure Proper RLS Policies
-- ============================================

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to update inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to delete inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_inquiries;
DROP POLICY IF EXISTS "Enable all for service role" ON contact_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON contact_inquiries;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON contact_inquiries;

DROP POLICY IF EXISTS "Allow everyone to read approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow anonymous testimonial submissions" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users full testimonial access" ON testimonials;

-- ============================================
-- CONTACT INQUIRIES - RLS Policies
-- ============================================

-- Allow anonymous users to submit contact forms
CREATE POLICY "contact_inquiries_insert_anon" ON contact_inquiries
  FOR INSERT 
  TO anon, public
  WITH CHECK (true);

-- Allow authenticated users to view all inquiries (admin dashboard)
CREATE POLICY "contact_inquiries_select_auth" ON contact_inquiries
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update inquiry status (admin actions)
CREATE POLICY "contact_inquiries_update_auth" ON contact_inquiries
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete inquiries (admin cleanup)
CREATE POLICY "contact_inquiries_delete_auth" ON contact_inquiries
  FOR DELETE 
  TO authenticated
  USING (true);

-- Allow service role full access (for API routes and realtime)
CREATE POLICY "contact_inquiries_all_service" ON contact_inquiries
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- TESTIMONIALS - RLS Policies
-- ============================================

-- Allow everyone to read approved testimonials (public website)
CREATE POLICY "testimonials_select_approved_public" ON testimonials
  FOR SELECT 
  TO anon, authenticated, public
  USING (is_approved = true);

-- Allow authenticated users to read ALL testimonials (admin dashboard)
CREATE POLICY "testimonials_select_all_auth" ON testimonials
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow anonymous users to submit testimonials (public form)
CREATE POLICY "testimonials_insert_anon" ON testimonials
  FOR INSERT 
  TO anon, public
  WITH CHECK (true);

-- Allow authenticated users to update testimonials (admin approval/editing)
CREATE POLICY "testimonials_update_auth" ON testimonials
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete testimonials (admin cleanup)
CREATE POLICY "testimonials_delete_auth" ON testimonials
  FOR DELETE 
  TO authenticated
  USING (true);

-- Allow service role full access (for API routes and realtime)
CREATE POLICY "testimonials_all_service" ON testimonials
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- STEP 4: Verify RLS Policies
-- ============================================

-- View all policies for contact_inquiries
SELECT 
  policyname, 
  permissive, 
  roles, 
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_inquiries'
ORDER BY policyname;

-- View all policies for testimonials
SELECT 
  policyname, 
  permissive, 
  roles, 
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'testimonials'
ORDER BY policyname;

-- ============================================
-- STEP 5: Grant Permissions (if needed)
-- ============================================

-- Ensure anon role can read/write to tables
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON public.contact_inquiries TO anon;
GRANT SELECT, INSERT ON public.testimonials TO anon;

-- Ensure authenticated role has full access
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.contact_inquiries TO authenticated;
GRANT ALL ON public.testimonials TO authenticated;

-- ============================================
-- STEP 6: Test Realtime Configuration
-- ============================================

-- Check if replica identity is set correctly (needed for realtime DELETE events)
SELECT 
  schemaname, 
  tablename, 
  relreplident 
FROM pg_catalog.pg_class c
JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' 
  AND c.relname IN ('testimonials', 'contact_inquiries');

-- If relreplident is 'd' (default), realtime will work
-- If you want to capture old values on UPDATE/DELETE, set to FULL:
-- ALTER TABLE testimonials REPLICA IDENTITY FULL;
-- ALTER TABLE contact_inquiries REPLICA IDENTITY FULL;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Realtime configuration completed successfully!';
  RAISE NOTICE '📡 Tables enabled for realtime: testimonials, contact_inquiries';
  RAISE NOTICE '🔒 RLS policies configured for secure access';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next steps:';
  RAISE NOTICE '   1. Verify both tables appear in the realtime publication query above';
  RAISE NOTICE '   2. Check that all RLS policies are shown in the policy verification queries';
  RAISE NOTICE '   3. Restart your Next.js development server';
  RAISE NOTICE '   4. Test realtime updates in the admin dashboard';
END $$;
