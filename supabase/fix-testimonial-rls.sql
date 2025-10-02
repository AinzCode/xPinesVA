-- FIX: Allow Public Testimonial Submissions
-- Run this in your Supabase SQL Editor to fix the RLS policy error

-- Add policy to allow anonymous users to submit testimonials
CREATE POLICY "Allow anonymous testimonial submissions" ON testimonials
  FOR INSERT TO anon
  WITH CHECK (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'testimonials';
