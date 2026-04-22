-- Run this in Supabase SQL Editor to let your frontend admin dashboard read rows.
-- Note: because your admin login is custom (not Supabase Auth), this policy allows
-- SELECT for anon/authenticated roles. For stronger security, move admin reads to a server.

alter table public.registrations_bioenergy_global_2026 enable row level security;
alter table public.registrations_reneweex_global_2026 enable row level security;
alter table public.registrations_waste_to_energy_expo enable row level security;
alter table public.registrations_bioenergy_global_summit enable row level security;

-- Remove restrictive policies that hide all rows.
drop policy if exists deny_select on public.registrations_bioenergy_global_2026;
drop policy if exists deny_select on public.registrations_reneweex_global_2026;
drop policy if exists deny_select on public.registrations_waste_to_energy_expo;
drop policy if exists deny_select on public.registrations_bioenergy_global_summit;

-- Create read policies so dashboard can fetch rows.
drop policy if exists allow_admin_dashboard_select on public.registrations_bioenergy_global_2026;
create policy allow_admin_dashboard_select
on public.registrations_bioenergy_global_2026
for select
to anon, authenticated
using (true);

drop policy if exists allow_admin_dashboard_select on public.registrations_reneweex_global_2026;
create policy allow_admin_dashboard_select
on public.registrations_reneweex_global_2026
for select
to anon, authenticated
using (true);

drop policy if exists allow_admin_dashboard_select on public.registrations_waste_to_energy_expo;
create policy allow_admin_dashboard_select
on public.registrations_waste_to_energy_expo
for select
to anon, authenticated
using (true);

drop policy if exists allow_admin_dashboard_select on public.registrations_bioenergy_global_summit;
create policy allow_admin_dashboard_select
on public.registrations_bioenergy_global_summit
for select
to anon, authenticated
using (true);

-- (Optional) ensure insert policy still exists.
drop policy if exists allow_public_insert on public.registrations_bioenergy_global_2026;
create policy allow_public_insert
on public.registrations_bioenergy_global_2026
for insert
to anon, authenticated
with check (true);

drop policy if exists allow_public_insert on public.registrations_reneweex_global_2026;
create policy allow_public_insert
on public.registrations_reneweex_global_2026
for insert
to anon, authenticated
with check (true);

drop policy if exists allow_public_insert on public.registrations_waste_to_energy_expo;
create policy allow_public_insert
on public.registrations_waste_to_energy_expo
for insert
to anon, authenticated
with check (true);

drop policy if exists allow_public_insert on public.registrations_bioenergy_global_summit;
create policy allow_public_insert
on public.registrations_bioenergy_global_summit
for insert
to anon, authenticated
with check (true);
