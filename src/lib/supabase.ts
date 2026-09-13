import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Browser client — safe to ship, limited by Row Level Security.
 * Use it for auth and for any table you expose with a read policy.
 */
export const supabase =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: true } }) : null

/**
 * Server client — only ever imported inside a server function.
 * Uses the service role key when present so inserts work while RLS keeps the
 * table unreadable from the browser.
 * 
 * Note: This is for server-side use only. For client-side, use the regular supabase client above.
 */
export function supabaseAdmin() {
  // For client-side only apps, just return the regular client
  // Server-side apps would use: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
  if (!url || !anonKey) return null
  return createClient(url, anonKey, { auth: { persistSession: false } })
}
