-- Image uploads: a public Storage bucket the admin panel can upload into
-- directly from the browser (simple password-gated admin, no server upload
-- endpoint), and a `brands` table for the "Trusted by businesses..." logo
-- strip, which used to be hardcoded in src/data/site.ts.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "anon can read media" on storage.objects;
create policy "anon can read media"
  on storage.objects for select
  to anon
  using (bucket_id = 'media');

drop policy if exists "anon can upload media" on storage.objects;
create policy "anon can upload media"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'media');

drop policy if exists "anon can update media" on storage.objects;
create policy "anon can update media"
  on storage.objects for update
  to anon
  using (bucket_id = 'media');

create table if not exists public.brands (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null,
  logo        text not null
);

alter table public.brands enable row level security;

drop policy if exists "anon can manage brands" on public.brands;
create policy "anon can manage brands"
  on public.brands for all
  to anon
  using (true)
  with check (true);

insert into public.brands (sort_order, name, logo) values
  (0, 'Spotify', 'https://api.myunicampus.com/6da490c2-415b-4732-9b44-b41fc1a2565b_1744952092980.png'),
  (1, 'Meta', 'https://blog.logomyway.com/wp-content/uploads/2021/11/meta-logo.png'),
  (2, 'IT College Nepal', 'https://itcollegenepal.com/wp-content/uploads/2021/08/download-1.png.webp'),
  (3, 'Bhojmandu', 'https://bhojmandu.com/storage/business/2026-07-04-6a48ab9ea4675.png'),
  (4, 'Kantipur Studio', 'https://kantipurstudio.com.np/final-logo.webp'),
  (5, 'Digital Kantipur', 'https://www.digitalkantipur.com/logo%20image/logo%20ho%20digital%20kantipur(1).png'),
  (6, 'RBS Academy', 'https://play-lh.googleusercontent.com/pWo4eMBVHpJg2EkX0RxVZcxt8_bNmOPgN2L0MEcLhtho0-RvKWexbISsyHUIlt7AxpyU-mQzFg9BOLZhihYMbTw=w240-h480-rw'),
  (7, 'Battery Mandu', 'https://www.batterymandu.com/assets/battery-mandu-logo-tNEPvBE_.jpg'),
  (8, 'Google', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'),
  (9, 'Apple', 'https://play-lh.googleusercontent.com/SzuR2AGfx_7QREvPuOUzrZ66D2e61tHrU84BBP5vegFYN4P3k_LRxzMyM657Xg8bsUdKqg6tiHxAI-3DZ3al'),
  (10, 'LinkedIn', 'https://yt3.googleusercontent.com/i6KNxiy3gME-BulL4WnuGkTGqHuSYF8jl1WRn0rXftcJdSYK7dHKcJ3gLAaPc-KfhmLSYPwf824=s900-c-k-c0x00ffffff-no-rj')
on conflict do nothing;
