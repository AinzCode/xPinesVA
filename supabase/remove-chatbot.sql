-- Remove Chatbot System - Database Cleanup
-- Run this in your Supabase SQL Editor to completely remove the chatbot database components

-- 1. Drop all chat_messages policies first
DROP POLICY IF EXISTS "Allow users to manage their own chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Enable insert for anon chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Enable select for anon chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Enable all for service role chat messages" ON chat_messages;

-- 2. Drop indexes
DROP INDEX IF EXISTS idx_chat_messages_session_id;
DROP INDEX IF EXISTS idx_chat_messages_created_at;

-- 3. Drop the chat_messages table
DROP TABLE IF EXISTS chat_messages;

-- 4. Clean up any remaining references (if any)
-- This ensures no orphaned data remains

-- Verification queries (run after the above)
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'chat_messages';
-- Should return no rows if successful

COMMENT ON SCHEMA public IS 'Chatbot system has been completely removed. Tables: contact_inquiries, services, testimonials, team_members, blog_posts remain active.';