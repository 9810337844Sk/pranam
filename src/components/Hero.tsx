import { useEffect, useState } from 'react'
import { heroImage } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { ButtonLink } from './ui/button'
import { Ph } from './Ph'
import { ArrowRight, Squiggle, Sun } from './Icons'

const stats = [
  { title: 'Strategy-led', body: 'For real business needs' },
  { title: 'Built in Nepal', body: 'By a passionate team' },
  { title: 'Ready to scale', body: 'From startups to enterprises' },
]

type HeroSlide = { image: string; title: string; subtitle: string }

const defaultSlides: HeroSlide[] = [
  {
    image: heroImage,
    title: 'Websites & Apps That Grow Your Business',
    subtitle:
      'Pranam Software builds fast, SEO-friendly websites, mobile apps and custom software that help businesses grow.',
  },
]

export function Hero() {
  const slides = useLiveContent<HeroSlide>('hero_slides', defaultSlides)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [slides.length])

  const slide = slides[active] ?? slides[0]

  return (
    <section className="hero2">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="heroSoftEdge" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.012" />
          </filter>
          <mask id="heroZigzagMask" maskContentUnits="objectBoundingBox">
            <polygon
              points="0.40,0 1,0 1,1 0.04,1 0.24,0.54"
              fill="#fff"
              filter="url(#heroSoftEdge)"
            />
          </mask>
        </defs>
      </svg>

      <div className="hero2-photo">
        <Ph ini="PS" className="hero2-img" src={slide?.image ?? heroImage} alt={slide?.title ?? 'Pranam Software'} eager />
        <div className="hero2-shade" />
        <p className="hero2-tagline">
          <span>Build.</span>
          <span>Launch.</span>
          <span>Grow.</span>
        </p>
      </div>

      <div className="wrap">
        <div className="hero2-content">
          <p className="eyebrow">Software Development Company</p>
          <h1>
            Websites &amp; Apps
            <br />
            <span className="blue">That Grow</span>
            <br />
            <span className="script">Your Business</span>
            <Sun className="sun" />
          </h1>
          <p className="lead">{slide?.subtitle ?? defaultSlides[0].subtitle}</p>

          <div className="hero-cta">
            <ButtonLink to="/contact" variant="blue">
              Get Started
            </ButtonLink>
            <ButtonLink to="/services" variant="ghost">
              Explore Services
            </ButtonLink>
          </div>

          <div className="hero2-stats">
            {stats.map((s) => (
              <div className="hero2-stat" key={s.title}>
                <ArrowRight />
                <div>
                  <b>{s.title}</b>
                  <span>{s.body}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-note">
            <Squiggle />
            <span>Let's build something amazing together!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
