import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { flushPageView, trackPageView } from '~/lib/analytics'
import { initMetaPixel, trackMetaPixelPageView } from '~/lib/metaPixel'

export function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    initMetaPixel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
    trackMetaPixelPageView()
  }, [location.pathname])

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') flushPageView()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', flushPageView)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', flushPageView)
    }
  }, [])

  return null
}
