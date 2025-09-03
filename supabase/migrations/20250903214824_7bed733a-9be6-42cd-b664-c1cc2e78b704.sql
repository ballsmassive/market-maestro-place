-- Create table for email verification codes
CREATE TABLE IF NOT EXISTS public.email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- values: pending, verified, expired
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS (edge function will use service role to bypass RLS)
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_email_verifications_email_status ON public.email_verifications (email, status);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON public.email_verifications (expires_at);
