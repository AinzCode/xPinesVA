-- Create admin_replies table to track email replies to inquirers
CREATE TABLE IF NOT EXISTS admin_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid NOT NULL REFERENCES contact_inquiries(id) ON DELETE CASCADE,
  admin_id uuid NOT NULL REFERENCES admin_users(user_id) ON DELETE CASCADE,
  admin_name text NOT NULL,
  admin_email text NOT NULL,
  recipient_email text NOT NULL,
  recipient_name text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create index for quick lookup by inquiry
CREATE INDEX IF NOT EXISTS idx_admin_replies_inquiry ON admin_replies(inquiry_id, sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_replies_admin ON admin_replies(admin_id, sent_at DESC);

-- Enable Row Level Security
ALTER TABLE admin_replies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "select_admin_replies" ON admin_replies;
DROP POLICY IF EXISTS "insert_admin_replies" ON admin_replies;
DROP POLICY IF EXISTS "service_role_all_replies" ON admin_replies;

-- Admins can view all replies
CREATE POLICY "select_admin_replies" ON admin_replies
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

-- Admins can insert replies
CREATE POLICY "insert_admin_replies" ON admin_replies
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

-- Service role can do everything
CREATE POLICY "service_role_all_replies" ON admin_replies
  FOR ALL
  USING (true);

-- Grant permissions
GRANT ALL ON admin_replies TO postgres;
GRANT SELECT, INSERT ON admin_replies TO anon;
GRANT SELECT, INSERT ON admin_replies TO authenticated;
GRANT ALL ON admin_replies TO service_role;

-- Also create a table for testimonial replies
CREATE TABLE IF NOT EXISTS testimonial_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  testimonial_id uuid NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,
  admin_id uuid NOT NULL REFERENCES admin_users(user_id) ON DELETE CASCADE,
  admin_name text NOT NULL,
  admin_email text NOT NULL,
  recipient_email text NOT NULL,
  recipient_name text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create index for testimonial replies
CREATE INDEX IF NOT EXISTS idx_testimonial_replies_testimonial ON testimonial_replies(testimonial_id, sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonial_replies_admin ON testimonial_replies(admin_id, sent_at DESC);

-- Enable Row Level Security
ALTER TABLE testimonial_replies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "select_testimonial_replies" ON testimonial_replies;
DROP POLICY IF EXISTS "insert_testimonial_replies" ON testimonial_replies;
DROP POLICY IF EXISTS "service_role_all_testimonial_replies" ON testimonial_replies;

-- Admins can view all replies
CREATE POLICY "select_testimonial_replies" ON testimonial_replies
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

-- Admins can insert replies
CREATE POLICY "insert_testimonial_replies" ON testimonial_replies
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid()
    )
  );

-- Service role can do everything
CREATE POLICY "service_role_all_testimonial_replies" ON testimonial_replies
  FOR ALL
  USING (true);

-- Grant permissions
GRANT ALL ON testimonial_replies TO postgres;
GRANT SELECT, INSERT ON testimonial_replies TO anon;
GRANT SELECT, INSERT ON testimonial_replies TO authenticated;
GRANT ALL ON testimonial_replies TO service_role;
