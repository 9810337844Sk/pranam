import { useEffect, useRef, useState } from 'react'
import { team as defaultTeam, type Member } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { Ph } from './Ph'

// Modern color palette for team member backgrounds
const teamColors = [
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#6366F1', // Indigo
]

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
  const bgColor = teamColors[index % teamColors.length]

  return (
    <div
      className={`team-member-card${inView ? ' in-view' : ''}`}
      style={{ 
        transitionDelay: `${index * 90}ms`,
        '--team-color': bgColor
      } as React.CSSProperties}
      ref={ref}
    >
      <div className="team-member-image-wrapper" style={{ backgroundColor: bgColor }}>
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
