import { supabase } from './supabase'

const SESSION_KEY = 'pranam_analytics_session'

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch (error) {
    console.warn('Session ID generation failed:', error)
    return 'fallback-session-' + Date.now()
  }
}

let currentViewId: string | null = null
let startedAt = 0
let heartbeat: ReturnType<typeof setInterval> | null = null

function elapsedSeconds() {
  return Math.round((Date.now() - startedAt) / 1000)
}

async function persistDuration() {
  if (!supabase || !currentViewId) return
  try {
    await supabase.from('page_views').update({ duration_seconds: elapsedSeconds() }).eq('id', currentViewId)
  } catch (error) {
    console.warn('Failed to persist page view duration:', error)
  }
}

/** Call once per route change (including the first load) to record a page view. */
export async function trackPageView(path: string) {
  try {
    if (heartbeat) clearInterval(heartbeat)
    if (currentViewId) await persistDuration()

    currentViewId = null
    startedAt = Date.now()
    
    // If no supabase or no connection, just track locally
    if (!supabase) {
      console.info('📊 Analytics: Tracking page view locally (no database):', path)
      return
    }

    const { data, error } = await supabase
      .from('page_views')
      .insert({ session_id: sessionId(), path, referrer: document.referrer || null })
      .select('id')
      .single()

    if (error) {
      console.info('📊 Analytics: Page view not saved to database (table may not exist):', error.message)
      return
    }

    currentViewId = (data?.id as string) ?? null
    heartbeat = setInterval(persistDuration, 15000)
    console.info('📊 Analytics: Page view tracked:', path)
  } catch (error) {
    console.warn('📊 Analytics: Page view tracking failed:', error)
  }
}

/** Best-effort flush when the tab is closed or backgrounded. */
export function flushPageView() {
  try {
    if (!supabase || !currentViewId) return
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) return
    
    const url = `${supabaseUrl}/rest/v1/page_views?id=eq.${currentViewId}`
    const body = JSON.stringify({ duration_seconds: elapsedSeconds() })
    
    fetch(url, {
      method: 'PATCH',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=minimal',
      },
      body,
    }).catch(() => {
      // Silent fail - this is expected when database isn't set up
    })
  } catch (error) {
    console.warn('📊 Analytics: Flush failed:', error)
  }
}
