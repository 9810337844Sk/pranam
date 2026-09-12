create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  sort_order    int not null default 0,
  title         text not null,
  slug          text not null unique,
  excerpt       text not null default '',
  content       text not null default '',
  cover_image   text not null default '',
  published     boolean not null default true
);

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

alter table public.blog_posts enable row level security;

drop policy if exists "anon can manage blog_posts" on public.blog_posts;
create policy "anon can manage blog_posts"
  on public.blog_posts for all
  to anon
  using (true)
  with check (true);
