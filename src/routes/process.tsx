import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { ProcessSection } from '~/components/ProcessSection'
import { Discover } from '~/components/Discover'
import { HireCta } from '~/components/HireCta'

export const Route = createFileRoute('/process')({
  component: Process,
  head: () => ({ meta: [{ title: 'Our Process — Pranam Software' }] }),
})

function Process() {
  return (
    <>
      <PageHero
        crumb="Process"
        title="How We Work"
        subtitle="Streamlined approach to deliver exceptional results every time."
      />
      <ProcessSection withHead={false} />
      <Discover />
      <HireCta />
    </>
  )
}
