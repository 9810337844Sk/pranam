import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '~/lib/supabase'
import { Ph } from './Ph'

interface Project {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  category: string
  client_name: string
  project_url?: string
  technologies_used?: string[]
  featured: boolean
}

export function RecentProjects({ limit = 3 }: { limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const { data, error: err } = await supabase
          .from('products')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true })
          .limit(limit)

        if (err) {
          console.error('Error fetching projects:', err)
          setError(err.message)
          setProjects([])
        } else {
          setProjects(data || [])
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load projects')
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [limit])

  if (loading) {
    return (
      <section id="recent-projects">
        <div className="wrap">
          <div className="prod-head">
            <div>
              <p className="prod-kicker">Our Work</p>
              <h2 className="prod-title">Recent Projects</h2>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        </div>
      </section>
    )
  }

  if (error || projects.length === 0) {
    return null
  }

  return (
    <section id="recent-projects">
      <div className="wrap">
        <div className="prod-head">
          <div>
            <p className="prod-kicker">Our Work</p>
            <h2 className="prod-title">Recent Projects</h2>
          </div>
          <Link to="/products" className="view-all-link">
            View All
          </Link>
        </div>

        <div className="prod-grid">
          {projects.map((p) => (
            <article className="prod" key={p.id}>
              <Ph ini={p.name.substring(0, 2).toUpperCase()} className="shot" src={p.image_url} alt={p.name} />
              <div className="prod-body">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.category && (
                    <span className="tag" key={p.category}>
                      {p.category}
                    </span>
                  )}
                </div>
                <Link to="/contact">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
