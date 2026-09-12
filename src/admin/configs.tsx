import type { FieldConfig } from './CollectionEditor'
import type { Row } from './api'

export const heroSlideFields: FieldConfig[] = [
  { key: 'image', label: 'Hero Image', type: 'image' },
  { key: 'title', label: 'Title' },
  { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
]

export const serviceFields: FieldConfig[] = [
  { key: 'title', label: 'Title' },
  { key: 'body', label: 'Description', type: 'textarea' },
  { key: 'icon', label: 'Icon (web / school / shop / menu / training)' },
  { key: 'color', label: 'Color (violet / pink / orange / blue / teal)' },
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'features', label: 'Features (comma separated)', type: 'tags' },
]

export const productFields: FieldConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'ini', label: 'Initials (fallback if image fails)' },
  { key: 'body', label: 'Description', type: 'textarea' },
  { key: 'tags', label: 'Tags (comma separated)', type: 'tags' },
  { key: 'img', label: 'Image', type: 'image' },
  { key: 'wide', label: 'Wide card', type: 'boolean' },
]

export const teamFields: FieldConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'ini', label: 'Initials' },
  { key: 'role', label: 'Role' },
  { key: 'skills', label: 'Skills' },
  { key: 'img', label: 'Photo', type: 'image' },
]

export const testimonialFields: FieldConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'ini', label: 'Initials' },
  { key: 'at', label: 'Company / role' },
  { key: 'tag', label: 'Tag (e.g. WEBSITE, KATHMANDU)' },
  { key: 'time', label: 'Time (e.g. "2 weeks ago")' },
  { key: 'quote', label: 'Quote', type: 'textarea' },
  { key: 'img', label: 'Photo', type: 'image' },
]

export const brandFields: FieldConfig[] = [
  { key: 'logo', label: 'Logo Image', type: 'image' },
  { key: 'name', label: 'Alt Text / Name' },
]

export const blogFields: FieldConfig[] = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug (URL, e.g. my-first-post)', placeholder: 'my-first-post' },
  { key: 'cover_image', label: 'Cover Image', type: 'image' },
  { key: 'excerpt', label: 'Excerpt (short summary)', type: 'textarea' },
  { key: 'content', label: 'Content', type: 'html' },
  { key: 'published', label: 'Published', type: 'boolean' },
]

export const itemLabels = {
  hero_slides: (r: Row) => String(r.title || 'Untitled slide'),
  services: (r: Row) => String(r.title || 'Untitled service'),
  products: (r: Row) => String(r.name || 'Untitled product'),
  team_members: (r: Row) => String(r.name || 'Untitled member'),
  testimonials: (r: Row) => String(r.name || 'Untitled testimonial'),
  brands: (r: Row) => String(r.name || 'Untitled brand'),
  blog_posts: (r: Row) => String(r.title || 'Untitled post'),
}
