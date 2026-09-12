import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { ServicesSection } from '~/components/ServicesSection'
import { TechStack } from '~/components/TechStack'
import { ProcessSection } from '~/components/ProcessSection'
import { HireCta } from '~/components/HireCta'

export const Route = createFileRoute('/services')({
  component: Services,
  head: () => ({ meta: [{ title: 'Services — Pranam Software' }] }),
})

function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        title="Our Services"
        subtitle="Comprehensive digital solutions tailored to your business requirements."
      />
      <ServicesSection withHead={false} />
      <TechStack />
      <ProcessSection />
      <HireCta />
    </>
  )
}
