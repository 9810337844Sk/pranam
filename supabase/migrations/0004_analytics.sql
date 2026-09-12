-- Lightweight first-party page-view analytics (no external service).
-- One row per page view; duration_seconds is updated in place while the
-- visitor stays on the page, so "average duration" reflects real time-on-page.

create table if not exists public.page_views (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  session_id        text not null,
  path              text not null,
  referrer          text,
  duration_seconds  int not null default 0
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_session_idx on public.page_views (session_id);

alter table public.page_views enable row level security;

-- Public site inserts/updates its own page-view rows (no user auth on the
-- marketing site); the admin panel reads them. Same simple-anon-access model
-- as the rest of the admin content tables.
drop policy if exists "anon can record page views" on public.page_views;
create policy "anon can record page views"
  on public.page_views for insert
  to anon
  with check (true);

drop policy if exists "anon can update page views" on public.page_views;
create policy "anon can update page views"
  on public.page_views for update
  to anon
  using (true)
  with check (true);

drop policy if exists "anon can read page views" on public.page_views;
create policy "anon can read page views"
  on public.page_views for select
  to anon
  using (true);
