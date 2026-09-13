import { Link } from 'react-router-dom'
import { ButtonLink } from './ui/button'
import { Check } from './Icons'

const points = [
  'Modern Web & App Development',
  'Business Automation Solutions',
  'Secure & Scalable Systems',
]

export function Discover() {
  return (
    <section className="discover">
      <div className="wrap disc-grid">
        {/* Video Player */}
        <div className="video-shell">
          <iframe 
            className="video-iframe"
            src="https://www.youtube.com/embed/k3yWQ91TzTU?si=E3MQmzXBwrlSVX8K" 
            title="Company Introduction Video - Pranam Software" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div>
          <p className="eyebrow">Company Introduction</p>
          <h2
            style={{
              fontSize: 'clamp(26px,3.6vw,38px)',
              fontWeight: 800,
              letterSpacing: '-.02em',
              marginTop: 12,
            }}
          >
            Discover Pranam Software
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: 15.5 }}>
            Watch our company introduction video to understand how we build innovative digital
            products, scalable systems, and powerful business solutions for startups and enterprises.
          </p>
          <ul className="disc-list">
            {points.map((p) => (
              <li key={p}>
                <span className="tick">
                  <Check />
                </span>{' '}
                {p}
              </li>
            ))}
          </ul>
          <ButtonLink to="/contact" variant="blue" className="mt-7">
            Start Your Project
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
