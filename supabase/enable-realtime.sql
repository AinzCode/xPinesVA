-- Enable Realtime for Admin Dashboard
-- Run this in your Supabase SQL Editor to enable real-time updates

-- Enable realtime for testimonials table
ALTER PUBLICATION supabase_realtime ADD TABLE testimonials;

-- Enable realtime for contact_inquiries table
ALTER PUBLICATION supabase_realtime ADD TABLE contact_inquiries;

-- Verify realtime is enabled
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';

-- Should show both testimonials and contact_inquiries in the results
