import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '~/lib/supabase'
import { Ph } from './Ph'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  category: string
  client_name: string
  project_url?: string
  technologies_used?: string[]
  active: boolean
  featured: boolean
  sort_order: number
}

const categories = ['All', 'Website', 'Mobile App', 'Software', '3D Video']

function matchesCategory(category: string, productCategory: string) {
  if (category === 'All') return true
  return productCategory.toLowerCase().includes(category.toLowerCase())
}

export function ProductsSection({
  withHead = true,
  limit,
}: {
  withHead?: boolean
  limit?: number
}) {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data, error: err } = await supabase
          .from('products')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true })

        if (err) {
          console.error('Error fetching products:', err)
          setError(err.message)
          setAllProducts([])
        } else {
          setAllProducts(data || [])
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load products')
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const list = useMemo(() => {
    let filtered = allProducts.filter((p) => matchesCategory(category, p.category))
    if (limit) {
      filtered = filtered.slice(0, limit)
    }
    return filtered
  }, [category, limit, allProducts])

  if (loading) {
    return (
      <section id="products">
        <div className="wrap">
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        </div>
      </section>
    )
  }

  if (error || allProducts.length === 0) {
    return null
  }

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
            <article className="prod" key={p.id}>
              <Ph ini={p.name.substring(0, 2).toUpperCase()} className="shot" src={p.image_url} alt={p.name} />
              <div className="prod-body">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  <span className="tag">{p.category}</span>
                </div>
                {p.project_url ? (
                  <a href={p.project_url} target="_blank" rel="noopener noreferrer">
                    View Product
                  </a>
                ) : (
                  <Link to="/contact">
                    View Product
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
