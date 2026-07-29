-- LonePouch Caller Memory Table
-- Run this in your Supabase project to enable caller recognition

CREATE TABLE IF NOT EXISTS lonepouch_callers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  name TEXT,
  email TEXT,
  last_intent TEXT,
  call_count INTEGER DEFAULT 1,
  first_call_at TIMESTAMPTZ DEFAULT now(),
  last_call_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lonepouch_phone ON lonepouch_callers(phone_number);

-- Enable Row Level Security
ALTER TABLE lonepouch_callers ENABLE ROW LEVEL SECURITY;

-- Allow anon key read/write access
CREATE POLICY "Allow anon access" ON lonepouch_callers
  FOR ALL
  USING (true)
  WITH CHECK (true);