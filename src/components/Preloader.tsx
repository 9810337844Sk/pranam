import { useEffect, useState } from 'react'

const MIN_VISIBLE_MS = 1400

export function Preloader() {
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let fired = false

    const done = () => {
      if (fired) return
      fired = true
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)
      setTimeout(() => setHidden(true), wait)
    }

    if (document.readyState === 'complete') {
      done()
    } else {
      window.addEventListener('load', done)
    }
    return () => window.removeEventListener('load', done)
  }, [])

  useEffect(() => {
    if (!hidden) return
    const t = setTimeout(() => setMounted(false), 700)
    return () => clearTimeout(t)
  }, [hidden])

  if (!mounted) return null

  return (
    <div className={`preloader${hidden ? ' preloader-hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader-inner">
        <div className="preloader-ring" />
        <img src="/logo.png" alt="" className="preloader-logo" />
      </div>
      <div className="preloader-bar">
        <span />
      </div>
    </div>
  )
}
