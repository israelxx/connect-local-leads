-- Add service_type column to leads table to differentiate standard clients from PRIME HUB
ALTER TABLE public.leads 
ADD COLUMN service_type text NOT NULL DEFAULT 'standard' CHECK (service_type IN ('standard', 'prime_hub'));