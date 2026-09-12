-- Complete Pranam Software Database Setup
-- Run this script in your Supabase SQL editor or PostgreSQL database

-- ============================================================================
-- PROJECT INQUIRIES TABLE
-- ============================================================================

-- Drop existing table if you want to recreate (uncomment if needed)
-- DROP TABLE IF EXISTS public.project_inquiries CASCADE;

-- Create project inquiries table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' 
    CHECK (status IN ('new', 'contacted', 'in_progress', 'quoted', 'won', 'lost', 'cancelled')),
  priority TEXT DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  source TEXT DEFAULT 'website'
    CHECK (source IN ('website', 'referral', 'social', 'direct', 'other')),
  notes TEXT,
  follow_up_date DATE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS project_inquiries_created_at_idx 
  ON public.project_inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS project_inquiries_status_idx 
  ON public.project_inquiries (status);

CREATE INDEX IF NOT EXISTS project_inquiries_service_idx 
  ON public.project_inquiries (service);

CREATE INDEX IF NOT EXISTS project_inquiries_priority_idx 
  ON public.project_inquiries (priority);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_project_inquiries_updated_at ON public.project_inquiries;
CREATE TRIGGER update_project_inquiries_updated_at
    BEFORE UPDATE ON public.project_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "staff can read inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "staff can update inquiries" ON public.project_inquiries;
DROP POLICY IF EXISTS "service role can insert inquiries" ON public.project_inquiries;

-- Allow authenticated staff to read all inquiries
CREATE POLICY "staff can read inquiries"
  ON public.project_inquiries FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated staff to update inquiries
CREATE POLICY "staff can update inquiries"
  ON public.project_inquiries FOR UPDATE
  TO authenticated
  USING (true);

-- Allow service role to insert inquiries (for contact form submissions)
CREATE POLICY "service role can insert inquiries"
  ON public.project_inquiries FOR INSERT
  TO service_role
  WITH CHECK (true);

-- ============================================================================
-- HERO SLIDES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  button_text TEXT DEFAULT 'Get Started',
  button_link TEXT DEFAULT '/contact',
  background_color TEXT DEFAULT '#1A73E8',
  text_color TEXT DEFAULT '#FFFFFF',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Create indexes for hero slides
CREATE INDEX IF NOT EXISTS hero_slides_sort_order_idx 
  ON public.hero_slides (sort_order ASC);

CREATE INDEX IF NOT EXISTS hero_slides_active_idx 
  ON public.hero_slides (active);

-- Hero slides updated_at trigger
DROP TRIGGER IF EXISTS update_hero_slides_updated_at ON public.hero_slides;
CREATE TRIGGER update_hero_slides_updated_at
    BEFORE UPDATE ON public.hero_slides
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for hero slides
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active hero slides
CREATE POLICY "anyone can read hero slides"
  ON public.hero_slides FOR SELECT
  USING (active = true);

-- Allow authenticated users to manage hero slides
CREATE POLICY "staff can manage hero slides"
  ON public.hero_slides FOR ALL
  TO authenticated
  USING (true);

-- Insert default hero slide
INSERT INTO public.hero_slides (title, subtitle, description, button_text, button_link, sort_order) VALUES
  ('Websites & Apps', 'That Grow', 'Your Business', 'Get Started', '/contact', 1),
  ('Custom Software Solutions', 'Built for', 'Your Success', 'Learn More', '/services', 2),
  ('Digital Transformation', 'Made', 'Simple', 'Talk to Us', '/contact', 3)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PAGE VIEWS TABLE (Analytics)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  user_id UUID,
  country TEXT,
  city TEXT,
  device_type TEXT DEFAULT 'desktop',
  browser TEXT,
  os TEXT
);

-- Create indexes for page views
CREATE INDEX IF NOT EXISTS page_views_created_at_idx 
  ON public.page_views (created_at DESC);

CREATE INDEX IF NOT EXISTS page_views_page_url_idx 
  ON public.page_views (page_url);

CREATE INDEX IF NOT EXISTS page_views_session_idx 
  ON public.page_views (session_id);

CREATE INDEX IF NOT EXISTS page_views_date_idx 
  ON public.page_views (date_trunc('day', created_at));

-- Enable RLS for page views
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert page views
CREATE POLICY "service role can insert page views"
  ON public.page_views FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to read page views (admin analytics)
CREATE POLICY "staff can read page views"
  ON public.page_views FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- ADDITIONAL TABLES (Optional - for future expansion)
-- ============================================================================

-- Services lookup table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT 'blue',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Insert default services
INSERT INTO public.services (name, slug, description, icon, color, sort_order) VALUES
  ('Website Design & Development', 'website-development', 'Fast, secure & responsive websites that convert visitors into customers.', 'web', 'violet', 1),
  ('E-commerce Solutions', 'ecommerce-solutions', 'Complete online store solutions with payment integration and inventory management.', 'shop', 'pink', 2),
  ('Mobile App Development', 'mobile-app-development', 'Native and cross-platform mobile applications for iOS and Android.', 'mobile', 'orange', 3),
  ('Custom Software Solutions', 'custom-software', 'Tailored software solutions to streamline your business processes.', 'code', 'blue', 4),
  ('Digital Marketing Services', 'digital-marketing', 'SEO, social media marketing, and online advertising campaigns.', 'marketing', 'teal', 5)
ON CONFLICT (slug) DO NOTHING;

-- Enable RLS for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read services
CREATE POLICY "anyone can read services"
  ON public.services FOR SELECT
  USING (active = true);

-- Allow authenticated users to manage services
CREATE POLICY "staff can manage services"
  ON public.services FOR ALL
  TO authenticated
  USING (true);

-- ============================================================================
-- TEAM MEMBERS TABLE (Optional)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Enable RLS for team members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active team members
CREATE POLICY "anyone can read team members"
  ON public.team_members FOR SELECT
  USING (active = true);

-- Allow authenticated users to manage team members
CREATE POLICY "staff can manage team members"
  ON public.team_members FOR ALL
  TO authenticated
  USING (true);

-- ============================================================================
-- TESTIMONIALS TABLE (Optional)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_position TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  project_type TEXT,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Enable RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active testimonials
CREATE POLICY "anyone can read testimonials"
  ON public.testimonials FOR SELECT
  USING (active = true);

-- Allow authenticated users to manage testimonials
CREATE POLICY "staff can manage testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (true);

-- ============================================================================
-- BLOG POSTS TABLE (Optional)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  author_name TEXT DEFAULT 'Pranam Software',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0
);

-- Create blog posts indexes
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON public.blog_posts (published, published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON public.blog_posts USING GIN (tags);

-- Blog posts updated_at trigger
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for blog posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read published blog posts
CREATE POLICY "anyone can read published blog posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

-- Allow authenticated users to manage blog posts
CREATE POLICY "staff can manage blog posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (true);

-- ============================================================================
-- SAMPLE DATA (Optional - Remove if not needed)
-- ============================================================================

-- Insert sample inquiry (remove in production)
INSERT INTO public.project_inquiries (
  full_name, email, phone, company, service, budget, message, status
) VALUES (
  'John Doe', 
  'john@example.com', 
  '+977-9801234567', 
  'ABC Company', 
  'Website Design & Development',
  '50000-100000',
  'We need a modern website for our business with e-commerce functionality.',
  'new'
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify everything is working:

-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('project_inquiries', 'services', 'team_members', 'testimonials', 'blog_posts');

-- Check project_inquiries table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'project_inquiries' 
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'project_inquiries';

-- Check policies
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'project_inquiries';

-- Test insert (should work with service role)
-- INSERT INTO public.project_inquiries (full_name, phone, service, message) 
-- VALUES ('Test User', '+977-9876543210', 'Website Development', 'Test message');

-- ============================================================================
-- COMPLETED SUCCESSFULLY
-- ============================================================================

SELECT 'Database setup completed successfully!' as status;