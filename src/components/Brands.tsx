import { brands } from '~/data/site'

export function Brands() {
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
