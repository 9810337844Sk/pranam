import { useEffect, useRef, useState } from 'react'
import { team as defaultTeam, type Member } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { Facebook, Instagram, XIcon } from './Icons'
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
      className={`member${inView ? ' in-view' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
      ref={ref}
    >
      <div className="member-avatar-wrap">
        <Ph ini={member.ini} className="avatar" src={member.img} alt={member.name} />
      </div>
      <p className="role">{member.role}</p>
      <h4>{member.name}</h4>
      <div className="mini-soc">
        <a href="/contact" aria-label={`${member.name} on Facebook`}>
          <Facebook />
        </a>
        <a href="/contact" aria-label={`${member.name} on Instagram`}>
          <Instagram />
        </a>
        <a href="/contact" aria-label={`${member.name} on X`}>
          <XIcon />
        </a>
      </div>
    </div>
  )
}

export function TeamSection({ withHead = true }: { withHead?: boolean }) {
  const team = useLiveContent<Member>('team_members', defaultTeam)
  return (
    <section className="team">
      <span className="ysq l" />
      <span className="ysq r" />
      <div className="wrap">
        {withHead && (
          <>
            <h2 className="big">Our Perfect Team</h2>
            <p className="sub">
              Expert professionals dedicated to transforming your digital vision into reality
            </p>
          </>
        )}

        <div className="team-grid">
          {team.map((m, i) => (
            <TeamCard member={m} index={i} key={m.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
