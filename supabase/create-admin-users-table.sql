-- Admin users table for authentication
-- This stores additional metadata for admin users (the actual auth is handled by Supabase Auth)

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Create trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at 
BEFORE UPDATE ON admin_users 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read admin_users (for checking if they're admin)
CREATE POLICY "admin_users_select_auth" ON admin_users
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Only the user themselves can update their own record
CREATE POLICY "admin_users_update_own" ON admin_users
  FOR UPDATE
  USING (auth.uid() = id);

COMMENT ON TABLE admin_users IS 'Admin users with access to the dashboard';
