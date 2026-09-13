-- ============================================================================
-- INSERT DUMMY PROJECTS/PRODUCTS
-- Run this in Supabase SQL Editor after running setup-database-final.sql
-- ============================================================================

-- ============================================================================
-- PROJECT 1: E-Commerce Platform
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
  client_logo,
  project_url,
  github_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'E-Commerce Platform',
  'ecommerce-platform',
  'Full-featured online store with payment integration, inventory management, and admin dashboard.',
  'A complete e-commerce solution built for a growing fashion retail brand. The platform features a responsive design, secure payment processing, real-time inventory management, and a comprehensive admin panel for managing products, orders, and customer communications.',
  'https://images.unsplash.com/photo-1522869635100-1f32c5e31015?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522869635100-1f32c5e31015?w=300&h=225&fit=crop',
  'E-commerce',
  'FashionHub Nepal',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=100',
  'https://fashionhubnp.example.com',
  'https://github.com/pranam-software/ecommerce-platform',
  ARRAY['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Tracking', 'Admin Dashboard', 'Inventory Management', 'Customer Reviews', 'Mobile Responsive'],
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
  true,
  true,
  1
);

-- ============================================================================
-- PROJECT 2: Hotel Management System
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
  client_logo,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Hotel Management System',
  'hotel-management-system',
  'Comprehensive booking system with room management, reservation tracking, and guest communication.',
  'A complete hotel management solution for a 50-room boutique hotel in Kathmandu. Features include online booking system, room inventory management, staff management, billing system, and guest communication portal.',
  'https://images.unsplash.com/photo-1631049307038-da5ec5d79645?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1631049307038-da5ec5d79645?w=300&h=225&fit=crop',
  'Software',
  'Mountain View Hotel',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=100',
  'https://mountainviewhotel.example.com',
  null,
  ARRAY['Online Booking', 'Room Management', 'Reservation Tracking', 'Billing System', 'Staff Portal', 'Guest Communication', 'Revenue Reports', 'Multi-language Support'],
  ARRAY['React', 'Django', 'PostgreSQL', 'Docker', 'Material-UI'],
  true,
  true,
  2
);

-- ============================================================================
-- PROJECT 3: Mobile App - Travel Guide
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
  client_logo,
  project_url,
  github_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Travel Guide Mobile App',
  'travel-guide-mobile-app',
  'Cross-platform mobile app for discovering travel destinations, local attractions, and booking travel services.',
  'A comprehensive travel guide application available on iOS and Android. Users can explore destinations, read travel blogs, view local attractions with maps, book tours and hotels, and share their travel experiences with the community.',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=225&fit=crop',
  'Mobile App',
  'Nepal Tourism Board',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=100',
  'https://apps.apple.com/travel-guide',
  'https://github.com/pranam-software/travel-guide-app',
  ARRAY['Destination Discovery', 'Attraction Maps', 'Tour Booking', 'Hotel Integration', 'Travel Blogs', 'User Reviews', 'Itinerary Planning', 'Offline Maps'],
  ARRAY['React Native', 'Firebase', 'Google Maps API', 'Stripe', 'Redux'],
  true,
  false,
  3
);

-- ============================================================================
-- PROJECT 4: Corporate Website
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
  client_logo,
  project_url,
  features,
  technologies_used,
  active,
  featured,
  sort_order
) VALUES (
  'Modern Corporate Website',
  'modern-corporate-website',
  'Responsive corporate website with CMS integration, blog platform, and lead generation features.',
  'A modern, SEO-optimized corporate website for a leading IT services company. The site features a dynamic CMS for easy content management, integrated blog platform, contact forms, testimonials section, and comprehensive analytics tracking.',
  'https://images.unsplash.com/photo-1460925895917-adb003b6832d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-adb003b6832d?w=300&h=225&fit=crop',
  'Website',
  'TechCorp International',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=100',
  'https://techcorp-example.com',
  null,
  ARRAY['CMS Integration', 'Blog Platform', 'Lead Forms', 'Team Directory', 'Service Showcase', 'Case Studies', 'SEO Optimized', 'Analytics'],
  ARRAY['Next.js', 'Strapi', 'PostgreSQL', 'Vercel', 'TailwindCSS'],
  true,
  false,
  4
);

-- ============================================================================
-- PROJECT 5: Educational Dashboard
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
  client_logo,
  project_url,
  features,
  technologies_used,
  active,
  false,
  sort_order
) VALUES (
  'Educational Learning Dashboard',
  'educational-learning-dashboard',
  'Interactive learning platform with course management, progress tracking, and student assessments.',
  'A comprehensive e-learning platform designed for an online education institute. Features include course creation and management, interactive lessons, quizzes and assessments, progress tracking, discussion forums, and certification system.',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=300&h=225&fit=crop',
  'Software',
  'OnlineAcademy Nepal',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=100',
  'https://onlineacademy-example.com',
  'https://github.com/pranam-software/learning-dashboard',
  ARRAY['Course Management', 'Interactive Lessons', 'Quizzes & Assessments', 'Progress Tracking', 'Discussion Forums', 'Certification System', 'Student Analytics', 'Video Integration'],
  ARRAY['Vue.js', 'FastAPI', 'MySQL', 'Redis', 'AWS'],
  true,
  false,
  5
);

-- ============================================================================
-- PROJECT 6: Social Network MVP
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
  client_logo,
  features,
  technologies_used,
  active,
  sort_order
) VALUES (
  'Social Network MVP',
  'social-network-mvp',
  'Minimum viable product for a social networking platform with user profiles, posts, and real-time messaging.',
  'A minimum viable product for a new social networking platform targeting professionals in Nepal. Features include user profiles, post creation and sharing, real-time messaging, follow/unfollow functionality, notification system, and privacy controls.',
  'https://images.unsplash.com/photo-1611261437281-a3b26d46ba52?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1611261437281-a3b26d46ba52?w=300&h=225&fit=crop',
  'Software',
  'Professional Connect',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=100',
  null,
  'https://github.com/pranam-software/social-network-mvp',
  ARRAY['User Profiles', 'Post Creation', 'Real-time Messaging', 'Follow System', 'Notifications', 'Privacy Controls', 'User Search', 'Activity Feed'],
  ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT Auth'],
  true,
  false,
  6
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT '✅ Projects inserted successfully!' as status;
SELECT COUNT(*) as total_projects FROM public.products WHERE active = true;
SELECT name, category, client_name FROM public.products ORDER BY sort_order;
