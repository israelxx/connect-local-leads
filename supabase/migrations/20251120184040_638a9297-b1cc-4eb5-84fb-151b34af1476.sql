-- Add revenue column to leads table
ALTER TABLE public.leads 
ADD COLUMN revenue text NOT NULL DEFAULT '';