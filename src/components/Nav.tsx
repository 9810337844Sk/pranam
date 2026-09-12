import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company, nav } from '~/data/site'

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={`brand ${className ?? ''}`}>
      <img src="/logo.png" alt={company.name} className="brand-logo" />
    </Link>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="nav">
      <div className="nav-pill">
        <span className="nav-pill-border" aria-hidden="true" />
        <Brand />

        <nav className={`nav-links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="nav-cta">
          Get Started
        </Link>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
