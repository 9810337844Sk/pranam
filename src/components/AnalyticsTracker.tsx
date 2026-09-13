import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { flushPageView, trackPageView } from '~/lib/analytics'
import { initMetaPixel, trackMetaPixelPageView } from '~/lib/metaPixel'

export function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    try {
      initMetaPixel()
    } catch (error) {
      console.warn('Meta Pixel initialization failed:', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    try {
      trackPageView(location.pathname)
      trackMetaPixelPageView()
    } catch (error) {
      console.warn('Page view tracking failed:', error)
    }
  }, [location.pathname])

  useEffect(() => {
    try {
      function onVisibilityChange() {
        try {
          if (document.visibilityState === 'hidden') flushPageView()
        } catch (error) {
          console.warn('Page view flush failed:', error)
        }
      }
      
      function onPageHide() {
        try {
          flushPageView()
        } catch (error) {
          console.warn('Page hide flush failed:', error)
        }
      }
      
      document.addEventListener('visibilitychange', onVisibilityChange)
      window.addEventListener('pagehide', onPageHide)
      
      return () => {
        try {
          document.removeEventListener('visibilitychange', onVisibilityChange)
          window.removeEventListener('pagehide', onPageHide)
        } catch (error) {
          console.warn('Event cleanup failed:', error)
        }
      }
    } catch (error) {
      console.warn('Analytics event setup failed:', error)
    }
  }, [])

  return null
}
