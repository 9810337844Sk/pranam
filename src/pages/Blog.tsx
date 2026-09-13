import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Ph } from '../components/Ph'
import { supabase } from '~/lib/supabase'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string
  created_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('blog_posts')
        .select('id,title,slug,excerpt,cover_image,created_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
      setPosts((data ?? []) as Post[])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <Seo
        title="Blog"
        description="Insights, updates and stories from the Pranam Software team."
        path="/blog"
      />
      <PageHero crumb="Blog" title="Blog" subtitle="Insights, updates and stories from our team." />
      <section>
        <div className="wrap">
          {loading ? (
            <p>Loading…</p>
          ) : posts.length === 0 ? (
            <p>No posts published yet — check back soon.</p>
          ) : (
            <div className="blog-grid">
              {posts.map((p) => (
                <Link to={`/blog/${p.slug}`} className="blog-card" key={p.id}>
                  <Ph ini="PS" className="blog-card-img" src={p.cover_image} alt={p.title} />
                  <div className="blog-card-body">
                    <span className="blog-card-date">
                      {new Date(p.created_at).toLocaleDateString(undefined, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
