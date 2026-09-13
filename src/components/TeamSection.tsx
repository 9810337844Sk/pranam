import { useEffect, useRef, useState } from 'react'
import { team as defaultTeam, type Member } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { Ph } from './Ph'

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
      <div className="team-member-image-wrapper">
        <Ph ini={member.ini} className="team-member-avatar" src={member.img} alt={member.name} />
      </div>
      
      <div className="team-member-info">
        <h3 className="team-member-name">{member.name}</h3>
        <p className="team-member-role">{member.role}</p>
        <p className="team-member-skills">{member.skills}</p>
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
