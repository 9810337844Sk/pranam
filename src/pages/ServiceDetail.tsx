import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { services as defaultServices, type Service } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { slugify } from '~/lib/utils'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { ArrowRight, Check, serviceIcons } from '../components/Icons'

const SITE_URL = 'https://www.pranamsoftware.com.np'

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const services = useLiveContent<Service>('services', defaultServices)
  const service = services.find((s) => slugify(s.title) === slug)

  useEffect(() => {
    if (services.length && !service) navigate('/services', { replace: true })
  }, [services.length, service, navigate])

  if (!service) return null

  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.body,
    provider: { '@type': 'ProfessionalService', name: 'Pranam Software' },
    areaServed: 'Nepal',
    url: `${SITE_URL}/services/${slug}`,
  }

  return (
    <>
      <Seo
        title={service.title}
        description={`${service.body} Get a free quote from Pranam Software in Kathmandu, Nepal.`}
        path={`/services/${slug}`}
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <PageHero crumb="Services" title={service.title} subtitle={service.body} />

      <section className={`svc-detail svc-${service.color}`}>
        <div className="wrap svc-detail-grid">
          <div className="svc-detail-body">
            {Icon && (
              <div className="svc-ico">
                <Icon />
              </div>
            )}
            <h2>What's included</h2>
            <ul className="svc-detail-feats">
              {service.features.map((f) => (
                <li key={f}>
                  <Check /> {f}
                </li>
              ))}
            </ul>
            <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="svc-detail-cta">
              Get a Free Quote <ArrowRight width={15} height={15} />
            </Link>
          </div>
          <img className="svc-detail-img" src={service.image} alt={service.title} loading="lazy" />
        </div>

        <div className="wrap svc-detail-related">
          <h3>Other Services</h3>
          <div className="svc-detail-related-links">
            {services
              .filter((s) => s.title !== service.title)
              .map((s) => (
                <Link key={s.title} to={`/services/${slugify(s.title)}`}>
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
