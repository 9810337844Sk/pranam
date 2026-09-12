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
    image: '/services/website.png',
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
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80',
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
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80',
    features: [
      'POS Billing System',
      'Inventory Management',
      'Loyalty Programs',
      'Multi-Branch Support',
      'Sales Reports',
    ],
  },
  {
    title: 'Digital Menu & Restaurant Solutions',
    body: 'Online ordering, digital menus & table management for restaurants.',
    icon: 'menu',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    features: [
      'QR Digital Menus',
      'Online Ordering',
      'Table Reservation',
      'Order Management',
      'Customer Feedback',
    ],
  },
  {
    title: 'IT Training & Internship Program',
    body: 'Web, mobile & software engineering — hands-on training for job-ready professionals.',
    icon: 'training',
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
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
  'Digital Menu & Restaurant Solutions',
  'Mobile App Development',
  'IT Training & Internship Program',
]

export const budgetOptions = [
  'Under NPR 50,000',
  'NPR 50,000 – 1,50,000',
  'NPR 1,50,000 – 5,00,000',
  'Above NPR 5,00,000',
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
  { name: 'Spotify', logo: 'https://api.myunicampus.com/6da490c2-415b-4732-9b44-b41fc1a2565b_1744952092980.png' },
  { name: 'Meta', logo: 'https://blog.logomyway.com/wp-content/uploads/2021/11/meta-logo.png' },
  { name: 'IT College Nepal', logo: 'https://itcollegenepal.com/wp-content/uploads/2021/08/download-1.png.webp' },
  { name: 'Bhojmandu', logo: 'https://bhojmandu.com/storage/business/2026-07-04-6a48ab9ea4675.png' },
  { name: 'Kantipur Studio', logo: 'https://kantipurstudio.com.np/final-logo.webp' },
  { name: 'Digital Kantipur', logo: 'https://www.digitalkantipur.com/logo%20image/logo%20ho%20digital%20kantipur(1).png' },
  { name: 'RBS Academy', logo: 'https://play-lh.googleusercontent.com/pWo4eMBVHpJg2EkX0RxVZcxt8_bNmOPgN2L0MEcLhtho0-RvKWexbISsyHUIlt7AxpyU-mQzFg9BOLZhihYMbTw=w240-h480-rw' },
  { name: 'Battery Mandu', logo: 'https://www.batterymandu.com/assets/battery-mandu-logo-tNEPvBE_.jpg' },
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
  { name: 'Apple', logo: 'https://play-lh.googleusercontent.com/SzuR2AGfx_7QREvPuOUzrZ66D2e61tHrU84BBP5vegFYN4P3k_LRxzMyM657Xg8bsUdKqg6tiHxAI-3DZ3al' },
  { name: 'LinkedIn', logo: 'https://yt3.googleusercontent.com/i6KNxiy3gME-BulL4WnuGkTGqHuSYF8jl1WRn0rXftcJdSYK7dHKcJ3gLAaPc-KfhmLSYPwf824=s900-c-k-c0x00ffffff-no-rj' },
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

export const products: Product[] = [
  {
    name: 'Kantipur Studio',
    ini: 'KS',
    body: 'A modern, responsive studio website designed for a strong online presence.',
    tags: ['Website'],
    img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'RBS Academy Mobile App',
    ini: 'RBS',
    body: 'A convenient learning app for students, available on Google Play.',
    tags: ['Mobile App', 'Android'],
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Battery Mandu',
    ini: 'BM',
    body: 'A responsive battery products and services website built for customers in Nepal.',
    tags: ['Website', 'Responsive Design'],
    img: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Digital Kantipur',
    ini: 'DK',
    body: 'A modern digital platform with a fast, accessible and mobile-friendly experience.',
    tags: ['Website', 'Web Development'],
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dukan Ko Hero',
    ini: 'DH',
    body: 'Business management platform for local shops with billing & inventory.',
    tags: ['Inventory Management Software'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Annex Consultancy',
    ini: 'AC',
    body: 'Educational consultancy system for admissions, leads & documentation.',
    tags: ['Website', 'SEO', 'Page Optimization'],
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Gyan Verse',
    ini: 'GV',
    body: 'Immersive 360° 3D video production for education and brand storytelling — filmed, stitched and delivered for web and headset playback.',
    tags: ['360 3D Video'],
    img: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    wide: true,
  },
]

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
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Anurag Thakur',
    ini: 'AT',
    role: 'senior developer',
    skills: 'Full-Stack Expert | Cloud Architecture | Scalable Systems',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Harshit Chaudhary',
    ini: 'HC',
    role: 'lead developer',
    skills: 'Modern Frameworks | Responsive Design | Problem Solver',
    img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kashish Shrestha',
    ini: 'KS',
    role: 'devops engineer',
    skills: 'Cloud Infrastructure | CI/CD Automation | Reliable Deployments',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Garima Chaudhary',
    ini: 'GC',
    role: 'digital marketer',
    skills: 'Digital Marketing | Content Strategy | Campaign Expert',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Arbindra Kharel',
    ini: 'AK',
    role: 'content generation',
    skills: 'DevOps | Brand Storytelling | AWS Engineer',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
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
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'
export const videoImage =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
export const officeImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80'
export const processImage =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
