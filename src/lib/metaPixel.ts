/**
 * Meta (Facebook) Pixel — only loads if VITE_META_PIXEL_ID is set, so the
 * site works fine (and loads nothing extra) until a real Pixel ID is added
 * to .env. Get the ID from Meta Events Manager (business.facebook.com).
 */

type Fbq = ((...args: unknown[]) => void) & {
  queue: unknown[][]
  loaded: boolean
  callMethod?: (...args: unknown[]) => void
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: unknown
  }
}

const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined

let initialized = false

function loadScript() {
  if (window.fbq) return
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.queue = []
  fbq.loaded = true
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)
}

export function initMetaPixel() {
  if (!pixelId || initialized) return
  initialized = true
  loadScript()
  window.fbq?.('init', pixelId)
  window.fbq?.('track', 'PageView')
}

export function trackMetaPixelPageView() {
  if (!pixelId || !initialized) return
  window.fbq?.('track', 'PageView')
}

export function trackMetaPixelEvent(event: string, params?: Record<string, unknown>) {
  if (!pixelId || !initialized) return
  window.fbq?.('track', event, params)
}
