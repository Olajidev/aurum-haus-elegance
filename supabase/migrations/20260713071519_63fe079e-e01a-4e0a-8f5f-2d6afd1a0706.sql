REVOKE SELECT ON public.reservations FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.reservations FROM authenticated;