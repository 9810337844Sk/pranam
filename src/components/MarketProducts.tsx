import { Link } from 'react-router-dom'
import { brands, officeImage, products } from '~/data/site'
import { Ph } from './Ph'

export function MarketProducts() {
  const items = products.slice(0, 9)
  const progress = Math.round((items.length / 9) * 100)

  return (
    <section className="mktp">
      <div className="wrap mktp-grid">
        <div className="mktp-art">
          <img src={officeImage} alt="Pranam Software products in the market" />
          <div className="mktp-badge">
            <b>{items.length}+</b>
            <span>Products Delivered</span>
          </div>
        </div>

        <div className="mktp-body">
          <p className="mktp-kicker">LIVE IN THE MARKET</p>
          <h2 className="mktp-title">Our Products</h2>

          <div className="mktp-cards">
            {items.map((p) => {
              const logo = brands.find((b) => p.name.includes(b.name) || b.name.includes(p.name))?.logo
              return (
                <div className="mktp-card" key={p.name}>
                  <Ph ini={p.ini} src={logo} alt={p.name} className="mktp-logo">
                    {!logo && <span className="mktp-word">{p.name}</span>}
                  </Ph>
                </div>
              )
            })}
          </div>

          <div className="mktp-bar">
            <div className="mktp-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <Link to="/products" className="mktp-cta">
            See All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
