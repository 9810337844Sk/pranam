-- Project inquiries submitted from the contact page.
create table if not exists public.project_inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text        not null,
  email       text        not null,
  phone       text        not null,
  company     text,
  service     text        not null,
  budget      text,
  message     text        not null,
  status      text        not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost'))
);

create index if not exists project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);

-- RLS on, with no public policies: only the service role (used by the server
-- function) can write, and nobody can read from the browser.
alter table public.project_inquiries enable row level security;

-- Signed-in staff can read the inbox. Adjust to your own auth setup.
drop policy if exists "staff can read inquiries" on public.project_inquiries;
create policy "staff can read inquiries"
  on public.project_inquiries for select
  to authenticated
  using (true);
