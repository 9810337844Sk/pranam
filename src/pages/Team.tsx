import { TeamSection } from '../components/TeamSection'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export default function Team() {
  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the developers, designers and marketers behind Pranam Software's websites, apps and custom software."
        path="/team"
      />
      <PageHero title="Our Team" />
      <TeamSection withHead={false} />
    </>
  )
}