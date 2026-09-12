import { brands as defaultBrands, type Brand } from '~/data/site'
import { useLiveContent } from '~/lib/content'

export function Brands() {
  const brands = useLiveContent<Brand>('brands', defaultBrands)
  const loop = [...brands, ...brands]
  return (
    <section className="brands">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <p className="brands-kicker">Trusted by businesses, startups and educators</p>
      </div>
      <div className="marquee" aria-hidden="true">
        {loop.map((brand, i) => (
          <span className="logo" key={`${brand.name}-${i}`}>
            <img src={brand.logo} alt={brand.name} className="client-logo" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </section>
  )
}
