import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { AboutSection } from '~/components/AboutSection'
import { HireCta } from '~/components/HireCta'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({ meta: [{ title: 'About Us — Pranam Software' }] }),
})

function About() {
  return (
    <>
      <PageHero
        crumb="About"
        title="About Us"
        subtitle="We are dedicated to providing exceptional software solutions that drive business growth."
      />
      <AboutSection withHead={false} />
      <HireCta />
    </>
  )
}
