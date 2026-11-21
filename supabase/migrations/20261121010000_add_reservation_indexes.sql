-- Add high-performance indexes for reservation queries and reporting
CREATE INDEX IF NOT EXISTS idx_reservations_email ON public.reservations (email);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON public.reservations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_slug ON public.reservations (product_slug);
