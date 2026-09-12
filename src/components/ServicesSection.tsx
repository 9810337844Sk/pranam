import { useState } from 'react'
import { Link } from 'react-router-dom'
import { serviceHighlights, services as defaultServices, type Service } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { BookingModal } from './BookingModal'
import { ArrowRight, Check, Star, highlightIcons, serviceIcons } from './Icons'
import { SectionHead } from './PageHero'

export function ServicesSection({ withHead = true }: { withHead?: boolean }) {
  const [booking, setBooking] = useState<string | null>(null)
  const services = useLiveContent<Service>('services', defaultServices)

  return (
    <section id="services">
      <div className="wrap">
        {withHead && (
          <SectionHead
            title="Our Services"
            subtitle="Comprehensive digital solutions tailored to your business requirements"
          />
        )}

        <div className="svc-grid">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon]
            return (
              <article className={`svc svc-${s.color}`} key={s.title}>
                <div className="svc-top">
                  <div className="svc-ico">
                    <Icon />
                  </div>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>

                <div className="svc-body">
                  <ul className="svc-feats">
                    {s.features.map((f) => (
                      <li key={f}>
                        <button type="button" onClick={() => setBooking(s.title)}>
                          <Check /> {f}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="svc-shot-wrap">
                    <img className="svc-shot" src={s.image} alt={s.title} loading="lazy" />
                  </div>
                </div>

                <button type="button" className="svc-book" onClick={() => setBooking(s.title)}>
                  Book This Service <ArrowRight />
                </button>
              </article>
            )
          })}
        </div>

        <div className="svc-highlights">
          {serviceHighlights.map((h) => {
            const Icon = highlightIcons[h.icon]
            return (
              <div className="svc-highlight" key={h.title}>
                <div className="svc-highlight-ico">
                  <Icon />
                </div>
                <div>
                  <b>{h.title}</b>
                  <span>{h.body}</span>
                </div>
              </div>
            )
          })}
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
