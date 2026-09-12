import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** shadcn/ui's class helper — merges conditional classes without duplicates. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Turns a title into a URL-safe slug, e.g. "Website Design & Development" -> "website-design-development". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
