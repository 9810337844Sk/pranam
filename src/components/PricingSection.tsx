import { Link } from 'react-router-dom'
import { packages } from '~/data/site'
import { ArrowRight, Check } from './Icons'
import { SectionHead } from './PageHero'

export function PricingSection({ withHead = true }: { withHead?: boolean }) {
  return (
    <section id="pricing">
      <div className="wrap">
        {withHead && (
          <SectionHead
            title="Simple, Transparent Packages"
            subtitle="Plans starting at NPR 10,000 — pick a package or tell us your needs for a custom quote."
          />
        )}

        <div className="pkg-grid">
          {packages.map((p) => (
            <article className={`pkg${p.highlighted ? ' pkg-highlight' : ''}`} key={p.name}>
              {p.highlighted && <span className="pkg-badge">Most Popular</span>}
              <h3>{p.name}</h3>
              <p className="pkg-price">
                {p.price}
                {p.period && <span>/{p.period}</span>}
              </p>
              <p className="pkg-desc">{p.description}</p>
              <ul className="pkg-feats">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="pkg-cta">
                Get Started <ArrowRight width={15} height={15} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
