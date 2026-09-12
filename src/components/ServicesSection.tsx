import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { serviceHighlights, services as defaultServices, type Service } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { slugify } from '~/lib/utils'
import { BookingModal } from './BookingModal'
import { ArrowRight, Check, Star } from './Icons'
import { SectionHead } from './PageHero'

export function ServicesSection({ withHead = true }: { withHead?: boolean }) {
  const [booking, setBooking] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const services = useLiveContent<Service>('services', defaultServices)

  // Auto-slide for mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 620
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % services.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [services.length])

  return (
    <section id="services">
      <div className="wrap">
        {withHead && (
          <SectionHead
            title="Our Services"
            subtitle="Comprehensive digital solutions tailored to your business requirements"
          />
        )}

        <div className="svc-container">
          <div 
            className="svc-grid"
            style={{ 
              '--current-slide': currentSlide,
              transform: window.innerWidth <= 620 ? `translateX(-${currentSlide * 100}%)` : 'none'
            } as React.CSSProperties}
          >
            {services.map((s, index) => {
              return (
                <article 
                  className={`svc svc-${s.color} ${window.innerWidth <= 620 ? 'svc-slide' : ''}`} 
                  key={s.title}
                  data-index={index}
                >
                  <div className="svc-header">
                    <div className={`svc-icon svc-icon-${s.color}`}>
                      <div className="svc-icon-bg"></div>
                      {/* Add service icon based on type */}
                      {s.icon === 'web' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )}
                      {s.icon === 'shop' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      )}
                      {s.icon === 'menu' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>

                  <div className="svc-features">
                    {s.features.slice(0, 3).map((f) => (
                      <div key={f} className="svc-feature">
                        <Check className="svc-check" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="svc-actions">
                    <Link to={`/services/${slugify(s.title)}`} className="svc-learn">
                      Learn More
                    </Link>
                    <button type="button" className="svc-book" onClick={() => setBooking(s.title)}>
                      Book Service <ArrowRight />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Slide indicators for mobile */}
          <div className="svc-indicators">
            {services.map((_, index) => (
              <button
                key={index}
                className={`svc-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="svc-cta">
          <div className="svc-ico" style={{ background: 'rgba(255,255,255,.14)' }}>
            <Star style={{ fill: '#FFC93C' }} />
          </div>
          <div>
            <h3 style={{ color: '#fff' }}>Not sure what you need?</h3>
            <p style={{ color: '#C6D6EC' }}>
              Tell us your goal and we will recommend the right solution, timeline and budget — free
              of charge.
            </p>
          </div>
          <Link to="/contact" style={{ color: '#FFC93C' }}>
            Talk to our team <ArrowRight />
          </Link>
        </div>
      </div>

      {booking && <BookingModal defaultService={booking} onClose={() => setBooking(null)} />}
    </section>
  )
}
