import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookingModal } from './BookingModal'

const services = [
  {
    id: 1,
    title: 'Website Design & Development',
    slug: 'website-design-development',
    description: 'Custom responsive websites built with modern technologies. Fast loading, SEO optimized, and designed to convert visitors into customers.',
    features: [
      'Responsive design for all devices',
      '90+ PageSpeed score',
      'SEO optimization included',
      'Modern tech stack (React, Next.js)'
    ],
    color: '#6366f1',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Optimized performance with beautiful user interfaces and smooth functionality.',
    features: [
      'iOS & Android support',
      'Cross-platform development',
      'Offline functionality',
      'App store deployment'
    ],
    color: '#8b5cf6',
    image: 'https://www.etatvasoft.com/blog/wp-content/uploads/2022/08/mobile-app-development-methodologies.jpg'
  },
  {
    id: 3,
    title: 'School Management System',
    slug: 'school-management-system',
    description: 'Complete cloud-based portal for admissions, fees, grading, attendance, and parent-teacher communication. Streamline school operations efficiently.',
    features: [
      'Student management',
      'Fee & billing system',
      'Result & grading portal',
      'Parent communication'
    ],
    color: '#ec4899',
    image: 'https://www.elitesoftwaresuite.com/softwareimages/schoolms.png'
  },
  {
    id: 4,
    title: 'E-Commerce Solutions',
    slug: 'e-commerce-solutions',
    description: 'Full-featured online stores with payment integration, inventory management, and customer analytics. Build your online business with confidence.',
    features: [
      'Product catalog management',
      'Payment gateway integration',
      'Inventory tracking',
      'Analytics dashboard'
    ],
    color: '#f59e0b',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd8IYcC3ORIA-j0Lkyl3XYOjwO1kDjumSLEDk9m-iFOmVjTMwPPrRFkdoa&s=10'
  },
  {
    id: 5,
    title: 'POS & Shop Software',
    slug: 'pos-shop-software',
    description: 'Comprehensive billing and inventory management system designed for retail shops. Real-time sales tracking, loyalty programs, and multi-branch support.',
    features: [
      'POS billing system',
      'Real-time inventory',
      'Loyalty programs',
      'Multi-branch management'
    ],
    color: '#06b6d4',
    image: 'https://www.restronp.com/blog-image/sweet%20shop.webp'
  },
  {
    id: 6,
    title: 'Custom Software Solutions',
    slug: 'custom-software-solutions',
    description: 'Tailored software built specifically for your business needs. From desktop applications to enterprise systems, we create solutions that scale with you.',
    features: [
      'Bespoke development',
      'Enterprise integration',
      'Cloud deployment',
      'Ongoing support'
    ],
    color: '#10b981',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbwcKf3N35C7rRRJk8ZQ1v18DWjy7SOulXEMWsOhUKofPehdoZcwtg7zqCcb-ChhFdNSTdHQH5kXGzxFAzbnXJlKQEKdm_XJ9Jxvh-aHpfD3MWGCDe9R3bBBng4D1UgdkmVSAKPaFGN3GYKgQxHEjK_thkGOf_7ES8f9P5iVAy5LcwLOEZrbyhjz3B6Eg/s1600/ecde4078-7106-4194-94e8-d7769a74ffbb.png'
  }
]

export function ServiceCards() {
  const [booking, setBooking] = useState<string | null>(null)

  return (
    <>
      <section className="service-cards-section">
        <div className="wrap">
          <div className="service-cards-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card-item">
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">{service.description}</p>
                  
                  <ul className="service-card-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="service-feature-item">
                        <span className="feature-dot" style={{ backgroundColor: service.color }}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="service-card-actions">
                    <Link 
                      to={`/services/${service.slug}`}
                      className="service-card-learn-btn"
                    >
                      Learn More
                    </Link>
                    <button 
                      className="service-card-btn" 
                      style={{ backgroundColor: service.color }}
                      onClick={() => setBooking(service.title)}
                      type="button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {booking && <BookingModal defaultService={booking} onClose={() => setBooking(null)} />}
    </>
  )
}
