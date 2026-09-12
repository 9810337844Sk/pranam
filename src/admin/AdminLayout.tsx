import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '~/lib/adminAuth'

const navItems = [
  { to: '/admin/enquiries', label: 'Enquiries' },
  { to: '/admin/hero-slider', label: 'Hero Slider' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/team', label: 'Team' },
  { to: '/admin/process', label: 'Process' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/company', label: 'Company Info' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  function onSignOut() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <b>Pranam Software</b>
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <a href="/" target="_blank" rel="noopener">
            View Website ↗
          </a>
          <button type="button" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
