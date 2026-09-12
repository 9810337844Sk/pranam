import { AboutSection } from '../components/AboutSection'
import { PageHero } from '../components/PageHero'
import { Discover } from '../components/Discover'
import { Seo } from '../components/Seo'

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Pranam Software — a Kathmandu-based team building websites, mobile apps and custom software for businesses since 2024."
        path="/about"
      />
      <PageHero title="About Us" />
      <AboutSection withHead={false} />
      <Discover />
    </>
  )
}