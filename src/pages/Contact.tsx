import { ContactSection } from '../components/ContactSection'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Pranam Software in Maitidevi, Kathmandu — request a quote for your website, app or software project."
        path="/contact"
      />
      <PageHero title="Contact Us" />
      <ContactSection withHead={false} />
    </>
  )
}