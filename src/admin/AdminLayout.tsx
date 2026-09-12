import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '~/lib/adminAuth'
import {
  BadgeIcon,
  BlogIcon,
  BriefcaseIcon,
  BuildingIcon,
  ChartIcon,
  ExternalIcon,
  ImportIcon,
  InboxIcon,
  LogoutIcon,
  PackageIcon,
  QuoteIcon,
  SliderIcon,
  UsersIcon,
} from './icons'

const navItems = [
  { to: '/admin/analytics', label: 'Analytics', Icon: ChartIcon },
  { to: '/admin/enquiries', label: 'Enquiries', Icon: InboxIcon },
  { to: '/admin/hero-slider', label: 'Hero Image', Icon: SliderIcon },
  { to: '/admin/services', label: 'Services', Icon: BriefcaseIcon },
  { to: '/admin/products', label: 'Products', Icon: PackageIcon },
  { to: '/admin/team', label: 'Team', Icon: UsersIcon },
  { to: '/admin/testimonials', label: 'Testimonials', Icon: QuoteIcon },
  { to: '/admin/blog', label: 'Blog', Icon: BlogIcon },
  { to: '/admin/brands', label: 'Trusted By', Icon: BadgeIcon },
  { to: '/admin/company', label: 'Company Info', Icon: BuildingIcon },
  { to: '/admin/import', label: 'Import Content', Icon: ImportIcon },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const current = navItems.find((n) => location.pathname.startsWith(n.to))

  function onSignOut() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/admin/admin-logo.png" alt="Pranam Software" className="admin-brand-badge" />
          <div>
            <b>Pranam Software</b>
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="admin-nav">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon className="admin-nav-ico" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <a href="/" target="_blank" rel="noopener">
            <ExternalIcon className="admin-nav-ico" /> View Website
          </a>
          <button type="button" onClick={onSignOut}>
            <LogoutIcon className="admin-nav-ico" /> Sign Out
          </button>
        </div>
      </aside>
      <div className="admin-body">
        <header className="admin-topbar">
          <h2>{current?.label ?? 'Admin'}</h2>
          <div className="admin-topbar-user">
            <img src="/admin/admin-logo.png" alt="" className="admin-avatar" />
            <div>
              <b>Pranam Admin</b>
              <span>Administrator</span>
            </div>
          </div>
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
