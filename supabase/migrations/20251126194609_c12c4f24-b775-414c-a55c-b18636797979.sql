-- Add social_handle column to leads table
ALTER TABLE public.leads 
ADD COLUMN social_handle TEXT NOT NULL DEFAULT '';