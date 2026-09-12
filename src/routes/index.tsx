import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { Discover } from '~/components/Discover'
import { Brands } from '~/components/Brands'
import { ServicesSection } from '~/components/ServicesSection'
import { TechStack } from '~/components/TechStack'
import { ProcessSection } from '~/components/ProcessSection'
import { ProductsSection } from '~/components/ProductsSection'
import { Testimonials } from '~/components/Testimonials'
import { HireCta } from '~/components/HireCta'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [{ title: 'Pranam Software — Websites & Apps That Grow Your Business' }],
  }),
})

function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <ServicesSection />
      <TechStack />
      <ProcessSection />
      <ProductsSection limit={3} />
      <Testimonials />
      <HireCta />
      <Discover />
    </>
  )
}
