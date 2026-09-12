import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'
import { Ph } from '../components/Ph'
import { supabase } from '~/lib/supabase'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  created_at: string
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!supabase || !slug) {
        setLoading(false)
        return
      }
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('published', true).maybeSingle()
      setPost((data as Post) ?? null)
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <section>
        <div className="wrap">
          <p>Loading…</p>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <>
        <PageHero crumb="Blog" title="Post not found" subtitle="That post doesn't exist or isn't published." />
        <section>
          <div className="wrap">
            <p>
              That post doesn't exist or isn't published. <Link to="/blog">Back to Blog</Link>
            </p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <PageHero crumb="Blog" title={post.title} subtitle={post.excerpt} />
      <section>
        <div className="wrap blog-post">
          <Ph ini="PS" className="blog-post-img" src={post.cover_image} alt={post.title} />
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <Link to="/blog" className="blog-back">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </>
  )
}
