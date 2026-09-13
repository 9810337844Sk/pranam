-- ============================================================================
-- INSERT PRANAM SOFTWARE ACTUAL PRODUCTS/PORTFOLIO
-- Run this in Supabase SQL Editor after running setup-database-final.sql
-- ============================================================================

-- Clear existing products (optional - comment out if you want to keep them)
-- TRUNCATE TABLE public.products;

-- ============================================================================
-- PRODUCT 1: Kantipur Studio
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Kantipur Studio',
  'kantipur-studio',
  'A modern, responsive studio website designed for a strong online presence.',
  'Professional website for Kantipur Studio with modern design, responsive layout, and strong online presence. Showcases portfolio and services with optimized performance.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9W_qUlKlhVHCmlWCN0vUbCTGr-mjP3sD1Mq5_iNHtB9K6jg6my4FJzjkOaawj2QnTDMBuikq5euxmgbUw4bsD44JyQSh3VAJdJbUdVVXl1DJRve_eyPnzMYkhEKzOB8SuZEmTBJANcupCkskFtQovWQ6BvVd_BmBV6chn4gVft-Uwrcj9KvXv8dmaEE8/s1774/kantipur%20studio.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9W_qUlKlhVHCmlWCN0vUbCTGr-mjP3sD1Mq5_iNHtB9K6jg6my4FJzjkOaawj2QnTDMBuikq5euxmgbUw4bsD44JyQSh3VAJdJbUdVVXl1DJRve_eyPnzMYkhEKzOB8SuZEmTBJANcupCkskFtQovWQ6BvVd_BmBV6chn4gVft-Uwrcj9KvXv8dmaEE8/s1774/kantipur%20studio.png',
  'Website',
  'Kantipur Studio',
  'https://kantipurstudio.com.np/',
  ARRAY['Responsive Design', 'Modern UI', 'Fast Performance', 'SEO Optimized'],
  ARRAY['React', 'Next.js', 'Tailwind CSS'],
  true,
  true,
  1
);

-- ============================================================================
-- PRODUCT 2: RBS Academy Mobile App
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'RBS Academy Mobile App',
  'rbs-academy-mobile-app',
  'A convenient learning app for students, available on Google Play.',
  'Mobile learning application for RBS Academy. Students can access courses, track progress, and submit assignments through this convenient Android app available on Google Play Store.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxug__Pd3u4HmuHEBo-T30nxY1ASMNO7tsdYGnLI3A9Md0FEb3Yer0jluKdP1KXDajYXVOMYr5ikzpJ4bnwS14pgFgOaP2DmuWg5sxn-arlrjE-UuFR8HmKsve5N5NkLdiP_jXr8I5yzZRTZEPwmwFUUv41zx2mayqmUlXKlpDSovRZQDw8M9BMrX2m-g/s1600/4be1b7ce-7315-424a-a156-80dd757f131d.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxug__Pd3u4HmuHEBo-T30nxY1ASMNO7tsdYGnLI3A9Md0FEb3Yer0jluKdP1KXDajYXVOMYr5ikzpJ4bnwS14pgFgOaP2DmuWg5sxn-arlrjE-UuFR8HmKsve5N5NkLdiP_jXr8I5yzZRTZEPwmwFUUv41zx2mayqmUlXKlpDSovRZQDw8M9BMrX2m-g/s1600/4be1b7ce-7315-424a-a156-80dd757f131d.png',
  'Mobile App',
  'RBS Academy',
  'https://play.google.com/store/apps/details?id=com.rbsacademy.app&hl=en',
  ARRAY['Course Management', 'Progress Tracking', 'Assignment Submission', 'User Authentication'],
  ARRAY['React Native', 'Firebase', 'Google Play Services'],
  true,
  true,
  2
);

-- ============================================================================
-- PRODUCT 3: Battery Mandu
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Battery Mandu',
  'battery-mandu',
  'A responsive battery products and services website built for customers in Nepal.',
  'E-commerce website for Battery Mandu selling batteries and battery-related services. Fully responsive design, product catalog, shopping cart, and online ordering system.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiWepMonC4acB4aL_bqxuOO8EOVykPES-oYjNlq0WkD8EqdR2q-3qySgoqxS1vjqD8Y4GLXbQkllShxcbM_MHErgUAWmAS04b79eNxp9yxWuvUsFv0tx-ZisI0CvU0KM-6Iy1RSa1Ro_Vwm9GhmMvXu5-tznAZZbO1FezR2eg9jcFl0lydAOFOjEzqUDdw/s1600/batterymandu.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiWepMonC4acB4aL_bqxuOO8EOVykPES-oYjNlq0WkD8EqdR2q-3qySgoqxS1vjqD8Y4GLXbQkllShxcbM_MHErgUAWmAS04b79eNxp9yxWuvUsFv0tx-ZisI0CvU0KM-6Iy1RSa1Ro_Vwm9GhmMvXu5-tznAZZbO1FezR2eg9jcFl0lydAOFOjEzqUDdw/s1600/batterymandu.png',
  'Website',
  'Battery Mandu',
  'https://batterymandu.com/',
  ARRAY['Product Catalog', 'Shopping Cart', 'Responsive Design', 'Online Ordering'],
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'],
  true,
  true,
  3
);

-- ============================================================================
-- PRODUCT 4: Digital Kantipur
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Digital Kantipur',
  'digital-kantipur',
  'A modern digital platform with a fast, accessible and mobile-friendly experience.',
  'Modern digital platform providing fast, accessible and mobile-friendly experience. Optimized for search engines and user experience with responsive design.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUPI740j8aVvfrg06rEKqa12knDdoBUgSAQ6zzuwPwCBpuJnCqVANWlKVGDSgHVMJnra4Xdk9cWKY1xxT1uDbdYpWAu3VJK4wSEkPXT-_jIbYH3YM38fXNz1V5Ww11gpA8ke676k81MLRQ7TLfTM9X9FfjTZauoiOEr76Em1HgrqmUETFWzK8AVV702vU/s1600/digital%20kantipur.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUPI740j8aVvfrg06rEKqa12knDdoBUgSAQ6zzuwPwCBpuJnCqVANWlKVGDSgHVMJnra4Xdk9cWKY1xxT1uDbdYpWAu3VJK4wSEkPXT-_jIbYH3YM38fXNz1V5Ww11gpA8ke676k81MLRQ7TLfTM9X9FfjTZauoiOEr76Em1HgrqmUETFWzK8AVV702vU/s1600/digital%20kantipur.png',
  'Website',
  'Digital Kantipur',
  'https://digitalkantipur.com/',
  ARRAY['Fast Performance', 'SEO Optimized', 'Mobile Friendly', 'Accessible'],
  ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  true,
  false,
  4
);

-- ============================================================================
-- PRODUCT 5: Dukan Ko Hero
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Dukan Ko Hero',
  'dukan-ko-hero',
  'Business management platform for local shops with billing & inventory.',
  'Complete business management platform designed for small and local shops. Features include point-of-sale billing system, inventory management, sales tracking, and customer database.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0gaoBp7rv-9CbxFpGVSVap0GlyvoD0QgFUMsOSXKm2P10UaDcQSZyFfyH9-ddacWt2GtE_j3Kk2r36NDJgaYZLZzXuXadxX2BBOn_Kn5JQNxO7uLMVID_Z3iPYX62MMPANVzdRrAlGr0PWv4oTkpqY9wJdvlEWUADDQpSkoMHLxD7KB8Unlmrn8r-Yw/s1600/ciro%20bussiness.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0gaoBp7rv-9CbxFpGVSVap0GlyvoD0QgFUMsOSXKm2P10UaDcQSZyFfyH9-ddacWt2GtE_j3Kk2r36NDJgaYZLZzXuXadxX2BBOn_Kn5JQNxO7uLMVID_Z3iPYX62MMPANVzdRrAlGr0PWv4oTkpqY9wJdvlEWUADDQpSkoMHLxD7KB8Unlmrn8r-Yw/s1600/ciro%20bussiness.png',
  'Software',
  'Dukan Ko Hero',
  null,
  ARRAY['POS Billing', 'Inventory Management', 'Sales Tracking', 'Customer Database'],
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Redux'],
  true,
  false,
  5
);

-- ============================================================================
-- PRODUCT 6: Annex Consultancy
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Annex Consultancy',
  'annex-consultancy',
  'Educational consultancy system for admissions, leads & documentation.',
  'Educational consultancy platform for managing student admissions, leads, and documentation. Features include student inquiry tracking, admission process management, and document management system.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjo_t999BelOQMjXfrys5JFl3Iegrxb3k7PD6pXeQz2slEvNkZaoBdIFTORpR-Pg7VWL8SkQ2SQmp0H7mdIyrztg5COW12KW-gqSs1yQrbPzsd9R0_WQOBeBIlUQqyT0mjhD7SOYd4dprQZQtDiMcM3rz-MCh9A4aolmJary4Wnt-7UE1gO2y-csI50jA/s1600/ChatGPT%20Image%20Jan%203,%202026,%2009_31_02%20PM.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjo_t999BelOQMjXfrys5JFl3Iegrxb3k7PD6pXeQz2slEvNkZaoBdIFTORpR-Pg7VWL8SkQ2SQmp0H7mdIyrztg5COW12KW-gqSs1yQrbPzsd9R0_WQOBeBIlUQqyT0mjhD7SOYd4dprQZQtDiMcM3rz-MCh9A4aolmJary4Wnt-7UE1gO2y-csI50jA/s1600/ChatGPT%20Image%20Jan%203,%202026,%2009_31_02%20PM.png',
  'Website',
  'Annex Consultancy',
  null,
  ARRAY['Admission Management', 'Lead Tracking', 'Document Management', 'SEO Optimized'],
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'],
  true,
  false,
  6
);

-- ============================================================================
-- PRODUCT 7: Gyan Verse (360 3D Video)
-- ============================================================================

INSERT INTO public.products (
  name,
  slug,
  description,
  long_description,
  image_url,
  thumbnail_url,
  category,
  client_name,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Gyan Verse',
  'gyan-verse',
  '360 3D Video platform for immersive learning and virtual experiences.',
  '360 degree 3D video platform providing immersive learning experiences. Features include interactive 360 videos, virtual tours, and educational content with cutting-edge 3D visualization technology.',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4uTgv2ywuxprw6IhaqmLDBGfSKr3U1H8uxq4Hfgoe-F-Q8TDWtTc4JV_6eodIbSl5gb3_mK5eAc4cEyvDWWd0qi6OqSINl-j9B4VMxBai0ZJP-kgqtrLIIs-VVIESlWj35LRiAFCRXgFLGvekyMJOhKXCeYK_zANerRZkYd3Ob2TCbi1n_uVUZ9KOSA/s1600/vr.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4uTgv2ywuxprw6IhaqmLDBGfSKr3U1H8uxq4Hfgoe-F-Q8TDWtTc4JV_6eodIbSl5gb3_mK5eAc4cEyvDWWd0qi6OqSINl-j9B4VMxBai0ZJP-kgqtrLIIs-VVIESlWj35LRiAFCRXgFLGvekyMJOhKXCeYK_zANerRZkYd3Ob2TCbi1n_uVUZ9KOSA/s1600/vr.png',
  '3D Video',
  'Gyan Verse',
  null,
  ARRAY['360 Video', '3D Visualization', 'Interactive Content', 'Virtual Tours'],
  ARRAY['Three.js', 'WebGL', 'React', 'Node.js'],
  true,
  false,
  7
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT '✅ Pranam Software products inserted successfully!' as status;
SELECT COUNT(*) as total_products FROM public.products WHERE active = true;
SELECT name, category, client_name FROM public.products ORDER BY sort_order;
