import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products as defaultProducts, type Product } from '~/data/site'
import { useLiveContent } from '~/lib/content'
import { ArrowRight } from './Icons'
import { Ph } from './Ph'

const categories = ['All', 'Website', 'Mobile App', 'Software', '3D Video']

function matchesCategory(tags: string[], category: string) {
  if (category === 'All') return true
  return tags.some((t) => t.toLowerCase().includes(category.toLowerCase()))
}

export function ProductsSection({
  withHead = true,
  limit,
}: {
  withHead?: boolean
  limit?: number
}) {
  const [category, setCategory] = useState('All')
  const products = useLiveContent<Product>('products', defaultProducts)

  const list = useMemo(() => {
    const base = limit ? products.filter((p) => !p.wide).slice(0, limit) : products
    return limit ? base : base.filter((p) => matchesCategory(p.tags, category))
  }, [category, limit, products])

  return (
    <section id="products">
      <div className="wrap">
        <div className="prod-head">
          {withHead ? (
            <div>
              <p className="prod-kicker">Our Work</p>
              <h2 className="prod-title">Recent Projects</h2>
            </div>
          ) : (
            <span />
          )}

          {!limit && (
            <div className="prod-filters">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`filter-pill${c === category ? ' active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="prod-grid">
          {list.map((p) => (
            <article className={`prod${p.wide ? ' wide' : ''}`} key={p.name}>
              <Ph ini={p.ini} className="shot" src={p.img} alt={p.name} />
              <div className="prod-body">
                <h3>{p.name}</h3>
                <p>{p.body}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link to="/contact">
                  View Product <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
