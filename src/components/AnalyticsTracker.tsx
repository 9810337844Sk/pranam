import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { flushPageView, trackPageView } from '~/lib/analytics'

export function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
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
