-- Create table to track WhatsApp phone verifications
CREATE TABLE public.phone_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'expired', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '5 minutes')
);

-- Enable RLS
ALTER TABLE public.phone_verifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own phone verifications" 
ON public.phone_verifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own phone verifications" 
ON public.phone_verifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own phone verifications" 
ON public.phone_verifications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add phone_verified column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone_verified BOOLEAN NOT NULL DEFAULT false;

-- Create index for performance
CREATE INDEX idx_phone_verifications_user_phone ON public.phone_verifications(user_id, phone_number);
CREATE INDEX idx_phone_verifications_status ON public.phone_verifications(status);

-- Create function to clean expired verifications
CREATE OR REPLACE FUNCTION public.cleanup_expired_verifications()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.phone_verifications 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND expires_at < now();
END;
$$;