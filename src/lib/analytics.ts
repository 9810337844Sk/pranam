import { supabase } from './supabase'

const SESSION_KEY = 'pranam_analytics_session'

function sessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

let currentViewId: string | null = null
let startedAt = 0
let heartbeat: ReturnType<typeof setInterval> | null = null

function elapsedSeconds() {
  return Math.round((Date.now() - startedAt) / 1000)
}

async function persistDuration() {
  if (!supabase || !currentViewId) return
  await supabase.from('page_views').update({ duration_seconds: elapsedSeconds() }).eq('id', currentViewId)
}

/** Call once per route change (including the first load) to record a page view. */
export async function trackPageView(path: string) {
  if (heartbeat) clearInterval(heartbeat)
  if (currentViewId) await persistDuration()

  currentViewId = null
  startedAt = Date.now()
  if (!supabase) return

  const { data } = await supabase
    .from('page_views')
    .insert({ session_id: sessionId(), path, referrer: document.referrer || null })
    .select('id')
    .single()

  currentViewId = (data?.id as string) ?? null
  heartbeat = setInterval(persistDuration, 15000)
}

/** Best-effort flush when the tab is closed or backgrounded. */
export function flushPageView() {
  if (!supabase || !currentViewId) return
  const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/page_views?id=eq.${currentViewId}`
  const body = JSON.stringify({ duration_seconds: elapsedSeconds() })
  fetch(url, {
    method: 'PATCH',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal',
    },
    body,
  }).catch(() => {})
}
