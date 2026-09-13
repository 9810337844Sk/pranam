-- ============================================================================
-- INSERT DUMMY BLOG POSTS
-- Run this in Supabase SQL Editor after running setup-database-final.sql
-- ============================================================================

-- Clear existing blogs (optional - comment out if you want to keep them)
-- TRUNCATE TABLE public.blog_posts;

-- ============================================================================
-- BLOG POST 1: JavaScript Quote Generator
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image_url, 
  cover_image,
  author_name, 
  published, 
  published_at, 
  meta_title, 
  meta_description, 
  tags, 
  view_count
) VALUES (
  'JavaScript Quote Generator',
  'javascript-quote-generator',
  'Learn how to build a simple, stunning list of the greatest JavaScript quotes. Perfect for beginners and experienced developers.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

In this comprehensive guide, we will explore:

1. **Getting Started** - Understanding the basics of JavaScript and quote generation
2. **Building the HTML Structure** - Creating a clean and semantic markup
3. **Adding CSS Styling** - Making it visually appealing and responsive
4. **JavaScript Logic** - Implementing the quote fetching and display functionality
5. **Advanced Features** - Adding animations, copy-to-clipboard, and social sharing

Whether you are a beginner looking to learn JavaScript basics or an experienced developer wanting to refresh your skills, this tutorial will provide you with practical insights and best practices.

Throughout the tutorial, we will build a fully functional quote generator that:
- Fetches random quotes from an API
- Displays quotes with beautiful animations
- Allows users to copy quotes to clipboard
- Supports sharing to social media
- Works seamlessly on all devices

By the end of this guide, you will have a solid understanding of DOM manipulation, API integration, and modern JavaScript practices.',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
  'Pranam Software',
  true,
  NOW() - INTERVAL '5 days',
  'JavaScript Quote Generator - Tutorial',
  'Learn to build a JavaScript quote generator with API integration and animations',
  ARRAY['javascript', 'tutorial', 'web-development', 'beginner'],
  245
);

-- ============================================================================
-- BLOG POST 2: HTML Minifier Guide
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image_url, 
  cover_image,
  author_name, 
  published, 
  published_at, 
  meta_title, 
  meta_description, 
  tags, 
  view_count
) VALUES (
  'How to Build HTML Minifier',
  'how-to-build-html-minifier',
  'Reduce your HTML file size by learning to build an efficient HTML minifier. Discover best practices for web optimization.',
  'HTML minification is a crucial step in web optimization. By removing unnecessary characters from HTML code without changing its functionality, we can significantly reduce file sizes and improve page load times.

**Why HTML Minification Matters:**
- Reduces bandwidth usage
- Improves page load speed
- Better SEO rankings
- Enhanced user experience
- Reduced server costs

**What Gets Minified:**
- Whitespace and unnecessary line breaks
- HTML comments
- Redundant attributes
- Unused CSS classes

**Tools and Techniques:**

In this tutorial, we will explore several approaches to HTML minification:

1. **Online Tools** - Quick and easy for small projects
2. **Build Tools** - Webpack, Gulp, and Grunt integration
3. **Node.js Scripts** - Automation for large projects
4. **Custom Solutions** - Building your own minifier

**Step-by-Step Implementation:**

We will walk through building a custom HTML minifier using Node.js that can:
- Parse HTML efficiently
- Remove unnecessary whitespace
- Strip comments
- Optimize attributes
- Handle edge cases

**Performance Metrics:**

Average file size reduction: 15-30%
Load time improvement: 10-20%
Best combined with Gzip compression

**Real-world Examples:**

See how major websites use HTML minification:
- Google: 25% reduction
- Facebook: 18% reduction
- GitHub: 22% reduction

Start minifying your HTML today and see the performance benefits!',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=1200',
  'Pranam Software',
  true,
  NOW() - INTERVAL '4 days',
  'HTML Minifier Tutorial - Optimize Your Code',
  'Build an HTML minifier to reduce file sizes and improve web performance',
  ARRAY['html', 'optimization', 'performance', 'web-development'],
  189
);

-- ============================================================================
-- BLOG POST 3: Signature Post Design
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image_url, 
  cover_image,
  author_name, 
  published, 
  published_at, 
  meta_title, 
  meta_description, 
  tags, 
  view_count
) VALUES (
  'How to Build Signature Post',
  'how-to-build-signature-post',
  'Master the art of creating elegant digital signatures. Learn design principles and implementation techniques for professional results.',
  'Digital signatures have become an essential part of modern web applications. Whether for email, documents, or authentication, creating an elegant and functional signature component is crucial.

**The Importance of Signature Posts:**

In today''s digital world, signatures serve multiple purposes:
1. **Professional Communication** - Adds credibility to emails
2. **Legal Documentation** - Provides authentication and proof
3. **User Experience** - Enhances brand identity
4. **Security** - Prevents unauthorized modifications

**Design Principles:**

Creating a professional signature requires attention to:
- **Visual Hierarchy** - Important information stands out
- **Readability** - Clear fonts and appropriate sizing
- **Responsiveness** - Works on all devices
- **Accessibility** - Accessible to all users
- **Brand Consistency** - Aligns with company branding

**Technical Implementation:**

We will explore multiple approaches:

1. **HTML/CSS Based Signatures**
   - Simple to implement
   - Lightweight
   - Cross-platform compatible

2. **Canvas-Based Signatures**
   - Drawing capabilities
   - Real-time validation
   - Mobile-friendly

3. **SVG Signatures**
   - Scalable without quality loss
   - Smooth animations
   - Modern approach

**Step-by-Step Tutorial:**

Follow along as we build a complete signature solution:
- Set up the canvas element
- Implement touch and mouse events
- Add save and clear functionality
- Store signatures securely
- Display signatures across applications

**Real-world Applications:**

- E-signature platforms
- Banking applications
- Healthcare systems
- Legal documentation
- Digital contracts

**Best Practices:**

- Always validate on server-side
- Implement proper security measures
- Test across browsers and devices
- Consider accessibility requirements
- Provide user-friendly interfaces

Start building professional signatures today!',
  'https://images.unsplash.com/photo-1607799632501-ba38b489ad7f?w=800',
  'https://images.unsplash.com/photo-1607799632501-ba38b489ad7f?w=1200',
  'Pranam Software',
  true,
  NOW() - INTERVAL '3 days',
  'Building Signature Post - Complete Guide',
  'Learn to create professional digital signature components with HTML, CSS, and Canvas',
  ARRAY['design', 'tutorial', 'signature', 'user-interface'],
  312
);

-- ============================================================================
-- BLOG POST 4: GSAP Gallery Animation
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image_url, 
  cover_image,
  author_name, 
  published, 
  published_at, 
  meta_title, 
  meta_description, 
  tags, 
  view_count
) VALUES (
  'How to Build Awesome GSAP Gallery',
  'how-to-build-awesome-gsap-gallery',
  'Create stunning, animated galleries using GreenSock Animation Platform. Learn advanced animation techniques and best practices.',
  'GSAP (GreenSock Animation Platform) is one of the most powerful JavaScript animation libraries available. It enables developers to create smooth, hardware-accelerated animations that work across all browsers.

**Why Choose GSAP?**

GSAP stands out due to its:
- **Performance** - Optimized for 60 FPS animations
- **Browser Support** - Works on all modern browsers
- **Flexibility** - Animate any CSS property
- **Simplicity** - Intuitive and easy-to-learn API
- **Community** - Large and active community support

**Gallery Animation Concepts:**

Learn to implement:

1. **Image Transitions**
   - Smooth fade effects
   - Sliding animations
   - Zoom and pan movements
   - 3D transformations

2. **Interactive Elements**
   - Click handlers
   - Hover effects
   - Keyboard navigation
   - Touch gestures for mobile

3. **Advanced Animations**
   - Timeline sequencing
   - Staggered animations
   - Parallax effects
   - Morphing shapes

**Building Your Gallery:**

Step-by-step guide to create:
- Image grid layout
- Lightbox modal
- Navigation controls
- Loading indicators
- Responsive design

**GSAP Features Used:**

- **TweenMax** - Simple animations
- **TimelineMax** - Complex sequences
- **Easing Functions** - Smooth motion curves
- **Callbacks** - Event handling
- **Bezier Plugin** - Complex paths

**Code Examples:**

We will provide working examples for:
- Image fade-in animation
- Gallery scroll effect
- Lightbox opening animation
- Image slide transitions
- Thumbnail hover effects

**Performance Optimization:**

Tips for optimal gallery performance:
- Lazy load images
- Use hardware acceleration
- Optimize animation duration
- Cache GSAP instances
- Monitor FPS during animation

**Mobile Considerations:**

- Touch-optimized controls
- Responsive image sizing
- Reduced animation complexity
- Optimized for lower-end devices

**Real-world Applications:**

- E-commerce product galleries
- Photography portfolios
- Real estate showcases
- Travel blogs
- Design agencies

Start creating awesome animations with GSAP today!',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=800',
  'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=1200',
  'Pranam Software',
  true,
  NOW() - INTERVAL '2 days',
  'GSAP Gallery Animation - Complete Tutorial',
  'Create stunning animated galleries with GreenSock Animation Platform - advanced effects and interactions',
  ARRAY['gsap', 'animation', 'javascript', 'gallery'],
  428
);

-- ============================================================================
-- BLOG POST 5: React Best Practices
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image_url, 
  cover_image,
  author_name, 
  published, 
  published_at, 
  meta_title, 
  meta_description, 
  tags, 
  view_count
) VALUES (
  'React Best Practices 2024',
  'react-best-practices-2024',
  'Stay up-to-date with the latest React best practices and patterns for building scalable, maintainable applications.',
  'React continues to evolve with new features and best practices emerging regularly. This guide covers the most important patterns and practices for 2024.

**Core React Principles:**

1. **Component Composition**
   - Single Responsibility Principle
   - Props passing
   - Custom hooks
   - Reusable components

2. **State Management**
   - useState hook basics
   - useReducer for complex state
   - Context API for global state
   - Third-party libraries (Redux, Zustand)

3. **Performance Optimization**
   - useMemo for expensive calculations
   - useCallback for function references
   - React.memo for component memoization
   - Code splitting and lazy loading

4. **Modern React Patterns**
   - Functional components
   - Hooks exclusively
   - Server components (React 18+)
   - Concurrent rendering

**Best Practices in 2024:**

**1. Use Functional Components Only**
- Class components are legacy
- Hooks provide all necessary functionality
- Better performance
- Cleaner code syntax

**2. Proper Hook Usage**
- Dependencies arrays
- Custom hooks for logic reuse
- Avoiding common pitfalls
- Performance considerations

**3. State Management**
- Use local state when possible
- Lift state only when necessary
- Consider Context API first
- Evaluate Redux for large applications

**4. Error Handling**
- Error boundaries
- Try-catch with async functions
- Graceful degradation
- User-friendly error messages

**5. Testing**
- Unit tests with Jest
- Component testing with React Testing Library
- Integration tests
- E2E testing with Cypress

**Code Organization:**

Best folder structure:
```
src/
  components/
    common/
    features/
  hooks/
  services/
  utils/
  pages/
  styles/
```

**Performance Tips:**

- Avoid inline functions
- Use lazy loading for routes
- Implement virtual scrolling for lists
- Optimize re-renders
- Monitor bundle size

**Common Mistakes to Avoid:**

1. Updating state directly
2. Missing dependency arrays
3. Creating new objects in render
4. Infinite loops in effects
5. Prop drilling (use Context)

**Tools and Libraries:**

Recommended tools for 2024:
- Vite for bundling
- SWC for transpiling
- Vitest for testing
- Storybook for components
- ESLint for code quality

**Staying Updated:**

- Follow React blog
- Read RFC documents
- Join React communities
- Attend React conferences
- Practice with side projects

Start applying these practices to your React projects!',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=800',
  'https://images.unsplash.com/photo-1633356122544-f134324ef6df?w=1200',
  'Pranam Software',
  true,
  NOW() - INTERVAL '1 day',
  'React Best Practices 2024 - Expert Guide',
  'Master modern React development with 2024 best practices, patterns, and performance tips',
  ARRAY['react', 'javascript', 'best-practices', 'web-development'],
  567
);

-- ============================================================================
-- BLOG POST 6: Web Performance Optimization
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image_url, 
  cover_image,
  author_name, 
  published, 
  published_at, 
  meta_title, 
  meta_description, 
  tags, 
  view_count
) VALUES (
  'Complete Guide to Web Performance Optimization',
  'web-performance-optimization-guide',
  'Learn comprehensive strategies to optimize your website performance. Improve load times, SEO rankings, and user satisfaction.',
  'Web performance is critical for user experience and business success. Slow websites lose visitors, conversions, and rankings. This comprehensive guide covers all aspects of performance optimization.

**Performance Metrics that Matter:**

1. **Core Web Vitals**
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

2. **Traditional Metrics**
   - Page Load Time
   - Time to First Byte (TTFB)
   - Time to Interactive (TTI)
   - First Contentful Paint (FCP)

3. **Business Metrics**
   - Bounce Rate
   - Conversion Rate
   - User Engagement
   - Revenue Impact

**Optimization Techniques:**

**1. Asset Optimization**
- Image compression
- Format selection (WebP, AVIF)
- Lazy loading
- Responsive images

**2. Code Optimization**
- Minification (HTML, CSS, JS)
- Tree shaking
- Code splitting
- Dead code elimination

**3. Caching Strategies**
- Browser caching
- CDN caching
- Server-side caching
- Service workers

**4. Network Optimization**
- HTTP/2 and HTTP/3
- Compression (Gzip, Brotli)
- DNS prefetching
- Resource prioritization

**5. Rendering Optimization**
- Critical rendering path
- Eliminate render-blocking resources
- Optimize CSS delivery
- Defer non-critical JavaScript

**Tools for Measurement:**

- Google PageSpeed Insights
- WebPageTest
- Lighthouse
- GTmetrix
- Chrome DevTools

**Implementation Checklist:**

Frontend Optimization:
- [ ] Optimize images
- [ ] Minify resources
- [ ] Enable compression
- [ ] Implement caching
- [ ] Code splitting
- [ ] Lazy loading
- [ ] CDN usage
- [ ] Remove unused CSS

Backend Optimization:
- [ ] Database indexing
- [ ] Query optimization
- [ ] API caching
- [ ] Reduce server response time
- [ ] Enable GZIP compression
- [ ] Use async operations

**Real-world Results:**

Performance improvements achieved:
- 40% faster load time
- 60% improvement in CLS
- 25% increase in conversions
- 30% reduction in bounce rate

**Mobile Optimization:**

Specific considerations for mobile:
- Responsive design
- Touch optimization
- Reduced animations
- Progressive enhancement
- Network awareness

**Continuous Monitoring:**

Set up monitoring for:
- Real User Monitoring (RUM)
- Synthetic monitoring
- Error tracking
- Performance budgets
- Alerts and notifications

Start optimizing today and see immediate results!',
  'https://images.unsplash.com/photo-1460925895917-adb003b6832d?w=800',
  'https://images.unsplash.com/photo-1460925895917-adb003b6832d?w=1200',
  'Pranam Software',
  true,
  NOW(),
  'Web Performance Optimization - Complete Guide',
  'Master web performance optimization techniques to improve load times and user experience',
  ARRAY['performance', 'optimization', 'web-development', 'seo'],
  645
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT '✅ Blog posts inserted successfully!' as status;
SELECT COUNT(*) as total_blogs FROM public.blog_posts WHERE published = true;
SELECT title, published_at FROM public.blog_posts ORDER BY published_at DESC;
