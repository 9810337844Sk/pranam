import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { ArrowRight, Check } from '../components/Icons'

const SITE_URL = 'https://www.pranamsoftware.com.np'

// Services data matching ServiceCards component
const services = [
  {
    id: 1,
    title: 'Website Design & Development',
    slug: 'website-design-development',
    description: 'Custom responsive websites built with modern technologies. Fast loading, SEO optimized, and designed to convert visitors into customers.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80',
    color: 'violet'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Optimized performance with beautiful user interfaces and smooth functionality.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80',
    color: 'violet'
  },
  {
    id: 3,
    title: 'School Management System',
    slug: 'school-management-system',
    description: 'Complete cloud-based portal for admissions, fees, grading, attendance, and parent-teacher communication. Streamline school operations efficiently.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80',
    color: 'pink'
  },
  {
    id: 4,
    title: 'E-Commerce Solutions',
    slug: 'e-commerce-solutions',
    description: 'Full-featured online stores with payment integration, inventory management, and customer analytics. Build your online business with confidence.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80',
    color: 'orange'
  },
  {
    id: 5,
    title: 'POS & Shop Software',
    slug: 'pos-shop-software',
    description: 'Comprehensive billing and inventory management system designed for retail shops. Real-time sales tracking, loyalty programs, and multi-branch support.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=700&q=80',
    color: 'teal'
  },
  {
    id: 6,
    title: 'Custom Software Solutions',
    slug: 'custom-software-solutions',
    description: 'Tailored software built specifically for your business needs. From desktop applications to enterprise systems, we create solutions that scale with you.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80',
    color: 'blue'
  }
]

// Service detail content for each service
const serviceDetails: Record<string, { description: string; benefits: string[]; faq: Array<{q: string; a: string}> }> = {
  'website-design-development': {
    description: 'We build fast, secure, and responsive websites that convert visitors into customers. Our websites are optimized for search engines and mobile devices, ensuring maximum reach and engagement.',
    benefits: [
      'Responsive design works on all devices',
      'SEO optimized for better search rankings',
      'Fast loading times (optimized performance)',
      'Secure SSL certificates included',
      'Mobile-first development approach',
      'Easy to manage admin panel',
      'Integration with payment gateways',
      'Analytics and visitor tracking'
    ],
    faq: [
      { q: 'How long does it take to build a website?', a: 'Typically 4-8 weeks depending on complexity. Simple websites take 2-4 weeks.' },
      { q: 'Do you provide hosting and domain?', a: 'Yes, we can arrange hosting and domain registration. We recommend annual plans.' },
      { q: 'Can you redesign my existing website?', a: 'Absolutely! We can modernize and improve your current website.' },
      { q: 'Will my website be mobile friendly?', a: 'Yes, all our websites are mobile-first and fully responsive.' }
    ]
  },
  'mobile-app-development': {
    description: 'Native and cross-platform mobile applications for iOS and Android. We create high-performance apps with beautiful interfaces and seamless functionality.',
    benefits: [
      'Native iOS & Android development',
      'Cross-platform solutions (React Native)',
      'Beautiful user interfaces',
      'Offline functionality support',
      'App store deployment assistance',
      'Push notifications integration',
      'In-app purchases support',
      'Analytics and crash reporting'
    ],
    faq: [
      { q: 'How long does app development take?', a: 'Typically 8-16 weeks depending on features and complexity.' },
      { q: 'Do you build for both iOS and Android?', a: 'Yes, we develop native apps for both platforms or cross-platform solutions.' },
      { q: 'Can you help with app store submission?', a: 'Absolutely! We handle the entire submission process for both stores.' },
      { q: 'What happens after launch?', a: 'We provide ongoing support, updates, and maintenance as needed.' }
    ]
  },
  'school-management-system': {
    description: 'A comprehensive cloud-based system for schools to manage admissions, grades, fees, attendance, and parent-teacher communication - all in one place.',
    benefits: [
      'Cloud-based - access from anywhere',
      'Complete admission management system',
      'Online fee and billing system',
      'Result and grading management',
      'Parent-teacher communication portal',
      'Attendance tracking and reports',
      'Student information database',
      'Automated notifications and alerts'
    ],
    faq: [
      { q: 'Can parents access student results online?', a: 'Yes, parents get a portal to check grades, attendance, and fees.' },
      { q: 'Is the system secure?', a: 'Absolutely. We use enterprise-grade security with encrypted data.' },
      { q: 'How many students can the system handle?', a: 'The system can handle unlimited students and multiple branches.' },
      { q: 'Do you provide training?', a: 'Yes, we provide comprehensive training for all staff members.' }
    ]
  },
  'e-commerce-solutions': {
    description: 'Full-featured online stores with payment gateway integration, inventory management, and customer analytics. Build your online business with confidence.',
    benefits: [
      'Complete product catalog management',
      'Secure payment gateway integration',
      'Real-time inventory tracking',
      'Customer analytics dashboard',
      'Shopping cart and checkout',
      'Order management system',
      'Email notifications',
      'SEO optimized product pages'
    ],
    faq: [
      { q: 'Which payment gateways do you support?', a: 'We integrate with eSewa, Khalti, and international gateways like Stripe.' },
      { q: 'Can I manage products myself?', a: 'Yes, you get a complete admin panel to manage everything.' },
      { q: 'How do you handle shipping?', a: 'We integrate with delivery services or you can use your own system.' },
      { q: 'Is it mobile friendly?', a: 'Absolutely! All our e-commerce sites are fully responsive.' }
    ]
  },
  'pos-shop-software': {
    description: 'Powerful POS and billing software designed specifically for retail shops. Manage inventory, sales, loyalty programs, and multi-branch operations effortlessly.',
    benefits: [
      'Fast and intuitive POS system',
      'Real-time inventory management',
      'Customer loyalty program integration',
      'Multi-branch support',
      'Sales reports and analytics',
      'Barcode and product management',
      'Easy supplier management',
      'Offline mode support'
    ],
    faq: [
      { q: 'Can I use multiple tills/counters?', a: 'Yes, unlimited POS terminals can be connected.' },
      { q: 'What if internet goes down?', a: 'Offline mode stores data locally and syncs when online.' },
      { q: 'Can I see sales reports?', a: 'Yes, detailed daily, monthly, and yearly reports available.' },
      { q: 'How do I manage inventory?', a: 'Automatic tracking of stock, low-stock alerts, and reorder management.' }
    ]
  },
  'custom-software-solutions': {
    description: 'Tailored software built specifically for your unique business needs. From desktop applications to enterprise systems, we create scalable solutions that grow with you.',
    benefits: [
      'Bespoke development for your needs',
      'Enterprise system integration',
      'Cloud or on-premise deployment',
      'Scalable architecture',
      'Dedicated project management',
      'Ongoing support and maintenance',
      'Training and documentation',
      'API development and integration'
    ],
    faq: [
      { q: 'How do you determine requirements?', a: 'We conduct detailed analysis sessions to understand your exact needs.' },
      { q: 'How long does custom development take?', a: 'Depends on scope - from 8 weeks to 6+ months for complex systems.' },
      { q: 'Can you integrate with existing systems?', a: 'Yes, we specialize in integrating with legacy and third-party systems.' },
      { q: 'What technologies do you use?', a: 'We use modern tech stacks including React, Node.js, Python, and cloud platforms.' }
    ]
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  // Find service by slug
  const service = services.find((s) => s.slug === slug)
  
  useEffect(() => {
    if (!service) navigate('/services', { replace: true })
  }, [service, navigate])

  if (!service) return null

  const details = serviceDetails[slug as string] || {}
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'ProfessionalService', name: 'Pranam Software' },
    areaServed: 'Nepal',
    url: `${SITE_URL}/services/${slug}`,
  }

  return (
    <>
      <Seo
        title={service.title}
        description={`${service.description} Get a free quote from Pranam Software in Kathmandu, Nepal.`}
        path={`/services/${slug}`}
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <PageHero crumb="Services" title={service.title} subtitle={service.description} />

      <section className={`svc-detail svc-${service.color}`}>
        <div className="wrap svc-detail-grid">
          <div className="svc-detail-body">
            <h2>About This Service</h2>
            <p className="svc-detail-desc">{details.description}</p>
            
            <h3>Key Benefits</h3>
            <ul className="svc-detail-feats">
              {details.benefits?.map((f) => (
                <li key={f}>
                  <Check /> {f}
                </li>
              ))}
            </ul>

            <Link 
              to={`/contact?service=${encodeURIComponent(service.title)}`} 
              className="svc-detail-cta"
            >
              Get a Free Quote <ArrowRight />
            </Link>
          </div>
          <img className="svc-detail-img" src={service.image} alt={service.title} loading="lazy" />
        </div>

        {/* FAQ Section */}
        {details.faq && details.faq.length > 0 && (
          <div className="wrap svc-detail-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {details.faq.map((item, idx) => (
                <div key={idx} className="faq-item">
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Services */}
        <div className="wrap svc-detail-related">
          <h2>Other Services</h2>
          <div className="svc-detail-related-links">
            {services
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link 
                  key={s.slug} 
                  to={`/services/${s.slug}`}
                  className="related-service-link"
                >
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
