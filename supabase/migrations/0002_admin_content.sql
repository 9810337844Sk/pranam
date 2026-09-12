-- Content tables so the admin panel can edit everything that used to be
-- hardcoded in src/data/site.ts, plus a hero slider that didn't exist before.
--
-- This is a small single-admin internal tool with a simple shared password
-- gate in the browser (no real user auth backend), so RLS here intentionally
-- allows the `anon` role full read/write access on these content tables —
-- there is nothing sensitive in them (they're public marketing content).

create table if not exists public.hero_slides (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  image       text not null,
  title       text not null,
  subtitle    text not null default ''
);

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  title       text not null,
  body        text not null,
  icon        text not null default 'web',
  color       text not null default 'violet',
  image       text not null default '',
  features    text[] not null default '{}'
);

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null,
  ini         text not null default '',
  body        text not null,
  tags        text[] not null default '{}',
  img         text not null default '',
  wide        boolean not null default false
);

create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null,
  ini         text not null default '',
  role        text not null default '',
  skills      text not null default '',
  img         text not null default ''
);

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  name        text not null,
  ini         text not null default '',
  at          text not null default '',
  tag         text not null default '',
  time        text not null default '',
  quote       text not null,
  img         text not null default ''
);

create table if not exists public.process_steps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sort_order  int not null default 0,
  title       text not null,
  body        text not null
);

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

alter table public.hero_slides enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.process_steps enable row level security;
alter table public.company_info enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['hero_slides','services','products','team_members','testimonials','process_steps','company_info']
  loop
    execute format('drop policy if exists "anon can manage %1$s" on public.%1$s', t);
    execute format(
      'create policy "anon can manage %1$s" on public.%1$s for all to anon using (true) with check (true)',
      t
    );
  end loop;
end $$;

-- project_inquiries: originally only `authenticated` could select and nobody
-- could update. The admin panel runs as `anon` (simple password gate, no
-- real auth), so extend access for the admin's own inbox.
drop policy if exists "anon can manage inquiries" on public.project_inquiries;
create policy "anon can manage inquiries"
  on public.project_inquiries for select
  to anon
  using (true);

drop policy if exists "anon can update inquiries" on public.project_inquiries;
create policy "anon can update inquiries"
  on public.project_inquiries for update
  to anon
  using (true)
  with check (true);

-- ---- seed data (mirrors the current static src/data/site.ts content) ----

insert into public.services (sort_order, title, body, icon, color, image, features) values
  (0, 'Website Design & Development', 'Fast, secure & responsive websites that convert visitors into customers.', 'web', 'violet', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80', array['Business Websites','E-commerce Stores','Landing Pages','Custom Web Apps','Website Maintenance']),
  (1, 'School Management Portal', 'Cloud-based system for admissions, grades, fees & parent communication.', 'school', 'pink', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80', array['Admission Management','Fee & Billing System','Result & Grading','Parent-Teacher Portal','Attendance Tracking']),
  (2, 'Shop Customized Software', 'Billing, inventory, POS & loyalty programs designed for retail growth.', 'shop', 'orange', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80', array['POS Billing System','Inventory Management','Loyalty Programs','Multi-Branch Support','Sales Reports']),
  (3, 'Digital Menu & Restaurant Solutions', 'Online ordering, digital menus & table management for restaurants.', 'menu', 'blue', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80', array['QR Digital Menus','Online Ordering','Table Reservation','Order Management','Customer Feedback']),
  (4, 'IT Training & Internship Program', 'Web, mobile & software engineering — hands-on training for job-ready professionals.', 'training', 'teal', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80', array['Web Development Training','Mobile App Training','Hands-on Projects','Internship Placement','Career Mentorship'])
on conflict do nothing;

insert into public.products (sort_order, name, ini, body, tags, img, wide) values
  (0, 'Kantipur Studio', 'KS', 'A modern, responsive studio website designed for a strong online presence.', array['Website'], 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', false),
  (1, 'RBS Academy Mobile App', 'RBS', 'A convenient learning app for students, available on Google Play.', array['Mobile App','Android'], 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', false),
  (2, 'Battery Mandu', 'BM', 'A responsive battery products and services website built for customers in Nepal.', array['Website','Responsive Design'], 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80', false),
  (3, 'Digital Kantipur', 'DK', 'A modern digital platform with a fast, accessible and mobile-friendly experience.', array['Website','Web Development'], 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80', false),
  (4, 'Dukan Ko Hero', 'DH', 'Business management platform for local shops with billing & inventory.', array['Inventory Management Software'], 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', false),
  (5, 'Annex Consultancy', 'AC', 'Educational consultancy system for admissions, leads & documentation.', array['Website','SEO','Page Optimization'], 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', false),
  (6, 'Gyan Verse', 'GV', 'Immersive 360° 3D video production for education and brand storytelling — filmed, stitched and delivered for web and headset playback.', array['360 3D Video'], 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80', true)
on conflict do nothing;

insert into public.team_members (sort_order, name, ini, role, skills, img) values
  (0, 'Sachin Kushwaha', 'SK', 'ceo & founder', 'Strategic visionary | Enterprise Solutions | Business Growth', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
  (1, 'Anurag Thakur', 'AT', 'senior developer', 'Full-Stack Expert | Cloud Architecture | Scalable Systems', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'),
  (2, 'Harshit Chaudhary', 'HC', 'lead developer', 'Modern Frameworks | Responsive Design | Problem Solver', 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80'),
  (3, 'Kashish Shrestha', 'KS', 'devops engineer', 'Cloud Infrastructure | CI/CD Automation | Reliable Deployments', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
  (4, 'Garima Chaudhary', 'GC', 'digital marketer', 'Digital Marketing | Content Strategy | Campaign Expert', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'),
  (5, 'Arbindra Kharel', 'AK', 'content generation', 'DevOps | Brand Storytelling | AWS Engineer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80')
on conflict do nothing;

insert into public.testimonials (sort_order, name, ini, at, tag, time, quote, img) values
  (0, 'Xantoz Vandaree', 'XV', 'Digital Kantipur', 'WEBSITE, KATHMANDU', '3 weeks ago', 'Pranam Software created a fast, modern and professional website for Digital Kantipur. The team understood our requirements clearly, communicated well and delivered a polished website that works smoothly across devices.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'),
  (1, 'Aakriti Kharel', 'AK', 'Founder, Kantipur Studio', 'STUDIO WEBSITE, KATHMANDU', '1 month ago', 'The Pranam Software team brought the Kantipur Studio website to life with a clean, elegant design and an excellent user experience. They were responsive throughout the project and delivered exactly what our brand needed.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'),
  (2, 'Ramesh Adhikari', 'RA', 'Photo Studio Owner', 'BUSINESS SOFTWARE, POKHARA', '2 weeks ago', 'Pranam Software transformed our studio operations. Their system is intuitive, reliable, and has improved our workflow significantly.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'),
  (3, 'Ranjan Kushwaha', 'RK', 'Founder, Battery Mandu', 'E-COMMERCE, KATHMANDU', '2 months ago', 'Pranam Software developed a professional and easy-to-use website for Battery Mandu. The website is fast, works smoothly on mobile devices and presents our products clearly to customers. We are very satisfied with the result.', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80')
on conflict do nothing;

insert into public.process_steps (sort_order, title, body) values
  (0, 'Discovery & Planning', 'We understand your business goals and technical requirements to create a customized solution roadmap.'),
  (1, 'Design & Prototyping', 'Our designers craft intuitive user interfaces and interactive prototypes for your review and feedback.'),
  (2, 'Development', 'Our expert developers build your product using best practices and modern technologies.'),
  (3, 'Testing & Deployment', 'Rigorous testing ensures quality and performance before deploying to production environment.')
on conflict do nothing;

insert into public.company_info (name, legal_name, tagline, founded, address, phone, phone_href, email, hours, whatsapp)
select 'PranamSoftware', 'Pranam Software', 'Software Company', 2024, 'Maitidevi, Near Sunway College, Kathmandu', '+977-9823415625', 'tel:+9779823415625', 'contact.pranamsoftware@gmail.com', 'Sun – Sat: 9 AM – 7 PM', 'https://wa.me/9779823415625'
where not exists (select 1 from public.company_info);

insert into public.hero_slides (sort_order, image, title, subtitle) values
  (0, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80', 'Websites & Apps That Grow Your Business', 'Pranam Software builds fast, SEO-friendly websites, mobile apps and custom software that help businesses grow.')
on conflict do nothing;
