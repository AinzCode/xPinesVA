-- Quick Diagnostic for Realtime Issues
-- Run this in Supabase SQL Editor

-- 1. Check if realtime is enabled (should show both tables)
SELECT 'REALTIME STATUS' as check, schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
  AND tablename IN ('testimonials', 'contact_inquiries');

-- 2. Check RLS policies for authenticated role
SELECT 
  'RLS POLICIES' as check,
  tablename,
  policyname,
  cmd as operation,
  CASE 
    WHEN 'authenticated' = ANY(roles::text[]) THEN 'YES'
    ELSE 'NO'
  END as has_authenticated_access
FROM pg_policies 
WHERE tablename IN ('testimonials', 'contact_inquiries')
ORDER BY tablename, cmd;

-- 3. Check if RLS is enabled
SELECT 
  'RLS ENABLED' as check,
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN 'YES' ELSE 'NO' END as rls_enabled
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public' 
  AND tablename IN ('testimonials', 'contact_inquiries');

-- 4. Test query as authenticated user would see it
SELECT 
  'TEST QUERY' as check,
  COUNT(*) as testimonial_count
FROM testimonials;
