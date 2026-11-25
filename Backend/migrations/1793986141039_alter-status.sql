-- Up Migration
ALTER TABLE public.tasks ALTER status  DROP NOT NULL; 
-- Down Migration