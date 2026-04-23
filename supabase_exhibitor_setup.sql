-- Exhibitor module setup
-- Run in Supabase SQL Editor

create extension if not exists pgcrypto;

create table if not exists public.exhibitors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  booth_name text not null unique,
  company_name text not null,
  contact_name text not null,
  email text not null unique,
  password_hash text not null
);

create table if not exists public.exhibitor_scans (
  id uuid primary key default gen_random_uuid(),
  scanned_at timestamptz not null default now(),
  exhibitor_id uuid not null references public.exhibitors(id) on delete cascade,
  exhibitor_booth_name text not null,
  attendee_pass_number text not null,
  attendee_full_name text not null,
  attendee_email text not null,
  attendee_phone text,
  attendee_company text,
  attendee_designation text,
  attendee_country text,
  attendee_type text,
  attendee_interests text,
  event_name text,
  raw_payload jsonb,
  constraint unique_exhibitor_scan unique (exhibitor_id, attendee_pass_number)
);

alter table public.exhibitors enable row level security;
alter table public.exhibitor_scans enable row level security;

-- Policies for custom frontend auth setup.
-- NOTE: With custom sessionStorage auth, these are permissive for anon/authenticated.
-- App enforces exhibitor isolation by filtering on exhibitor_id in queries.

drop policy if exists exhibitors_insert on public.exhibitors;
create policy exhibitors_insert
on public.exhibitors
for insert
to anon, authenticated
with check (true);

drop policy if exists exhibitors_select on public.exhibitors;
create policy exhibitors_select
on public.exhibitors
for select
to anon, authenticated
using (true);

drop policy if exists scans_insert on public.exhibitor_scans;
create policy scans_insert
on public.exhibitor_scans
for insert
to anon, authenticated
with check (true);

drop policy if exists scans_select on public.exhibitor_scans;
create policy scans_select
on public.exhibitor_scans
for select
to anon, authenticated
using (true);
