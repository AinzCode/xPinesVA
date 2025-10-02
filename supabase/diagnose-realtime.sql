-- Realtime Diagnostic Script
-- Run this in Supabase SQL Editor to check your realtime configuration
-- This helps identify what might be causing connection issues

-- ============================================
-- 1. CHECK REALTIME PUBLICATION
-- ============================================
SELECT 
  '📡 REALTIME PUBLICATION' as check_type,
  schemaname, 
  tablename,
  CASE 
    WHEN tablename IN ('testimonials', 'contact_inquiries') THEN '✅ Configured'
    ELSE '⚠️ Not needed'
  END as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;

-- Expected: Both 'testimonials' and 'contact_inquiries' should appear

-- ============================================
-- 2. CHECK RLS STATUS
-- ============================================
SELECT 
  '🔒 RLS STATUS' as check_type,
  tablename,
  CASE 
    WHEN rowsecurity THEN '✅ Enabled'
    ELSE '❌ Disabled'
  END as rls_enabled
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public' 
  AND tablename IN ('testimonials', 'contact_inquiries')
ORDER BY tablename;

-- Expected: RLS should be enabled for both tables

-- ============================================
-- 3. CHECK RLS POLICIES
-- ============================================
SELECT 
  '📜 RLS POLICIES' as check_type,
  tablename,
  policyname,
  CASE cmd
    WHEN 'ALL' THEN '🔓 All Operations'
    WHEN 'SELECT' THEN '👁️ Read'
    WHEN 'INSERT' THEN '➕ Create'
    WHEN 'UPDATE' THEN '✏️ Update'
    WHEN 'DELETE' THEN '🗑️ Delete'
    ELSE cmd::text
  END as operation,
  CASE 
    WHEN 'authenticated' = ANY(roles::text[]) THEN '✅ Authenticated ✓'
    WHEN 'anon' = ANY(roles::text[]) THEN '👤 Anonymous ✓'
    WHEN 'service_role' = ANY(roles::text[]) THEN '🔧 Service ✓'
    ELSE array_to_string(roles, ', ')
  END as allowed_roles
FROM pg_policies 
WHERE tablename IN ('testimonials', 'contact_inquiries')
ORDER BY tablename, cmd, policyname;

-- Expected: Multiple policies for each table with authenticated, anon, and service_role

-- ============================================
-- 4. CHECK TABLE PERMISSIONS
-- ============================================
SELECT 
  '🔑 TABLE PERMISSIONS' as check_type,
  grantee,
  table_name,
  string_agg(privilege_type, ', ' ORDER BY privilege_type) as privileges
FROM information_schema.table_privileges
WHERE table_schema = 'public'
  AND table_name IN ('testimonials', 'contact_inquiries')
  AND grantee IN ('anon', 'authenticated', 'service_role')
GROUP BY grantee, table_name
ORDER BY table_name, grantee;

-- Expected: anon should have SELECT, INSERT
--          authenticated should have all privileges

-- ============================================
-- 5. CHECK REPLICA IDENTITY
-- ============================================
SELECT 
  '🔄 REPLICA IDENTITY' as check_type,
  n.nspname as schema,
  c.relname as table_name,
  CASE c.relreplident
    WHEN 'd' THEN '✅ Default (Primary Key)'
    WHEN 'f' THEN '⚠️ Full (All Columns)'
    WHEN 'n' THEN '❌ Nothing'
    WHEN 'i' THEN '✅ Index'
    ELSE c.relreplident::text
  END as replica_identity,
  CASE 
    WHEN c.relreplident IN ('d', 'f', 'i') THEN '✅ Realtime Compatible'
    ELSE '❌ Realtime May Not Work'
  END as realtime_status
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('testimonials', 'contact_inquiries')
ORDER BY c.relname;

-- Expected: 'd' (default) or 'f' (full) for both tables

-- ============================================
-- 6. CHECK TABLE STATISTICS
-- ============================================
SELECT 
  '📊 TABLE STATISTICS' as check_type,
  schemaname,
  tablename,
  n_live_tup as row_count,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND tablename IN ('testimonials', 'contact_inquiries')
ORDER BY tablename;

-- This shows basic table stats and health

-- ============================================
-- 7. SUMMARY & RECOMMENDATIONS
-- ============================================
DO $$
DECLARE
  realtime_enabled BOOLEAN;
  rls_enabled BOOLEAN;
  policies_count INT;
BEGIN
  -- Check if realtime is enabled
  SELECT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND tablename IN ('testimonials', 'contact_inquiries')
  ) INTO realtime_enabled;

  -- Check if RLS is enabled
  SELECT bool_and(c.rowsecurity)
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname IN ('testimonials', 'contact_inquiries')
  INTO rls_enabled;

  -- Count policies
  SELECT COUNT(*)
  FROM pg_policies
  WHERE tablename IN ('testimonials', 'contact_inquiries')
  INTO policies_count;

  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════';
  RAISE NOTICE '          REALTIME DIAGNOSTIC SUMMARY';
  RAISE NOTICE '═══════════════════════════════════════════════════════';
  RAISE NOTICE '';
  
  -- Realtime Publication
  IF realtime_enabled THEN
    RAISE NOTICE '✅ Realtime Publication: ENABLED';
  ELSE
    RAISE NOTICE '❌ Realtime Publication: DISABLED';
    RAISE NOTICE '   🔧 Fix: ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;';
    RAISE NOTICE '   🔧 Fix: ALTER PUBLICATION supabase_realtime ADD TABLE contact_inquiries;';
  END IF;

  RAISE NOTICE '';

  -- RLS Status
  IF rls_enabled THEN
    RAISE NOTICE '✅ Row Level Security: ENABLED';
  ELSE
    RAISE NOTICE '❌ Row Level Security: DISABLED';
    RAISE NOTICE '   🔧 Fix: ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;';
    RAISE NOTICE '   🔧 Fix: ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;';
  END IF;

  RAISE NOTICE '';

  -- RLS Policies
  IF policies_count >= 8 THEN
    RAISE NOTICE '✅ RLS Policies: % policies configured', policies_count;
  ELSIF policies_count > 0 THEN
    RAISE NOTICE '⚠️ RLS Policies: Only % policies found (should be 8+)', policies_count;
    RAISE NOTICE '   🔧 Fix: Run configure-realtime-complete.sql';
  ELSE
    RAISE NOTICE '❌ RLS Policies: NO policies found';
    RAISE NOTICE '   🔧 Fix: Run configure-realtime-complete.sql';
  END IF;

  RAISE NOTICE '';
  RAISE NOTICE '═══════════════════════════════════════════════════════';
  
  IF realtime_enabled AND rls_enabled AND policies_count >= 8 THEN
    RAISE NOTICE '';
    RAISE NOTICE '🎉 All checks passed! Realtime should be working.';
    RAISE NOTICE '';
    RAISE NOTICE '🔄 Next steps:';
    RAISE NOTICE '   1. Restart your Next.js development server';
    RAISE NOTICE '   2. Open the admin dashboard';
    RAISE NOTICE '   3. Check browser console for: ✅ Successfully subscribed...';
    RAISE NOTICE '   4. Test by submitting a testimonial or contact form';
    RAISE NOTICE '';
  ELSE
    RAISE NOTICE '';
    RAISE NOTICE '⚠️ Configuration incomplete. Please fix the issues above.';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Quick fix: Run configure-realtime-complete.sql';
    RAISE NOTICE '';
  END IF;

  RAISE NOTICE '═══════════════════════════════════════════════════════';
END $$;
