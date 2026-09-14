import { Link } from 'react-router-dom'

export function HereToHelp() {
  return (
    <section className="h2h" aria-labelledby="h2h-title">
      <svg className="h2h-wave h2h-wave-top" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 L0,34 C240,-6 480,-6 720,18 C960,42 1200,42 1440,10 L1440,0 Z" />
      </svg>

      <div className="h2h-body">
        <div className="wrap h2h-inner">
          <div className="h2h-copy">
            <h2 id="h2h-title" className="h2h-title">
              We're Here <span>To Help</span>
            </h2>
            <p className="h2h-text">
              From your first idea to launch day and beyond, our team stays close — clear
              communication, honest timelines, and support that doesn't disappear after delivery.
            </p>
            <Link className="h2h-link" to="/contact">
              Get in Touch
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </Link>
            <p className="h2h-sign">Pranam Software — Kathmandu</p>
          </div>

          <div className="h2h-media">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
              alt="Pranam Software team collaborating at their desks"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <svg className="h2h-wave h2h-wave-bottom" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,90 L0,56 C240,96 480,96 720,72 C960,48 1200,48 1440,80 L1440,90 Z" />
      </svg>
    </section>
  )
}
