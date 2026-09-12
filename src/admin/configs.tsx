import type { FieldConfig } from './CollectionEditor'
import type { Row } from './api'

export const heroSlideFields: FieldConfig[] = [
  { key: 'image', label: 'Image URL', placeholder: 'https://…' },
  { key: 'title', label: 'Title' },
  { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
]

export const serviceFields: FieldConfig[] = [
  { key: 'title', label: 'Title' },
  { key: 'body', label: 'Description', type: 'textarea' },
  { key: 'icon', label: 'Icon (web / school / shop / menu / training)' },
  { key: 'color', label: 'Color (violet / pink / orange / blue / teal)' },
  { key: 'image', label: 'Image URL' },
  { key: 'features', label: 'Features (comma separated)', type: 'tags' },
]

export const productFields: FieldConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'ini', label: 'Initials (fallback if image fails)' },
  { key: 'body', label: 'Description', type: 'textarea' },
  { key: 'tags', label: 'Tags (comma separated)', type: 'tags' },
  { key: 'img', label: 'Image URL' },
  { key: 'wide', label: 'Wide card', type: 'boolean' },
]

export const teamFields: FieldConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'ini', label: 'Initials' },
  { key: 'role', label: 'Role' },
  { key: 'skills', label: 'Skills' },
  { key: 'img', label: 'Photo URL' },
]

export const testimonialFields: FieldConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'ini', label: 'Initials' },
  { key: 'at', label: 'Company / role' },
  { key: 'tag', label: 'Tag (e.g. WEBSITE, KATHMANDU)' },
  { key: 'time', label: 'Time (e.g. "2 weeks ago")' },
  { key: 'quote', label: 'Quote', type: 'textarea' },
  { key: 'img', label: 'Photo URL' },
]

export const processFields: FieldConfig[] = [
  { key: 'title', label: 'Title' },
  { key: 'body', label: 'Description', type: 'textarea' },
]

export const itemLabels = {
  hero_slides: (r: Row) => String(r.title || 'Untitled slide'),
  services: (r: Row) => String(r.title || 'Untitled service'),
  products: (r: Row) => String(r.name || 'Untitled product'),
  team_members: (r: Row) => String(r.name || 'Untitled member'),
  testimonials: (r: Row) => String(r.name || 'Untitled testimonial'),
  process_steps: (r: Row) => String(r.title || 'Untitled step'),
}
