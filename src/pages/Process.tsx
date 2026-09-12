import { ProcessSection } from '../components/ProcessSection'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export default function Process() {
  return (
    <>
      <Seo
        title="Our Process"
        description="Discovery, design, development and deployment — see how Pranam Software delivers projects from idea to launch."
        path="/process"
      />
      <PageHero title="Our Process" />
      <ProcessSection withHead={false} />
    </>
  )
}