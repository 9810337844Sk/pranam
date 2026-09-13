-- ============================================================================
-- Pranam Software — single consolidated Supabase setup script
-- ============================================================================
-- Run this ENTIRE file once in the Supabase SQL editor (Project → SQL Editor
-- → New query → paste all of this → Run). It replaces every earlier
-- migration/setup-database*.sql file in this repo.
--
-- Safe to re-run: every statement is idempotent (create-if-not-exists,
-- add-column-if-not-exists, drop-then-create policy). Re-running it will
-- never delete existing data and will patch any table that's missing a
-- column the admin panel expects — which is what was causing the
-- "Could not find the 'x' column of 'y' in the schema cache" import errors.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- project_inquiries — contact form submissions
-- ---------------------------------------------------------------------------
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
);

alter table public.project_inquiries add column if not exists status text not null default 'new';
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'project_inquiries_status_check'
  ) then
    alter table public.project_inquiries
      add constraint project_inquiries_status_check
      check (status in ('new', 'contacted', 'quoted', 'won', 'lost'));
  end if;
end $$;

create index if not exists project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);

alter table public.project_inquiries enable row level security;

drop policy if exists "staff can read inquiries" on public.project_inquiries;
drop policy if exists "anon can manage inquiries" on public.project_inquiries;
drop policy if exists "anon can update inquiries" on public.project_inquiries;
drop policy if exists "anon can insert inquiries" on public.project_inquiries;

-- Public contact form inserts a new inquiry.
create policy "anon can insert inquiries"
  on public.project_inquiries for insert
  to anon
  with check (true);

-- Admin panel (simple password gate, runs as anon) reads + updates the inbox.
create policy "anon can manage inquiries"
  on public.project_inquiries for select
  to anon
  using (true);

create policy "anon can update inquiries"
  on public.project_inquiries for update
  to anon
  using (true)
  with check (true);


-- ---------------------------------------------------------------------------
-- hero_slides
-- ---------------------------------------------------------------------------
create table if not exists public.hero_slides (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  image       text not null default '',
  title       text not null default '',
  subtitle    text not null default ''
);
alter table public.hero_slides add column if not exists sort_order int not null default 0;
alter table public.hero_slides add column if not exists image text not null default '';
alter table public.hero_slides add column if not exists title text not null default '';
alter table public.hero_slides add column if not exists subtitle text not null default '';


-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  title       text not null default '',
  body        text not null default '',
  icon        text not null default 'web',
  color       text not null default 'violet',
  image       text not null default '',
  features    text[] not null default '{}'
);
alter table public.services add column if not exists sort_order int not null default 0;
alter table public.services add column if not exists title text not null default '';
alter table public.services add column if not exists body text not null default '';
alter table public.services add column if not exists icon text not null default 'web';
alter table public.services add column if not exists color text not null default 'violet';
alter table public.services add column if not exists image text not null default '';
alter table public.services add column if not exists features text[] not null default '{}';


-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null default '',
  ini         text not null default '',
  body        text not null default '',
  tags        text[] not null default '{}',
  img         text not null default '',
  wide        boolean not null default false
);
alter table public.products add column if not exists sort_order int not null default 0;
alter table public.products add column if not exists name text not null default '';
alter table public.products add column if not exists ini text not null default '';
alter table public.products add column if not exists body text not null default '';
alter table public.products add column if not exists tags text[] not null default '{}';
alter table public.products add column if not exists img text not null default '';
alter table public.products add column if not exists wide boolean not null default false;


-- ---------------------------------------------------------------------------
-- team_members
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null default '',
  ini         text not null default '',
  role        text not null default '',
  skills      text not null default '',
  img         text not null default ''
);
alter table public.team_members add column if not exists sort_order int not null default 0;
alter table public.team_members add column if not exists name text not null default '';
alter table public.team_members add column if not exists ini text not null default '';
alter table public.team_members add column if not exists role text not null default '';
alter table public.team_members add column if not exists skills text not null default '';
alter table public.team_members add column if not exists img text not null default '';


-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null default '',
  ini         text not null default '',
  at          text not null default '',
  tag         text not null default '',
  time        text not null default '',
  quote       text not null default '',
  img         text not null default ''
);
alter table public.testimonials add column if not exists sort_order int not null default 0;
alter table public.testimonials add column if not exists name text not null default '';
alter table public.testimonials add column if not exists ini text not null default '';
alter table public.testimonials add column if not exists "at" text not null default '';
alter table public.testimonials add column if not exists tag text not null default '';
alter table public.testimonials add column if not exists "time" text not null default '';
alter table public.testimonials add column if not exists quote text not null default '';
alter table public.testimonials add column if not exists img text not null default '';


-- ---------------------------------------------------------------------------
-- process_steps
-- ---------------------------------------------------------------------------
create table if not exists public.process_steps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  title       text not null default '',
  body        text not null default ''
);
alter table public.process_steps add column if not exists sort_order int not null default 0;
alter table public.process_steps add column if not exists title text not null default '';
alter table public.process_steps add column if not exists body text not null default '';


-- ---------------------------------------------------------------------------
-- company_info (singleton row)
-- ---------------------------------------------------------------------------
create table if not exists public.company_info (
  id          uuid primary key default gen_random_uuid(),
  updated_at  timestamptz not null default now(),
  name        text not null default '',
  legal_name  text not null default '',
  tagline     text not null default '',
  founded     int not null default 2024,
  address     text not null default '',
  phone       text not null default '',
  phone_href  text not null default '',
  email       text not null default '',
  hours       text not null default '',
  whatsapp    text not null default ''
);
alter table public.company_info add column if not exists name text not null default '';
alter table public.company_info add column if not exists legal_name text not null default '';
alter table public.company_info add column if not exists tagline text not null default '';
alter table public.company_info add column if not exists founded int not null default 2024;
alter table public.company_info add column if not exists address text not null default '';
alter table public.company_info add column if not exists phone text not null default '';
alter table public.company_info add column if not exists phone_href text not null default '';
alter table public.company_info add column if not exists email text not null default '';
alter table public.company_info add column if not exists hours text not null default '';
alter table public.company_info add column if not exists whatsapp text not null default '';


-- ---------------------------------------------------------------------------
-- brands ("Trusted by" logo strip)
-- ---------------------------------------------------------------------------
create table if not exists public.brands (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null default '',
  logo        text not null default ''
);
alter table public.brands add column if not exists sort_order int not null default 0;
alter table public.brands add column if not exists name text not null default '';
alter table public.brands add column if not exists logo text not null default '';


-- ---------------------------------------------------------------------------
-- page_views (first-party analytics)
-- ---------------------------------------------------------------------------
create table if not exists public.page_views (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  session_id        text not null,
  path              text not null,
  referrer          text,
  duration_seconds  int not null default 0
);
alter table public.page_views add column if not exists duration_seconds int not null default 0;

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_session_idx on public.page_views (session_id);


-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  sort_order    int not null default 0,
  title         text not null default '',
  slug          text not null,
  excerpt       text not null default '',
  content       text not null default '',
  cover_image   text not null default '',
  published     boolean not null default true
);
alter table public.blog_posts add column if not exists sort_order int not null default 0;
alter table public.blog_posts add column if not exists title text not null default '';
alter table public.blog_posts add column if not exists excerpt text not null default '';
alter table public.blog_posts add column if not exists content text not null default '';
alter table public.blog_posts add column if not exists cover_image text not null default '';
alter table public.blog_posts add column if not exists published boolean not null default true;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'blog_posts_slug_key'
  ) then
    alter table public.blog_posts add constraint blog_posts_slug_key unique (slug);
  end if;
end $$;

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);


-- ---------------------------------------------------------------------------
-- Defensive cleanup: some of these tables already existed in the live
-- database with extra legacy columns from earlier experiments (e.g. an old
-- `products` table with a NOT NULL `slug` column and no default). Those
-- extra NOT NULL columns break the seed inserts below with errors like
-- "null value in column ... violates not-null constraint". This loop finds
-- any such column on our managed tables and relaxes it to nullable, since we
-- don't know what legacy column it is or what value it should have.
-- ---------------------------------------------------------------------------
do $$
declare
  r record;
begin
  for r in
    select c.table_name, c.column_name
    from information_schema.columns c
    where c.table_schema = 'public'
      and c.table_name in (
        'hero_slides', 'services', 'products', 'team_members', 'testimonials',
        'process_steps', 'company_info', 'brands', 'page_views', 'blog_posts'
      )
      and c.is_nullable = 'no'
      and c.column_default is null
      and c.column_name not in (
        'id', 'sort_order', 'name', 'ini', 'body', 'tags', 'img', 'wide',
        'title', 'image', 'subtitle', 'icon', 'color', 'features',
        'role', 'skills', 'at', 'tag', 'time', 'quote',
        'legal_name', 'tagline', 'founded', 'address', 'phone', 'phone_href',
        'email', 'hours', 'whatsapp', 'logo', 'session_id', 'path',
        'slug', 'excerpt', 'content', 'cover_image', 'published'
      )
  loop
    execute format('alter table public.%I alter column %I drop not null', r.table_name, r.column_name);
  end loop;

  -- slug is NOT NULL with no default on a pre-existing products table; our
  -- products table (portfolio items) has no concept of a slug, so relax it.
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'products' and column_name = 'slug'
  ) then
    execute 'alter table public.products alter column slug drop not null';
  end if;
end $$;


-- ---------------------------------------------------------------------------
-- Row Level Security — this is a small single-admin internal tool with a
-- simple shared password gate in the browser (no real user auth backend), so
-- RLS here intentionally allows the `anon` role full read/write access on
-- all content tables. There is nothing sensitive in them (public marketing
-- content); project_inquiries is handled separately above.
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'hero_slides', 'services', 'products', 'team_members', 'testimonials',
    'process_steps', 'company_info', 'brands', 'page_views', 'blog_posts'
  ]
  loop
    execute format('alter table public.%1$s enable row level security', t);
    execute format('drop policy if exists "anon can manage %1$s" on public.%1$s', t);
    execute format(
      'create policy "anon can manage %1$s" on public.%1$s for all to anon using (true) with check (true)',
      t
    );
  end loop;
end $$;


-- ---------------------------------------------------------------------------
-- Storage: public "media" bucket the admin panel can upload into directly
-- from the browser.
-- ---------------------------------------------------------------------------
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


-- ============================================================================
-- Seed data — mirrors the built-in starter content in src/data/site.ts.
-- Each block only inserts if the table is currently empty, so this is safe
-- to run alongside the "Import" buttons in the admin panel without creating
-- duplicates.
-- ============================================================================

insert into public.services (sort_order, title, body, icon, color, image, features)
select * from (values
  (0, 'Website Design & Development', 'Fast, secure & responsive websites that convert visitors into customers.', 'web', 'violet', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80', array['Business Websites','E-commerce Stores','Landing Pages','Custom Web Apps','Website Maintenance']),
  (1, 'School Management Portal', 'Cloud-based system for admissions, grades, fees & parent communication.', 'school', 'pink', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80', array['Admission Management','Fee & Billing System','Result & Grading','Parent-Teacher Portal','Attendance Tracking']),
  (2, 'Shop Customized Software', 'Billing, inventory, POS & loyalty programs designed for retail growth.', 'shop', 'orange', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80', array['POS Billing System','Inventory Management','Loyalty Programs','Multi-Branch Support','Sales Reports']),
  (3, 'Digital Menu & Restaurant Solutions', 'Online ordering, digital menus & table management for restaurants.', 'menu', 'blue', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80', array['QR Digital Menus','Online Ordering','Table Reservation','Order Management','Customer Feedback']),
  (4, 'IT Training & Internship Program', 'Web, mobile & software engineering — hands-on training for job-ready professionals.', 'training', 'teal', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80', array['Web Development Training','Mobile App Training','Hands-on Projects','Internship Placement','Career Mentorship'])
) as v(sort_order, title, body, icon, color, image, features)
where not exists (select 1 from public.services);

insert into public.products (sort_order, name, ini, body, tags, img, wide)
select * from (values
  (0, 'Kantipur Studio', 'KS', 'A modern, responsive studio website designed for a strong online presence.', array['Website'], 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', false),
  (1, 'RBS Academy Mobile App', 'RBS', 'A convenient learning app for students, available on Google Play.', array['Mobile App','Android'], 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', false),
  (2, 'Battery Mandu', 'BM', 'A responsive battery products and services website built for customers in Nepal.', array['Website','Responsive Design'], 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80', false),
  (3, 'Digital Kantipur', 'DK', 'A modern digital platform with a fast, accessible and mobile-friendly experience.', array['Website','Web Development'], 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80', false),
  (4, 'Dukan Ko Hero', 'DH', 'Business management platform for local shops with billing & inventory.', array['Inventory Management Software'], 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', false),
  (5, 'Annex Consultancy', 'AC', 'Educational consultancy system for admissions, leads & documentation.', array['Website','SEO','Page Optimization'], 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', false),
  (6, 'Gyan Verse', 'GV', 'Immersive 360° 3D video production for education and brand storytelling — filmed, stitched and delivered for web and headset playback.', array['360 3D Video'], 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80', true)
) as v(sort_order, name, ini, body, tags, img, wide)
where not exists (select 1 from public.products);

insert into public.team_members (sort_order, name, ini, role, skills, img)
select * from (values
  (0, 'Sachin Kushwaha', 'SK', 'ceo & founder', 'Strategic visionary | Enterprise Solutions | Business Growth', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
  (1, 'Anurag Thakur', 'AT', 'senior developer', 'Full-Stack Expert | Cloud Architecture | Scalable Systems', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'),
  (2, 'Harshit Chaudhary', 'HC', 'lead developer', 'Modern Frameworks | Responsive Design | Problem Solver', 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80'),
  (3, 'Kashish Shrestha', 'KS', 'devops engineer', 'Cloud Infrastructure | CI/CD Automation | Reliable Deployments', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
  (4, 'Garima Chaudhary', 'GC', 'digital marketer', 'Digital Marketing | Content Strategy | Campaign Expert', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'),
  (5, 'Arbindra Kharel', 'AK', 'content generation', 'DevOps | Brand Storytelling | AWS Engineer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80')
) as v(sort_order, name, ini, role, skills, img)
where not exists (select 1 from public.team_members);

insert into public.testimonials (sort_order, name, ini, at, tag, time, quote, img)
select * from (values
  (0, 'Xantoz Vandaree', 'XV', 'Digital Kantipur', 'WEBSITE, KATHMANDU', '3 weeks ago', 'Pranam Software created a fast, modern and professional website for Digital Kantipur. The team understood our requirements clearly, communicated well and delivered a polished website that works smoothly across devices.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'),
  (1, 'Aakriti Kharel', 'AK', 'Founder, Kantipur Studio', 'STUDIO WEBSITE, KATHMANDU', '1 month ago', 'The Pranam Software team brought the Kantipur Studio website to life with a clean, elegant design and an excellent user experience. They were responsive throughout the project and delivered exactly what our brand needed.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'),
  (2, 'Ramesh Adhikari', 'RA', 'Photo Studio Owner', 'BUSINESS SOFTWARE, POKHARA', '2 weeks ago', 'Pranam Software transformed our studio operations. Their system is intuitive, reliable, and has improved our workflow significantly.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'),
  (3, 'Ranjan Kushwaha', 'RK', 'Founder, Battery Mandu', 'E-COMMERCE, KATHMANDU', '2 months ago', 'Pranam Software developed a professional and easy-to-use website for Battery Mandu. The website is fast, works smoothly on mobile devices and presents our products clearly to customers. We are very satisfied with the result.', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80')
) as v(sort_order, name, ini, at, tag, time, quote, img)
where not exists (select 1 from public.testimonials);

insert into public.process_steps (sort_order, title, body)
select * from (values
  (0, 'Discovery & Planning', 'We understand your business goals and technical requirements to create a customized solution roadmap.'),
  (1, 'Design & Prototyping', 'Our designers craft intuitive user interfaces and interactive prototypes for your review and feedback.'),
  (2, 'Development', 'Our expert developers build your product using best practices and modern technologies.'),
  (3, 'Testing & Deployment', 'Rigorous testing ensures quality and performance before deploying to production environment.')
) as v(sort_order, title, body)
where not exists (select 1 from public.process_steps);

insert into public.company_info (name, legal_name, tagline, founded, address, phone, phone_href, email, hours, whatsapp)
select 'PranamSoftware', 'Pranam Software', 'Software Company', 2024, 'Maitidevi, Near Sunway College, Kathmandu', '+977-9823415625', 'tel:+9779823415625', 'contact.pranamsoftware@gmail.com', 'Sun – Sat: 9 AM – 7 PM', 'https://wa.me/9779823415625'
where not exists (select 1 from public.company_info);

insert into public.hero_slides (sort_order, image, title, subtitle)
select 0, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80', 'Websites & Apps That Grow Your Business', 'Pranam Software builds fast, SEO-friendly websites, mobile apps and custom software that help businesses grow.'
where not exists (select 1 from public.hero_slides);

insert into public.brands (sort_order, name, logo)
select * from (values
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
) as v(sort_order, name, logo)
where not exists (select 1 from public.brands);

-- Tell PostgREST to reload its schema cache immediately (it also does this
-- automatically within a few seconds, but this makes the fix instant).
notify pgrst, 'reload schema';

-- ---------------------------------------------------------------------------
-- Update team member photos to the real provided photos (run again any time
-- these change — safe to re-run, matches by name).
-- ---------------------------------------------------------------------------
update public.team_members set img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuWNCQYejuWjdWzJNQf6yhj2k3GcN1n1sXl-Lp5TuU6XcFY-v5zzUqr-EQMQHo3bT7B4jHr9NwKAuR19DlJvJqXRAsLdCBMKBJtjE2fY_ChAXQJpNk7pEgOIprF7Bf2cLXUnFyB9lM0r37hNtOPXONDhALX0UBf_wbffjPnihMGnYatZsoqyCLYowog2c/s1600/sachin.png' where name = 'Sachin Kushwaha';
update public.team_members set img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5tyzIzZU83GDRVCKOtlE4GnApSC6r9my4eH7v8vvc5E-oLX0CveT-TZjSGZQhtHC52kty1LLVV77DJSmMKXhUPbjsq3RdqV0aOWffpgdE0exj_F2CBxLXH_29SSdLl0aJfPHuQlZKEBPRu7NPZ1jf98DRU8shusI-PY24UDSPQ0_vrU-vyRj6YM5-9VI/s1600/anurag.jpeg' where name = 'Anurag Thakur';
update public.team_members set img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQOp9geRo50M64pv3W99UEmWHff1oYChX07_ic2p_4qfkuuDmdBKldnS6OQlknKP5WXeJhAQYlzi-mTdan31iJ9RPGG26zTov0gkieB_onJ8SninB6iLTOwqh1V1bR0GXebKgRJv63cIb8wOShyphenhyphen3-BjZ9meUf3eilx8iduosSWXWJxdAGb6Ejp1Jx2cOc/s1600/WhatsApp%20Image%202026-09-03%20at%201.33.28%20PM.jpeg' where name = 'Harshit Chaudhary';
update public.team_members set img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4i99RueNnrxSjnb5l2eBR_N_PWItABYcJdCWNE1gfYmQsXrGXrZXISGSic0aGrA2Rk31HSFwZLK3xRgy6l1xvj8eUL9DR-dU8_VYgro6u5FQEY0Fte5FRFRCXkwB_lA3CLizNVpwvAYH8KztxhqvQNemvJI6dR45l_7M5gHNryh5Etbn4IDZ9q_pCCE8/s600/cf30a90f-1270-48e7-8c8d-c769fd1eb876%20%281%29.jpg' where name = 'Kashish Shrestha';
update public.team_members set img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhx1QqndiFeqEhSYumldpnPhKLULEFXGCZOhUvlzUx4ymrc5C_UBhmE4WdtJIRS2sZjDWEKTmRkVIiita9wtxoDUJ-ORC5h3l_NwR3HZYvCXyzTP2pT4to-7zi_FXjBQvjSIjtQb9G2J0TQXTn3T3coJpeaBEZZJNiJTKzunUyyZdJn7iuwp9LaE4sycQ/s1600/IMG-20260105-WA0006gdhdhdd-removebg-preview.png' where name = 'Garima Chaudhary';
update public.team_members set img = 'https://www.arbindrakharel.com.np/images/profile-1.jpeg' where name = 'Arbindra Kharel';
