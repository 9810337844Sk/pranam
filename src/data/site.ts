/**
 * Every piece of site copy lives here so pages stay presentational.
 * Swap the `img` URLs for your own Cloudinary URLs once your photos are uploaded
 * (see src/lib/cloudinary.ts).
 */

export type Company = {
  name: string
  legalName: string
  tagline: string
  founded: number
  address: string
  phone: string
  phoneHref: string
  email: string
  hours: string
  whatsapp: string
}

export const company: Company = {
  name: 'PranamSoftware',
  legalName: 'Pranam Software',
  tagline: 'Software Company',
  founded: 2024,
  address: 'Maitidevi, Near Sunway College, Kathmandu',
  phone: '+977-9823415625',
  phoneHref: 'tel:+9779823415625',
  email: 'contact.pranamsoftware@gmail.com',
  hours: 'Sun – Sat: 9 AM – 7 PM',
  whatsapp: 'https://wa.me/9779823415625',
}

/** Adapts the snake_case `company_info` DB row into this object's shape. */
export function mapCompanyRow(row: Record<string, unknown>): Company {
  return {
    name: String(row.name ?? company.name),
    legalName: String(row.legal_name ?? company.legalName),
    tagline: String(row.tagline ?? company.tagline),
    founded: Number(row.founded ?? company.founded),
    address: String(row.address ?? company.address),
    phone: String(row.phone ?? company.phone),
    phoneHref: String(row.phone_href ?? company.phoneHref),
    email: String(row.email ?? company.email),
    hours: String(row.hours ?? company.hours),
    whatsapp: String(row.whatsapp ?? company.whatsapp),
  }
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Product' },
  { to: '/team', label: 'Team' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
] as const

export type Service = {
  title: string
  body: string
  icon: 'web' | 'school' | 'shop' | 'menu' | 'training'
  color: 'violet' | 'pink' | 'orange' | 'blue' | 'teal'
  image: string
  features: string[]
}

export const services: Service[] = [
  {
    title: 'Website Design & Development',
    body: 'Fast, secure & responsive websites that convert visitors into customers.',
    icon: 'web',
    color: 'violet',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect fill="%23F3E5F5" width="700" height="400"/%3E%3C/svg%3E',
    features: [
      'Business Websites',
      'E-commerce Stores',
      'Landing Pages',
      'Custom Web Apps',
      'Website Maintenance',
    ],
  },
  {
    title: 'School Management Portal',
    body: 'Cloud-based system for admissions, grades, fees & parent communication.',
    icon: 'school',
    color: 'pink',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect fill="%23FCE4EC" width="700" height="400"/%3E%3C/svg%3E',
    features: [
      'Admission Management',
      'Fee & Billing System',
      'Result & Grading',
      'Parent-Teacher Portal',
      'Attendance Tracking',
    ],
  },
  {
    title: 'Shop Customized Software',
    body: 'Billing, inventory, POS & loyalty programs designed for retail growth.',
    icon: 'shop',
    color: 'orange',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect fill="%23FFE0B2" width="700" height="400"/%3E%3C/svg%3E',
    features: [
      'POS Billing System',
      'Inventory Management',
      'Loyalty Programs',
      'Multi-Branch Support',
      'Sales Reports',
    ],
  },
  {
    title: 'Educational App Development',
    body: 'Interactive learning apps for students with engaging features and progress tracking.',
    icon: 'training',
    color: 'blue',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect fill="%23E3F2FD" width="700" height="400"/%3E%3C/svg%3E',
    features: [
      'Interactive Learning',
      'Progress Tracking',
      'Quiz & Tests',
      'Student Analytics',
      'Teacher Dashboard',
    ],
  },
  {
    title: 'IT Training & Internship Program',
    body: 'Web, mobile & software engineering — hands-on training for job-ready professionals.',
    icon: 'training',
    color: 'teal',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="700" height="400"%3E%3Crect fill="%23E0F2F1" width="700" height="400"/%3E%3C/svg%3E',
    features: [
      'Web Development Training',
      'Mobile App Training',
      'Hands-on Projects',
      'Internship Placement',
      'Career Mentorship',
    ],
  },
]

export const serviceHighlights = [
  { icon: 'zap', title: 'Fast Delivery', body: 'We value your time and deliver on schedule.' },
  { icon: 'gem', title: 'Modern Designs', body: 'Clean, unique and user-friendly designs.' },
  { icon: 'target', title: 'Result-Oriented', body: 'We focus on strategies that bring real results.' },
  { icon: 'headset', title: '24/7 Support', body: "We're always here to help you anytime." },
] as const

export const serviceOptions = [
  'Website Design & Development',
  'School Management Portal',
  'Shop Customized Software',
  'Educational App Development',
  'Mobile App Development',
  'IT Training & Internship Program',
]

export const budgetOptions = [
  'NPR 10,000 – 50,000',
  'NPR 50,000 – 1,50,000',
  'NPR 1,50,000 – 5,00,000',
  'Above NPR 5,00,000',
]

export type Package = {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
}

export const packages: Package[] = [
  {
    name: 'Starter',
    price: 'NPR 10,000',
    description: 'A simple, professional online presence for small businesses just getting started.',
    features: [
      'Single-page website',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact / WhatsApp button',
      '1 round of revisions',
    ],
  },
  {
    name: 'Growth',
    price: 'NPR 50,000',
    description: 'For businesses ready to grow online with more pages and real lead generation.',
    features: [
      'Up to 5 pages',
      'Contact form with inbox',
      'On-page SEO optimization',
      'WhatsApp & social integration',
      'Admin panel for content',
      '3 rounds of revisions',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom web apps, mobile apps and software built around your exact business needs.',
    features: [
      'Custom web or mobile app',
      'Admin dashboard & analytics',
      'Third-party integrations',
      'Database & backend setup',
      'Dedicated support',
    ],
  },
]

export const features = [
  { icon: 'team', title: 'Expert Team', body: 'Experienced professionals' },
  { icon: 'growth', title: 'Growth Focused', body: 'Driving business success' },
  { icon: 'bulb', title: 'Innovation', body: 'Cutting-edge solutions' },
  { icon: 'shield', title: 'Reliability', body: 'Trusted partners' },
] as const

export const certifications = [
  'Google Analytics Certified',
  'Meta Ads Certified',
  'SEO Specialist Certified',
]

export const techStack = [
  { name: 'jQuery', slug: 'jquery' },
  { name: 'Docker', slug: 'docker' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'Android', slug: 'android' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Electron', slug: 'electron' },
  { name: 'Capacitor', slug: 'capacitor' },
  { name: 'Gradle', slug: 'gradle' },
]

export type Brand = { name: string; logo: string }

export const brands: Brand[] = [
  { name: 'Shuva Electric', logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiIk1QXCG3y9cze3n1WYMHNnNJ_IKcn33fqrxtFv-0muzAPsEgWh7kDDsSiPFo4KmkUf9o8xrVbC2rueJC0mPlLsj7ewe_B8P58qY6N1sBRAPrmMpG01K5fQHFsAaA9jeGeO718vHDrsvO7bQ8_BgBdHxe9FWxFf-WQDYtHDgi6paOy4AGqCqv8yh1u0Q/s1600/shuva.jpeg' },
  { name: 'Meta', logo: 'https://blog.logomyway.com/wp-content/uploads/2021/11/meta-logo.png' },
  { name: 'Bhojmandu', logo: 'https://bhojmandu.com/storage/business/2026-07-04-6a48ab9ea4675.png' },
  { name: 'Kantipur Studio', logo: 'https://kantipurstudio.com.np/final-logo.webp' },
  { name: 'Digital Kantipur', logo: 'https://www.digitalkantipur.com/logo%20image/logo%20ho%20digital%20kantipur(1).png' },
  { name: 'RBS Academy', logo: 'https://play-lh.googleusercontent.com/pWo4eMBVHpJg2EkX0RxVZcxt8_bNmOPgN2L0MEcLhtho0-RvKWexbISsyHUIlt7AxpyU-mQzFg9BOLZhihYMbTw=w240-h480-rw' },
  { name: 'Battery Mandu', logo: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLbaTl6vjpfHStvGsQ4TOy7F4BGU5h6lImkgtEsv7M6EH2BvAUzbybf4rbCYLOHcxgjGbdXpucpjZadVWE4TZZGus_rN3dv_dEO5gD77UoGCh46Dl2Y5qup359JzFAImI9MqQII-ZTEIQYtytSav-puEwLw1gOISTkap1ywfz3wCfNm1XuCmugYi91jRg/s1600/battery.jpeg' },
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
  { name: 'Apple', logo: 'https://play-lh.googleusercontent.com/SzuR2AGfx_7QREvPuOUzrZ66D2e61tHrU84BBP5vegFYN4P3k_LRxzMyM657Xg8bsUdKqg6tiHxAI-3DZ3al' },
  { name: 'Sunway College', logo: 'https://api.myunicampus.com/6da490c2-415b-4732-9b44-b41fc1a2565b_1744952092980.png' },
]

export const processSteps = [
  {
    title: 'Discovery & Planning',
    body: 'We understand your business goals and technical requirements to create a customized solution roadmap.',
  },
  {
    title: 'Design & Prototyping',
    body: 'Our designers craft intuitive user interfaces and interactive prototypes for your review and feedback.',
  },
  {
    title: 'Development',
    body: 'Our expert developers build your product using best practices and modern technologies.',
  },
  {
    title: 'Testing & Deployment',
    body: 'Rigorous testing ensures quality and performance before deploying to production environment.',
  },
]

export type Product = {
  name: string
  ini: string
  body: string
  tags: string[]
  img: string
  wide?: boolean
}

export const products: Product[] = []

export type Member = {
  name: string
  ini: string
  role: string
  skills: string
  img: string
}

export const team: Member[] = [
  {
    name: 'Sachin Kushwaha',
    ini: 'SK',
    role: 'ceo & founder',
    skills: 'Strategic visionary | Enterprise Solutions | Business Growth',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuWNCQYejuWjdWzJNQf6yhj2k3GcN1n1sXl-Lp5TuU6XcFY-v5zzUqr-EQMQHo3bT7B4jHr9NwKAuR19DlJvJqXRAsLdCBMKBJtjE2fY_ChAXQJpNk7pEgOIprF7Bf2cLXUnFyB9lM0r37hNtOPXONDhALX0UBf_wbffjPnihMGnYatZsoqyCLYowog2c/s1600/sachin.png',
  },
  {
    name: 'Anurag Thakur',
    ini: 'AT',
    role: 'senior developer',
    skills: 'Full-Stack Expert | Cloud Architecture | Scalable Systems',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5tyzIzZU83GDRVCKOtlE4GnApSC6r9my4eH7v8vvc5E-oLX0CveT-TZjSGZQhtHC52kty1LLVV77DJSmMKXhUPbjsq3RdqV0aOWffpgdE0exj_F2CBxLXH_29SSdLl0aJfPHuQlZKEBPRu7NPZ1jf98DRU8shusI-PY24UDSPQ0_vrU-vyRj6YM5-9VI/s1600/anurag.jpeg',
  },
  {
    name: 'Harshit Chaudhary',
    ini: 'HC',
    role: 'lead developer',
    skills: 'Modern Frameworks | Responsive Design | Problem Solver',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQOp9geRo50M64pv3W99UEmWHff1oYChX07_ic2p_4qfkuuDmdBKldnS6OQlknKP5WXeJhAQYlzi-mTdan31iJ9RPGG26zTov0gkieB_onJ8SninB6iLTOwqh1V1bR0GXebKgRJv63cIb8wOShyphenhyphen3-BjZ9meUf3eilx8iduosSWXWJxdAGb6Ejp1Jx2cOc/s1600/WhatsApp%20Image%202026-09-03%20at%201.33.28%20PM.jpeg',
  },
  {
    name: 'Kashish Shrestha',
    ini: 'KS',
    role: 'devops engineer',
    skills: 'Cloud Infrastructure | CI/CD Automation | Reliable Deployments',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4i99RueNnrxSjnb5l2eBR_N_PWItABYcJdCWNE1gfYmQsXrGXrZXISGSic0aGrA2Rk31HSFwZLK3xRgy6l1xvj8eUL9DR-dU8_VYgro6u5FQEY0Fte5FRFRCXkwB_lA3CLizNVpwvAYH8KztxhqvQNemvJI6dR45l_7M5gHNryh5Etbn4IDZ9q_pCCE8/s600/cf30a90f-1270-48e7-8c8d-c769fd1eb876%20%281%29.jpg',
  },
  {
    name: 'Garima Chaudhary',
    ini: 'GC',
    role: 'digital marketer',
    skills: 'Digital Marketing | Content Strategy | Campaign Expert',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhx1QqndiFeqEhSYumldpnPhKLULEFXGCZOhUvlzUx4ymrc5C_UBhmE4WdtJIRS2sZjDWEKTmRkVIiita9wtxoDUJ-ORC5h3l_NwR3HZYvCXyzTP2pT4to-7zi_FXjBQvjSIjtQb9G2J0TQXTn3T3coJpeaBEZZJNiJTKzunUyyZdJn7iuwp9LaE4sycQ/s1600/IMG-20260105-WA0006gdhdhdd-removebg-preview.png',
  },
  {
    name: 'Arbindra Kharel',
    ini: 'AK',
    role: 'content generation',
    skills: 'DevOps | Brand Storytelling | AWS Engineer',
    img: 'https://www.arbindrakharel.com.np/images/profile-1.jpeg',
  },
]

export type Testimonial = {
  name: string
  ini: string
  at: string
  tag: string
  time: string
  quote: string
  img: string
}

export const googleReviews = {
  rating: 5.0,
  count: 125,
  writeReviewHref: 'https://g.page/r/review',
}

export const testimonials: Testimonial[] = [
  {
    name: 'Xantoz Vandaree',
    ini: 'XV',
    at: 'Digital Kantipur',
    tag: 'WEBSITE, KATHMANDU',
    time: '3 weeks ago',
    quote:
      'Pranam Software created a fast, modern and professional website for Digital Kantipur. The team understood our requirements clearly, communicated well and delivered a polished website that works smoothly across devices.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Aakriti Kharel',
    ini: 'AK',
    at: 'Founder, Kantipur Studio',
    tag: 'STUDIO WEBSITE, KATHMANDU',
    time: '1 month ago',
    quote:
      'The Pranam Software team brought the Kantipur Studio website to life with a clean, elegant design and an excellent user experience. They were responsive throughout the project and delivered exactly what our brand needed.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ramesh Adhikari',
    ini: 'RA',
    at: 'Photo Studio Owner',
    tag: 'BUSINESS SOFTWARE, POKHARA',
    time: '2 weeks ago',
    quote:
      'Pranam Software transformed our studio operations. Their system is intuitive, reliable, and has improved our workflow significantly.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ranjan Kushwaha',
    ini: 'RK',
    at: 'Founder, Battery Mandu',
    tag: 'E-COMMERCE, KATHMANDU',
    time: '2 months ago',
    quote:
      'Pranam Software developed a professional and easy-to-use website for Battery Mandu. The website is fast, works smoothly on mobile devices and presents our products clearly to customers. We are very satisfied with the result.',
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
  },
]

export const heroImage =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=90'
export const videoImage =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
export const officeImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80'
export const processImage =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
