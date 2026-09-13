import { certifications, features, officeImage } from '~/data/site'
import { featureIcons, GoogleG, MetaIcon, SeoIcon, ShieldPlain } from './Icons'

const certIcons: Record<string, typeof ShieldPlain> = {
  'Google Analytics Certified': GoogleG,
  'Meta Ads Certified': MetaIcon,
  'SEO Specialist Certified': SeoIcon,
}
import { SectionHead } from './PageHero'
import { Ph } from './Ph'

export function AboutSection({ withHead = true }: { withHead?: boolean }) {
  return (
    <section className="about">
      <div className="wrap">
        {withHead && (
          <SectionHead
            title="About Us"
            subtitle={
              <>
                We are dedicated to providing exceptional software solutions
                <br />
                that drive business growth.
              </>
            }
          />
        )}

        <div className="about-grid">
          <div>
            <h3>Our Story</h3>
            <p>
              Founded in 2024, Pranam Software has been at the forefront of digital innovation,
              delivering scalable solutions to businesses worldwide. Our team of experts combines
              technical excellence with creative thinking to solve complex challenges.
            </p>
            <p>
              We believe in building long-term partnerships with our clients, focusing on sustainable
              growth through technology. Our approach is collaborative, transparent, and
              results-driven.
            </p>
          </div>
          <Ph ini="PS" className="about-img" src={officeImage} alt="Pranam Software office" />
        </div>

        <div className="feat">
          {features.map((f) => {
            const Icon = featureIcons[f.icon]
            return (
              <div key={f.title}>
                <div className="feat-ico">
                  <Icon />
                </div>
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            )
          })}
        </div>

        <div className="certs">
          {certifications.map((c) => {
            const Icon = certIcons[c] || ShieldPlain
            return (
              <span className="cert" key={c}>
                <Icon /> {c}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
