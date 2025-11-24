-- Create table to track form submissions for rate limiting
CREATE TABLE public.form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_agent TEXT,
    form_type TEXT DEFAULT 'lead',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on ip_address and submitted_at for efficient rate limit queries
CREATE INDEX idx_form_submissions_ip_time ON public.form_submissions(ip_address, submitted_at DESC);

-- Enable RLS (but make it permissive for the edge function to write)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow edge function (service role) to insert records
CREATE POLICY "Service role can insert submissions"
ON public.form_submissions
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow edge function to select for rate limiting checks
CREATE POLICY "Service role can read submissions"
ON public.form_submissions
FOR SELECT
TO service_role
USING (true);

-- Create function to clean up old submission records (older than 7 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.form_submissions
  WHERE submitted_at < NOW() - INTERVAL '7 days';
END;
$$;

-- Comment explaining the table purpose
COMMENT ON TABLE public.form_submissions IS 'Tracks form submissions for rate limiting. Records are automatically cleaned up after 7 days.';