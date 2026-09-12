import { useEffect } from 'react'

const SITE_URL = 'https://www.pranamsoftware.com'

function setMeta(selector: string, attr: string, content: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, content)
}

/**
 * Updates the document title, meta description, canonical link and social
 * tags per route — this is a client-rendered SPA so index.html only carries
 * defaults for the home page; this keeps every other page's <head> distinct
 * for search engines and link previews.
 */
export function Seo({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    const fullTitle = `${title} — Pranam Software`
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:url"]', 'content', url)
  }, [title, description, path])

  return null
}
