import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { ContactSection } from '~/components/ContactSection'

export const Route = createFileRoute('/contact')({
  component: Contact,
  validateSearch: (search: Record<string, unknown>): { service?: string } => ({
    service: typeof search.service === 'string' ? search.service : undefined,
  }),
  head: () => ({ meta: [{ title: 'Start Your Project — Pranam Software' }] }),
})

function Contact() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Start Your Project"
        subtitle="Have a project in mind? Fill out the form below and our team will contact you within 24 hours to discuss your requirements."
      />
      <ContactSection withHead={false} />
    </>
  )
}
