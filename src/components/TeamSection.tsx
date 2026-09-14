import { useEffect, useRef, useState } from 'react'
import { team as defaultTeam } from '~/data/site'
import { teamSocialFallback } from '~/data/site'
import type { Member } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { Ph } from './Ph'
import { GitHub, LinkedIn } from './Icons'

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

function TeamCard({ member, index }: { member: Member; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      className={`team-member-card${inView ? ' in-view' : ''}`}
      style={{ 
        transitionDelay: `${index * 90}ms`
      }}
      ref={ref}
    >
      <div className="team-card-inner">
        <div className="team-pillar" aria-hidden="true">
          <span className="team-watermark">Pranam</span>
        </div>
        <Ph ini={member.ini} className="team-member-avatar" src={member.img} alt={member.name} />
        <div className="team-gradient-overlay" aria-hidden="true"></div>
        <div className="team-hover-veil" aria-hidden="true"></div>
        <svg className="team-chevron" viewBox="0 0 34 26" aria-hidden="true">
          <path d="M17 0 34 26 H0 Z" />
        </svg>
        <div className="team-member-info">
          <h3 className="team-member-name">{member.name}</h3>
          <p className="team-member-role">{member.role}</p>
          <div className="team-social">
            <a
              className="team-social-btn"
              href={member.linkedin ?? teamSocialFallback.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
            >
              <LinkedIn />
            </a>
            <a
              className="team-social-btn"
              href={member.github ?? teamSocialFallback.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TeamSection({ withHead = true }: { withHead?: boolean }) {
  const team = useLiveContent<Member>('team_members', defaultTeam)
  return (
    <section className="team-section-modern">
      <div className="wrap">
        {withHead && (
          <div className="team-section-header">
            <p className="team-section-kicker">Meet The Team</p>
            <h2 className="team-section-title">Our Perfect Team</h2>
            <p className="team-section-subtitle">
              Expert professionals dedicated to transforming your digital vision into reality
            </p>
          </div>
        )}

        <div className="team-members-grid">
          {team.map((m, i) => (
            <TeamCard member={m} index={i} key={m.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
