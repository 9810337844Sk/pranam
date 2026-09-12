import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { TeamSection } from '~/components/TeamSection'
import { Testimonials } from '~/components/Testimonials'
import { HireCta } from '~/components/HireCta'

export const Route = createFileRoute('/team')({
  component: Team,
  head: () => ({ meta: [{ title: 'Our Team — Pranam Software' }] }),
})

function Team() {
  return (
    <>
      <PageHero
        crumb="Team"
        title="Meet Our Team"
        subtitle="Expert professionals dedicated to transforming your digital vision into reality."
      />
      <TeamSection withHead={false} />
      <Testimonials />
      <HireCta />
    </>
  )
}
