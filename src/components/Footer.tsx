import { Link } from 'react-router-dom'
import { company as defaultCompany, mapCompanyRow, nav } from '~/data/site'
import { useLiveSingleton } from '~/lib/content'
import { Facebook, Instagram, LinkedIn, Mail, Phone, Pin, YouTube, WhatsApp } from './Icons'

export function Footer() {
  const company = useLiveSingleton('company_info', defaultCompany, mapCompanyRow)
  
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/products', label: 'Portfolio' },
    { to: '/process', label: 'Process' },
    { to: '/contact', label: 'Contact Us' },
  ]

  const services = [
    'Website Design & Development',
    'Mobile App Development',
    'School Management Portal',
    'Shop Customized Software',
    'Digital Menu Solutions',
    'IT Training & Internship',
  ]

  const socialLinks = [
    { icon: <Facebook />, url: 'https://www.facebook.com/pranamsoftware', label: 'Facebook' },
    { icon: <Instagram />, url: 'https://www.instagram.com/pranamsoftware', label: 'Instagram' },
    { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/pranam-software-950111421/', label: 'LinkedIn' },
    { icon: <YouTube />, url: 'https://www.youtube.com/@pranamsoftware', label: 'YouTube' },
    { icon: <WhatsApp />, url: company.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <footer className="ftr">
      <div className="wrap">
        {/* Top Section */}
        <div className="ftr-top-section">
          <div className="ftr-brand-section">
            <Link to="/" className="ftr-brand-logo-only">
              <img src="/logo.png" alt={company.name} className="ftr-logo-large" />
            </Link>
            <p className="ftr-description">
              We build fast, secure & responsive websites, mobile apps, and custom software that help businesses grow and succeed in the digital world.
            </p>
            <div className="ftr-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftr-social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="ftr-section">
            <h4 className="ftr-section-title">QUICK LINKS</h4>
            <div className="ftr-section-divider"></div>
            <ul className="ftr-links-list">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="ftr-section">
            <h4 className="ftr-section-title">OUR SERVICES</h4>
            <div className="ftr-section-divider"></div>
            <ul className="ftr-links-list">
              {services.map((service, i) => (
                <li key={i}>
                  <a href="/services">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="ftr-section">
            <h4 className="ftr-section-title">CONTACT INFO</h4>
            <div className="ftr-section-divider"></div>
            <div className="ftr-contact-item">
              <div className="ftr-contact-icon"><Pin /></div>
              <div>
                <p className="ftr-contact-label">Office Address</p>
                <p className="ftr-contact-value">{company.address}</p>
              </div>
            </div>
            <div className="ftr-contact-item">
              <div className="ftr-contact-icon"><Phone /></div>
              <div>
                <p className="ftr-contact-label">Phone</p>
                <a href={company.phoneHref} className="ftr-contact-value">{company.phone}</a>
              </div>
            </div>
            <div className="ftr-contact-item">
              <div className="ftr-contact-icon"><Mail /></div>
              <div>
                <p className="ftr-contact-label">Email</p>
                <a href={`mailto:${company.email}`} className="ftr-contact-value">{company.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="ftr-bottom-section">
          <p className="ftr-copyright">
            © {company.founded} – {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p className="ftr-credit">
            by Pranam Software
          </p>
        </div>
      </div>
    </footer>
  )
}
