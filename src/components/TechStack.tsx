import { useEffect, useRef, useState } from 'react'
import { techStack } from '~/data/site'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export function TechStack() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="tech">
      <div className="wrap">
        <h2 className="tech-title">Tools &amp; Technologies</h2>
        <div className={`tech-row${inView ? ' in-view' : ''}`} ref={ref}>
          {techStack.map((t, i) => (
            <div
              className="tech-item"
              key={t.slug}
              style={{ transitionDelay: `${i * 60}ms`, animationDelay: `${i * 0.35}s` }}
            >
              <span className="tech-ico-wrap">
                <img src={`https://cdn.simpleicons.org/${t.slug}/94A3B8`} alt={t.name} loading="lazy" />
              </span>
              <span className="tech-label">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
