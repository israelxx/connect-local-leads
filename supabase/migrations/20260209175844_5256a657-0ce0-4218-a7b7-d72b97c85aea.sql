-- Add status column to leads table
ALTER TABLE public.leads 
ADD COLUMN status text NOT NULL DEFAULT 'novo';

-- Create index for status filtering
CREATE INDEX idx_leads_status ON public.leads(status);
