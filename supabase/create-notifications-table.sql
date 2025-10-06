-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('contact_form', 'testimonial', 'admin_action', 'system_alert', 'approval_needed')),
  title text NOT NULL,
  message text NOT NULL,
  recipient_id uuid REFERENCES admin_users(user_id) ON DELETE CASCADE,
  recipient_role text CHECK (recipient_role IN ('admin', 'super_admin')),
  is_read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add constraint: must have either recipient_id OR recipient_role (not both)
ALTER TABLE notifications ADD CONSTRAINT check_recipient_xor 
  CHECK (
    (recipient_id IS NOT NULL AND recipient_role IS NULL) OR
    (recipient_id IS NULL AND recipient_role IS NOT NULL)
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_role ON notifications(recipient_role, is_read) WHERE recipient_role IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
DROP POLICY IF EXISTS "service_role_all_notifications" ON notifications;

-- Policy 1: Admins can see their own notifications or role-based notifications
CREATE POLICY "select_own_notifications" ON notifications
  FOR SELECT
  USING (
    -- Direct recipient
    recipient_id = auth.uid() 
    OR 
    -- Role-based recipient
    (
      recipient_role IS NOT NULL 
      AND recipient_role = (SELECT role FROM admin_users WHERE user_id = auth.uid())
    )
  );

-- Policy 2: Admins can update (mark as read) their own notifications
CREATE POLICY "update_own_notifications" ON notifications
  FOR UPDATE
  USING (
    recipient_id = auth.uid()
    OR
    (
      recipient_role IS NOT NULL 
      AND recipient_role = (SELECT role FROM admin_users WHERE user_id = auth.uid())
    )
  );

-- Policy 3: Service role can do everything (for creating notifications via API)
CREATE POLICY "service_role_all_notifications" ON notifications
  FOR ALL
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_notifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_notifications_updated_at_trigger ON notifications;
CREATE TRIGGER update_notifications_updated_at_trigger
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_notifications_updated_at();

-- Grant permissions
GRANT ALL ON notifications TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON notifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON notifications TO authenticated;
GRANT ALL ON notifications TO service_role;
