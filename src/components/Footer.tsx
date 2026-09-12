import { Link } from 'react-router-dom'
import { company as defaultCompany, mapCompanyRow, nav } from '~/data/site'
import { useLiveSingleton } from '~/lib/content'
import { Facebook, Instagram, LinkedIn, Mail, Phone, Pin } from './Icons'

const footerLinks = [
  ...nav,
  { to: '/products', label: 'Works' },
  { to: '/team', label: 'Career' },
  { to: '/blog', label: 'Blog' },
]

export function Footer() {
  const company = useLiveSingleton('company_info', defaultCompany, mapCompanyRow)
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <Link to="/" className="ftr-brand">
            <img src="/logo.png" alt={company.name} className="ftr-logo" />
            <div>
              <b>{company.legalName}</b>
              <span>{company.tagline}</span>
            </div>
          </Link>

          <div className="ftr-soc">
            <a className="soc" href={company.whatsapp} aria-label="Instagram" target="_blank" rel="noopener">
              <Instagram />
            </a>
            <a className="soc" href={company.whatsapp} aria-label="Facebook" target="_blank" rel="noopener">
              <Facebook />
            </a>
            <a className="soc" href={company.whatsapp} aria-label="LinkedIn" target="_blank" rel="noopener">
              <LinkedIn />
            </a>
          </div>
        </div>

        <div className="ftr-grid">
          <div>
            <div className="ftr-ico">
              <Mail />
            </div>
            <h4>Write Us</h4>
            <p className="ftr-label">General Inquiry</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>

          <div>
            <div className="ftr-ico">
              <Phone />
            </div>
            <h4>Call Us</h4>
            <p className="ftr-label">Phone</p>
            <a href={company.phoneHref}>{company.phone}</a>
          </div>

          <div>
            <div className="ftr-ico">
              <Pin />
            </div>
            <h4>Visit Us</h4>
            <p className="ftr-label">Office</p>
            <span>{company.legalName}</span>
            <span>{company.address}</span>
          </div>
        </div>

        <nav className="ftr-links">
          {footerLinks.map((item, i) => (
            <Link key={`${item.to}-${i}`} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ftr-bottom">
          © {company.founded} – {new Date().getFullYear()} {company.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
