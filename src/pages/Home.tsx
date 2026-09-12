import { Hero } from '../components/Hero'
import { Discover } from '../components/Discover'
import { Brands } from '../components/Brands'
import { ServicesSection } from '../components/ServicesSection'
import { TechStack } from '../components/TechStack'
import { ProcessSection } from '../components/ProcessSection'
import { ProductsSection } from '../components/ProductsSection'
import { Testimonials } from '../components/Testimonials'
import { HireCta } from '../components/HireCta'
import { Seo } from '../components/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Websites & Apps That Grow Your Business"
        description="Pranam Software builds fast, SEO-friendly websites, mobile apps and custom software that help businesses grow. Based in Maitidevi, Kathmandu, Nepal."
        path="/"
      />
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