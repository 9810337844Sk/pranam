/** Every icon used in the design, kept as inline SVG so nothing loads at runtime. */
type P = React.SVGProps<SVGSVGElement>

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.2 5.6 20 12l-6.8 6.4-1.4-1.5 4.2-4H4v-2h12l-4.2-4z" />
  </svg>
)

export const Download = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 16 6 10h4V4h4v6h4z" />
  </svg>
)

export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
)

export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
)

export const Heart = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 21s-8-4.9-8-10a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.1-8 10-8 10" />
  </svg>
)

export const Sun = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFC93C" strokeWidth={2} strokeLinecap="round" {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
)

export const Squiggle = (p: P) => (
  <svg viewBox="0 0 40 24" {...p}>
    <path d="M2 4c6 14 20 18 34 14" strokeLinecap="round" />
    <path d="M30 15l6 3-5 4" strokeLinecap="round" />
  </svg>
)

export const Sparkle = (p: P) => (
  <svg viewBox="0 0 40 40" {...p}>
    <path d="M8 4v8M4 8h8M30 22v8M26 26h8M20 12l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" strokeLinecap="round" />
  </svg>
)

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6A21 21 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8z" />
  </svg>
)

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 3.4A6.4 6.4 0 1 0 18.4 12 6.4 6.4 0 0 0 12 5.6m0 10.6A4.2 4.2 0 1 1 16.2 12 4.2 4.2 0 0 1 12 16.2m6.6-10.9a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5" />
  </svg>
)

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5M3 21h4V9H3zm7 0h4v-6.3c0-1.7 1-2.4 2-2.4s1.9.8 1.9 2.4V21h4v-7c0-3.5-1.9-5.2-4.4-5.2A3.8 3.8 0 0 0 14 10.6V9h-4z" />
  </svg>
)

export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 5.9c-.7.3-1.5.5-2.4.6a4.1 4.1 0 0 0 1.8-2.3c-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.3a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2" />
  </svg>
)

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m5.1 14.1c-.2.6-1.2 1.2-1.7 1.2s-1.1.3-3.6-.8a12.6 12.6 0 0 1-5-4.6c-.4-.6-1-1.7-1-3.2a3.4 3.4 0 0 1 1.1-2.5 1.1 1.1 0 0 1 .8-.3h.6c.2 0 .4 0 .6.5l.9 2.1a.6.6 0 0 1 0 .5 8.2 8.2 0 0 1-.5.7c-.2.2-.4.4-.2.7a9.3 9.3 0 0 0 1.7 2.1 8.4 8.4 0 0 0 2.4 1.5c.3.1.5.1.7-.1l1-1.2c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.6.3a2 2 0 0 1-.1 1.2" />
  </svg>
)

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5" />
  </svg>
)

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.25 1z" />
  </svg>
)

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z" />
  </svg>
)

export const Clock = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 10.6V6h-2v7.4l5.2 3.1 1-1.7z" />
  </svg>
)

export const Lock = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2M9 6a3 3 0 0 1 6 0v2H9z" />
  </svg>
)

export const Shield = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5zm-1 15-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9z" />
  </svg>
)

export const ShieldPlain = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6z" />
  </svg>
)

export const People = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3m-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3m0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13m8 0c-.3 0-.6 0-1 .1 1.2.8 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5" />
  </svg>
)

export const Trend = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m3.5 18.5 6-6 4 4L22 7l-1.4-1.4-7.1 7.1-4-4L2 17z" />
  </svg>
)

export const Bulb = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2M9 20h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
  </svg>
)

export const Browser = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 4h18v3H3zm0 5h18v11H3zm2 2v7h14v-7z" />
  </svg>
)

export const Cap = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z" />
  </svg>
)

export const Cart = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M7 18a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 18m10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18M7.2 14.8h9.5l3.3-8H5.6L5 4H1v2h2.6l3.1 9.4-.9 1.7c-.4.7.1 1.7 1 1.7h12v-2H7.7z" />
  </svg>
)

export const Cutlery = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8.1 13.3 3 18.4 5.6 21l5.1-5.1zM14.9 12c1.9 0 3.6-1.4 3.6-3.6 0-.7-.1-1.3-.4-1.8l-2.7 2.7-1.5-1.5 2.7-2.7c-.5-.2-1.1-.4-1.8-.4-2.2 0-3.6 1.7-3.6 3.6 0 .5.1.9.2 1.3L3.5 17 5 18.5l8.6-8.7c.4.1.9.2 1.3.2" />
  </svg>
)

export const Briefcase = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-6 0h-4V4h4z" />
  </svg>
)

export const GoogleG = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.07-1.6-.22-2.3H12v4.4h6.5c-.28 1.5-1.15 2.8-2.44 3.6v3h3.5c2.05-1.9 3.44-4.7 3.44-8.7z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.5-3c-1 .7-2.3 1.1-4.44 1.1-3.4 0-6.28-2.3-7.3-5.4H1v3.1C2.98 21.3 7.1 24 12 24"
    />
    <path fill="#FBBC05" d="M4.7 13.8a7.5 7.5 0 0 1 0-4.6V6.1H1a12 12 0 0 0 0 10.8z" />
    <path
      fill="#EA4335"
      d="M12 4.7c1.8 0 3.4.6 4.7 1.8l3.1-3.1C17.9 1.3 15.2 0 12 0 7.1 0 2.98 2.7 1 6.1l3.7 3.1C5.72 7 8.6 4.7 12 4.7"
    />
  </svg>
)

export const Send = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M3 11.5 21 3l-6.5 18-3.2-7.3z" />
    <path d="m11.3 13.7 3.6-3.6" stroke="currentColor" strokeWidth={1.4} fill="none" />
  </svg>
)

export const XClose = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" />
  </svg>
)

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 12 17.3 18.2 21l-1.7-7.1L22 9.2l-7.2-.6z" />
  </svg>
)

export const Zap = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </svg>
)

export const Gem = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6 3h12l4 6-10 12L2 9z" />
  </svg>
)

export const Target = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4zm0 4a2 2 0 1 0 2 2h-2z" />
  </svg>
)

export const Headset = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 3a8 8 0 0 0-8 8v6a2 2 0 0 0 2 2h2v-7H6v-1a6 6 0 0 1 12 0v1h-2v7h2a2 2 0 0 0 2-2v-6a8 8 0 0 0-8-8z" />
  </svg>
)

export const serviceIcons = {
  web: Browser,
  school: Cap,
  shop: Cart,
  menu: Cutlery,
  training: Briefcase,
} as const

export const featureIcons = {
  team: People,
  growth: Trend,
  bulb: Bulb,
  shield: Shield,
} as const

export const highlightIcons = {
  zap: Zap,
  gem: Gem,
  target: Target,
  headset: Headset,
} as const
