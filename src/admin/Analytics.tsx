import { useEffect, useMemo, useState } from 'react'
import { supabase } from '~/lib/supabase'

type PageView = {
  id: string
  created_at: string
  session_id: string
  path: string
  duration_seconds: number
}

const ranges = [
  { value: 7, label: 'Last 7 days' },
  { value: 30, label: 'Last 30 days' },
  { value: 90, label: 'Last 90 days' },
]

function formatDuration(totalSeconds: number) {
  const s = Math.round(totalSeconds)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return `${m}m ${rem}s`
}

export default function Analytics() {
  const [rows, setRows] = useState<PageView[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [days, setDays] = useState(30)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      if (!supabase) {
        setError('Supabase is not configured — add the env vars from .env.example.')
        setLoading(false)
        return
      }
      
      try {
        const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
        const { data, error: err } = await supabase
          .from('page_views')
          .select('*')
          .gte('created_at', since)
          .order('created_at', { ascending: false })
        
        if (err) {
          // Check if it's a missing table error
          if (err.message?.includes('relation') && err.message?.includes('does not exist')) {
            setError('Analytics table not created yet. Run setup-database.sql to enable analytics tracking.')
          } else {
            setError(err.message)
          }
        } else {
          setRows((data ?? []) as PageView[])
        }
      } catch (error) {
        setError(`Failed to load analytics: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
      
      setLoading(false)
    }
    load()
  }, [days])

  const stats = useMemo(() => {
    const totalViews = rows.length
    const uniqueSessions = new Set(rows.map((r) => r.session_id)).size
    const withDuration = rows.filter((r) => r.duration_seconds > 0)
    const avgDuration = withDuration.length
      ? withDuration.reduce((sum, r) => sum + r.duration_seconds, 0) / withDuration.length
      : 0

    const byPath = new Map<string, number>()
    for (const r of rows) byPath.set(r.path, (byPath.get(r.path) ?? 0) + 1)
    const topPages = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)

    const byDay = new Map<string, number>()
    for (const r of rows) {
      const day = r.created_at.slice(0, 10)
      byDay.set(day, (byDay.get(day) ?? 0) + 1)
    }
    const dailyViews = [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    const maxDaily = Math.max(1, ...dailyViews.map((d) => d[1]))

    return { totalViews, uniqueSessions, avgDuration, topPages, dailyViews, maxDaily }
  }, [rows])

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <h1>Analytics</h1>
        <select className="admin-range" value={days} onChange={(e) => setDays(Number(e.target.value))}>
          {ranges.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <p className="admin-hint">First-party page-view tracking for your website — no external analytics needed.</p>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div className="admin-stats admin-stats-3">
            <div className="admin-stat admin-stat-all">
              <span className="admin-stat-num">{stats.totalViews}</span>
              <span className="admin-stat-label">Total Page Views</span>
            </div>
            <div className="admin-stat admin-stat-new">
              <span className="admin-stat-num">{stats.uniqueSessions}</span>
              <span className="admin-stat-label">Visits (Unique Sessions)</span>
            </div>
            <div className="admin-stat admin-stat-won">
              <span className="admin-stat-num">{formatDuration(stats.avgDuration)}</span>
              <span className="admin-stat-label">Average Duration</span>
            </div>
          </div>

          <section className="admin-card">
            <h2>Views per day</h2>
            {stats.dailyViews.length === 0 ? (
              <p>No visits recorded yet.</p>
            ) : (
              <div className="admin-bars">
                {stats.dailyViews.map(([day, count]) => (
                  <div className="admin-bar" key={day}>
                    <div className="admin-bar-track">
                      <div className="admin-bar-fill" style={{ height: `${(count / stats.maxDaily) * 100}%` }} />
                    </div>
                    <span className="admin-bar-label">{day.slice(5)}</span>
                    <span className="admin-bar-count">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="admin-card">
            <h2>Top Pages</h2>
            {stats.topPages.length === 0 ? (
              <p>No visits recorded yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topPages.map(([path, count]) => (
                    <tr key={path}>
                      <td>{path === '/' ? 'Home' : path}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  )
}
