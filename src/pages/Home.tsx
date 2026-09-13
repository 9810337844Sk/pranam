import { ErrorBoundary } from '../components/ErrorBoundary'
import { Hero } from '../components/Hero'
import { Discover } from '../components/Discover'
import { Brands } from '../components/Brands'
import { ServiceCards } from '../components/ServiceCards'
import { RecentProjects } from '../components/RecentProjects'
import { TechStack } from '../components/TechStack'
import { ProcessSection } from '../components/ProcessSection'
import { PricingSection } from '../components/PricingSection'
import { Testimonials } from '../components/Testimonials'
import { HireCta } from '../components/HireCta'
import { ContactSection } from '../components/ContactSection'
import { Seo } from '../components/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Websites & Apps That Grow Your Business"
        description="Pranam Software builds fast, SEO-friendly websites, mobile apps and custom software that help businesses grow. Based in Maitidevi, Kathmandu, Nepal."
        path="/"
      />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Brands />
      </ErrorBoundary>
      <ErrorBoundary>
        <ServiceCards />
      </ErrorBoundary>
      <ErrorBoundary>
        <RecentProjects limit={3} />
      </ErrorBoundary>
      <ErrorBoundary>
        <TechStack />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProcessSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <PricingSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <Testimonials />
      </ErrorBoundary>
      <ErrorBoundary>
        <ContactSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <HireCta />
      </ErrorBoundary>
      <ErrorBoundary>
        <Discover />
      </ErrorBoundary>
    </>
  )
}