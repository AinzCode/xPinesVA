-- Add client_email field to testimonials table
-- This allows us to send thank you emails when testimonials are approved

ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_testimonials_email ON testimonials(client_email);

COMMENT ON COLUMN testimonials.client_email IS 'Client email address for sending approval notifications';
