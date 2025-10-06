-- Row Level Security policies for read-only mobile access
-- This migration ensures anonymous users can only read data

-- Enable RLS on critical tables (if not already enabled)
-- Note: These will be updated after schema dump with actual table names

-- Example RLS policies (uncomment and modify after schema dump):
-- ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read customers
-- CREATE POLICY "Allow anonymous read access to customers" ON customers
--   FOR SELECT USING (true);

-- Allow anonymous users to read proposals
-- CREATE POLICY "Allow anonymous read access to proposals" ON proposals
--   FOR SELECT USING (true);

-- Allow anonymous users to read payments (for revenue calculation)
-- CREATE POLICY "Allow anonymous read access to payments" ON payments
--   FOR SELECT USING (true);

-- Note: This migration will be updated after schema dump to include actual table names
-- and proper RLS policies based on the production schema
