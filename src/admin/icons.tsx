type P = { className?: string }
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const InboxIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M4 12h4l2 3h4l2-3h4" />
    <path d="M5 6h14l2 6v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z" />
  </svg>
)
export const SliderIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h13M21 18h0" />
    <circle cx="15" cy="6" r="2" />
    <circle cx="7" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
)
export const BriefcaseIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
  </svg>
)
export const PackageIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8M12 13v8" />
  </svg>
)
export const UsersIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5.5a3.5 3.5 0 0 1 0 7M21.5 20a6 6 0 0 0-5-5.9" />
  </svg>
)
export const WorkflowIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <rect x="3" y="4" width="6" height="5" rx="1.2" />
    <rect x="15" y="4" width="6" height="5" rx="1.2" />
    <rect x="9" y="15" width="6" height="5" rx="1.2" />
    <path d="M6 9v3a3 3 0 0 0 3 3M18 9v3a3 3 0 0 1-3 3" />
  </svg>
)
export const QuoteIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M7 7a4 4 0 0 0-4 4v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1a3 3 0 0 1 3-3z" />
    <path d="M17 7a4 4 0 0 0-4 4v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1a3 3 0 0 1 3-3z" />
  </svg>
)
export const BuildingIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <rect x="4" y="3" width="16" height="18" rx="1.2" />
    <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
    <path d="M10 21v-4h4v4" />
  </svg>
)
export const ExternalIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M14 4h6v6M20 4 10 14M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
  </svg>
)
export const LogoutIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3M16 17l5-5-5-5M21 12H9" />
  </svg>
)
export const BlogIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" />
    <path d="M4 17V4M8 9h8M8 13h5" />
  </svg>
)
export const ChartIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
)
export const BadgeIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <circle cx="12" cy="8" r="5" />
    <path d="M8.5 12.5 6 21l6-3 6 3-2.5-8.5" />
  </svg>
)
export const ImportIcon = (p: P) => (
  <svg {...base} className={p.className}>
    <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
  </svg>
)
