import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { services as defaultServices, type Service } from '~/data/site'
import { BookingModal } from './BookingModal'
import { Check, Star } from './Icons'
import { SectionHead } from './PageHero'

export function ServicesSection({ withHead = true }: { withHead?: boolean }) {
  const [booking, setBooking] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const services = defaultServices // Use default services, simple and reliable

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % services.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [services.length, isMobile])

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
          {/* Desktop view: all cards visible, Mobile view: slider */}
          <div 
            className={`svc-grid ${isMobile ? 'svc-mobile-slider' : ''}`}
            style={isMobile ? { 
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            } : {}}
          >
            {services.map((s, index) => {
              const colorMap: Record<string, string> = {
                violet: 'violet',
                pink: 'pink',
                orange: 'orange',
                blue: 'blue',
                teal: 'teal'
              }
              const color = colorMap[s.color] || 'blue'
              
              return (
                <article 
                  className={`svc svc-${color} ${isMobile ? 'svc-slide' : ''}`}
                  key={`${s.title}-${index}`}
                  data-index={index}
                >
                  {/* Service Image on Top */}
                  <div className="svc-image-container">
                    <img 
                      src={s.image} 
                      alt={s.title}
                      className="svc-image"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <div className="svc-header">
                    <h3>{s.title}</h3>
                    <p className="svc-body">{s.body}</p>
                  </div>

                  <div className="svc-features">
                    {s.features.slice(0, 4).map((f) => (
                      <div key={f} className="svc-feature">
                        <Check className="svc-check" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="svc-actions">
                    <Link to={`/services/${s.title.toLowerCase().replace(/\s+/g, '-')}`} className="svc-learn">
                      Learn More
                    </Link>
                    <button type="button" className="svc-book" onClick={() => setBooking(s.title)}>
                      Book Now
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Slide indicators for mobile */}
          {isMobile && (
            <div className="svc-indicators">
              {services.map((_, index) => (
                <button
                  key={index}
                  className={`svc-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          )}
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
            Talk to our team
          </Link>
        </div>
      </div>

      {booking && <BookingModal defaultService={booking} onClose={() => setBooking(null)} />}
    </section>
  )
}
