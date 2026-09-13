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
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80'
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
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80'
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
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80'
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
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=700&q=80'
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
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80'
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
