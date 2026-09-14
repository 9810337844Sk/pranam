import { ServiceCards } from '../components/ServiceCards'
import { PricingSection } from '../components/PricingSection'
import { HereToHelp } from '../components/HereToHelp'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services"
        description="Website design & development, school management portals, POS software, restaurant tech and IT training — explore Pranam Software's services."
        path="/services"
      />
      <PageHero title="Our Services" />
      <ServiceCards />
      <PricingSection />
      <HereToHelp />
    </>
  )
}